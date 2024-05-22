package updatereaders

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func putReaders(w http.ResponseWriter, r *http.Request) {
	var body utils.ReadersBody

	err := json.NewDecoder(r.Body).Decode(&body)

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error decoding request body.")
		utils.SendResponse("Unable to decode body.", w)
		return
	}

	for _, reader := range body.Readers {
		updates := []firestore.Update{
			utils.FirestorePrepUpdate("name", reader.Name),
			utils.FirestorePrepUpdate("color", reader.Color),
			utils.FirestorePrepUpdate("dateModified", time.Now()),
		}

		err = utils.UpdateReader(reader.Id, updates)

		if err != nil {
			log.Printf("Unable to update reader with the id %s.", reader.Id)
			utils.SendResponse("Unable to update reader.", w)
		}
	}

	utils.SendResponse("Success", w)
}

func init() {
	functions.HTTP("PutReaders", putReaders)
}
