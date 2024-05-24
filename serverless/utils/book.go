package utils

import (
	"log"
	"time"

	"cloud.google.com/go/firestore"
)

type Book struct {
	DateAcquired string     `json:"dateAcquired,omitempty"`
	DateCreated  string     `json:"dateCreated,omitempty"`
	DateModified string     `json:"dateModified,omitempty"`
	DateRestored *time.Time `json:"dateRestored,omitempty"`
	DateRetired  *time.Time `json:"dateRetired,omitempty"`
	ReadBy       []string   `json:"readBy,omitempty"`
	Retired      *bool      `json:"retired,omitempty"`
	Title        string     `json:"title,omitempty"`
}

// AddBook creates a Firestore document corresponding to the given Book.
func (b Book) AddBook() string {
	ts := time.Now()

	doc := map[string]interface{}{
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
	var acquired time.Time

	// Convert the provided acquisition date into a timestamp.
	da, err := time.Parse("2006-01-02", b.DateAcquired)

	if err != nil {
		log.Println(err.Error())
		acquired = time.Now()
	} else {
		acquired = da
	}

	return acquired
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
