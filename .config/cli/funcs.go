package main

import (
	"fmt"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

const (
	sourceDir = "serverless"
)

type FuncData struct {
	Display string
	Name    string
	Path    string
}

func (f FuncData) getDir() string {
	return fmt.Sprintf("%s/%s", sourceDir, f.Path)
}

func generateFuncData(endpoint string, method string) FuncData {
	caser := cases.Title(language.AmericanEnglish)

	return FuncData{
		Display: fmt.Sprintf("%s - %s", caser.String(endpoint), caser.String(method)),
		Name:    fmt.Sprintf("%s-%s", method, endpoint),
		Path:    fmt.Sprintf("%s/%s", endpoint, method),
	}
}

func getFuncs() []FuncData {
	return []FuncData{
		generateFuncData("author", "patch"),
		generateFuncData("author", "post"),
		generateFuncData("authors", "get"),
		generateFuncData("book", "delete"),
		generateFuncData("book", "patch"),
		generateFuncData("book", "post"),
		generateFuncData("books", "get"),
		generateFuncData("reader", "delete"),
		generateFuncData("readers", "get"),
		generateFuncData("readers", "post"),
		generateFuncData("readers", "put"),
		{
			Display: "Options",
			Name:    "options",
			Path:    "options",
		},
		{
			Display: "Init",
			Name:    "init",
			Path:    "init",
		},
	}
}
