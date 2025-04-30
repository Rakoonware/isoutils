/**
 * Represents a recursive partial type that makes all properties of a given type `T` optional,
 * including nested properties. The `DeepPartial` type works by traversing the structure
 * of the provided type and applying optionality to each property, regardless of its depth.
 *
 * @template T The base type to recursively make optional.
 */
export type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>
} : T;

/**
 * A utility type that recursively makes all properties of an object required.
 *
 * DeepRequired ensures that all properties of an object, including properties of nested objects, are non-optional.
 * This is useful when working with types where optional properties need to be fully defined and assigned.
 *
 * @template T - The type whose properties are to be made required.
 */
export type DeepRequired<T> = T extends object ? {
	[P in keyof T]-?: DeepRequired<T[P]>
} : T;

/**
 * A utility type that recursively makes all properties of an object type `T` deeply readonly.
 * The `DeepReadonly` type applies the `readonly` modifier to every nested property of `T`.
 *
 * If the type `T` is not an object, it will remain unchanged.
 *
 * @template T - The type whose properties should be recursively made readonly.
 */
export type DeepReadonly<T> = T extends object ? {
	readonly [P in keyof T]: DeepReadonly<T[P]>
} : T;

/**
 * Removes all properties with the specified value from the given object. If the `deep` parameter is `true`,
 * this operation may be extended to deeply nested objects (implementation omitted in the current logic).
 *
 * @param obj The object from which properties with the specified value will be removed.
 * @param value The value that will be compared to before deletion.
 * @param [deep=false] A boolean indicating whether to perform a deep removal of properties with the specified value.
 * @return The original object with all properties with the specified value removed.
 */
function removeValues<O extends { [key: string]: any }>(obj: O, value: any, deep: boolean = false): O {
	for (const [key] of Object.entries(obj)) {
		if (obj[key] === value)
			delete obj[key];
		else if (deep && typeof obj[key] === "object") {
			removeValues(obj[key], value, true);

			// If the nested object becomes empty, you can choose to delete it too:
			if (
				typeof obj[key] === "object" &&
				obj[key] !== null &&
				Object.keys(obj[key]).length === 0
			)
				delete obj[key];
		}
	}

	return obj;
}

namespace isoutils {

	/**
	 * Removes all properties with `undefined` values from the given object. If the `deep` parameter is `true`,
	 * this operation may be extended to deeply nested objects (implementation omitted in the current logic).
	 *
	 * @param obj The object from which `undefined` properties will be removed.
	 * @param [deep=false] A boolean indicating whether to perform a deep removal of `undefined` properties.
	 * @return The original object with all `undefined` properties removed.
	 */
	export function removeUndefined<T extends { [key: string]: any }>(obj: T, deep: boolean = false): T {
		return removeValues(obj, undefined, deep);
	}

	/**
	 * Removes all properties with `null` values from the given object. If the `deep` parameter is `true`,
	 * this operation may be extended to deeply nested objects (implementation omitted in the current logic).
	 *
	 * @param obj The object from which `null` properties will be removed.
	 * @param [deep=false] A boolean indicating whether to perform a deep removal of `null` properties.
	 * @return The original object with all `null` properties removed.
	 */
	export function removeNull<T extends { [key: string]: any }>(obj: T, deep: boolean = false): T {
		return removeValues(obj, null, deep);
	}
}

export default isoutils;
