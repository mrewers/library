package main

import "strings"

type V1Author struct {
	NameFirst string
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
		list := strings.Split(book.Author, ", ")

		for _, item := range list {
			first, last := breakUpAuthorName(item)

			author := V1Author{
				NameFirst: first,
				NameLast:  last,
				Book:      book.Id,
			}

			authors = append(authors, author)
		}
	}

	return authors
}
