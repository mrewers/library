// Import { Model, Server } from 'miragejs';
// import Schema from 'miragejs/orm/schema';

// import { mockBooks as books, mockReaders as readers } from '~/__mocks__/data';

// /**
//  * Initializes a Mirage development server to mock API requests.
//  *
//  * @param {IMirageServerConfigs} config Mirage server configuration options.
//  */
// const devApiServer = ({ environment, delay }: IMirageServerConfigs): Server => {
//   // Sets the timing on the server response if provided, otherwise uses the default response time
//   // Default delay is 0.3 seconds, unless the environment is set to test in which case it's zero seconds
//   const defaultTiming = environment === 'test' ? 0 : 300;
//   const timing = delay || defaultTiming;

//   const getModels = (schema, endpoint: string): TypeAllowedResponses => ({
//     [endpoint]: schema[endpoint].all().models,
//   });

//   return new Server({
//     environment,

//     models: {
//       book: Model,
//       reader: Model,
//     },

//     seeds(server: ServerConfig): void {
//       books.forEach((book: Partial) => server.create('book', book));
//       readers.forEach((reader: Partial) => server.create('reader', reader));
//     },

//     routes(): void {
//       this.namespace = 'api';

//       // Get routes
//       this.get('/books', (schema: Schema) => getModels(schema, 'books'), { timing });
//       this.get('/readers', (schema: Schema) => getModels(schema, 'readers'), { timing });

//       this.get('/books/:id', (schema, request) => {
//         const { id } = request.params;

//         return schema.books.find(id);
//       });

//       this.get('/readers/:id', (schema, request) => {
//         const { id } = request.params;

//         return schema.readers.find(id);
//       });

//       // Post routes
//       this.post('/books', (schema, request) => {
//         const attrs = JSON.parse(request.requestBody);

//         return schema.books.create(attrs.book);
//       });

//       // Put routes
//       this.put('books/:id', (schema, request) => {
//         const attrs = JSON.parse(request.requestBody);
//         const { id } = request.params;

//         const book = schema.books.find(id);

//         book.update(attrs.book);

//         return schema.books.find(id);
//       });

//       // Delete routes
//       this.put('books/:id', (schema, request) => {
//         const { id } = request.params;

//         schema.books.find(id).destroy();

//         return {
//           id,
//           message: `Successfully delete document with id: ${id}`,
//         };
//       });
//     },
//   });
// };

// declare global {
//   interface IMirageServerConfigs {
//     readonly environment?: 'development' | 'test';
//     readonly delay?: number;
//   }

//   type TypeMirageServer = Server; // eslint-disable-line @typescript-eslint/no-type-alias -- 'Server' is too generic
// }

// // Using CommonJS export rather than ES6 since this is dynamically required based on NODE_ENV
// module.exports = devApiServer;
