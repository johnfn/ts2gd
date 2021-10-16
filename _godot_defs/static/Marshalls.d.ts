
/**
 * Provides data transformation and encoding utility functions.
 *
*/
declare class MarshallsClass extends Object {

  
/**
 * Provides data transformation and encoding utility functions.
 *
*/
  "new"(): MarshallsClass;
  static "new"(): MarshallsClass;




/** Returns a decoded [PoolByteArray] corresponding to the Base64-encoded string [code]base64_str[/code]. */
base64_to_raw(base64_str: string): PoolByteArray;

/** Returns a decoded string corresponding to the Base64-encoded string [code]base64_str[/code]. */
base64_to_utf8(base64_str: string): string;

/**
 * Returns a decoded [Variant] corresponding to the Base64-encoded string `base64_str`. If `allow_objects` is `true`, decoding objects is allowed.
 *
 * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
 *
*/
base64_to_variant(base64_str: string, allow_objects?: boolean): any;

/** Returns a Base64-encoded string of a given [PoolByteArray]. */
raw_to_base64(array: PoolByteArray): string;

/** Returns a Base64-encoded string of the UTF-8 string [code]utf8_str[/code]. */
utf8_to_base64(utf8_str: string): string;

/** Returns a Base64-encoded string of the [Variant] [code]variant[/code]. If [code]full_objects[/code] is [code]true[/code], encoding objects is allowed (and can potentially include code). */
variant_to_base64(variant: any, full_objects?: boolean): string;

  // connect<T extends SignalsOf<MarshallsClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<MarshallsClassSignals>>(signal: T, method: SignalFunction<MarshallsClassSignals[T]>): number;




}

declare class MarshallsClassSignals extends ObjectSignals {
  
}
