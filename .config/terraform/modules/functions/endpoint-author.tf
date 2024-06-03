module "patch_author" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Updates an existing author."
  endpoint    = "author"
  method      = "patch"

  # Shared variables.
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}

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
