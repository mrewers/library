package main

import "fmt"

func isSyncDesired() bool {
	var sync string

	fmt.Print("\nSync functions to Google Cloud Storage? (y/n, default - y) ")
	fmt.Scanln(&sync)

	if sync == "" || sync == "y" || sync == "Y" {
		return true
	}

	return false
}

func getEnvInputs() (string, string) {
	var env string
	var project string

	fmt.Print("Enter GCP project name: ")
	fmt.Scanln(&project)

	fmt.Print("Enter deployment environment (default - dev): ")
	fmt.Scanln(&env)

	if env == "" {
		env = "dev"
	}

	return env, project
}
