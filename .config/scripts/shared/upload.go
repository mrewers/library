package shared

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

// ConnectToFirestore creates a new Firestore client to interact with the database.
// In order to connect successfully, this function expects to find a .env file in the root
// directory of the script. This file should define the following environment variables:
//   - PROJECT_ID: Name of the Google Cloud Storage project where the application resides.
//   - FIRESTORE_DB_NAME: Name of the database where the application data is stored.
func ConnectToFirestore(ctx context.Context) (*firestore.Client, error) {
	loadEnvFile()

	projectId := os.Getenv("PROJECT_ID")
	db_name := os.Getenv("FIRESTORE_DB_NAME")

	client, err := firestore.NewClientWithDatabase(ctx, projectId, db_name)

	if err != nil {
		fmt.Println(err.Error())
	}

	return client, err
}
