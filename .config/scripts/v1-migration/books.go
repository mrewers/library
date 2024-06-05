package main

import (
	"strings"
	"time"

	"github.com/mrewers/library/serverless/utils"
)

type BookListItem struct {
	Id   string
	Data utils.Book
}

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

	// Generate created and updated dates.
	created := utils.ConvertStringToTime(book.Date)
	ts := time.Now()

	// Initialize common fields.
	v2 := utils.Book{
		Author:       authorArr,
		DateAcquired: utils.ConvertStringToTime(acquired).String(),
		DateCreated:  &created,
		DateModified: &ts,
		ReadBy:       book.Read,
		Title:        strings.TrimSpace(book.Title),
	}

	// Retired books are no longer stored in a separate Firestore collections,
	// so here we set the book properties pertaining to retired books.
	if book.DateRetired != "" {
		retired := true
		date := utils.ConvertStringToTime(book.DateRetired)

		v2.Retired = &retired
		v2.DateRetired = &date
	} else {
		retired := false

		v2.Retired = &retired
	}

	return BookListItem{
		Id:   book.Id,
		Data: v2,
	}
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

	return books
}
