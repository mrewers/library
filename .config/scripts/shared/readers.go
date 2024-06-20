package shared

import (
	"context"
	"fmt"

	"google.golang.org/api/iterator"
)

type ReaderListItem struct {
	Id   string
	Name string
}

// GetReaders retrieves a list of readers from the database.
func GetReaders() []ReaderListItem {
	var readers []ReaderListItem

	ctx := context.Background()

	// Connect to the database.
	client, err := ConnectToFirestore(ctx)

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
