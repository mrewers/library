package main

import (
	"encoding/json"
	"fmt"
	"os"
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
