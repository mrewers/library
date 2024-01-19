package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"cloud.google.com/go/firestore"
)

func getBooks() []*firestore.DocumentSnapshot {
	ctx := context.Background()

	client, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		log.Print("Error connecting to firestore")
	}

	defer client.Close()

	books, err := client.GetAll(ctx, []*firestore.DocumentRef{client.Doc("Books")})

	if err != nil {
		log.Print("Error retrieving books")
	}

	return books
}

func main() {
	books := getBooks()

	fmt.Print(books)
}
