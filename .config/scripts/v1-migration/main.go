package main

import (
	"fmt"
)

func main() {
	fmt.Println("Starting v1-migration script.")

	exportFirebaseToJSON()

	fmt.Println("\nv1-migration script complete.")
}
