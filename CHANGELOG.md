# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/mrewers/library/compare/v2.0.0...HEAD)

_This sections lists changes committed since most recent release_

## [v2.0.0](https://github.com/mrewers/library/compare/v1.0.0...v2.0.0) - Complete Rewrite (2024-08-04)

**Breaking:**

- Replaced Typescript/Express API with serverless functions written in Go.
- Switched frontend framework from Preact to SolidJS.
- Altered the database schema:
  - Add an authors collection so that authors are created as their own document and can be shared across multiple books.
  - Use document ids to create many-to-many relationships connecting authors to books and readers to books. These relationships were previously simple strings and connections had to be inferred from these text values.
  - Use the `retired` property on a book to indicate retired books rather than separating active and retired books into separate collections.
  - Add `dateCreated` and `dateModified` properties on all documents. All books also have a `dateAcquired` date and when a book is marked as read, a `dateRead` value stored in the reader's profile.

**Added:**

- A search bar to narrow down the displayed results on the books/retired pages.
- A mobile-specific navigation menu.
- A type-ahead component used to add authors to a book.
- A configuration page (`/config`) to manage site settings.
- Integrated Terraform configurations to manage deployments.
- Migration scripts to export data from the v1 Firebase database, transform it into the v2 schema, and import the updated data into the v2 database.

**Changed:**

- Switched deployment infrastructure from Firebase to base Google Cloud.
- Refreshed the UI, removing some visual clutter and improving mobile responsiveness.
- Made the reader names and colors configurable.
- Changed the package manager from NPM to Yarn 2.
- Switch the bundler for the frontend from Parcel to Vite.

**Fixed:**

- Make the stats widget operational on the retired page (previously only reflected accurate numbers for active books).

**Removed:**

- GitHub actions to deploy the project on release.

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
