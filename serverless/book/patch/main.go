package updatebook

import (
	"encoding/json"
	"log"
	"net/http"
	"slices"

	"cloud.google.com/go/firestore"
	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func prepBookUpdates(book utils.Book, id string) []firestore.Update {
	var updates []firestore.Update

	if book.Author != nil {
		update := utils.FirestorePrepUpdate("author", book.Author)
		updates = append(updates, update)
	}

	if book.DateAcquired != "" {
		update := utils.FirestorePrepUpdate("dateAcquired", book.NormalizeDate())
		updates = append(updates, update)
	}

	if book.DateRestored != "" {
		update := utils.FirestorePrepUpdate("dateRestored", book.DateRestored)
		updates = append(updates, update)
	}

	if book.DateRetired != "" {
		update := utils.FirestorePrepUpdate("dateRetired", book.DateRetired)
		updates = append(updates, update)
	}

	if book.Title != "" {
		update := utils.FirestorePrepUpdate("title", book.Title)
		updates = append(updates, update)
	}

	if book.ReadBy != nil {
		update := utils.FirestorePrepUpdate("readBy", book.ReadBy)
		updates = append(updates, update)

		readersUpdated, err := getReaderDiff(id, book.ReadBy)

		if err == nil {
			for _, r := range readersUpdated {
				utils.UpdateReadersBooks(r, id)
			}
		} else {
			log.Print("Unable to get reader diff")
		}
	}

	if book.Retired != nil {
		update := utils.FirestorePrepUpdate("retired", book.Retired)
		updates = append(updates, update)
	}

	return updates
}

// getReaderDiff accepts a book id value and an updated list of ids for readers who have read the book.
// Using this information, it retrieves a list of readers who should be added/removed from the readBy list.
func getReaderDiff(id string, updated []string) ([]string, error) {
	var diff []string

	book, err := utils.GetBook(id)

	if err != nil {
		log.Print(err.Error())
		return diff, err
	}

	current := book.ReadBy

	// Find the removed readers (those in the current list missing from the updated list)
	for _, r := range current {
		if !slices.Contains(updated, r) {
			diff = append(diff, r)
		}
	}

	// Find the added readers (those in the updated list missing from the current list)
	for _, r := range updated {
		if !slices.Contains(current, r) {
			diff = append(diff, r)
		}
	}

	return diff, err
}

// patchBook updates an existing book with the provided data.
func patchBook(w http.ResponseWriter, r *http.Request) {
	utils.SetCorsHeaders(w, r)

	// Determine which book to update.
	params := r.URL.Query()

	id := params.Get("id")

	if id == "" {
		log.Print("Error retrieving book")
		utils.SendResponse("No id provided", w)
	}

	// Parse the updates.
	var body utils.Book

	err := json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		log.Print("Error decoding request body.")
		log.Print(err.Error())
		utils.SendResponse("Unable to decode body.", w)
		return
	}

	err = utils.UpdateBook(id, prepBookUpdates(body, id))

	if err != nil {
		log.Printf("Failed to update book - %s.", id)
		log.Print(err.Error())
		utils.SendResponse("Failed to update.", w)
		return
	}

	utils.SendResponse("Success", w)
}

func init() {
	functions.HTTP("PatchBook", patchBook)
}
