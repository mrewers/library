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
      PROJECT_ID = var.project
    }
  }
}

resource "google_cloudfunctions2_function" "get_readers" {
  name        = "get-readers"
  description = "Retrieve a list of readers."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "GetReaders"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/get-readers.zip"
      }
    }
  }

  service_config {
    environment_variables = {
      PROJECT_ID = var.project
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
      PROJECT_ID = var.project
    }
  }
}