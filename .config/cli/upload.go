package main

import (
	"fmt"
	"os/exec"
)

func syncZips(project string, env string) {
	bucket := fmt.Sprintf("gs://%s-deployments/functions/%s", project, env)

	fmt.Printf("\nSyncing zip files to %s\n", bucket)

	rsync := exec.Command("gsutil", "-m", "rsync", "-d", "-x", ".gitkeep", outDir, bucket)

	execute(rsync)
}
