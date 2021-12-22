declare namespace SourceMappedStacktrace
{
    /**
     * Re-map entries in a stacktrace using sourcemaps if available.
     * @param {string|string[]} stack Array of strings from the browser's stack representation.
     * @param {(stack: string[]) => void} done Callback invoked with the transformed stacktrace (an Array of Strings) passed as the first argument
     * @param {{cacheGlobally?: boolean, filter?: Function}} opts Optional options object containing
     */
    function mapStackTrace(stack: string|string[], done: (stack: string[]) => void, opts?: {cacheGlobally?: boolean, filter?: Function});
}

declare module 'sourcemapped-stacktrace'
{
    export = SourceMappedStacktrace;
}