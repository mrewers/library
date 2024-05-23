resource "google_cloudfunctions2_function" "delete_book" {
  name        = "delete-book"
  description = "Deletes an existing book."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "DeleteBook"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/delete-book.zip"
      }
    }
  }

  service_config {
    environment_variables = {
      FIRESTORE_DB_NAME = var.db_name
      PROJECT_ID        = var.project
    }
  }
}

resource "google_cloudfunctions2_function" "patch_book" {
  name        = "patch-book"
  description = "Updates an existing book."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "PatchBook"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/patch-book.zip"
      }
    }
  }

  service_config {
    environment_variables = {
      FIRESTORE_DB_NAME = var.db_name
      PROJECT_ID        = var.project
    }
  }
}

resource "google_cloudfunctions2_function" "post_book" {
  name        = "post-book"
  description = "Creates a new book."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "PostBook"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/post-book.zip"
      }
    }
  }

  service_config {
    environment_variables = {
      FIRESTORE_DB_NAME = var.db_name
      PROJECT_ID        = var.project
    }
  }
}
