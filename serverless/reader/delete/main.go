package deletereader

import (
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

// deleteReader retrieves a reader id from the request query
// parameters and deletes that reader from the database.
func deleteReader(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()

	utils.SetCorsHeaders(w, r)

	id := params.Get("id")

	if id == "" {
		log.Print("Error retrieving readers")
		utils.SendResponse("Delete failed", w)
	}

	err := utils.RemoveReader(id)

	if err != nil {
		log.Print("Error retrieving readers")
	}

	utils.SendResponse("Success", w)
}

func init() {
	functions.HTTP("DeleteReader", deleteReader)
}
