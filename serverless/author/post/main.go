package addauthor

import (
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func postAuthor(w http.ResponseWriter, r *http.Request) {
	var body utils.Author

	err := json.NewDecoder(r.Body).Decode(&body)

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error decoding request body.")
		log.Print(err.Error())
		utils.SendResponse("Unable to decode body.", w)
		return
	}

	id := body.AddAuthor()

	utils.SendResponse(
		map[string]interface{}{"id": id},
		w,
	)
}

func init() {
	functions.HTTP("PostAuthor", postAuthor)
}
