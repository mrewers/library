package main

import (
	"archive/zip"
	"fmt"
	"io"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

const (
	outDir = "./.config/terraform/zips"
)

// prepForBuild completes three steps necessary prior to zipping the function source code:
//  1. Remove the previous artifacts for this function.
//  2. Run `go mod tidy` to update function dependencies.
//  3. Run `go mod vendor` to bundle dependencies with the source files
func prepForBuild(data FuncData) {
	// Delete previous version of this function.
	clean := exec.Command("rm", "-f", fmt.Sprintf("%s.zip", data.Name))
	clean.Dir = outDir

	execute(clean)

	// Update module packages and dependencies.
	tidy := exec.Command("go", "mod", "tidy")
	tidy.Dir = data.getDir()

	execute(tidy)

	// Copy dependencies into a vendor directory.
	vendor := exec.Command("go", "mod", "vendor")
	vendor.Dir = data.getDir()
	vendor.Env = os.Environ()
	vendor.Env = append(vendor.Env, "GOWORK=off")

	execute(vendor)
}

func zipDir(dir string, writer *zip.Writer) error {
	walker := func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			return nil
		}

		file, err := os.Open(path)

		if err != nil {
			return err
		}

		defer file.Close()

		// Strip the leading directory name so that the root of the zip is the relevant dir.
		filename := strings.TrimPrefix(path, fmt.Sprintf("%s/", dir))

		f, err := writer.Create(filename)

		if err != nil {
			return err
		}

		_, err = io.Copy(f, file)

		if err != nil {
			return err
		}

		return nil
	}

	return filepath.WalkDir(dir, walker)
}

// buildZip generates a zip file from the contents of the function's directory.
func buildZip(data FuncData) {
	fmt.Printf("Building the cloud function: %s...", data.Name)

	dest := fmt.Sprintf("%s/%s.zip", outDir, data.Name)

	archive, err := os.Create(dest)

	if err != nil {
		panic(err)
	}

	defer archive.Close()

	writer := zip.NewWriter(archive)

	defer writer.Close()

	// Walk the directory adding each file to the zip.
	err = zipDir(data.getDir(), writer)

	if err != nil {
		panic(err)
	}

	fmt.Print("\u2705\n")
}
