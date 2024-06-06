package main

import (
	"fmt"
)

func main() {
	fmt.Println("Starting v1-migration script.")

	// Retrieve v1 data from Firebase.
	exportFirebaseToJSON()

	// Transform the v1 data for use with v2 of the application.
	parseExportFile()

	uploadAuthors()
	// Replace reader names with new ids
	// Add author ids to books -> books-ids.json
	// Upload books, getting an id for each -> books-final.json
	// Update author list with book ids -> authors-final.json
	// Update each author with its book ids

	fmt.Println("\nv1-migration script complete.")
}
