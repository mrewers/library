module "delete_reader" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Deletes and individual reader by id."
  endpoint    = "reader"
  method      = "delete"

  # Shared variables.
  cors_domain   = var.client_domain
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}
