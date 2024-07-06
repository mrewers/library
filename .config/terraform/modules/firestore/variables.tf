variable "db_name" {
  description = "The name of the Firestore database where the application data is saved."
  type        = string
}

variable "region" {
  description = "The region in GCP where the database should reside."
  type        = string
}
