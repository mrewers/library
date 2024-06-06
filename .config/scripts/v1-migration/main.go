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

	// Save the transformed v1 data to the v2 Firestore database.
	uploadAuthors()
	uploadBooks()
	updateAuthorsWithBookIds()

	fmt.Println("\n\nv1-migration script complete!")
}
