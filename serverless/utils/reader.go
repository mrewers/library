package utils

import (
	"encoding/json"
	"log"
	"slices"
	"time"

	"cloud.google.com/go/firestore"
)

type Read struct {
	Id       string `json:"id,omitempty"`
	DateRead string `json:"dateRead,omitempty"`
}

type Reader struct {
	Id           string `json:"id,omitempty"`
	Color        string `json:"color,omitempty"`
	Name         string `json:"name,omitempty"`
	DateCreated  string `json:"dateCreated,omitempty"`
	DateModified string `json:"dateModified,omitempty"`
	Read         []Read `json:"read,omitempty"`
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

func (r Reader) AddReadBook(id string) {
	readList, currentIds := formatReadLists(r.Read)

	// Abort if the book has already been added.
	if slices.Contains(currentIds, id) {
		return
	}

	newItem := map[string]interface{}{
		"id":       id,
		"dateRead": time.Now(),
	}

	readList = append(readList, newItem)

	updates := []firestore.Update{
		FirestorePrepUpdate("read", readList),
	}

	err := UpdateReader(r.Id, updates)

	if err != nil {
		log.Println(err.Error())
	}
}

func (r Reader) RemoveReadBook(id string) {
	_, currentIds := formatReadLists(r.Read)

	// Abort if the book not added.
	if !slices.Contains(currentIds, id) {
		return
	}

	var updatedList []Read

	for _, book := range r.Read {
		if book.Id != id {
			updatedList = append(updatedList, book)
		}
	}

	mapped, _ := formatReadLists(updatedList)

	updates := []firestore.Update{
		FirestorePrepUpdate("read", mapped),
	}

	err := UpdateReader(r.Id, updates)

	if err != nil {
		log.Println(err.Error())
	}
}

func formatReadLists(read []Read) ([]map[string]interface{}, []string) {
	var mapped []map[string]interface{}
	var ids []string

	for _, book := range read {
		ids = append(ids, book.Id)

		item := map[string]interface{}{
			"id":       book.Id,
			"dateRead": book.DateRead,
		}

		mapped = append(mapped, item)
	}

	return mapped, ids
}

// GetReader retrieves the reader with the specified id from the Firestore database.
func GetReader(id string) (Reader, error) {
	var reader Reader

	doc, err := FirestoreGetOne(id, "readers")

	if err != nil {
		log.Println(err.Error())
		return reader, err
	}

	bytes, err := json.Marshal(doc)

	if err != nil {
		log.Println(err.Error())
		return reader, err
	}

	json.Unmarshal(bytes, &reader)

	return reader, err
}

// RemoveReader deletes the reader at the specified id from the Firestore database.
func RemoveReader(id string) error {
	err := firestoreDeleteDocument(id, "readers")

	if err != nil {
		log.Println(err.Error())
	}

	// TODO on delete remove reader from all books readBy field.

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

// UpdateReadersBooks checks if the provided book is in the reader's books list.
// If so it removes it, if not it adds it.
func UpdateReadersBooks(id string, bookId string) {
	reader, err := GetReader(id)

	if err != nil {
		log.Print(err.Error())
		return
	}

	_, currentIds := formatReadLists(reader.Read)

	if slices.Contains(currentIds, bookId) {
		reader.RemoveReadBook(bookId)
	} else {
		reader.AddReadBook(bookId)
	}
}
