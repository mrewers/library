resource "google_api_gateway_api" "api" {
  provider     = google-beta
  api_id       = "library-api"
  display_name = "library-api"
}

resource "google_api_gateway_api_config" "api_config" {
  provider = google-beta
  api      = google_api_gateway_api.api.api_id
  # API config id must be unique otherwise the deployment will fail. We use the hash of the OpenAPI schema to
  # determine this unique value. This ensures that the API is redeployed only when the configuration actually changes.
  api_config_id = "library-api-config-${substr(sha256(local.openapi_schema), 0, 39)}"
  display_name  = "library-api-config"

  openapi_documents {
    document {
      path     = "spec.json"
      contents = base64encode(local.openapi_schema)
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
