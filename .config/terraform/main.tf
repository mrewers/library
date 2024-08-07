terraform {
  backend "gcs" {}

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 1.3.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.12"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.12"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone

  default_labels = {
    application = "library"
    environment = var.environment
  }
}

provider "google-beta" {
  project = var.project
  region  = var.region
  zone    = var.zone

  default_labels = {
    application = "library"
    environment = var.environment
  }
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client
  client_secret = var.auth0_secret
}

locals {
  deploy_bucket = "${var.project}-deployments"
  db_name       = "${var.db_name}-${var.environment}"
}

module "auth" {
  source = "./modules/auth0"

  client_domain       = var.client_domain
  email_whitelist     = var.email_whitelist
  environment         = var.environment
  google_oauth_client = var.google_oauth_client
  google_oauth_secret = var.google_oauth_secret
}

module "storage" {
  source = "./modules/storage"

  deploy_bucket = local.deploy_bucket
  environment   = var.environment
  static_bucket = var.client_domain
}

module "functions" {
  source = "./modules/functions"

  deploy_bucket = local.deploy_bucket
  cors_domain   = var.environment == "prod" ? "https://${var.client_domain}" : "*"
  db_name       = local.db_name
  environment   = var.environment
  project       = var.project
  region        = var.region
}

module "api" {
  source = "./modules/api"

  environment       = var.environment
  delete_book_url   = module.functions.delete_book_url
  delete_reader_url = module.functions.delete_reader_url
  get_books_url     = module.functions.get_books_url
  get_authors_url   = module.functions.get_authors_url
  get_readers_url   = module.functions.get_readers_url
  patch_author_url  = module.functions.patch_author_url
  patch_book_url    = module.functions.patch_book_url
  post_author_url   = module.functions.post_author_url
  post_book_url     = module.functions.post_book_url
  post_readers_url  = module.functions.post_readers_url
  put_readers_url   = module.functions.put_readers_url
  options_url       = module.functions.options_url
}

module "firestore" {
  source = "./modules/firestore"

  db_name = local.db_name
  region  = var.region
}


module "scheduler" {
  source = "./modules/scheduler"

  gateway_url = module.api.gateway_url
  environment = var.environment
}
