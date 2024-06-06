package main

import (
	"context"
	"fmt"

	"google.golang.org/api/iterator"
)

type ReaderListItem struct {
	Id   string
	Name string
}

func getReaders() []ReaderListItem {
	var readers []ReaderListItem

	ctx := context.Background()

	// Connect to the database.
	client, err := connectToFirestore(ctx)

	if err != nil {
		fmt.Println(err.Error())
		return readers
	}

	defer client.Close()

	iter := client.Collection("readers").Documents(ctx)

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			fmt.Println(err.Error())
			continue
		}

		// Extract the document data and id.
		data := doc.Data()

		reader := ReaderListItem{
			Id:   doc.Ref.ID,
			Name: data["name"].(string),
		}

		readers = append(readers, reader)
	}

	return readers
}
