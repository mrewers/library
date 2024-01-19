resource "google_api_gateway_api" "api" {
  provider     = google-beta
  api_id       = "library-api"
  display_name = "library-api"
}

resource "google_api_gateway_api_config" "api_config" {
  provider      = google-beta
  api           = google_api_gateway_api.api.api_id
  api_config_id = "library-api-config"

  openapi_documents {
    document {
      path     = "${path.module}/spec.yaml"
      contents = filebase64("${path.module}/spec.yaml")
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "google_api_gateway_gateway" "api_gateway" {
  provider   = google-beta
  api_config = google_api_gateway_api_config.api_config.id
  gateway_id = "library-api-gateway"
}
