package main

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/mrewers/library/scripts/shared"
	"github.com/mrewers/library/serverless/utils"
)

type AuthorListItem struct {
	Id       string
	NameFull string
	Data     utils.Author
}

const (
	authorIdFile = "data/authors-ids.json"
)

// uploadAuthors iterates over the list of authors uploading each to
// Firestore and saving the id generated for each one in a new list.
func uploadAuthors() {
	fmt.Println("\nUploading authors to v2 database...")

	authors, err := readInAuthorList()

	if err != nil {
		fmt.Printf("\nFailure reading the contents of %s", deDupAuthorFile)
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

	var uploaded []AuthorListItem

	for _, author := range authors {
		ts := time.Now()

		// Prep data for a partial upload.
		partial := map[string]interface{}{
			"dateCreated":  ts,
			"dateModified": ts,
			"nameFirst":    author.NameFirst,
			"nameLast":     author.NameLast,
		}

		// Upload the data.
		ref, _, err := client.Collection("authors").Add(ctx, partial)

		if err != nil {
			fmt.Println(err.Error())
			fmt.Printf("Failed to save the author - %s", author.NameFull)
			continue
		}

		// Convert the partial data into a struct to construct the new list with ids.
		jsonString, err := json.Marshal(partial)

		if err != nil {
			fmt.Println(err.Error())
			continue
		}

		var full utils.Author

		err = json.Unmarshal(jsonString, &full)

		if err != nil {
			fmt.Println(err.Error())
			continue
		}

		full.Books = author.Books

		uploaded = append(uploaded, AuthorListItem{
			Id:       ref.ID,
			NameFull: author.NameFull,
			Data:     full,
		})
	}

	fmt.Println("\nAuthors upload complete.")

	writeDataFile(uploaded, authorIdFile, "uploaded authors with their ids")
}
