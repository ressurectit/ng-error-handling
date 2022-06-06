import type * as middlewares from '../middlewares';

/**
 * Array of middleware names that are available in error-handling library
 */
export type middlewareTypes = keyof typeof middlewares;
