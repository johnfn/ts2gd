
/**
 * Signed 64-bit integer type.
 *
 * It can take values in the interval `[-2^63, 2^63 - 1]`, i.e. `[-9223372036854775808, 9223372036854775807]`. Exceeding those bounds will wrap around.
 *
 * [int] is a [Variant] type, and will thus be used when assigning an integer value to a [Variant]. It can also be enforced with the `: int` type hint.
 *
 * @example 
 * 
 * var my_variant = 0 # int, value 0.
 * my_variant += 4.2 # float, value 4.2.
 * var my_int: int = 1 # int, value 1.
 * my_int = 4.2 # int, value 4, the right value is implicitly cast to int.
 * my_int = int("6.7") # int, value 6, the String is explicitly cast with int.
 * var max_int = 9223372036854775807
 * print(max_int) # 9223372036854775807, OK.
 * max_int += 1
 * print(max_int) # -9223372036854775808, we overflowed and wrapped around.
 * @summary 
 * 
 *
*/
declare class int {

  
/**
 * Signed 64-bit integer type.
 *
 * It can take values in the interval `[-2^63, 2^63 - 1]`, i.e. `[-9223372036854775808, 9223372036854775807]`. Exceeding those bounds will wrap around.
 *
 * [int] is a [Variant] type, and will thus be used when assigning an integer value to a [Variant]. It can also be enforced with the `: int` type hint.
 *
 * @example 
 * 
 * var my_variant = 0 # int, value 0.
 * my_variant += 4.2 # float, value 4.2.
 * var my_int: int = 1 # int, value 1.
 * my_int = 4.2 # int, value 4, the right value is implicitly cast to int.
 * my_int = int("6.7") # int, value 6, the String is explicitly cast with int.
 * var max_int = 9223372036854775807
 * print(max_int) # 9223372036854775807, OK.
 * max_int += 1
 * print(max_int) # -9223372036854775808, we overflowed and wrapped around.
 * @summary 
 * 
 *
*/

  constructor(from: boolean);
  constructor(from: float);
  constructor(from: string);
  static "new"(): int;










  connect<T extends SignalsOf<int>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
