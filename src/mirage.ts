import { Model, Server } from 'miragejs';

import { mockBooks as books, mockReaders as readers } from '~/__mocks__/data';

/**
 * Initializes a Mirage development server to mock API requests.
 *
 * @param {IMirageServerConfigs} config Mirage server configuration options.
 */
const devApiServer = ({ environment, delay }: IMirageServerConfigs): Server => {
  // Sets the timing on the server response if provided, otherwise uses the default response time
  // Default delay is 0.3 seconds, unless the environment is set to test in which case it's zero seconds
  const defaultTiming = environment === 'test' ? 0 : 300;
  const timing = delay || defaultTiming;

  return new Server({
    environment,

    models: {
      book: Model,
    },

    seeds(server): void {
      books.forEach((book: IBook) => server.create('book', book));
    },

    routes(): void {
      this.namespace = 'api';

      // Get routes
      this.get(
        '/books',
        schema => ({
          books: schema.books.all(),
        }),
        { timing }
      );
      this.get('/readers', () => readers, { timing });

      // Post routes
      this.post('/books', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        schema.books.create(attrs.book);
        return { books: schema.books.all() };
      });
    },
  });
};

declare global {
  interface IMirageServerConfigs {
    readonly environment?: 'development' | 'test';
    readonly delay?: number;
  }

  type TypeMirageServer = Server; // eslint-disable-line @typescript-eslint/no-type-alias -- 'Server' is too generic
}

// Using CommonJS export rather than ES6 since this is dynamically required based on NODE_ENV
module.exports = devApiServer;
