module "delete_book" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Deletes an existing book."
  endpoint    = "book"
  method      = "delete"

  # Shared variables.
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}

module "patch_book" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Updates an existing book."
  endpoint    = "book"
  method      = "patch"

  # Shared variables.
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}

module "post_book" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Creates a new book."
  endpoint    = "book"
  method      = "post"

  # Shared variables.
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}
