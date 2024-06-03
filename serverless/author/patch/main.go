package updateauthor

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func prepAuthorUpdates(author utils.Author) []firestore.Update {
	var updates []firestore.Update

	if author.Books != nil {
		update := utils.FirestorePrepUpdate("books", author.Books)
		updates = append(updates, update)
	} else {
		fmt.Println("NO BOOKS")
	}

	if author.NameFirst != "" {
		update := utils.FirestorePrepUpdate("nameFirst", author.NameFirst)
		updates = append(updates, update)
	}

	if author.NameLast != "" {
		update := utils.FirestorePrepUpdate("nameLAst", author.NameLast)
		updates = append(updates, update)
	}

	return updates
}

func patchAuthor(w http.ResponseWriter, r *http.Request) {
	utils.SetCorsHeaders(w, r)

	// Determine which author to update.
	params := r.URL.Query()

	id := params.Get("id")

	if id == "" {
		log.Print("Error retrieving author id")
		utils.SendResponse("No id provided", w)
	}

	// Parse the updates.
	var body utils.Author

	err := json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		log.Print("Error decoding request body.")
		log.Print(err.Error())
		utils.SendResponse("Unable to decode body.", w)
		return
	}

	err = utils.UpdateAuthor(id, prepAuthorUpdates(body))

	if err != nil {
		log.Printf("Failed to update author - %s.", id)
		log.Print(err.Error())
		utils.SendResponse("Failed to update.", w)
		return
	}

	utils.SendResponse("Success", w)
}

func init() {
	functions.HTTP("PatchAuthor", patchAuthor)
}
