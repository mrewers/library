package addauthor

import (
	"encoding/json"
	"fmt"
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
		fmt.Fprint(w, "Unable to decode body.")
		return
	}

	body.AddAuthor()

	fmt.Fprint(w, "book")
}

func init() {
	functions.HTTP("PostAuthor", postAuthor)
}
