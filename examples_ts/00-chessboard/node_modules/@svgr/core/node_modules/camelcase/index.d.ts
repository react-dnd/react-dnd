export interface Options {
	/**
	 * Uppercase the first character: `foo-bar` → `FooBar`.
	 *
	 * @default false
	 */
	readonly pascalCase?: boolean;
}

/**
 * Convert a dash/dot/underscore/space separated string to camelCase or PascalCase: `foo-bar` → `fooBar`.
 *
 * @param input - String to convert to camel case.
 */
export default function camelcase(
	input: string | ReadonlyArray<string>,
	options?: Options
): string;
