resource "google_storage_bucket" "deployment_bucket" {
  provider      = google
  name          = var.deploy_bucket
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"

  versioning {
    enabled = true
  }
}
