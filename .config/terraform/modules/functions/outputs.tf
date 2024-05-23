output "delete_book_url" {
  description = "The invokation URL for the delete-book cloud function."
  value       = google_cloudfunctions2_function.delete_book.url
}

output "delete_reader_url" {
  description = "The invokation URL for the delete-reader cloud function."
  value       = google_cloudfunctions2_function.delete_reader.url
}

output "get_books_url" {
  description = "The invokation URL for the get-books cloud function."
  value       = google_cloudfunctions2_function.get_books.url
}

output "get_readers_url" {
  description = "The invokation URL for the get-readers cloud function."
  value       = google_cloudfunctions2_function.get_readers.url
}

output "patch_book_url" {
  description = "The invokation URL for the patch-book cloud function."
  value       = google_cloudfunctions2_function.patch_book.url
}

output "post_book_url" {
  description = "The invokation URL for the post-book cloud function."
  value       = google_cloudfunctions2_function.post_book.url
}

output "post_readers_url" {
  description = "The invokation URL for the post-readers cloud function."
  value       = google_cloudfunctions2_function.post_readers.url
}

output "put_readers_url" {
  description = "The invokation URL for the put-readers cloud function."
  value       = google_cloudfunctions2_function.put_readers.url
}

output "options_url" {
  description = "The invokation URL for the options cloud function."
  value       = google_cloudfunctions2_function.options.url
}
