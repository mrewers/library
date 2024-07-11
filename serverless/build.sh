#!/bin/bash

ENV="dev"

while getopts e:p: flag
do
  case "${flag}" in
    e) ENV=${OPTARG};;
    p) PROJECT=${OPTARG};;
  esac
done

BUILD_ROOT=$(pwd)
ZIPS=$BUILD_ROOT/../.config/terraform/zips
BUCKET=gs://$PROJECT-deployments/functions/$ENV

function build {
  printf "Building $2..."

  cd $BUILD_ROOT/$1
  go mod tidy
  GOWORK=off go mod vendor

  zip -r -q -X $ZIPS/$2.zip *

  printf "\u2705\n"
}

# Clear out old zip files.
printf "Removing old zip files..."
rm $ZIPS/*.zip
printf "\u2705\n \n"

# Build the patch-author function.
build author/patch patch-author

# Build the post-author function.
build author/post post-author

# Build the get-authors function.
build authors/get get-authors

# Build the delete-book function.
build book/delete delete-book

# Build the patch-book function.
build book/patch patch-book

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

# Upload zip files to Google Cloud Storage.
if [[ $PROJECT = "" ]] ; then
  echo -e "\nPlease provide the GCP project name using the -p flag if you intend to deploy the functions."
  exit 0
fi

echo -e "\nSyncing zip files to $BUCKET:\n"
gsutil -m rsync -d -x ".gitkeep" $ZIPS $BUCKET

echo -e "\nDone!!!"