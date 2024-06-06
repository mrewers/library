package main

import (
	"fmt"
	"strings"

	"github.com/mrewers/library/serverless/utils"
)

type BookListItem struct {
	Id   string
	Data utils.Book
}

const (
	bookIdFile = "data/books-ids.json"
)

// transformBookData converts a book's data retrieved from the v1 application
// to the data structure expected for a book by v2 of the application.
func transformBookData(book V1Book) BookListItem {
	// If the book was not added to the collection after initial setup,
	// set the acquisition date to the some arbitrary date prior to v1 release.
	acquired := "2020-01-01"

	if book.Acquired == "yes" {
		acquired = book.Date
	}

	// Convert authors from string to array of names.
	// Later on, these names will need to be replaced with ids.
	authorArr := strings.Split(book.Author, ", ")

	if len(authorArr) == 1 && authorArr[0] == "" {
		authorArr = []string{}
	}

	// Initialize common fields.
	v2 := utils.Book{
		Author:       authorArr,
		DateAcquired: acquired,
		DateCreated:  book.Date,
		ReadBy:       book.Read,
		Title:        strings.TrimSpace(book.Title),
	}

	// Retired books are no longer stored in a separate Firestore collections,
	// so here we set the book properties pertaining to retired books.
	if book.DateRetired != "" {
		retired := true

		v2.Retired = &retired
		v2.DateRetired = book.DateRetired
	} else {
		retired := false

		v2.Retired = &retired
	}

	return BookListItem{
		Id:   book.Id,
		Data: v2,
	}
}

// setReaderIds iterates over a list of books and replaces the 'ReadBy' array
// of names with an array of corresponding reader ids pulled from Firestore.
func setReaderIds(books []BookListItem) []BookListItem {
	var updated []BookListItem

	readers := getReaders()

	for _, book := range books {
		var idArr []string

		nameArr := book.Data.ReadBy

		for _, name := range nameArr {
			var id string

			for _, reader := range readers {
				if reader.Name == name {
					id = reader.Id
				}
			}

			idArr = append(idArr, id)
		}

		book.Data.ReadBy = idArr

		updated = append(updated, book)
	}

	return updated
}

// createV2BookList converts the full list of books from
// the v1 application to one that is compatible with v2.
func createV2BookList(v1 AllBooks) []BookListItem {
	var books []BookListItem

	// Transform all active books.
	for _, book := range v1.Active {
		v2 := transformBookData(book)

		books = append(books, v2)
	}

	// Transform all retired books.
	for _, book := range v1.Retired {
		v2 := transformBookData(book)

		books = append(books, v2)
	}

	// Replace reader names with ids
	books = setReaderIds(books)

	return books
}

// setAuthorIds iterates over a list of books and replaces the 'Author' array of names
// with an array of corresponding author ids pulled from the authors-ids.json file.
func setAuthorIds(books []BookListItem) {
	fmt.Println("\nReplacing author names with ids in the book list...")

	var updated []BookListItem

	authors, err := readInAuthorIdList()

	if err != nil {
		fmt.Printf("Failure reading the contents of %s", authorIdFile)
		return
	}

	for _, book := range books {
		var idArr []string

		nameArr := book.Data.Author

		for _, name := range nameArr {
			var id string

			for _, author := range authors {
				if author.NameFull == name {
					id = author.Id
				}
			}

			idArr = append(idArr, id)
		}

		book.Data.Author = idArr

		updated = append(updated, book)
	}

	writeDataFile(updated, bookIdFile, "books with author ids")
}
