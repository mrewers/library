variable "cors_domain" {
  description = "The domain permitted by CORs to access the API resources."
  type        = string
  default     = "*"
}

variable "db_name" {
  description = "The name of the Firestore database where the application data is saved."
  type        = string
}

variable "description" {
  description = "Describes the purpose of the function."
  type        = string
}

variable "deploy_bucket" {
  description = "The Google Cloud Storage bucket used to store deployment assets."
  type        = string
}

variable "endpoint" {
  description = "The API Gateway endpoint the function should access."
  type        = string
}

variable "method" {
  description = "The HTTP method that at the above endpoint that this function corresponds to."
  type        = string
}

variable "project" {
  description = "The GCP account project that owns this application."
  type        = string
}

variable "region" {
  description = "The region in GCP where the cloud functions should reside."
  type        = string
}
