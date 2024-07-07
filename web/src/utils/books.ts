// Define constants to facilitate book-related operations.

const BOOK_COVER_TYPES = ['hardcover', 'paperback'] as const;
const BOOK_FORMATS = ['digital', 'print'] as const;
const EBOOK_PLATFORMS = ['google books', 'kindle', 'kobo'] as const;

/**
 * @constant bookConstants Shared constant values describing the various types of books.
 */
export const bookConstants = {
  /** List of cover types available for print books. */
  BOOK_COVER_TYPES,
  /** List of supported book media types. */
  BOOK_FORMATS,
  /** List of ebook vendor/display platforms. */
  EBOOK_PLATFORMS,
}

// Declare global types pertaining to book constant.

type TBookCoversTuple = typeof BOOK_COVER_TYPES;
type TBookFormatsTuple = typeof BOOK_FORMATS;
type TEbookPlatformsTuple = typeof EBOOK_PLATFORMS;

declare global {
  type TBookCovers = TBookCoversTuple[number];
  type TBookFormats = TBookFormatsTuple[number];
  type TEbookPlatforms = TEbookPlatformsTuple[number];
}