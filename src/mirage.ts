import { Server } from 'miragejs';

import { mockList } from '../__mocks__/data';

export const devApiServer = () =>
  new Server({
    routes(): void {
      this.namespace = 'api';

      this.get('/books', () => mockList);
    },
  });
