package getbooks

import (
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func getBooks(w http.ResponseWriter, r *http.Request) {
	books, err := utils.FirestoreGetAll("books", "title")

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error retrieving books")
	}

	utils.SendResponse(books, w)
}

func init() {
	functions.HTTP("GetBooks", getBooks)
}
