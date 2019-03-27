/**
 * Make a function mimic another one. It will copy over the properties `name`, `length`, `displayName`, and any custom properties you may have set.
 *
 * @param to - Mimicking function.
 * @param from - Function to mimic.
 * @returns The modified `to` function.
 */
export default function mimicFn<
	ArgumentsType extends unknown[],
	ReturnType,
	FunctionType extends (...arguments: ArgumentsType) => ReturnType
>(
	to: (...arguments: ArgumentsType) => ReturnType,
	from: FunctionType
): FunctionType;
