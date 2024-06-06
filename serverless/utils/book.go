package utils

import (
	"log"
	"time"

	"cloud.google.com/go/firestore"
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
