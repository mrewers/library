package getreaders

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/firestore"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func getReaders(w http.ResponseWriter, r *http.Request) {
	var readers []*firestore.DocumentSnapshot

	ctx := context.Background()

	client, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		log.Print("Error connecting to firestore")
		fmt.Fprint(w, "Failed to connect to firestore")
		return
	}

	defer client.Close()

	readers, err = client.GetAll(ctx, []*firestore.DocumentRef{client.Doc("Readers")})

	if err != nil {
		log.Print("Error retrieving readers")
		fmt.Fprint(w, "Unable to retrieve readers")
		return
	}

	fmt.Fprint(w, readers)
}

func init() {
	functions.HTTP("GetReaders", getReaders)
}
