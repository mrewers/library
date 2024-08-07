variable "environment" {
  description = "The build environment into which the the application is being deployed."
  type        = string
  default     = "dev"
}

variable "delete_book_url" {
  description = "The invocation URL for the delete-book cloud function."
  type        = string
}

variable "delete_reader_url" {
  description = "The invocation URL for the delete-reader cloud function."
  type        = string
}

variable "get_authors_url" {
  description = "The invocation URL for the get-authors cloud function."
  type        = string
}

variable "get_books_url" {
  description = "The invocation URL for the get-books cloud function."
  type        = string
}

variable "get_readers_url" {
  description = "The invocation URL for the get-readers cloud function."
  type        = string
}

variable "patch_author_url" {
  description = "The invocation URL for the patch-author cloud function."
  type        = string
}

variable "patch_book_url" {
  description = "The invocation URL for the patch-book cloud function."
  type        = string
}

variable "post_author_url" {
  description = "The invocation URL for the post-author cloud function."
  type        = string
}

variable "post_book_url" {
  description = "The invocation URL for the post-book cloud function."
  type        = string
}

variable "post_readers_url" {
  description = "The invocation URL for the post-readers cloud function."
  type        = string
}

variable "put_readers_url" {
  description = "The invocation URL for the put-readers cloud function."
  type        = string
}

variable "options_url" {
  description = "The invocation URL for the options cloud function."
  type        = string
}
