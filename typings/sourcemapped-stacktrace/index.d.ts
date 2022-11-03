export as namespace SourceMappedStacktrace;

/**
 * Re-map entries in a stacktrace using sourcemaps if available.
 * @param stack - Array of strings from the browser's stack representation.
 * @param done - Callback invoked with the transformed stacktrace (an Array of Strings) passed as the first argument
 * @param opts - Optional options object containing
 */
export function mapStackTrace(stack: string|string[], done: (stack: string[]) => void, opts?: {cacheGlobally?: boolean, filter?: Function}): void;