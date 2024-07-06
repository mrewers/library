resource "google_storage_bucket" "deployment_bucket" {
  // Skip static site bucket creation if not a production build.
  count = var.environment == "prod" ? 1 : 0

  provider      = google
  name          = var.deploy_bucket
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"

  labels = {
    environment = "all"
  }

  versioning {
    enabled = true
  }
}

resource "google_storage_bucket" "static_site" {
  // Skip static site bucket creation if not a production build.
  count = var.environment == "prod" ? 1 : 0

  provider                    = google
  name                        = var.static_bucket
  force_destroy               = false
  location                    = "US"
  storage_class               = "STANDARD"
  uniform_bucket_level_access = false

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = ["https://${var.static_bucket}"]
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  // Skip static site bucket creation if not a production build.
  count = var.environment == "prod" ? 1 : 0

  bucket = google_storage_bucket.static_site[0].name
  role   = "roles/storage.objectViewer"
  members = [
    "allUsers",
  ]
}
