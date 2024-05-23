package utils

import (
	"log"
	"time"

	"cloud.google.com/go/firestore"
)

type Reader struct {
	Id           string `json:"id,omitempty"`
	Color        string `json:"color,omitempty"`
	Name         string `json:"name,omitempty"`
	DateCreated  string `json:"dateCreated,omitempty"`
	DateModified string `json:"dateModified,omitempty"`
	TempId       string `json:"tempId,omitempty"`
}

type ReadersBody struct {
	Readers []Reader `json:"readers,omitempty"`
}

// AddReader creates a new reader document in the Firestore database.
func (r Reader) AddReader() string {
	var id string

	ts := time.Now()

	doc := map[string]interface{}{
		"dateCreated":  ts,
		"dateModified": ts,
		"name":         r.Name,
		"color":        r.Color,
	}

	id, err := firestoreCreateDocument(doc, "readers")

	if err != nil {
		log.Println(err.Error())
	}

	return id
}

// RemoveReader deletes the reader at the specified id from the Firestore database.
func RemoveReader(id string) error {
	err := firestoreDeleteDocument(id, "readers")

	if err != nil {
		log.Println(err.Error())
	}

	return err
}

// UpdateReader incrementally updates the reader at the specified id with the provided values.
func UpdateReader(id string, updates []firestore.Update) error {
	err := firestoreUpdateDocument(id, updates, "readers")

	if err != nil {
		log.Println(err.Error())
	}

	return err
}
