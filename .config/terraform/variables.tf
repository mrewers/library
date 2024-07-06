variable "auth0_domain" {
  description = "The domain where the Auth0 application used to manage user authentication resides."
  type        = string
}

variable "auth0_client" {
  description = "The client ID for the Auth0 application used to manage user authentication."
  type        = string
}

variable "auth0_secret" {
  description = "The client secret for the Auth0 application used to manage user authentication."
  type        = string
}

variable "email_whitelist" {
  description = "The list of users that are authorized to login to the application"
  type        = list(string)
}

variable "environment" {
  description = "The build environment into which the the application is being deployed."
  type        = string
  default     = "dev"
}

variable "google_oauth_client" {
  description = "The client ID for the Google OAuth integration."
  type        = string
}

variable "google_oauth_secret" {
  description = "The client secret for the Google OAuth integration."
  type        = string
}

variable "client_domain" {
  description = "The origin domain for the client application."
  type        = string
}

variable "db_name" {
  description = "The name of the Firestore database where the application data is saved."
  type        = string
  default     = "default"
}

variable "project" {
  description = "The GCP account project that owns this application."
  type        = string
}

variable "region" {
  description = "The region in GCP where the application should be built. Defaults to 'us-east4'."
  type        = string
  default     = "us-east4"
}

variable "zone" {
  type = string
}
