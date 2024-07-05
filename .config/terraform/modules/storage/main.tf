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

resource "google_storage_bucket" "static_site" {
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
  bucket = google_storage_bucket.static_site.name
  role   = "roles/storage.objectViewer"
  members = [
    "allUsers",
  ]
}
