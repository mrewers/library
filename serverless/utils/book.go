package utils

import (
	"log"
	"time"
)

type Book struct {
	DateAcquired string `json:"dateAcquired,omitempty"`
	DateCreated  string `json:"dateCreated,omitempty"`
	DateModified string `json:"dateModified,omitempty"`
	Retired      bool   `json:"retired,omitempty"`
	Title        string `json:"title,omitempty"`
}

// AddBook creates a Firestore document corresponding to the given Book.
func (b Book) AddBook() string {
	var acquired time.Time

	ts := time.Now()

	// Convert the provided acquisition date into a timestamp.
	da, err := time.Parse("2006-01-02", b.DateAcquired)

	if err != nil {
		log.Println(err.Error())
		acquired = ts
	} else {
		acquired = da
	}

	doc := map[string]interface{}{
		"dateAcquired": acquired,
		"dateCreated":  ts,
		"dateModified": ts,
		"retired":      b.Retired,
		"title":        b.Title,
	}

	id, err := firestoreCreateDocument(doc, "books")

	if err != nil {
		log.Println(err.Error())
	}

	return id
}
