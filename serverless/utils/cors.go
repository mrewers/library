package utils

import (
	"net/http"
	"os"
)

// SetCorsHeaders prepares a response writer to send an API Gateway response
// by adding the HTTP headers required for Cross-Origin Resource Sharing.
//
// For more information see: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
func SetCorsHeaders(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ALLOWED_ORIGIN"))
		w.Header().Set("Access-Control-Allow-Methods", "GET,PATCH,POST,PUT,DELETE,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusNoContent)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ALLOWED_ORIGIN"))
}
