resource "google_storage_bucket" "tfstate_bucket" {
  provider      = google
  name          = "${var.project}-deployments"
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"

  versioning {
    enabled = true
  }
}
