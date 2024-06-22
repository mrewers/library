package main

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	"github.com/mrewers/library/scripts/shared"
	"github.com/mrewers/library/serverless/utils"

	"google.golang.org/api/iterator"
)

func main() {
	fmt.Println("Starting script to add format to all books.")

	ctx := context.Background()

	// Connect to the database.
	client, err := shared.ConnectToFirestore(ctx)

	if err != nil {
		fmt.Println(err.Error())
	}

	defer client.Close()

	// Get a list of ids for all the books in the database.
	fmt.Println("\nRetrieving books...")

	iter := client.Collection("books").Select().Documents(ctx)

	var books []string

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			fmt.Println(err.Error())
		}

		books = append(books, doc.Ref.ID)
	}

	// Keep track of any books that error when adding a format.
	var erroredOut []string

	// Add format to each of the books.
	fmt.Println("\nUpdating each book with 'print' format type.")

	for _, id := range books {
		updates := []firestore.Update{
			utils.FirestorePrepUpdate("format.type", "print"),
		}

		_, err = client.Collection("books").Doc(id).Update(ctx, updates)

		if err != nil {
			log.Println(err.Error())
			erroredOut = append(erroredOut, id)
		}
	}

	if erroredOut == nil {
		fmt.Println("\nThe following books failed to update:")

		fmt.Println(erroredOut)
	}

	fmt.Println("\nAdd format script complete.")
}
