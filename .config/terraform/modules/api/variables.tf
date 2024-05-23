variable "delete_book_url" {
  description = "The invokation URL for the delete-book cloud function."
  type        = string
}

variable "delete_reader_url" {
  description = "The invokation URL for the delete-reader cloud function."
  type        = string
}

variable "get_books_url" {
  description = "The invokation URL for the get-books cloud function."
  type        = string
}

variable "get_readers_url" {
  description = "The invokation URL for the get-readers cloud function."
  type        = string
}

variable "patch_book_url" {
  description = "The invokation URL for the patch-book cloud function."
  type        = string
}

variable "post_book_url" {
  description = "The invokation URL for the post-book cloud function."
  type        = string
}

variable "post_readers_url" {
  description = "The invokation URL for the post-readers cloud function."
  type        = string
}

variable "put_readers_url" {
  description = "The invokation URL for the put-readers cloud function."
  type        = string
}

variable "options_url" {
  description = "The invokation URL for the options cloud function."
  type        = string
}
