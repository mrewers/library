#!/bin/bash

BUILD_ROOT=$(pwd)
ZIPS=$BUILD_ROOT/zips

function build {
  cd $BUILD_ROOT/$1
  go mod tidy
  GOWORK=off go mod vendor
  zip -r -q $ZIPS/$2.zip *
}

# Clear out old zip files.
rm zips/*

# Build the post-book function.
build book/post post-book

# Build the get-books function.
build books/get get-books

# Build the init function.
build init init

# Build the options function.
build options options

# Build the delete-reader function.
build reader/delete delete-reader

# Build the get-readers function.
build readers/get get-readers

# Build the post-readers function.
build readers/post post-readers

# Build the put-readers function.
build readers/put put-readers