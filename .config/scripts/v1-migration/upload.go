package main

import (
	"context"
	"fmt"
	"os"

	"cloud.google.com/go/firestore"
	"github.com/joho/godotenv"
)

// loadEnvFile loads the contents of the .env file in this directory into the environment.
func loadEnvFile() {
	err := godotenv.Load()

	if err != nil {
		fmt.Println(err.Error())
		return
	}
}

// connectToFirestore creates a new Firestore client to interact with the database.
func connectToFirestore(ctx context.Context) (*firestore.Client, error) {
	loadEnvFile()

	projectId := os.Getenv("PROJECT_ID")
	db_name := os.Getenv("FIRESTORE_DB_NAME")

	client, err := firestore.NewClientWithDatabase(ctx, projectId, db_name)

	if err != nil {
		fmt.Println(err.Error())
	}

	return client, err
}
