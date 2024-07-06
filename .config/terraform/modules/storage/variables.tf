variable "deploy_bucket" {
  description = "The Google Cloud Storage bucket used to store deployment assets."
  type        = string
}

variable "environment" {
  description = "The build environment into which the the application is being deployed."
  type        = string
  default     = "dev"
}

variable "static_bucket" {
  description = "The Google Cloud Storage bucket used to store the client application assets."
  type        = string
}
