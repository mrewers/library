package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/mrewers/library/serverless/utils"
)

type AuthorListItem struct {
	Id   string
	Data utils.Author
}

const (
	authorIdFile = "data/author-ids.json"
)

// readInAuthorList gets the de-duplicated list of authors from the file authors-deduped.json.
func readInAuthorList() ([]utils.Author, error) {
	var authors []utils.Author

	contents, err := os.ReadFile(deDupAuthorFile)

	if err != nil {
		fmt.Println(err.Error())
		return authors, err
	}

	err = json.Unmarshal(contents, &authors)

	if err != nil {
		fmt.Println(err.Error())
	}

	return authors, err
}

// uploadAuthors iterates over the list of authors uploading each to
// Firestore and saving the id generated for each one in a new list.
func uploadAuthors() {
	authors, err := readInAuthorList()

	if err != nil {
		fmt.Printf("Failure reading the contents of %s", deDupAuthorFile)
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
			Id:   ref.ID,
			Data: full,
		})
	}

	writeDataFile(uploaded, authorIdFile, "authors with their ids")
}
