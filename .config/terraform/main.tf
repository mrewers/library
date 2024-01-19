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

module "tfstate" {
  source = "./modules/tfstate"

  project = var.project
}

# module "api" {
#   source = "./modules/api"
# }

module "firestore" {
  source = "./modules/firestore"

  region = var.region
}
