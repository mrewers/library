output "delete_book_url" {
  description = "The invocation URL for the delete-book cloud function."
  value       = module.delete_book.invocation_url
}

output "delete_reader_url" {
  description = "The invocation URL for the delete-reader cloud function."
  value       = module.delete_reader.invocation_url
}

output "get_authors_url" {
  description = "The invocation URL for the get-authors cloud function."
  value       = module.get_authors.invocation_url
}

output "get_books_url" {
  description = "The invocation URL for the get-books cloud function."
  value       = module.get_books.invocation_url
}

output "get_readers_url" {
  description = "The invocation URL for the get-readers cloud function."
  value       = module.get_readers.invocation_url
}

output "patch_author_url" {
  description = "The invocation URL for the patch-author cloud function."
  value       = module.patch_author.invocation_url
}

output "patch_book_url" {
  description = "The invocation URL for the patch-book cloud function."
  value       = module.patch_book.invocation_url
}

output "post_author_url" {
  description = "The invocation URL for the post-author cloud function."
  value       = module.post_author.invocation_url
}

output "post_book_url" {
  description = "The invocation URL for the post-book cloud function."
  value       = module.post_book.invocation_url
}

output "post_readers_url" {
  description = "The invocation URL for the post-readers cloud function."
  value       = module.post_readers.invocation_url
}

output "put_readers_url" {
  description = "The invocation URL for the put-readers cloud function."
  value       = module.put_readers.invocation_url
}

output "options_url" {
  description = "The invocation URL for the options cloud function."
  value       = google_cloudfunctions2_function.options.url
}
