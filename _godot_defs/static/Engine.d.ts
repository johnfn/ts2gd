
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



/**
 * If `true`, the script is currently running inside the editor. This is useful for `tool` scripts to conditionally draw editor helpers, or prevent accidentally running "game" code that would affect the scene state while in the editor:
 *
 * @example 
 * 
 * if Engine.editor_hint:
 *     draw_gizmos()
 * else:
 *     simulate_physics()
 * @summary 
 * 
 *
 * See [url=https://docs.godotengine.org/en/3.4/tutorials/misc/running_code_in_the_editor.html]Running code in the editor[/url] in the documentation for more information.
 *
 * **Note:** To detect whether the script is run from an editor **build** (e.g. when pressing `F5`), use [method OS.has_feature] with the `"editor"` argument instead. `OS.has_feature("editor")` will evaluate to `true` both when the code is running in the editor and when running the project from the editor, but it will evaluate to `false` when the code is run from an exported project.
 *
*/
editor_hint: boolean;

/** The number of fixed iterations per second. This controls how often physics simulation and [method Node._physics_process] methods are run. This value should generally always be set to [code]60[/code] or above, as Godot doesn't interpolate the physics step. As a result, values lower than [code]60[/code] will look stuttery. This value can be increased to make input more reactive or work around tunneling issues, but keep in mind doing so will increase CPU usage. */
iterations_per_second: int;

/**
 * Controls how much physics ticks are synchronized with real time. For 0 or less, the ticks are synchronized. Such values are recommended for network games, where clock synchronization matters. Higher values cause higher deviation of the in-game clock and real clock but smooth out framerate jitters. The default value of 0.5 should be fine for most; values above 2 could cause the game to react to dropped frames with a noticeable delay and are not recommended.
 *
 * **Note:** For best results, when using a custom physics interpolation solution, the physics jitter fix should be disabled by setting [member physics_jitter_fix] to `0`.
 *
*/
physics_jitter_fix: float;

/**
 * If `false`, stops printing error and warning messages to the console and editor Output log. This can be used to hide error and warning messages during unit test suite runs. This property is equivalent to the [member ProjectSettings.application/run/disable_stderr] project setting.
 *
 * **Warning:** If you set this to `false` anywhere in the project, important error messages may be hidden even if they are emitted from other scripts. If this is set to `false` in a `@tool` script, this will also impact the editor itself. Do **not** report bugs before ensuring error messages are enabled (as they are by default).
 *
 * **Note:** This property does not impact the editor's Errors tab when running a project from the editor.
 *
*/
print_error_messages: boolean;

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
get_author_info(): Dictionary<any, any>;

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
get_donor_info(): Dictionary<any, any>;

/** Returns the total number of frames drawn. On headless platforms, or if the render loop is disabled with [code]--disable-render-loop[/code] via command line, [method get_frames_drawn] always returns [code]0[/code]. See [method get_idle_frames]. */
get_frames_drawn(): int;

/** Returns the frames per second of the running game. */
get_frames_per_second(): float;

/**
 * Returns the total number of frames passed since engine initialization which is advanced on each **idle frame**, regardless of whether the render loop is enabled. See also [method get_frames_drawn] and [method get_physics_frames].
 *
 * [method get_idle_frames] can be used to run expensive logic less often without relying on a [Timer]:
 *
 * @example 
 * 
 * func _process(_delta):
 *     if Engine.get_idle_frames() % 2 == 0:
 *         pass  # Run expensive logic only once every 2 idle (render) frames here.
 * @summary 
 * 
 *
*/
get_idle_frames(): int;

/** Returns Dictionary of licenses used by Godot and included third party components. */
get_license_info(): Dictionary<any, any>;

/** Returns Godot license text. */
get_license_text(): string;

/** Returns the main loop object (see [MainLoop] and [SceneTree]). */
get_main_loop(): MainLoop;

/**
 * Returns the total number of frames passed since engine initialization which is advanced on each **physics frame**. See also [method get_idle_frames].
 *
 * [method get_physics_frames] can be used to run expensive logic less often without relying on a [Timer]:
 *
 * @example 
 * 
 * func _physics_process(_delta):
 *     if Engine.get_physics_frames() % 2 == 0:
 *         pass  # Run expensive logic only once every 2 physics frames here.
 * @summary 
 * 
 *
*/
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
get_version_info(): Dictionary<any, any>;

/** Returns [code]true[/code] if a singleton with given [code]name[/code] exists in global scope. */
has_singleton(name: string): boolean;

/** Returns [code]true[/code] if the game is inside the fixed process and physics phase of the game loop. */
is_in_physics_frame(): boolean;

  // connect<T extends SignalsOf<EngineClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EngineClassSignals>>(signal: T, method: SignalFunction<EngineClassSignals[T]>): number;




}

declare class EngineClassSignals extends ObjectSignals {
  
}
