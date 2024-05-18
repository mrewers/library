package getbooks

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func getBooks(w http.ResponseWriter, r *http.Request) {
	books, err := utils.FirestoreGetAll("books")

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error retrieving books")
	}

	fmt.Fprint(w, books)
}

func init() {
	functions.HTTP("GetBooks", getBooks)
}
