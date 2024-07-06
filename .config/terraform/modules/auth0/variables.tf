variable "client_domain" {
  description = "The origin domain for the client application."
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
