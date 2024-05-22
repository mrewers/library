package initialize

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/firestore"
	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func checkForRequiredCollections(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	client, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		log.Print("Error connecting to firestore")
		return
	}

	iter := client.Collections(ctx)

	cols, err := iter.GetAll()

	if err != nil {
		log.Print("Error retrieving collections")
		return
	}

	var ids []string

	for _, col := range cols {
		ids = append(ids, col.ID)
	}

	fmt.Println(ids)
}

func init() {
	functions.HTTP("Init", checkForRequiredCollections)
}
