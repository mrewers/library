resource "google_cloudfunctions2_function" "init" {
  name        = "init"
  description = "Initialize the Firestore database."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "Init"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/init.zip"
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

# BOOKS
resource "google_cloudfunctions2_function" "get_books" {
  name        = "get-books"
  description = "Retrieves a list of all books."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "GetBooks"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/get-books.zip"
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

resource "google_cloudfunctions2_function" "options" {
  name        = "options"
  description = "Send success message with CORS headers."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "Options200"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/options.zip"
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
