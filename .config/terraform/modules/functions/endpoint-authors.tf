module "get_authors" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Retrieve a list of authors."
  endpoint    = "authors"
  method      = "get"

  # Shared variables.
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}