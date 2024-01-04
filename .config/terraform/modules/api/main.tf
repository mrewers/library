resource "google_api_gateway_api" "api" {
  api_id       = "library-api"
  display_name = "library-api"
}

resource "google_api_gateway_api_config" "api_config" {
  api           = "google_api_gateway_api.api.api_id"
  api_config_id = "library-api-config"

  lifecycle {
    create_before_destroy = true
  }
}

resource "google_api_gateway_gateway" "api_gateway" {
  api_config = "google_api_gateway_api_config.api_config.id"
  gateway_id = "library-api-gateway"
}
