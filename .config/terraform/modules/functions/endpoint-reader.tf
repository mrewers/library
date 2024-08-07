module "delete_reader" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Deletes and individual reader by id."
  endpoint    = "reader"
  method      = "delete"

  # Shared variables.
  cors_domain   = var.cors_domain
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  environment   = var.environment
  project       = var.project
  region        = var.region
}
