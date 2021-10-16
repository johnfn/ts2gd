
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
 * **Note:** The default values of [member seed] and [member state] properties are pseudo-random, and changes when calling [method randomize]. The `0` value documented here is a placeholder, and not the actual default seed.
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
 * **Note:** The default values of [member seed] and [member state] properties are pseudo-random, and changes when calling [method randomize]. The `0` value documented here is a placeholder, and not the actual default seed.
 *
*/
  "new"(): RandomNumberGenerator;
  static "new"(): RandomNumberGenerator;



/**
 * Initializes the random number generator state based on the given seed value. A given seed will give a reproducible sequence of pseudo-random numbers.
 *
 * **Note:** The RNG does not have an avalanche effect, and can output similar random streams given similar seeds. Consider using a hash function to improve your seed quality if they're sourced externally.
 *
 * **Note:** Setting this property produces a side effect of changing the internal [member state], so make sure to initialize the seed **before** modifying the [member state]:
 *
 * @example 
 * 
 * var rng = RandomNumberGenerator.new()
 * rng.seed = hash("Godot")
 * rng.state = 100 # Restore to some previously saved state.
 * @summary 
 * 
 *
 * **Warning:** the getter of this property returns the previous [member state], and not the initial seed value, which is going to be fixed in Godot 4.0.
 *
*/
seed: int;

/**
 * The current state of the random number generator. Save and restore this property to restore the generator to a previous state:
 *
 * @example 
 * 
 * var rng = RandomNumberGenerator.new()
 * print(rng.randf())
 * var saved_state = rng.state # Store current state.
 * print(rng.randf()) # Advance internal state.
 * rng.state = saved_state # Restore the state.
 * print(rng.randf()) # Prints the same value as in previous.
 * @summary 
 * 
 *
 * **Note:** Do not set state to arbitrary values, since the random number generator requires the state to have certain qualities to behave properly. It should only be set to values that came from the state property itself. To initialize the random number generator with arbitrary input, use [member seed] instead.
 *
*/
state: int;

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

  // connect<T extends SignalsOf<RandomNumberGenerator>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<RandomNumberGeneratorSignals>>(signal: T, method: SignalFunction<RandomNumberGeneratorSignals[T]>): number;




}

declare class RandomNumberGeneratorSignals extends ReferenceSignals {
  
}
