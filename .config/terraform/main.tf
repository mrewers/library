provider "google-beta" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

module "api" {
  source = "./modules/api"
}

module "firestore" {
  source = "./modules/firestore"
}
