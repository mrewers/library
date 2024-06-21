package utils

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type Book struct {
	Author       []string `json:"author,omitempty"`
	DateAcquired string   `json:"dateAcquired,omitempty"`
	DateCreated  string   `json:"dateCreated,omitempty"`
	DateModified string   `json:"dateModified,omitempty"`
	DateRestored string   `json:"dateRestored,omitempty"`
	DateRetired  string   `json:"dateRetired,omitempty"`
	ReadBy       []string `json:"readBy,omitempty"`
	Retired      *bool    `json:"retired,omitempty"`
	Title        string   `json:"title,omitempty"`
}

// AddBook creates a Firestore document corresponding to the given Book.
func (b Book) AddBook() string {
	ts := time.Now()

	doc := map[string]interface{}{
		"author":       b.Author,
		"dateAcquired": b.NormalizeDate(),
		"dateCreated":  ts,
		"dateModified": ts,
		"readBy":       b.ReadBy,
		"retired":      b.Retired,
		"title":        b.Title,
	}

	id, err := firestoreCreateDocument(doc, "books")

	if err != nil {
		log.Println(err.Error())
	}

	return id
}

// NormalizeDate converts the book's acquired date to from the YYYY-MM-DD
// format used by the client into a time.Time representation.
func (b Book) NormalizeDate() time.Time {
	return ConvertStringToTime(b.DateAcquired)
}

// GetBook retrieves the book with the specified id from the Firestore database.
func GetBook(id string) (Book, error) {
	var book Book

	doc, err := FirestoreGetOne(id, "books")

	if err != nil {
		log.Println(err.Error())
		return book, err
	}

	bytes, err := json.Marshal(doc)

	if err != nil {
		log.Println(err.Error())
		return book, err
	}

	json.Unmarshal(bytes, &book)

	return book, err
}

// GetBooksReadBy retrieves a list of ids representing the
// books the user has with the provided id has read.
func GetBooksReadBy(id string) ([]string, error) {
	var books []string

	ctx := context.Background()

	client, err := openFirestoreConn(ctx)

	if err != nil {
		log.Println(err.Error())
		return books, err
	}

	defer client.Close()

	iter := client.Collection("books").Where("readBy", "array-contains", id).Documents(ctx)

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Println(err.Error())
			return books, err
		}

		books = append(books, doc.Ref.ID)
	}

	return books, err
}

// RemoveBook deletes the book at the specified id from the Firestore database.
func RemoveBook(id string) error {
	err := firestoreDeleteDocument(id, "books")

	if err != nil {
		log.Println(err.Error())
	}

	return err
}

// UpdateBook incrementally updates the book at the specified id with the provided values.
func UpdateBook(id string, updates []firestore.Update) error {
	err := firestoreUpdateDocument(id, updates, "books")

	if err != nil {
		log.Println(err.Error())
	}

	return err
}
