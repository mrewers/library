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

	fmt.Println("\nv1-migration script complete.")
}
