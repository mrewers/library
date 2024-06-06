package utils

import (
	"fmt"
	"log"
	"time"

	"cloud.google.com/go/firestore"
)

type Author struct {
	Books        []string  `json:"books,omitempty"`
	NameFirst    string    `json:"nameFirst,omitempty"`
	NameFull     string    `json:"nameFull,omitempty"`
	NameLast     string    `json:"nameLast,omitempty"`
	DateCreated  time.Time `json:"dateCreated,omitempty"`
	DateModified time.Time `json:"dateModified,omitempty"`
}

func (a Author) AddAuthor() string {
	var id string

	ts := time.Now()

	doc := map[string]interface{}{
		"books":        a.Books,
		"dateCreated":  ts,
		"dateModified": ts,
		"nameFirst":    a.NameFirst,
		"nameLast":     a.NameLast,
	}

	id, err := firestoreCreateDocument(doc, "authors")

	if err != nil {
		log.Println(err.Error())
	}

	return id
}

func (a Author) FullName() string {
	first := ""
	last := ""

	if a.NameFirst != "" {
		first = a.NameFirst
	}

	if a.NameLast != "" {
		last = fmt.Sprintf(" %s", a.NameLast)
	}

	return first + last
}

// UpdateAuthor incrementally updates the author at the specified id with the provided values.
func UpdateAuthor(id string, updates []firestore.Update) error {
	err := firestoreUpdateDocument(id, updates, "authors")

	if err != nil {
		log.Println(err.Error())
	}

	return err
}
