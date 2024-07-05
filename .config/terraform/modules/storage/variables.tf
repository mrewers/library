variable "deploy_bucket" {
  description = "The Google Cloud Storage bucket used to store deployment assets."
  type        = string
}

variable "static_bucket" {
  description = "The Google Cloud Storage bucket used to store the client application assets."
  type        = string
}
