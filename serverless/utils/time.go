package utils

import (
	"log"
	"time"
)

// ConvertStringToTime converts a date string in the YYYY-MM-DD format
// used by the client date picker into a time.Time type.
func ConvertStringToTime(s string) time.Time {
	var t time.Time

	// Convert the provided acquisition date into a timestamp.
	parsed, err := time.Parse("2006-01-02", s)

	if err != nil {
		log.Println(err.Error())
		t = time.Now()
	} else {
		t = parsed
	}

	return t
}
