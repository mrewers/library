module "post_author" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Creates a new author."
  endpoint    = "author"
  method      = "post"

  # Shared variables.
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}
