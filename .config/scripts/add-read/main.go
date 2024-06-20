package main

import (
	"fmt"

	"cloud.google.com/go/firestore"
	"github.com/mrewers/library/scripts/shared"
	"github.com/mrewers/library/serverless/utils"
)

func main() {
	fmt.Println("Starting script to add read books to reader profiles.")

	// Get list of reader ids.
	fmt.Println("Retrieving readers...")

	readers := shared.GetReaders()

	// Get the list of books read for each reader
	for _, reader := range readers {
		fmt.Printf("\nRetrieving books read by %s...", reader.Name)

		ids := getReadersReadBooks(reader.Id)

		readList := convertToReadList(ids)

		fmt.Printf("\nUpload read books list for %s...", reader.Name)

		updates := []firestore.Update{
			utils.FirestorePrepUpdate("read", readList),
		}

		err := utils.UpdateReader(reader.Id, updates)

		if err != nil {
			fmt.Println(err.Error())
		}
	}

	fmt.Println("\nAdd read books script complete.")
}
