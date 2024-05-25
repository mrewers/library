package getauthors

import (
	"log"
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func getAuthors(w http.ResponseWriter, r *http.Request) {
	authors, err := utils.FirestoreGetAll("authors", "nameFirst")

	utils.SetCorsHeaders(w, r)

	if err != nil {
		log.Print("Error retrieving authors")
	}

	var normalized []map[string]interface{}

	for _, author := range authors {
		last := ""
		first := ""

		if author["nameFirst"] != nil {
			first = author["nameFirst"].(string)
		}

		if author["nameLast"] != nil {
			last = " " + author["nameLast"].(string)
		}

		author["nameFull"] = first + last

		normalized = append(normalized, author)
	}

	utils.SendResponse(normalized, w)
}

func init() {
	functions.HTTP("GetAuthors", getAuthors)
}
