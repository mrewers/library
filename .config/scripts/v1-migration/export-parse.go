package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const (
	authorFile = "data/authors.json"
	bookFile   = "data/books.json"
)

type V1Book struct {
	Acquired    string   `json:"acquired,omitempty"`
	Author      string   `json:"author,omitempty"`
	Date        string   `json:"date,omitempty"`
	DateRetired string   `json:"dateRetired,omitempty"`
	Id          string   `json:"id,omitempty"`
	Read        []string `json:"read,omitempty"`
	Title       string   `json:"title,omitempty"`
}

type AllBooks struct {
	Active  []V1Book `json:"books,omitempty"`
	Retired []V1Book `json:"retired,omitempty"`
}

// parseAuthors generates a JSON file containing authors in a format conforming to the v2 application.
func parseAuthors(books AllBooks) {
	activeAuthors := extractAuthors(books.Active)
	retiredAuthors := extractAuthors(books.Retired)

	allAuthors := append(activeAuthors, retiredAuthors...)

	writeDataFile(allAuthors, authorFile, "authors")
}

// parseBooks generates a JSON file containing books in a format conforming to the v2 application.
func parseBooks(books AllBooks) {
	bookList := createV2BookList(books)

	writeDataFile(bookList, bookFile, "books")
}

// parseExportFile transforms the raw export file into data usable by the v2 application.
func parseExportFile() {
	exportContents, err := os.ReadFile(exportFile)

	if err != nil {
		fmt.Println(err.Error())
	}

	var books AllBooks

	err = json.Unmarshal(exportContents, &books)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	parseAuthors(books)
	parseBooks(books)
}
