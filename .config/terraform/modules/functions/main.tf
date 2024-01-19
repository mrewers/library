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
