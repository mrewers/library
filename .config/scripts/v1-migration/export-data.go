package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const (
	exportFile = "data/raw.json"
)

// writeDocsToData retrieves all documents withing a given collection and appended them to the data object.
func writeDocsToData(data map[string]interface{}, collection string) map[string]interface{} {
	docs, err := getAllFromCollection(collection)

	if err != nil {
		fmt.Println(err.Error())
		data[collection] = "error retrieving"
	} else {
		data[collection] = docs
	}

	return data
}

// exportFirebaseToJSON retrieves the contents of all of the Firestore collections that make up
// the v1 datastore. The contents of each collection are appended to a data object under a
// property matching the collection name. This data object is then written to a JSON file name
// 'raw.json' and stored in this data folder in this directory.
func exportFirebaseToJSON() {
	data := make(map[string]interface{})

	data = writeDocsToData(data, "books")
	data = writeDocsToData(data, "retired")
	data = writeDocsToData(data, "readers")

	bytes, err := json.MarshalIndent(data, "", "  ")

	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Printf("\nWriting data to the file './%s'...", exportFile)

	os.WriteFile(exportFile, bytes, os.ModePerm)
}
