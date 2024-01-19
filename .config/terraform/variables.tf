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
