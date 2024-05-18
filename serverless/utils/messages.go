package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func SendResponse(data any, w http.ResponseWriter) {
	body := map[string]interface{}{
		"data": data,
	}

	encoded, err := json.Marshal(body)

	if err != nil {
		log.Print("Error encoding response")
	}

	fmt.Fprint(w, string(encoded))
}
