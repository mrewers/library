variable "environment" {
  description = "The build environment into which the the application is being deployed."
  type        = string
  default     = "dev"
}

variable "gateway_url" {
  description = "The default URL created for the API Gateway."
  type        = string
}
