variable "cors_domain" {
  description = "The domain permitted by CORs to access the API resources."
  type        = string
}

variable "db_name" {
  description = "The name of the Firestore database where the application data is saved."
  type        = string
}

variable "deploy_bucket" {
  description = "The Google Cloud Storage bucket used to store deployment assets."
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
