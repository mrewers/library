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
      FIRESTORE_DB_NAME = var.db_name
      PROJECT_ID        = var.project
    }
  }
}

resource "google_cloudfunctions2_function" "post_readers" {
  name        = "post-readers"
  description = "Add multiple new readers to the list of readers."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "PostReaders"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/post-readers.zip"
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
