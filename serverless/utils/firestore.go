package utils

import (
	"context"
	"log"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
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

func FirestorePrepUpdate(path string, value interface{}) firestore.Update {
	return firestore.Update{
		Path:  path,
		Value: value,
	}
}

// FirestoreGetAll retrieves all the items from the provided collection.
func FirestoreGetAll(collection string, order string) ([]map[string]interface{}, error) {
	var docs []map[string]interface{}

	ctx := context.Background()

	client, err := openFirestoreConn(ctx)

	if err != nil {
		log.Println(err.Error())
		return docs, err
	}

	defer client.Close()

	iter := client.Collection(collection).OrderBy(order, firestore.Asc).Documents(ctx)

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Println(err.Error())
			return docs, err
		}

		// Extract the document data and append the document id.
		data := doc.Data()
		data["id"] = doc.Ref.ID

		docs = append(docs, data)
	}

	return docs, err
}

// firestoreCreateDocument creates a new document in the specified Firestore collection.
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

// firestoreDeleteDocument delete the document with the
// specified id from the specified Firestore collection.
func firestoreDeleteDocument(id string, col string) error {
	var err error

	ctx := context.Background()

	client, err := openFirestoreConn(ctx)

	if err != nil {
		log.Println(err.Error())
		return err
	}

	defer client.Close()

	_, err = client.Collection(col).Doc(id).Delete(ctx)

	if err != nil {
		log.Println(err.Error())
	}

	return err
}

// firestoreUpdateDocument completes an incremental update of the document
// with the specified id in the specified Firestore collection.
func firestoreUpdateDocument(id string, updates []firestore.Update, col string) error {
	ctx := context.Background()

	client, err := openFirestoreConn(ctx)

	if err != nil {
		log.Println(err.Error())
		return err
	}

	defer client.Close()

	// Appended a modified timestamp to the list of updates.
	modified := FirestorePrepUpdate("dateModified", time.Now())

	updates = append(updates, modified)

	_, err = client.Collection(col).Doc(id).Update(ctx, updates)

	if err != nil {
		log.Println(err.Error())
		return err
	}

	return nil
}
