output "invokation_url" {
  description = "The invokation URL for this cloud function."
  value       = google_cloudfunctions2_function.api_gateway_function.url
}
