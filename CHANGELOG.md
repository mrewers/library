# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/mrewers/library/compare/v1.0.0...HEAD)

_This sections lists changes committed since most recent release_

**Changed:**

- Adjust CSS module type names to better match project conventions

## [v1.0.0](https://github.com/mrewers/library/compare/v0.2.0...v1.0.0) - (2020-08-04)

**Added:**

- Automatically save the date on which books are retired
- Support and automatic typing for CSS modules
- Additional options for reader color (green, orange) and a fallback color (dark blue)
- Image optimization as part of build process
- Errors that throw when crucial environmental variables are not present

**Changed:**

- Order data retrieved from Firebase (by title for books, by name for readers)
- Replace checkmark SVG assets with a checkmark component
- Generalized the function used to decode base64 encoded variables
- Replace `jwt-decode` with `jsonwebtoken` for handling web tokens on the frontend

**Fixed:**

- Rewrote broken GitHub Action to deploy serverless API to Firebase functions
- Add missing whitespace between book title and author name

## [v0.2.0](https://github.com/mrewers/library/compare/v0.1.0...v0.2.0) - (2020-07-26)

**Added:**

- API routes to update, delete, and retire books
- Edit book form accessible by clicking on a book list item
- CSS breakpoints with mobile-first styling
- A modal component that accepts a child component
- Firebase hosting configuration for the API
- A page to view retired books

**Changed:**

- Push book into context rather than pulling full collection from database (to reduce Firebase reads)
- Fetch books and readers in separate useEffect hooks
- Expect Firebase key to the base64 encoded rather than stringified
- Break out routes and database connection to improve readability

**Fixed:**

- Missing onClick property in button component type annotation

**Security:**

- Update dependencies

## [v0.1.0](https://github.com/mrewers/library/tree/v0.1.0) - Initial Release (2020-07-10)

**Added:**

- Preact frontend to render content
- Express server API to be run as serverless function for data management
- User authentication with Auth0
- API mocking with MirageJS for development
- Github Actions workflows to deploy front end and serverless API to GCP and Firebase respectively
