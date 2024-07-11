package main

import (
	"fmt"
	"os/exec"
	"strings"
)

// execute runs the provided command printing any outputs to stdout.
func execute(cmd *exec.Cmd) {
	var out strings.Builder

	cmd.Stdout = &out

	err := cmd.Run()

	if err != nil {
		fmt.Println(err)
	}

	if out.String() != "" {
		fmt.Println(out.String())
	}
}
