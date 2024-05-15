package utils

import (
	"log"
	"time"
)

type Book struct {
	DateAcquired string `json:"dateAcquired,omitempty"`
	DateCreated  string `json:"dateCreated,omitempty"`
	DateModified string `json:"dateModified,omitempty"`
	Title        string `json:"title,omitempty"`
}

// AddBook creates a Firestore document corresponding to the given Book.
func (b Book) AddBook() string {
	ts := time.Now()

	doc := map[string]interface{}{
		"dateAcquired": b.DateAcquired,
		"dateCreated":  ts,
		"dateModified": ts,
		"title":        b.Title,
	}

	id, err := firestoreCreateDocument(doc, "books")

	if err != nil {
		log.Println(err.Error())
	}

	return id
}
