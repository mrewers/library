# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/mrewers/library/compare/v0.1.0...HEAD)

_This sections lists changes committed since most recent release_

**Added:**

- API routes to update and delete books
- Edit book form accessible by clicking on a book list item
- CSS breakpoints with mobile-first styling
- A modal component that accepts a child component
- Firebase hosting configuration for the API

**Changed:**

- Push book into context rather than pulling full collection from database (to limit Firebase reads)
- Fetch books and readers in separate useEffect hooks
- Expect Firebase key to the base64 encoded rather than stringified
- Switch engine for API serverless function to Node 12

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