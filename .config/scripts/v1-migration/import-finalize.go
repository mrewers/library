package main

import (
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
	"github.com/mrewers/library/scripts/shared"

	"github.com/mrewers/library/serverless/utils"
)

const (
	authorFinalFile = "data/authors-final.json"
)

// updateAuthorsWithBookIds updates each author with its book ids.
func updateAuthorsWithBookIds() {
	fmt.Println("\nAdding book ids to author data...")

	// Get list of authors.
	authors, err := readInAuthorIdList()

	if err != nil {
		fmt.Printf("\nFailure reading the contents of %s", authorIdFile)
		return
	}

	// Get list of books.
	books, err := readInBookList(bookFinalFile)

	if err != nil {
		fmt.Printf("\nFailure reading the contents of %s", bookFinalFile)
		return
	}

	ctx := context.Background()

	// Connect to the database.
	client, err := shared.ConnectToFirestore(ctx)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer client.Close()

	var updated []AuthorListItem

	// Iterate through all authors in the list.
	for _, author := range authors {
		// The list of v2 book ids for a given author.
		var ids []string

		// For each author, iterate through their list of associated v1 book ids.
		for _, id := range author.Data.Books {

			// Match each v1 book id to a v2 book ids.
			for _, book := range books {
				if book.V1Id == id {
					ids = append(ids, book.Id)
				}
			}
		}

		// Swap out id arrays.
		author.Data.Books = ids

		//Save changes to the database
		update := utils.FirestorePrepUpdate("books", ids)

		// Convert the partial data into a struct to construct the new list with ids.
		_, err = client.Collection("authors").Doc(author.Id).Update(ctx, []firestore.Update{update})

		if err != nil {
			fmt.Printf("\nUnable to update author %s.", author.NameFull)
			fmt.Println(err.Error())
			return
		}

		updated = append(updated, author)
	}

	fmt.Println("\nAuthors update complete.")

	writeDataFile(updated, authorFinalFile, "authors with their associated books")
}
