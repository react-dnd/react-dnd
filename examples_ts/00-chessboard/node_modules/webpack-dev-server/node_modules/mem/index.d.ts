export interface CacheStorage<
	KeyType extends unknown,
	ValueType extends unknown
> {
	has(key: KeyType): boolean;
	get(key: KeyType): ValueType | undefined;
	set(key: KeyType, value: ValueType): void;
	delete(key: KeyType): void;
	clear?: () => void;
}

export interface Options<
	ArgumentsType extends unknown[],
	CacheKeyType extends unknown,
	ReturnType extends unknown
> {
	/**
	 * Milliseconds until the cache expires.
	 *
	 * @default Infinity
	 */
	readonly maxAge?: number;

	/**
	 * Determines the cache key for storing the result based on the function arguments. By default, if there's only one argument and it's a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), it's used directly as a key, otherwise it's all the function arguments JSON stringified as an array.
	 *
	 * You could for example change it to only cache on the first argument `x => JSON.stringify(x)`.
	 */
	readonly cacheKey?: (...arguments: ArgumentsType) => CacheKeyType;

	/**
	 * Use a different cache storage. Must implement the following methods: `.has(key)`, `.get(key)`, `.set(key, value)`, `.delete(key)`, and optionally `.clear()`. You could for example use a `WeakMap` instead or [`quick-lru`](https://github.com/sindresorhus/quick-lru) for a LRU cache.
	 *
	 * @default new Map()
	 */
	readonly cache?: CacheStorage<CacheKeyType, ReturnType>;

	/**
	 * Cache rejected promises.
	 *
	 * @default false
	 */
	readonly cachePromiseRejection?: boolean;
}

/**
 * [Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.
 *
 * @param fn - Function to be memoized.
 */
declare const mem: {
	<
		ArgumentsType extends unknown[],
		ReturnType extends unknown,
		CacheKeyType extends unknown
	>(
		fn: (...arguments: ArgumentsType) => ReturnType,
		options?: Options<ArgumentsType, CacheKeyType, ReturnType>
	): (...arguments: ArgumentsType) => ReturnType;

	/**
	 * Clear all cached data of a memoized function.
	 *
	 * @param fn - Memoized function.
	 */
	clear<ArgumentsType extends unknown[], ReturnType extends unknown>(
		fn: (...arguments: ArgumentsType) => ReturnType
	): void;
};

export default mem;
