package main

import (
	"context"
	"fmt"
	"time"

	"github.com/mrewers/library/serverless/utils"
)

const (
	bookFinalFile = "data/books-final.json"
)

// prepBooksForUpload gets the books list ready for upload by replacing author name with author ids.
func prepBooksForUpload() {
	books, err := readInBookList(bookFile)

	if err != nil {
		fmt.Printf("Failure reading the contents of %s", bookFile)
		return
	}

	setAuthorIds(books)
}

// uploadBooks iterates over the list of books uploading each to
// Firestore and saving the id generated for each one in a new list.
func uploadBooks() {
	fmt.Println("\nUploading books to v2 database...")

	prepBooksForUpload()

	books, err := readInBookList(bookIdFile)

	if err != nil {
		fmt.Printf("Failure reading the contents of %s", bookIdFile)
		return
	}

	ctx := context.Background()

	// Connect to the database.
	client, err := connectToFirestore(ctx)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer client.Close()

	var uploaded []BookListItem

	for _, book := range books {

		// Prep data for a partial upload.
		data := map[string]interface{}{
			"dateAcquired": utils.ConvertStringToTime(book.Data.DateAcquired),
			"dateCreated":  utils.ConvertStringToTime(book.Data.DateCreated),
			"dateModified": time.Now(),
			"retired":      book.Data.Retired,
			"title":        book.Data.Title,
		}

		if book.Data.Author != nil {
			data["author"] = book.Data.Author
		} else {
			data["author"] = []string{}
		}

		if book.Data.ReadBy != nil {
			data["readBy"] = book.Data.ReadBy
		} else {
			data["readBy"] = []string{}
		}

		if *book.Data.Retired {
			data["dateRetired"] = utils.ConvertStringToTime(book.Data.DateRetired)
		}

		// Upload the data.
		ref, _, err := client.Collection("books").Add(ctx, data)

		if err != nil {
			fmt.Println(err.Error())
			fmt.Printf("Failed to save the book - %s", book.Data.Title)
			continue
		}

		// Replace the v1 id for this book with the v2 id.
		uploaded = append(uploaded, BookListItem{
			Id:   ref.ID,
			Data: book.Data,
		})
	}

	fmt.Println("\n\nBooks upload complete.")

	writeDataFile(uploaded, bookFinalFile, "uploaded books with their ids")
}
