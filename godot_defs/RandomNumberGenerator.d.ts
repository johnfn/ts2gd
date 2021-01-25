
/**
 * RandomNumberGenerator is a class for generating pseudo-random numbers. It currently uses [url=http://www.pcg-random.org/]PCG32[/url].
 *
 * **Note:** The underlying algorithm is an implementation detail. As a result, it should not be depended upon for reproducible random streams across Godot versions.
 *
 * To generate a random float number (within a given range) based on a time-dependant seed:
 *
 * @example 
 * 
 * var rng = RandomNumberGenerator.new()
 * func _ready():
 *     rng.randomize()
 *     var my_random_number = rng.randf_range(-10.0, 10.0)
 * @summary 
 * 
 *
*/
declare class RandomNumberGenerator extends Reference {

  
/**
 * RandomNumberGenerator is a class for generating pseudo-random numbers. It currently uses [url=http://www.pcg-random.org/]PCG32[/url].
 *
 * **Note:** The underlying algorithm is an implementation detail. As a result, it should not be depended upon for reproducible random streams across Godot versions.
 *
 * To generate a random float number (within a given range) based on a time-dependant seed:
 *
 * @example 
 * 
 * var rng = RandomNumberGenerator.new()
 * func _ready():
 *     rng.randomize()
 *     var my_random_number = rng.randf_range(-10.0, 10.0)
 * @summary 
 * 
 *
*/
  "new"(): RandomNumberGenerator;
  static "new"(): RandomNumberGenerator;



/**
 * The seed used by the random number generator. A given seed will give a reproducible sequence of pseudo-random numbers.
 *
 * **Note:** The RNG does not have an avalanche effect, and can output similar random streams given similar seeds. Consider using a hash function to improve your seed quality if they're sourced externally.
 *
*/
seed: int;

/** Generates a pseudo-random float between [code]0.0[/code] and [code]1.0[/code] (inclusive). */
randf(): float;

/** Generates a pseudo-random float between [code]from[/code] and [code]to[/code] (inclusive). */
randf_range(from: float, to: float): float;

/** Generates a [url=https://en.wikipedia.org/wiki/Normal_distribution]normally-distributed[/url] pseudo-random number, using Box-Muller transform with the specified [code]mean[/code] and a standard [code]deviation[/code]. This is also called Gaussian distribution. */
randfn(mean?: float, deviation?: float): float;

/** Generates a pseudo-random 32-bit unsigned integer between [code]0[/code] and [code]4294967295[/code] (inclusive). */
randi(): int;

/** Generates a pseudo-random 32-bit signed integer between [code]from[/code] and [code]to[/code] (inclusive). */
randi_range(from: int, to: int): int;

/** Setups a time-based seed to generator. */
randomize(): void;

  connect<T extends SignalsOf<RandomNumberGenerator>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
