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
            "book" : {
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
