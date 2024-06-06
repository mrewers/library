package main

import (
	"fmt"
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
	fmt.Println("\nExporting v1 data from Firebase...")

	data := make(map[string]interface{})

	data = writeDocsToData(data, "books")
	data = writeDocsToData(data, "retired")
	data = writeDocsToData(data, "readers")

	writeDataFile(data, exportFile, "raw export")
}
