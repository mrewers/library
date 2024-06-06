package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/mrewers/library/serverless/utils"
)

// writeDataFile creates a JSON file containing the provided data at the given path.
func writeDataFile(data any, path string, name string) {
	bytes, err := json.MarshalIndent(data, "", "  ")

	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Printf("\nWriting %s to the file './%s'...", name, path)

	os.WriteFile(path, bytes, os.ModePerm)
}

// readInAuthorList gets the de-duplicated list of authors from the file authors-deduped.json.
func readInAuthorList() ([]utils.Author, error) {
	var authors []utils.Author

	contents, err := os.ReadFile(deDupAuthorFile)

	if err != nil {
		fmt.Println(err.Error())
		return authors, err
	}

	err = json.Unmarshal(contents, &authors)

	if err != nil {
		fmt.Println(err.Error())
	}

	return authors, err
}

// readInAuthorIdList gets the list of authors with their id from the file authors-id.json.
func readInAuthorIdList() ([]AuthorListItem, error) {
	var authors []AuthorListItem

	contents, err := os.ReadFile(authorIdFile)

	if err != nil {
		fmt.Println(err.Error())
		return authors, err
	}

	err = json.Unmarshal(contents, &authors)

	if err != nil {
		fmt.Println(err.Error())
	}

	return authors, err
}

// readInBookList gets the list of books from books.json.
func readInBookList(path string) ([]BookListItem, error) {
	var books []BookListItem

	contents, err := os.ReadFile(path)

	if err != nil {
		fmt.Println(err.Error())
		return books, err
	}

	err = json.Unmarshal(contents, &books)

	if err != nil {
		fmt.Println(err.Error())
	}

	return books, err
}
