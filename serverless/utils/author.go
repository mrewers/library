package utils

import (
	"fmt"
	"log"
	"time"
)

type Author struct {
	NameFirst    string `json:"nameFirst,omitempty"`
	NameFull     string `json:"nameFull,omitempty"`
	NameLast     string `json:"nameLast,omitempty"`
	DateCreated  string `json:"dateCreated,omitempty"`
	DateModified string `json:"dateModified,omitempty"`
}

func (a Author) AddAuthor() string {
	var id string

	ts := time.Now()

	doc := map[string]interface{}{
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
