output "get_books_url" {
  description = "The invokation URL for the get-books cloud function."
  value       = google_cloudfunctions2_function.get_books.url
}
