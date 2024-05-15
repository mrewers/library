package getreaders

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func getReaders(w http.ResponseWriter, r *http.Request) {
	readers, err := utils.FirestoreGetAll("readers")

	if err != nil {
		log.Print("Error retrieving readers")
		fmt.Fprint(w, "Unable to retrieve readers")
		return
	}

	fmt.Fprint(w, readers)
}

func init() {
	functions.HTTP("GetReaders", getReaders)
}
