package utils

import (
	"context"
	"os"

	"cloud.google.com/go/firestore"
)

func FirestoreGetAll(collection string) ([]*firestore.DocumentSnapshot, error) {
	var docs []*firestore.DocumentSnapshot

	ctx := context.Background()

	client, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		return docs, err
	}

	defer client.Close()

	docs, err = client.GetAll(ctx, []*firestore.DocumentRef{client.Doc(collection)})

	return docs, err
}
