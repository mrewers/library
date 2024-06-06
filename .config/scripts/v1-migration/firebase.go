package main

import (
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// openFirebaseConn uses a Firebase service account credentials to connect to the original
// Firestore database for v1 of the application. The credentials should be provided as a
// JSON file called serviceAccountKey-v1.json in this package's directory.
func openFirebaseConn(ctx context.Context) (*firestore.Client, error) {
	opt := option.WithCredentialsFile("./serviceAccountKey-v1.json")

	app, err := firebase.NewApp(ctx, nil, opt)

	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	client, err := app.Firestore(ctx)

	if err != nil {
		return nil, fmt.Errorf("error initializing client: %v", err)
	}

	return client, nil
}

// getAllFromCollection retrieves all the documents from a specified collection.
func getAllFromCollection(collection string) ([]map[string]interface{}, error) {
	var docs []map[string]interface{}

	ctx := context.Background()

	fmt.Println("\nInitializing Firestore client...")

	client, err := openFirebaseConn(ctx)

	if err != nil {
		fmt.Println(err.Error())
		return docs, err
	}

	defer client.Close()

	fmt.Printf("\nRetrieving all documents from the collection '%s'", collection)

	iter := client.Collection(collection).Documents(ctx)

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			fmt.Println(err.Error())
			return docs, err
		}

		// Extract the document data and append the document id.
		data := doc.Data()
		data["id"] = doc.Ref.ID

		docs = append(docs, data)
	}

	return docs, err
}
