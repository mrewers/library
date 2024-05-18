package addreaders

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

type readersBody struct {
	Readers []utils.Reader `json:"readers,omitempty"`
}

type ReaderIds struct {
	Tmp string
	Id  string
}

func postReaders(w http.ResponseWriter, r *http.Request) {
	var body readersBody

	err := json.NewDecoder(r.Body).Decode(&body)

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error decoding request body.")
		fmt.Fprint(w, "Unable to decode body.")
		return
	}

	var readers []map[string]interface{}

	for _, reader := range body.Readers {
		tmp := reader.TempId
		id := reader.AddReader()

		ids := map[string]interface{}{
			"tmp": tmp,
			"id":  id,
		}

		readers = append(readers, ids)
	}

	utils.SendResponse(readers, w)
}

func init() {
	functions.HTTP("PostReaders", postReaders)
}
