resource "google_api_gateway_api" "api" {
  provider     = google-beta
  api_id       = "library-api"
  display_name = "library-api"
}

resource "google_api_gateway_api_config" "api_config" {
  provider      = google-beta
  api           = google_api_gateway_api.api.api_id
  api_config_id = "library-api-config-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  display_name  = "library-api-config"

  openapi_documents {
    document {
      path = "spec.json"
      contents = base64encode(
        jsonencode({
          swagger : "2.0"
          info : {
            title : "Library API"
            version : "0.0.1"
            description : "Routes for used by the library client application to interact with the serverless backend."
          }
          "paths" : {
            "/author" : {
              post : {
                description : "Submits an author to be added to the database."
                operationId : "postAuthor"
                x-google-backend : {
                  address : "${var.post_author_url}"
                }
                responses : {
                  "200" : {
                    description : "The id of the author"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
              options : {
                description : "Return headers required for CORS."
                operationId : "optionsAuthor"
                x-google-backend : {
                  address : "${var.options_url}"
                }
                responses : {
                  "200" : {
                    description : "CORS success"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
            }
            "/authors" : {
              get : {
                description : "Retrieves a list of authors from the database."
                operationId : "getAuthors"
                x-google-backend : {
                  address : "${var.get_authors_url}"
                }
                responses : {
                  "200" : {
                    description : "A list of authors"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
              options : {
                description : "Return headers required for CORS."
                operationId : "optionsAuthors"
                x-google-backend : {
                  address : "${var.options_url}"
                }
                responses : {
                  "200" : {
                    description : "CORS success"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
            }
            "/book" : {
              delete : {
                description : "Deletes a given book from the database."
                operationId : "deleteBook"
                x-google-backend : {
                  address : "${var.delete_book_url}"
                }
                parameters : [
                  {
                    in : "query"
                    name : "id"
                    required : true
                    type : "string"
                  }
                ]
                responses : {
                  "200" : {
                    description : "A success message."
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
              patch : {
                description : "Updates a given book in the database."
                operationId : "patchBook"
                x-google-backend : {
                  address : "${var.patch_book_url}"
                }
                parameters : [
                  {
                    in : "query"
                    name : "id"
                    required : true
                    type : "string"
                  }
                ]
                responses : {
                  "200" : {
                    description : "A success message."
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
              post : {
                description : "Submits a book to be added to the database."
                operationId : "postBook"
                x-google-backend : {
                  address : "${var.post_book_url}"
                }
                responses : {
                  "200" : {
                    description : "A list of books"
                    schema : {
                      type : "array"
                      items : {
                        type : "string"
                      }
                    }
                  }
                }
              }
              options : {
                description : "Return headers required for CORS."
                operationId : "optionsBook"
                x-google-backend : {
                  address : "${var.options_url}"
                }
                responses : {
                  "200" : {
                    description : "CORS success"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
            },
            "/books" : {
              get : {
                description : "Retrieves a list of books from the database."
                operationId : "getBooks"
                x-google-backend : {
                  address : "${var.get_books_url}"
                }
                responses : {
                  "200" : {
                    description : "A list of books"
                    schema : {
                      type : "array"
                      items : {
                        type : "string"
                      }
                    }
                  }
                }
              }
              options : {
                description : "Return headers required for CORS."
                operationId : "optionsBooks"
                x-google-backend : {
                  address : "${var.options_url}"
                }
                responses : {
                  "200" : {
                    description : "CORS success"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
            }
            "/reader" : {
              delete : {
                description : "Deletes an individual reader."
                operationId : "deleteReader"
                parameters : [
                  {
                    in : "query"
                    name : "id"
                    required : true
                    type : "string"
                  }
                ]
                x-google-backend : {
                  address : "${var.delete_reader_url}"
                }
                responses : {
                  "200" : {
                    description : "The id of the reader"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
              options : {
                description : "Return headers required for CORS."
                operationId : "optionsReader"
                x-google-backend : {
                  address : "${var.options_url}"
                }
                responses : {
                  "200" : {
                    description : "CORS success"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
            }
            "/readers" : {
              get : {
                description : "Retrieves a list of readers from the database."
                operationId : "getReaders"
                x-google-backend : {
                  address : "${var.get_readers_url}"
                }
                responses : {
                  "200" : {
                    description : "A list of readers"
                    schema : {
                      type : "array"
                      items : {
                        type : "string"
                      }
                    }
                  }
                }
              }
              post : {
                description : "Adds multiple readers to the database."
                operationId : "postReaders"
                x-google-backend : {
                  address : "${var.post_readers_url}"
                }
                responses : {
                  "200" : {
                    description : "A list of reader ids and the temporary ids created for them in the client."
                    schema : {
                      type : "array"
                      items : {
                        type : "object"
                        properties : {
                          id : {
                            type : "string"
                          }
                          tmp : {
                            type : "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
              put : {
                description : "Updates multiple readers in the database."
                operationId : "putReaders"
                x-google-backend : {
                  address : "${var.put_readers_url}"
                }
                responses : {
                  "200" : {
                    description : "A success message."
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
              options : {
                description : "Return headers required for CORS."
                operationId : "optionsReaders"
                x-google-backend : {
                  address : "${var.options_url}"
                }
                responses : {
                  "200" : {
                    description : "CORS success"
                    schema : {
                      type : "string"
                    }
                  }
                }
              }
            }
          }
      }))
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "google_api_gateway_gateway" "api_gateway" {
  provider   = google-beta
  api_config = google_api_gateway_api_config.api_config.id
  gateway_id = "library-api-gateway"
}
