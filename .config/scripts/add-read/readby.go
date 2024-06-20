package main

import (
	"context"
	"fmt"

	"github.com/mrewers/library/scripts/shared"
	"google.golang.org/api/iterator"
)

// getReadersReadBooks retrieves the list of ids representing all of the
// books read by the author with the provided id.
func getReadersReadBooks(id string) []string {
	var bookIds []string

	ctx := context.Background()

	// Connect to the database.
	client, err := shared.ConnectToFirestore(ctx)

	if err != nil {
		fmt.Println(err.Error())
		return bookIds
	}

	defer client.Close()

	// Filter results by those that are include the reader's id in their readBy list.
	iter := client.Collection("books").Where("readBy", "array-contains", id).Documents(ctx)

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			fmt.Println(err.Error())
			continue
		}

		bookIds = append(bookIds, doc.Ref.ID)
	}

	return bookIds
}

// convertToReadList changes a simple list of book ids into a list of items,
// each of which has an id property with the given id.
func convertToReadList(bookIds []string) []map[string]interface{} {
	var readList []map[string]interface{}

	for _, bookId := range bookIds {
		item := map[string]interface{}{
			"id": bookId,
		}

		readList = append(readList, item)
	}

	return readList
}
