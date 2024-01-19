terraform {
  backend "gcs" {}

  required_providers {
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
  }
}

provider "google-beta" {
  project = var.project
  region  = var.region
  zone    = var.zone

  default_labels = {
    application = "library"
  }
}

locals {
  deploy_bucket = "${var.project}-deployments"
}

module "storage" {
  source = "./modules/storage"

  deploy_bucket = local.deploy_bucket
}

module "functions" {
  source = "./modules/functions"

  deploy_bucket = local.deploy_bucket
  project       = var.project
  region        = var.region
}

module "api" {
  source = "./modules/api"

  get_books_url   = module.functions.get_books_url
  get_readers_url = module.functions.get_readers_url
}

module "firestore" {
  source = "./modules/firestore"

  region = var.region
}
