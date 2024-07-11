package main

import "fmt"

func main() {
	// Get the list of available Cloud Functions.
	funcs := getFuncs()

	for _, f := range funcs {
		prepForBuild(f)
		buildZip(f)
	}

	// Upload zips to the GCS if so desired.
	if isSyncDesired() {
		env, project := getEnvInputs()

		syncZips(project, env)
	}

	fmt.Println("\nAll done!")
}
