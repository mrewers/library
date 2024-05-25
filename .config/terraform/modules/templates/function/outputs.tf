output "invocation_url" {
  description = "The invocation URL for this cloud function."
  value       = google_cloudfunctions2_function.api_gateway_function.url
}
