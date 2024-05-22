package getreaders

import (
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func getReaders(w http.ResponseWriter, r *http.Request) {
	readers, err := utils.FirestoreGetAll("readers", "name")

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error retrieving readers")
	}

	utils.SendResponse(readers, w)
}

func init() {
	functions.HTTP("GetReaders", getReaders)
}
