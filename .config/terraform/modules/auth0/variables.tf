variable "client_domain" {
  description = "The origin domain for the client application."
  type        = string
}

variable "email_whitelist" {
  description = "The list of users that are authorized to login to the application"
  type        = list(string)
}

variable "google_oauth_client" {
  description = "The client ID for the Google OAuth integration."
  type        = string
}

variable "google_oauth_secret" {
  description = "The client secret for the Google OAuth integration."
  type        = string
}
