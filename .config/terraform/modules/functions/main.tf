resource "google_cloudfunctions2_function" "init" {
  name        = "${var.environment}-init"
  description = "Initialize the Firestore database."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "Init"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/${var.environment}/init.zip"
      }
    }
  }

  service_config {
    environment_variables = {
      ALLOWED_ORIGIN    = var.cors_domain
      FIRESTORE_DB_NAME = var.db_name
      PROJECT_ID        = var.project
    }
  }
}

resource "google_cloudfunctions2_function" "options" {
  name        = "${var.environment}-options"
  description = "Send success message with CORS headers."
  location    = var.region

  build_config {
    runtime     = "go121"
    entry_point = "Options200"
    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/${var.environment}/options.zip"
      }
    }
  }

  service_config {
    environment_variables = {
      ALLOWED_ORIGIN    = var.cors_domain
      FIRESTORE_DB_NAME = var.db_name
      PROJECT_ID        = var.project
    }
  }
}
