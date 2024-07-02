module "get_books" {
  source = "../templates/function"

  # Endpoint specific variables.
  description = "Retrieves a list of all books."
  endpoint    = "books"
  method      = "get"

  # Shared variables.
  cors_domain   = var.cors_domain
  db_name       = var.db_name
  deploy_bucket = var.deploy_bucket
  project       = var.project
  region        = var.region
}
