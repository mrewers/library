import { Server } from 'miragejs';

import { mockBooks, mockReaders } from '../__mocks__/data';

export enum EnvOptions {
  DEV = 'development',
  TEST = 'test',
}

interface IMirageServerConfigs {
  readonly environment?: EnvOptions;
  readonly delay?: number;
}

export const devApiServer = ({ environment, delay }: IMirageServerConfigs): Server => {
  // Sets the timing on the server response if provided, otherwise uses the default response time
  // Default delay is 0.3 seconds, unless the environment is set to test in which case it's zero seconds
  const defaultTiming = environment === EnvOptions.DEV ? 0 : 300;
  const timing = delay || defaultTiming;

  return new Server({
    environment,

    routes(): void {
      this.namespace = 'api';

      // Get routes
      this.get('/books', () => mockBooks, { timing });
      this.get('/readers', () => mockReaders, { timing });
    },
  });
};
