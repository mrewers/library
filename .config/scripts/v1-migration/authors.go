package main

import (
	"encoding/json"
	"fmt"
	"os"
	"slices"
	"strings"

	"github.com/mrewers/library/serverless/utils"
)

type V1Author struct {
	NameFirst string
	NameFull  string
	NameLast  string
	Book      string
}

// breakUpAuthorName attempts to determine an author's first
// and last name from the provided full name.
func breakUpAuthorName(name string) (string, string) {
	first := ""
	last := ""

	parts := strings.Split(name, " ")

	if len(parts) == 1 {
		// If single name, set it as the first name.
		first = parts[0]
	} else if len(parts) == 2 {
		// If exactly two names, set the names sequentially.
		first = parts[0]
		last = parts[1]
	} else if len(parts) == 3 {
		// If exactly three names, check the final character of the middle name.
		middle := parts[1]
		finalChar := middle[len(middle)-1:]

		if finalChar == "." {
			// If the middle name ends in a period, append to the first name.
			first = parts[0] + " " + parts[1]
			last = parts[2]
		} else {
			// Otherwise prepend to the last name.
			first = parts[0]
			last = parts[1] + " " + parts[2]
		}
	} else {
		// If more than three name, take set the initial one as first and everything else as last.
		first = parts[0]
		last = name[len(first)+1:]
	}

	return first, last
}

// extractAuthors iterates over a list of books from the v1 database
// creating a list of authors associated with these books.
func extractAuthors(books []V1Book) []V1Author {
	var authors []V1Author

	for _, book := range books {
		if book.Author == "" {
			continue
		}

		// Some books have multiple authors in a comma separated string.
		list := strings.Split(strings.TrimSpace(book.Author), ", ")

		for _, item := range list {
			first, last := breakUpAuthorName(item)

			author := V1Author{
				NameFull:  item,
				NameFirst: first,
				NameLast:  last,
				Book:      book.Id,
			}

			authors = append(authors, author)
		}
	}

	return authors
}

func findAuthorIndex(authors []utils.Author, name string) int {
	for idx, author := range authors {
		if author.NameFull == name {
			return idx
		}
	}

	return -1
}

// deDupAuthors iterates over a list of authors from the v1 database and merges those that
// are listed multiple times, with each book added to an array of ids as expected by v2.
func deDupAuthors() {
	contents, err := os.ReadFile(authorFile)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var authors []V1Author

	err = json.Unmarshal(contents, &authors)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var processed []string
	var deduped []utils.Author

	for _, author := range authors {
		if !slices.Contains(processed, author.NameFull) {
			// Author not found in processed list, add as is.
			v2 := utils.Author{
				NameFirst: author.NameFirst,
				NameFull:  author.NameFull,
				NameLast:  author.NameLast,
				Books: []string{
					author.Book,
				},
			}
			deduped = append(deduped, v2)
			processed = append(processed, author.NameFull)
		} else {
			// Author already processed, update it's books list.
			index := findAuthorIndex(deduped, author.NameFull)

			if index == -1 {
				continue
			} else {
				deduped[index].Books = append(deduped[index].Books, author.Book)
			}
		}
	}

	writeDataFile(deduped, deDupAuthorFile, "de-duplicated authors")
}
