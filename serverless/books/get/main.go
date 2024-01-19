package getbooks

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/firestore"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func getBooks(w http.ResponseWriter, r *http.Request) {
	var books []*firestore.DocumentSnapshot

	ctx := context.Background()

	client, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		log.Print("Error connecting to firestore")
		fmt.Fprint(w, "Failed to connect to firestore")
		return
	}

	defer client.Close()

	books, err = client.GetAll(ctx, []*firestore.DocumentRef{client.Doc("Books")})

	if err != nil {
		log.Print("Error retrieving books")
		fmt.Fprint(w, "Unable to retrieve books")
		return
	}

	fmt.Fprint(w, books)
}

func init() {
	functions.HTTP("GetBooks", getBooks)
}
