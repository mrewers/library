package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const (
	authorFile = "data/authors.json"
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

func parseExportFile() {
	exportContents, err := os.ReadFile(exportFile)

	if err != nil {
		fmt.Println(err.Error())
	}

	var books AllBooks

	err = json.Unmarshal(exportContents, &books)

	if err != nil {
		fmt.Println(err.Error())
	}

	activeAuthors := extractAuthors(books.Active)
	retiredAuthors := extractAuthors(books.Retired)

	allAuthors := append(activeAuthors, retiredAuthors...)

	bytes, err := json.MarshalIndent(allAuthors, "", "  ")

	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Printf("\nWriting data to the file './%s'...", authorFile)

	os.WriteFile(authorFile, bytes, os.ModePerm)
}
