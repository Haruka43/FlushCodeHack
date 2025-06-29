import '@testing-library/jest-dom';

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'expect' {
  interface Matchers<R extends void | Promise<void>, T = unknown>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}

jest.mock('winston', () => {
  const debug = jest.fn();
  const info = jest.fn();
  const error = jest.fn();

  const logger = {
    debug,
    info,
    error,
  };

  return {
    format: {
      colorize: jest.fn(),
      combine: jest.fn(),
      label: jest.fn(),
      timestamp: jest.fn(),
      printf: jest.fn(),
      prettyPrint: jest.fn(),
    },
    createLogger: jest.fn().mockReturnValue(logger),
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});
