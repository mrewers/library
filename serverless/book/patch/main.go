package updatebook

import (
	"encoding/json"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func prepUpdates(book utils.Book) []firestore.Update {
	var updates []firestore.Update

	if book.DateAcquired != "" {
		update := utils.FirestorePrepUpdate("dateAcquired", book.NormalizeDate())
		updates = append(updates, update)
	}

	if book.DateRestored != nil {
		update := utils.FirestorePrepUpdate("dateRestored", book.DateRestored)
		updates = append(updates, update)
	}

	if book.DateRetired != nil {
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
	}

	if book.Retired != nil {
		update := utils.FirestorePrepUpdate("retired", book.Retired)
		updates = append(updates, update)
	}

	return updates
}

func patchBook(w http.ResponseWriter, r *http.Request) {
	utils.SetCorsHeaders(w, r)

	// Determine which book to update.
	params := r.URL.Query()

	id := params.Get("id")

	if id == "" {
		log.Print("Error retrieving readers")
		utils.SendResponse("Not id provided", w)
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

	err = utils.UpdateBook(id, prepUpdates(body))

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
