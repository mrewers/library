package deletebook

import (
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

// deleteBook retrieves a book id from the request query
// parameters and deletes that book from the database.
func deleteBook(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()

	utils.SetCorsHeaders(w, r)

	id := params.Get("id")

	if id == "" {
		log.Print("Error retrieving readers")
		utils.SendResponse("Delete failed", w)
	}

	err := utils.RemoveBook(id)

	if err != nil {
		log.Print("Error retrieving readers")
	}

	utils.SendResponse("Success", w)
}

func init() {
	functions.HTTP("DeleteBook", deleteBook)
}
