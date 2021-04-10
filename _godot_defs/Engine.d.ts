
/**
 * The [Engine] singleton allows you to query and modify the project's run-time parameters, such as frames per second, time scale, and others.
 *
*/
declare class EngineClass extends Object {

  
/**
 * The [Engine] singleton allows you to query and modify the project's run-time parameters, such as frames per second, time scale, and others.
 *
*/
  "new"(): EngineClass;
  static "new"(): EngineClass;



/** If [code]true[/code], it is running inside the editor. Useful for tool scripts. */
editor_hint: boolean;

/** The number of fixed iterations per second. This controls how often physics simulation and [method Node._physics_process] methods are run. This value should generally always be set to [code]60[/code] or above, as Godot doesn't interpolate the physics step. As a result, values lower than [code]60[/code] will look stuttery. This value can be increased to make input more reactive or work around tunneling issues, but keep in mind doing so will increase CPU usage. */
iterations_per_second: int;

/** Controls how much physics ticks are synchronized with real time. For 0 or less, the ticks are synchronized. Such values are recommended for network games, where clock synchronization matters. Higher values cause higher deviation of in-game clock and real clock, but allows to smooth out framerate jitters. The default value of 0.5 should be fine for most; values above 2 could cause the game to react to dropped frames with a noticeable delay and are not recommended. */
physics_jitter_fix: float;

/** The desired frames per second. If the hardware cannot keep up, this setting may not be respected. A value of 0 means no limit. */
target_fps: int;

/** Controls how fast or slow the in-game clock ticks versus the real life one. It defaults to 1.0. A value of 2.0 means the game moves twice as fast as real life, whilst a value of 0.5 means the game moves at half the regular speed. */
time_scale: float;

/**
 * Returns engine author information in a Dictionary.
 *
 * `lead_developers`    - Array of Strings, lead developer names
 *
 * `founders`           - Array of Strings, founder names
 *
 * `project_managers`   - Array of Strings, project manager names
 *
 * `developers`         - Array of Strings, developer names
 *
*/
get_author_info(): Dictionary;

/**
 * Returns an Array of copyright information Dictionaries.
 *
 * `name`    - String, component name
 *
 * `parts`   - Array of Dictionaries {`files`, `copyright`, `license`} describing subsections of the component
 *
*/
get_copyright_info(): any[];

/**
 * Returns a Dictionary of Arrays of donor names.
 *
 * {`platinum_sponsors`, `gold_sponsors`, `silver_sponsors`, `bronze_sponsors`, `mini_sponsors`, `gold_donors`, `silver_donors`, `bronze_donors`}
 *
*/
get_donor_info(): Dictionary;

/** Returns the total number of frames drawn. If the render loop is disabled with [code]--disable-render-loop[/code] via command line, this returns [code]0[/code]. See also [method get_idle_frames]. */
get_frames_drawn(): int;

/** Returns the frames per second of the running game. */
get_frames_per_second(): float;

/** Returns the total number of frames passed since engine initialization which is advanced on each [b]idle frame[/b], regardless of whether the render loop is enabled. See also [method get_frames_drawn]. */
get_idle_frames(): int;

/** Returns Dictionary of licenses used by Godot and included third party components. */
get_license_info(): Dictionary;

/** Returns Godot license text. */
get_license_text(): string;

/** Returns the main loop object (see [MainLoop] and [SceneTree]). */
get_main_loop(): MainLoop;

/** Returns the total number of frames passed since engine initialization which is advanced on each [b]physics frame[/b]. */
get_physics_frames(): int;

/** Returns the fraction through the current physics tick we are at the time of rendering the frame. This can be used to implement fixed timestep interpolation. */
get_physics_interpolation_fraction(): float;

/** Returns a global singleton with given [code]name[/code]. Often used for plugins, e.g. [code]GodotPayment[/code] on Android. */
get_singleton(name: string): Object;

/**
 * Returns the current engine version information in a Dictionary.
 *
 * `major`    - Holds the major version number as an int
 *
 * `minor`    - Holds the minor version number as an int
 *
 * `patch`    - Holds the patch version number as an int
 *
 * `hex`      - Holds the full version number encoded as a hexadecimal int with one byte (2 places) per number (see example below)
 *
 * `status`   - Holds the status (e.g. "beta", "rc1", "rc2", ... "stable") as a String
 *
 * `build`    - Holds the build name (e.g. "custom_build") as a String
 *
 * `hash`     - Holds the full Git commit hash as a String
 *
 * `year`     - Holds the year the version was released in as an int
 *
 * `string`   - `major` + `minor` + `patch` + `status` + `build` in a single String
 *
 * The `hex` value is encoded as follows, from left to right: one byte for the major, one byte for the minor, one byte for the patch version. For example, "3.1.12" would be `0x03010C`. **Note:** It's still an int internally, and printing it will give you its decimal representation, which is not particularly meaningful. Use hexadecimal literals for easy version comparisons from code:
 *
 * @example 
 * 
 * if Engine.get_version_info().hex >= 0x030200:
 *     # Do things specific to version 3.2 or later
 * else:
 *     # Do things specific to versions before 3.2
 * @summary 
 * 
 *
*/
get_version_info(): Dictionary;

/** Returns [code]true[/code] if a singleton with given [code]name[/code] exists in global scope. */
has_singleton(name: string): boolean;

/** Returns [code]true[/code] if the game is inside the fixed process and physics phase of the game loop. */
is_in_physics_frame(): boolean;

  connect<T extends SignalsOf<EngineClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
