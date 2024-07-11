resource "google_cloudfunctions2_function" "api_gateway_function" {
  name        = "${var.environment}-${var.method}-${var.endpoint}"
  description = var.description
  location    = var.region

  build_config {
    runtime     = "go122"
    entry_point = "${title(var.method)}${title(var.endpoint)}"

    source {
      storage_source {
        bucket = var.deploy_bucket
        object = "functions/${var.environment}/${var.method}-${var.endpoint}.zip"
      }
    }

    environment_variables = {
      # We add a version based on the locally generated zip of the function source.
      # This ensures that the function is redeployed when the source code is altered.
      VERSION = substr(filesha256("${path.root}/zips/${var.method}-${var.endpoint}.zip"), 0, 39)
    }
  }

  service_config {
    environment_variables = {
      ALLOWED_ORIGIN    = var.cors_domain
      FIRESTORE_DB_NAME = var.db_name
      LOG_EXECUTION_ID  = false
      PROJECT_ID        = var.project
    }
  }
}
