locals {
  openapi_schema = jsonencode({
    swagger : "2.0"
    info : {
      title : "Library API"
      version : "1.0.0"
      description : "Routes for used by the library client application to interact with the serverless backend."
    }
    definitions : {
      Author : {
        type : "object"
        properties : {
          id : { type : "string" }
          nameFirst : { type : "string" }
          nameFull : { type : "string" }
          nameLast : { type : "string" }
          books : {
            type : "array"
            items : { type : "string" }
          }
        }
      }
      Book : {
        type : "object"
        properties : {
          id : { type : "string" }
          title : { type : "string" }
          author : {
            type : "array"
            items : { type : "string" }
          }
          dateAcquired : { type : "string" }
          readBy : {
            type : "array"
            items : { type : "string" }
          }
          retired : { type : "boolean" }
        }
      }
      Reader : {
        type : "object"
        properties : {
          id : { type : "string" }
          color : { type : "string" }
          name : { type : "string" }
          tempId : { type : "string" }
        }
      }
      IdData : {
        type : "object"
        properties : {
          "data" : {
            properties : {
              id : { type : "string" }
            }
          }
        }
      }
    }
    parameters : {
      body-author : {
        in : "body"
        name : "author"
        description : "An individual author's data."
        schema : {
          "$ref" : "#/definitions/Author"
        }
      }
      body-book : {
        in : "body"
        name : "book"
        description : "An individual book's data."
        schema : {
          "$ref" : "#/definitions/Book"
        }
      }
      body-readers : {
        in : "body"
        name : "readers"
        description : "A list of multiple readers' data."
        schema : {
          type : "object"
          required : [
            "readers"
          ]
          properties : {
            "readers" : {
              type : "array"
              items : { "$ref" : "#/definitions/Reader" }
            }
          }
        }
      }
      query-id : {
        in : "query"
        name : "id"
        required : true
        type : "string"
      }
    }
    responses : {
      "200-cors" : {
        description : "CORS success"
        schema : { type : "string" }
      }
      "200-default" : {
        description : "A success message."
        schema : { type : "string" }
      }
    }
    "paths" : {
      "/author" : {
        patch : {
          description : "Updates a given author in the database."
          operationId : "patchAuthor"
          parameters : [
            { "$ref" : "#/parameters/query-id" },
            { "$ref" : "#/parameters/body-author" }
          ]
          responses : {
            "200" : { "$ref" : "#/responses/200-default" }
          }
          x-google-backend : {
            address : "${var.patch_author_url}"
          }
        }
        post : {
          description : "Submits an author to be added to the database."
          operationId : "postAuthor"
          parameters : [
            { "$ref" : "#/parameters/body-author" }
          ]
          responses : {
            "200" : {
              description : "The id of the new author if successfully added."
              schema : {
                "$ref" : "#/definitions/IdData"
              }
            }
          }
          x-google-backend : {
            address : "${var.post_author_url}"
          }
        }
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsAuthor"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      }
      "/authors" : {
        get : {
          description : "Retrieves a list of authors from the database."
          operationId : "getAuthors"
          responses : {
            "200" : {
              description : "A list of authors"
              schema : {
                type : "object"
                properties : {
                  "data" : {
                    type : "array"
                    items : { "$ref" : "#/definitions/Author" }
                  }
                }
              }
            }
          }
          x-google-backend : {
            address : "${var.get_authors_url}"
          }
        }
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsAuthors"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      }
      "/book" : {
        delete : {
          description : "Deletes a given book from the database."
          operationId : "deleteBook"
          parameters : [
            { "$ref" : "#/parameters/query-id" }
          ]
          responses : {
            "200" : { "$ref" : "#/responses/200-default" }
          }
          x-google-backend : {
            address : "${var.delete_book_url}"
          }
        }
        patch : {
          description : "Updates a given book in the database."
          operationId : "patchBook"
          parameters : [
            { "$ref" : "#/parameters/query-id" },
            { "$ref" : "#/parameters/body-book" }
          ]
          responses : {
            "200" : { "$ref" : "#/responses/200-default" }
          }
          x-google-backend : {
            address : "${var.patch_book_url}"
          }
        }
        post : {
          description : "Submits a book to be added to the database."
          operationId : "postBook"
          parameters : [
            { "$ref" : "#/parameters/body-book" }
          ]
          responses : {
            "200" : {
              description : "The id of the new book if it was added successful."
              schema : {
                "$ref" : "#/definitions/IdData"
              }
            }
          }
          x-google-backend : {
            address : "${var.post_book_url}"
          }
        }
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsBook"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      },
      "/books" : {
        get : {
          description : "Retrieves a list of books from the database."
          operationId : "getBooks"
          responses : {
            "200" : {
              description : "A list of books"
              schema : {
                type : "object"
                properties : {
                  "data" : {
                    type : "array"
                    items : { "$ref" : "#/definitions/Book" }
                  }
                }
              }
            }
          }
          x-google-backend : {
            address : "${var.get_books_url}"
          }
        }
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsBooks"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      }
      "/reader" : {
        delete : {
          description : "Deletes an individual reader."
          operationId : "deleteReader"
          parameters : [
            { "$ref" : "#/parameters/query-id" }
          ]
          responses : {
            "200" : { "$ref" : "#/responses/200-default" }
          }
          x-google-backend : {
            address : "${var.delete_reader_url}"
          }
        }
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsReader"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      }
      "/readers" : {
        get : {
          description : "Retrieves a list of readers from the database."
          operationId : "getReaders"
          responses : {
            "200" : {
              description : "A list of readers"
              schema : {
                type : "object"
                properties : {
                  "data" : {
                    type : "array"
                    items : { "$ref" : "#/definitions/Reader" }
                  }
                }
              }
            }
          }
          x-google-backend : {
            address : "${var.get_readers_url}"
          }
        }
        post : {
          description : "Adds multiple readers to the database."
          operationId : "postReaders"
          parameters : [
            { "$ref" : "#/parameters/body-readers" }
          ]
          responses : {
            "200" : {
              description : "A list of reader ids and the temporary ids created for them in the client."
              schema : {
                type : "object"
                properties : {
                  "data" : {
                    type : "array"
                    items : {
                      type : "object"
                      properties : {
                        id : { type : "string" }
                        tmp : { type : "string" }
                      }
                    }
                  }
                }
              }
            }
          }
          x-google-backend : {
            address : "${var.post_readers_url}"
          }
        }
        put : {
          description : "Updates multiple readers in the database."
          operationId : "putReaders"
          parameters : [
            { "$ref" : "#/parameters/body-readers" }
          ]
          responses : {
            "200" : { "$ref" : "#/responses/200-default" }
          }
          x-google-backend : {
            address : "${var.put_readers_url}"
          }
        }
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsReaders"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      }
      "/ping" : {
        options : {
          description : "Return headers required for CORS."
          operationId : "optionsPing"
          responses : {
            "200" : { "$ref" : "#/responses/200-cors" }
          }
          x-google-backend : {
            address : "${var.options_url}"
          }
        }
      }
    }
  })
}
