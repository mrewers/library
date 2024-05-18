package utils

import (
	"log"
	"time"
)

type Reader struct {
	Color        string `json:"color,omitempty"`
	Name         string `json:"name,omitempty"`
	DateCreated  string `json:"dateCreated,omitempty"`
	DateModified string `json:"dateModified,omitempty"`
	TempId       string `json:"tempId,omitempty"`
}

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
