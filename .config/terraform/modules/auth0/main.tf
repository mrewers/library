terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 1.3.0"
    }
  }
}

locals {
  client_uri = "https://${var.client_domain}"
  logo_uri   = "${local.client_uri}/assets/public/logo.png"
}

resource "auth0_client" "client" {
  name = "Library Prod"

  # Basic client information
  app_type    = "spa"
  description = "Authentication service for the book inventory site at ${var.client_domain}"
  logo_uri    = local.logo_uri

  # Application URIs
  allowed_origins     = [local.client_uri]
  allowed_logout_urls = [local.client_uri]
  callbacks           = ["${local.client_uri}/auth", "${local.client_uri}/auth/add", "${local.client_uri}/auth/home"]

  # Authentication type specifics
  grant_types     = ["authorization_code", "implicit", "refresh_token"]
  oidc_conformant = true

  jwt_configuration {
    alg = "RS256"
  }

  refresh_token {
    expiration_type = "expiring"
    rotation_type   = "rotating"

    leeway                       = 0
    infinite_idle_token_lifetime = false
    idle_token_lifetime          = 1296000
    token_lifetime               = 2592000
  }
}

resource "auth0_connection" "google_oauth2" {
  name     = "Google-OAuth"
  strategy = "google-oauth2"

  options {
    client_id                = var.google_oauth_client
    client_secret            = var.google_oauth_secret
    allowed_audiences        = [local.client_uri]
    scopes                   = ["email", "profile"]
    set_user_root_attributes = "on_each_login"
  }
}

resource "auth0_connection_clients" "google_connection" {
  connection_id = auth0_connection.google_oauth2.id

  enabled_clients = [
    auth0_client.client.id
  ]
}
