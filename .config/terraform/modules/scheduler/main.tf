resource "google_cloud_scheduler_job" "keep_alive" {
  name        = "${var.environment}-keep-alive"
  description = "Ping the API gateway every ten minutes to reduce cold start time."
  paused      = false
  schedule    = "*/10 * * * *"
  time_zone   = "America/New_York"

  retry_config {
    retry_count = 0
  }

  http_target {
    http_method = "OPTIONS"
    uri         = "https://${var.gateway_url}/ping"
  }
}
