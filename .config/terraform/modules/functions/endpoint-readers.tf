module "get_readers" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Retrieve a list of readers."
  endpoint    = "readers"
  method      = "get"

  # Shared variables.
  cors_domain   = var.cors_domain
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}

module "post_readers" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Add multiple new readers to the list of readers."
  endpoint    = "readers"
  method      = "post"

  # Shared variables.
  cors_domain   = var.cors_domain
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}

module "put_readers" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Update multiple existing readers."
  endpoint    = "readers"
  method      = "put"

  # Shared variables.
  cors_domain   = var.cors_domain
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}
