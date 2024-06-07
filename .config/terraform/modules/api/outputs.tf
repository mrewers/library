output "gateway_url" {
  description = "The default URL created for the API Gateway."
  value       = google_api_gateway_gateway.api_gateway.default_hostname
}
