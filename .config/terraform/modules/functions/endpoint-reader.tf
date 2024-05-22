resource "google_cloudfunctions2_function" "delete_reader" {
  name        = "delete-reader"
  description = "Deletes and individual reader by id."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "DeleteReader"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/delete-reader.zip"
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
