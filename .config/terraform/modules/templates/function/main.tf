resource "google_cloudfunctions2_function" "api_gateway_function" {
  name        = "${var.method}-${var.endpoint}"
  description = var.description
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "${title(var.method)}${title(var.endpoint)}"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/${var.method}-${var.endpoint}.zip"
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
