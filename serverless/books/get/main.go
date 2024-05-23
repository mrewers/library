package getbooks

import (
	"log"
	"net/http"
	"time"

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

	var normalized []map[string]interface{}

	for _, book := range books {
		if book["dateAcquired"] != nil {
			book["dateAcquired"] = book["dateAcquired"].(time.Time).Format("2006-01-02")
		}

		normalized = append(normalized, book)
	}

	utils.SendResponse(normalized, w)
}

func init() {
	functions.HTTP("GetBooks", getBooks)
}
