package options

import (
	"net/http"

	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/mrewers/library/serverless/utils"
)

func options200(w http.ResponseWriter, r *http.Request) {
	utils.SetCorsHeaders(w, r)
}

func init() {
	functions.HTTP("Options200", options200)
}
