package utils

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/firestore"
)

// openFirestoreConn connects to the Firestore database.
func openFirestoreConn(ctx context.Context) (*firestore.Client, error) {
	var client *firestore.Client
	var err error

	client, err = firestore.NewClientWithDatabase(
		ctx,
		os.Getenv("PROJECT_ID"),
		os.Getenv("FIRESTORE_DB_NAME"),
	)

	if err != nil {
		return nil, err
	}

	return client, nil
}

// FirestoreGetAll retrieves all the items from the provided collection.
func FirestoreGetAll(collection string) ([]*firestore.DocumentSnapshot, error) {
	var docs []*firestore.DocumentSnapshot

	ctx := context.Background()

	client, err := openFirestoreConn(ctx)

	if err != nil {
		panic(err.Error())
	}

	defer client.Close()

	docs, err = client.GetAll(ctx, []*firestore.DocumentRef{client.Doc(collection)})

	return docs, err
}

func firestoreCreateDocument(doc map[string]interface{}, col string) (string, error) {
	var id string

	ctx := context.Background()

	client, err := openFirestoreConn(ctx)

	if err != nil {
		log.Println(err.Error())
		return id, err
	}

	defer client.Close()

	ref, _, err := client.Collection(col).Add(ctx, doc)

	if err != nil {
		log.Println(err.Error())
		return id, err
	}

	return ref.ID, nil
}
