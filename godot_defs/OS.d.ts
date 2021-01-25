
/**
 * Operating System functions. OS wraps the most common functionality to communicate with the host operating system, such as the clipboard, video driver, date and time, timers, environment variables, execution of binaries, command line, etc.
 *
*/
declare class OSClass extends Object {

  
/**
 * Operating System functions. OS wraps the most common functionality to communicate with the host operating system, such as the clipboard, video driver, date and time, timers, environment variables, execution of binaries, command line, etc.
 *
*/
  "new"(): OSClass;
  static "new"(): OSClass;



/** The clipboard from the host OS. Might be unavailable on some platforms. */
clipboard: string;

/** The current screen index (starting from 0). */
current_screen: int;

/**
 * The exit code passed to the OS when the main loop exits. By convention, an exit code of `0` indicates success whereas a non-zero exit code indicates an error. For portability reasons, the exit code should be set between 0 and 125 (inclusive).
 *
 * **Note:** This value will be ignored if using [method SceneTree.quit] with an `exit_code` argument passed.
 *
*/
exit_code: int;

/** If [code]true[/code], the engine tries to keep the screen on while the game is running. Useful on mobile. */
keep_screen_on: boolean;

/** If [code]true[/code], the engine optimizes for low processor usage by only refreshing the screen if needed. Can improve battery consumption on mobile. */
low_processor_usage_mode: boolean;

/** The amount of sleeping between frames when the low-processor usage mode is enabled (in microseconds). Higher values will result in lower CPU usage. */
low_processor_usage_mode_sleep_usec: int;

/** The maximum size of the window (without counting window manager decorations). Does not affect fullscreen mode. Set to [code](0, 0)[/code] to reset to the system default value. */
max_window_size: Vector2;

/** The minimum size of the window (without counting window manager decorations). Does not affect fullscreen mode. Set to [code](0, 0)[/code] to reset to the system default value. */
min_window_size: Vector2;

/** The current screen orientation. */
screen_orientation: int;

/** The current tablet drvier in use. */
tablet_driver: string;

/** If [code]true[/code], vertical synchronization (Vsync) is enabled. */
vsync_enabled: boolean;

/**
 * If `true` and `vsync_enabled` is true, the operating system's window compositor will be used for vsync when the compositor is enabled and the game is in windowed mode.
 *
 * **Note:** This option is experimental and meant to alleviate stutter experienced by some users. However, some users have experienced a Vsync framerate halving (e.g. from 60 FPS to 30 FPS) when using it.
 *
 * **Note:** This property is only implemented on Windows.
 *
*/
vsync_via_compositor: boolean;

/**
 * If `true`, removes the window frame.
 *
 * **Note:** Setting `window_borderless` to `false` disables per-pixel transparency.
 *
*/
window_borderless: boolean;

/** If [code]true[/code], the window is fullscreen. */
window_fullscreen: boolean;

/** If [code]true[/code], the window is maximized. */
window_maximized: boolean;

/** If [code]true[/code], the window is minimized. */
window_minimized: boolean;

/**
 * If `true`, the window background is transparent and window frame is removed.
 *
 * Use `get_tree().get_root().set_transparent_background(true)` to disable main viewport background rendering.
 *
 * **Note:** This property has no effect if **Project > Project Settings > Display > Window > Per-pixel transparency > Allowed** setting is disabled.
 *
 * **Note:** This property is implemented on HTML5, Linux, macOS and Windows.
 *
*/
window_per_pixel_transparency_enabled: boolean;

/** The window position relative to the screen, the origin is the top left corner, +Y axis goes to the bottom and +X axis goes to the right. */
window_position: Vector2;

/** If [code]true[/code], the window is resizable by the user. */
window_resizable: boolean;

/** The size of the window (without counting window manager decorations). */
window_size: Vector2;

/** Displays a modal dialog box using the host OS' facilities. Execution is blocked until the dialog is closed. */
alert(text: string, title?: string): void;

/** Returns [code]true[/code] if the host OS allows drawing. */
can_draw(): boolean;

/** Returns [code]true[/code] if the current host platform is using multiple threads. */
can_use_threads(): boolean;

/** Centers the window on the screen if in windowed mode. */
center_window(): void;

/**
 * Shuts down system MIDI driver.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
close_midi_inputs(): void;

/** Delay execution of the current thread by [code]msec[/code] milliseconds. */
delay_msec(msec: int): void;

/** Delay execution of the current thread by [code]usec[/code] microseconds. */
delay_usec(usec: int): void;

/**
 * Dumps the memory allocation ringlist to a file (only works in debug).
 *
 * Entry format per line: "Address - Size - Description".
 *
*/
dump_memory_to_file(file: string): void;

/**
 * Dumps all used resources to file (only works in debug).
 *
 * Entry format per line: "Resource Type : Resource Location".
 *
 * At the end of the file is a statistic of all used Resource Types.
 *
*/
dump_resources_to_file(file: string): void;

/**
 * Execute the file at the given path with the arguments passed as an array of strings. Platform path resolution will take place. The resolved file must exist and be executable.
 *
 * The arguments are used in the given order and separated by a space, so `OS.execute("ping", ["-w", "3", "godotengine.org"], false)` will resolve to `ping -w 3 godotengine.org` in the system's shell.
 *
 * This method has slightly different behavior based on whether the `blocking` mode is enabled.
 *
 * If `blocking` is `true`, the Godot thread will pause its execution while waiting for the process to terminate. The shell output of the process will be written to the `output` array as a single string. When the process terminates, the Godot thread will resume execution.
 *
 * If `blocking` is `false`, the Godot thread will continue while the new process runs. It is not possible to retrieve the shell output in non-blocking mode, so `output` will be empty.
 *
 * The return value also depends on the blocking mode. When blocking, the method will return an exit code of the process. When non-blocking, the method returns a process ID, which you can use to monitor the process (and potentially terminate it with [method kill]). If the process forking (non-blocking) or opening (blocking) fails, the method will return `-1` or another exit code.
 *
 * Example of blocking mode and retrieving the shell output:
 *
 * @example 
 * 
 * var output = []
 * var exit_code = OS.execute("ls", ["-l", "/tmp"], true, output)
 * @summary 
 * 
 *
 * Example of non-blocking mode, running another instance of the project and storing its process ID:
 *
 * @example 
 * 
 * var pid = OS.execute(OS.get_executable_path(), [], false)
 * @summary 
 * 
 *
 * If you wish to access a shell built-in or perform a composite command, a platform-specific shell can be invoked. For example:
 *
 * @example 
 * 
 * OS.execute("CMD.exe", ["/C", "cd %TEMP% && dir"], true, output)
 * @summary 
 * 
 *
 * **Note:** This method is implemented on Android, iOS, Linux, macOS and Windows.
 *
*/
execute(path: string, arguments: PoolStringArray, blocking?: boolean, output?: any[], read_stderr?: boolean): int;

/** Returns the scancode of the given string (e.g. "Escape"). */
find_scancode_from_string(string: string): int;

/** Returns the total number of available audio drivers. */
get_audio_driver_count(): int;

/** Returns the audio driver name for the given index. */
get_audio_driver_name(driver: int): string;

/**
 * Returns the command-line arguments passed to the engine.
 *
 * Command-line arguments can be written in any form, including both `--key value` and `--key=value` forms so they can be properly parsed, as long as custom command-line arguments do not conflict with engine arguments.
 *
 * You can also incorporate environment variables using the [method get_environment] method.
 *
 * You can set `editor/main_run_args` in the Project Settings to define command-line arguments to be passed by the editor when running the project.
 *
 * Here's a minimal example on how to parse command-line arguments into a dictionary using the `--key=value` form for arguments:
 *
 * @example 
 * 
 * var arguments = {}
 * for argument in OS.get_cmdline_args():
 *     if argument.find("=") > -1:
 *         var key_value = argument.split("=")
 *         arguments[key_value[0].lstrip("--")] = key_value[1]
 * @summary 
 * 
 *
*/
get_cmdline_args(): PoolStringArray;

/**
 * Returns an array of MIDI device names.
 *
 * The returned array will be empty if the system MIDI driver has not previously been initialised with [method open_midi_inputs].
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
get_connected_midi_inputs(): PoolStringArray;

/** Returns the currently used video driver, using one of the values from [enum VideoDriver]. */
get_current_video_driver(): int;

/** Returns current date as a dictionary of keys: [code]year[/code], [code]month[/code], [code]day[/code], [code]weekday[/code], [code]dst[/code] (Daylight Savings Time). */
get_date(utc?: boolean): Dictionary;

/** Returns current datetime as a dictionary of keys: [code]year[/code], [code]month[/code], [code]day[/code], [code]weekday[/code], [code]dst[/code] (Daylight Savings Time), [code]hour[/code], [code]minute[/code], [code]second[/code]. */
get_datetime(utc?: boolean): Dictionary;

/**
 * Gets a dictionary of time values corresponding to the given UNIX epoch time (in seconds).
 *
 * The returned Dictionary's values will be the same as [method get_datetime], with the exception of Daylight Savings Time as it cannot be determined from the epoch.
 *
*/
get_datetime_from_unix_time(unix_time_val: int): Dictionary;

/** Returns the total amount of dynamic memory used (only works in debug). */
get_dynamic_memory_usage(): int;

/** Returns an environment variable. */
get_environment(environment: string): string;

/** Returns the path to the current engine executable. */
get_executable_path(): string;

/**
 * With this function you can get the list of dangerous permissions that have been granted to the Android application.
 *
 * **Note:** This method is implemented on Android.
 *
*/
get_granted_permissions(): PoolStringArray;

/**
 * Returns the IME cursor position (the currently-edited portion of the string) relative to the characters in the composition string.
 *
 * [constant MainLoop.NOTIFICATION_OS_IME_UPDATE] is sent to the application to notify it of changes to the IME cursor position.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
get_ime_selection(): Vector2;

/**
 * Returns the IME intermediate composition string.
 *
 * [constant MainLoop.NOTIFICATION_OS_IME_UPDATE] is sent to the application to notify it of changes to the IME composition string.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
get_ime_text(): string;

/**
 * Returns the current latin keyboard variant as a String.
 *
 * Possible return values are: `"QWERTY"`, `"AZERTY"`, `"QZERTY"`, `"DVORAK"`, `"NEO"`, `"COLEMAK"` or `"ERROR"`.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows. Returns `"QWERTY"` on unsupported platforms.
 *
*/
get_latin_keyboard_variant(): string;

/** Returns the host OS locale. */
get_locale(): string;

/**
 * Returns the model name of the current device.
 *
 * **Note:** This method is implemented on Android and iOS. Returns `"GenericDevice"` on unsupported platforms.
 *
*/
get_model_name(): string;

/** Returns the name of the host OS. Possible values are: [code]"Android"[/code], [code]"iOS"[/code], [code]"HTML5"[/code], [code]"OSX"[/code], [code]"Server"[/code], [code]"Windows"[/code], [code]"UWP"[/code], [code]"X11"[/code]. */
get_name(): string;

/**
 * Returns the amount of battery left in the device as a percentage. Returns `-1` if power state is unknown.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
get_power_percent_left(): int;

/**
 * Returns an estimate of the time left in seconds before the device runs out of battery. Returns `-1` if power state is unknown.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
get_power_seconds_left(): int;

/**
 * Returns the current state of the device regarding battery and power. See [enum PowerState] constants.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
get_power_state(): int;

/**
 * Returns the project's process ID.
 *
 * **Note:** This method is implemented on Android, iOS, Linux, macOS and Windows.
 *
*/
get_process_id(): int;

/** Returns the number of threads available on the host machine. */
get_processor_count(): int;

/** Returns the window size including decorations like window borders. */
get_real_window_size(): Vector2;

/**
 * Returns the given scancode as a string (e.g. Return values: `"Escape"`, `"Shift+Escape"`).
 *
 * See also [member InputEventKey.scancode] and [method InputEventKey.get_scancode_with_modifiers].
 *
*/
get_scancode_string(code: int): string;

/** Returns the number of displays attached to the host machine. */
get_screen_count(): int;

/**
 * Returns the dots per inch density of the specified screen. If `screen` is `-1` (the default value), the current screen will be used.
 *
 * On Android devices, the actual screen densities are grouped into six generalized densities:
 *
 * @example 
 * 
 *    ldpi - 120 dpi
 *    mdpi - 160 dpi
 *    hdpi - 240 dpi
 *   xhdpi - 320 dpi
 *  xxhdpi - 480 dpi
 * xxxhdpi - 640 dpi
 * @summary 
 * 
 *
 * **Note:** This method is implemented on Android, Linux, macOS and Windows. Returns `72` on unsupported platforms.
 *
*/
get_screen_dpi(screen?: int): int;

/**
 * Return the greatest scale factor of all screens.
 *
 * **Note:** On macOS returned value is `2.0` if there is at least one hiDPI (Retina) screen in the system, and `1.0` in all other cases.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
get_screen_max_scale(): float;

/** Returns the position of the specified screen by index. If [code]screen[/code] is [/code]-1[/code] (the default value), the current screen will be used. */
get_screen_position(screen?: int): Vector2;

/**
 * Return the scale factor of the specified screen by index. If `screen` is `-1` (the default value), the current screen will be used.
 *
 * **Note:** On macOS returned value is `2.0` for hiDPI (Retina) screen, and `1.0` for all other cases.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
get_screen_scale(screen?: int): float;

/** Returns the dimensions in pixels of the specified screen. If [code]screen[/code] is [/code]-1[/code] (the default value), the current screen will be used. */
get_screen_size(screen?: int): Vector2;

/** Returns the amount of time in milliseconds it took for the boot logo to appear. */
get_splash_tick_msec(): int;

/** Returns the maximum amount of static memory used (only works in debug). */
get_static_memory_peak_usage(): int;

/** Returns the amount of static memory being used by the program in bytes. */
get_static_memory_usage(): int;

/**
 * Returns the actual path to commonly used folders across different platforms. Available locations are specified in [enum SystemDir].
 *
 * **Note:** This method is implemented on Android, Linux, macOS and Windows.
 *
*/
get_system_dir(dir: int): string;

/** Returns the epoch time of the operating system in milliseconds. */
get_system_time_msecs(): int;

/** Returns the epoch time of the operating system in seconds. */
get_system_time_secs(): int;

/**
 * Returns the total number of available tablet drivers.
 *
 * **Note:** This method is implemented on Windows.
 *
*/
get_tablet_driver_count(): int;

/**
 * Returns the tablet driver name for the given index.
 *
 * **Note:** This method is implemented on Windows.
 *
*/
get_tablet_driver_name(idx: int): string;

/** Returns the amount of time passed in milliseconds since the engine started. */
get_ticks_msec(): int;

/** Returns the amount of time passed in microseconds since the engine started. */
get_ticks_usec(): int;

/** Returns current time as a dictionary of keys: hour, minute, second. */
get_time(utc?: boolean): Dictionary;

/** Returns the current time zone as a dictionary with the keys: bias and name. */
get_time_zone_info(): Dictionary;

/**
 * Returns a string that is unique to the device.
 *
 * **Note:** Returns an empty string on HTML5 and UWP, as this method isn't implemented on those platforms yet.
 *
*/
get_unique_id(): string;

/** Returns the current UNIX epoch timestamp. */
get_unix_time(): int;

/**
 * Gets an epoch time value from a dictionary of time values.
 *
 * `datetime` must be populated with the following keys: `year`, `month`, `day`, `hour`, `minute`, `second`.
 *
 * You can pass the output from [method get_datetime_from_unix_time] directly into this function. Daylight Savings Time (`dst`), if present, is ignored.
 *
*/
get_unix_time_from_datetime(datetime: Dictionary): int;

/**
 * Returns the absolute directory path where user data is written (`user://`).
 *
 * On Linux, this is `~/.local/share/godot/app_userdata/[project_name]`, or `~/.local/share/[custom_name]` if `use_custom_user_dir` is set.
 *
 * On macOS, this is `~/Library/Application Support/Godot/app_userdata/[project_name]`, or `~/Library/Application Support/[custom_name]` if `use_custom_user_dir` is set.
 *
 * On Windows, this is `%APPDATA%\Godot\app_userdata\[project_name]`, or `%APPDATA%\[custom_name]` if `use_custom_user_dir` is set. `%APPDATA%` expands to `%USERPROFILE%\AppData\Roaming`.
 *
 * If the project name is empty, `user://` falls back to `res://`.
 *
*/
get_user_data_dir(): string;

/** Returns the number of video drivers supported on the current platform. */
get_video_driver_count(): int;

/** Returns the name of the video driver matching the given [code]driver[/code] index. This index is a value from [enum VideoDriver], and you can use [method get_current_video_driver] to get the current backend's index. */
get_video_driver_name(driver: int): string;

/** Returns the on-screen keyboard's height in pixels. Returns 0 if there is no keyboard or if it is currently hidden. */
get_virtual_keyboard_height(): int;

/** Returns unobscured area of the window where interactive controls should be rendered. */
get_window_safe_area(): Rect2;

/**
 * Add a new item with text "label" to global menu. Use "_dock" menu to add item to the macOS dock icon menu.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
global_menu_add_item(menu: string, label: string, id: any, meta: any): void;

/**
 * Add a separator between items. Separators also occupy an index.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
global_menu_add_separator(menu: string): void;

/**
 * Clear the global menu, in effect removing all items.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
global_menu_clear(menu: string): void;

/**
 * Removes the item at index "idx" from the global menu. Note that the indexes of items after the removed item are going to be shifted by one.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
global_menu_remove_item(menu: string, idx: int): void;

/** Returns [code]true[/code] if an environment variable exists. */
has_environment(environment: string): boolean;

/**
 * Returns `true` if the feature for the given feature tag is supported in the currently running instance, depending on platform, build etc. Can be used to check whether you're currently running a debug build, on a certain platform or arch, etc. Refer to the [url=https://docs.godotengine.org/en/latest/getting_started/workflow/export/feature_tags.html]Feature Tags[/url] documentation for more details.
 *
 * **Note:** Tag names are case-sensitive.
 *
*/
has_feature(tag_name: string): boolean;

/** Returns [code]true[/code] if the device has a touchscreen or emulates one. */
has_touchscreen_ui_hint(): boolean;

/** Returns [code]true[/code] if the platform has a virtual keyboard, [code]false[/code] otherwise. */
has_virtual_keyboard(): boolean;

/** Hides the virtual keyboard if it is shown, does nothing otherwise. */
hide_virtual_keyboard(): void;

/**
 * Returns `true` if the Godot binary used to run the project is a **debug** export template, or when running in the editor.
 *
 * Returns `false` if the Godot binary used to run the project is a **release** export template.
 *
 * To check whether the Godot binary used to run the project is an export template (debug or release), use `OS.has_feature("standalone")` instead.
 *
*/
is_debug_build(): boolean;

/** Returns [code]true[/code] if the [b]OK[/b] button should appear on the left and [b]Cancel[/b] on the right. */
is_ok_left_and_cancel_right(): boolean;

/** Returns [code]true[/code] if the input scancode corresponds to a Unicode character. */
is_scancode_unicode(code: int): boolean;

/** Returns [code]true[/code] if the engine was executed with [code]-v[/code] (verbose stdout). */
is_stdout_verbose(): boolean;

/** If [code]true[/code], the [code]user://[/code] file system is persistent, so that its state is the same after a player quits and starts the game again. Relevant to the HTML5 platform, where this persistence may be unavailable. */
is_userfs_persistent(): boolean;

/** Returns [code]true[/code] if the window should always be on top of other windows. */
is_window_always_on_top(): boolean;

/**
 * Returns `true` if the window is currently focused.
 *
 * **Note:** Only implemented on desktop platforms. On other platforms, it will always return `true`.
 *
*/
is_window_focused(): boolean;

/**
 * Returns active keyboard layout index.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_get_current_layout(): int;

/**
 * Returns the number of keyboard layouts.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_get_layout_count(): int;

/**
 * Returns the ISO-639/BCP-47 language code of the keyboard layout at position `index`.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_get_layout_language(index: int): string;

/**
 * Returns the localized name of the keyboard layout at position `index`.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_get_layout_name(index: int): string;

/**
 * Sets active keyboard layout.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_set_current_layout(index: int): void;

/**
 * Kill (terminate) the process identified by the given process ID (`pid`), e.g. the one returned by [method execute] in non-blocking mode.
 *
 * **Note:** This method can also be used to kill processes that were not spawned by the game.
 *
 * **Note:** This method is implemented on Android, iOS, Linux, macOS and Windows.
 *
*/
kill(pid: int): int;

/**
 * Moves the window to the front.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
move_window_to_foreground(): void;

/**
 * Returns `true` if native video is playing.
 *
 * **Note:** This method is implemented on Android and iOS.
 *
*/
native_video_is_playing(): boolean;

/**
 * Pauses native video playback.
 *
 * **Note:** This method is implemented on Android and iOS.
 *
*/
native_video_pause(): void;

/**
 * Plays native video from the specified path, at the given volume and with audio and subtitle tracks.
 *
 * **Note:** This method is implemented on Android and iOS, and the current Android implementation does not support the `volume`, `audio_track` and `subtitle_track` options.
 *
*/
native_video_play(path: string, volume: float, audio_track: string, subtitle_track: string): int;

/**
 * Stops native video playback.
 *
 * **Note:** This method is implemented on Android and iOS.
 *
*/
native_video_stop(): void;

/**
 * Resumes native video playback.
 *
 * **Note:** This method is implemented on Android and iOS.
 *
*/
native_video_unpause(): void;

/**
 * Initialises the singleton for the system MIDI driver.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
open_midi_inputs(): void;

/** Shows all resources in the game. Optionally, the list can be written to a file by specifying a file path in [code]tofile[/code]. */
print_all_resources(tofile?: string): void;

/** Shows the list of loaded textures sorted by size in memory. */
print_all_textures_by_size(): void;

/** Shows the number of resources loaded by the game of the given types. */
print_resources_by_type(types: PoolStringArray): void;

/** Shows all resources currently used by the game. */
print_resources_in_use(short?: boolean): void;

/**
 * Request the user attention to the window. It'll flash the taskbar button on Windows or bounce the dock icon on OSX.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
request_attention(): void;

/** At the moment this function is only used by [code]AudioDriverOpenSL[/code] to request permission for [code]RECORD_AUDIO[/code] on Android. */
request_permission(name: string): boolean;

/**
 * With this function you can request dangerous permissions since normal permissions are automatically granted at install time in Android application.
 *
 * **Note:** This method is implemented on Android.
 *
*/
request_permissions(): boolean;

/**
 * Sets the game's icon using an [Image] resource.
 *
 * The same image is used for window caption, taskbar/dock and window selection dialog. Image is scaled as needed.
 *
 * **Note:** This method is implemented on HTML5, Linux, macOS and Windows.
 *
*/
set_icon(icon: Image): void;

/**
 * Sets whether IME input mode should be enabled.
 *
 * If active IME handles key events before the application and creates an composition string and suggestion list.
 *
 * Application can retrieve the composition status by using [method get_ime_selection] and [method get_ime_text] functions.
 *
 * Completed composition string is committed when input is finished.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
set_ime_active(active: boolean): void;

/**
 * Sets position of IME suggestion list popup (in window coordinates).
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
set_ime_position(position: Vector2): void;

/**
 * Sets the game's icon using a multi-size platform-specific icon file (`*.ico` on Windows and `*.icns` on macOS).
 *
 * Appropriate size sub-icons are used for window caption, taskbar/dock and window selection dialog.
 *
 * **Note:** This method is implemented on macOS and Windows.
 *
*/
set_native_icon(filename: string): void;

/** Sets the name of the current thread. */
set_thread_name(name: string): int;

/** Enables backup saves if [code]enabled[/code] is [code]true[/code]. */
set_use_file_access_save_and_swap(enabled: boolean): void;

/**
 * Sets whether the window should always be on top.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
set_window_always_on_top(enabled: boolean): void;

/**
 * Sets the window title to the specified string.
 *
 * **Note:** This should be used sporadically. Don't set this every frame, as that will negatively affect performance on some window managers.
 *
 * **Note:** This method is implemented on HTML5, Linux, macOS and Windows.
 *
*/
set_window_title(title: string): void;

/**
 * Requests the OS to open a resource with the most appropriate program. For example:
 *
 * - `OS.shell_open("C:\\Users\name\Downloads")` on Windows opens the file explorer at the user's Downloads folder.
 *
 * - `OS.shell_open("https://godotengine.org")` opens the default web browser on the official Godot website.
 *
 * - `OS.shell_open("mailto:example@example.com")` opens the default email client with the "To" field set to `example@example.com`. See [url=https://blog.escapecreative.com/customizing-mailto-links/]Customizing `mailto:` Links[/url] for a list of fields that can be added.
 *
 * Use [method ProjectSettings.globalize_path] to convert a `res://` or `user://` path into a system path for use with this method.
 *
 * **Note:** This method is implemented on Android, iOS, HTML5, Linux, macOS and Windows.
 *
*/
shell_open(uri: string): int;

/**
 * Shows the virtual keyboard if the platform has one.
 *
 * The `existing_text` parameter is useful for implementing your own [LineEdit] or [TextEdit], as it tells the virtual keyboard what text has already been typed (the virtual keyboard uses it for auto-correct and predictions).
 *
 * The `multiline` parameter needs to be set to `true` to be able to enter multiple lines of text, as in [TextEdit].
 *
 * **Note:** This method is implemented on Android, iOS and UWP.
 *
*/
show_virtual_keyboard(existing_text?: string, multiline?: boolean): void;

  connect<T extends SignalsOf<OSClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The GLES2 rendering backend. It uses OpenGL ES 2.0 on mobile devices, OpenGL 2.1 on desktop platforms and WebGL 1.0 on the web.
 *
*/
static VIDEO_DRIVER_GLES2: 1;

/**
 * The GLES3 rendering backend. It uses OpenGL ES 3.0 on mobile devices, OpenGL 3.3 on desktop platforms and WebGL 2.0 on the web.
 *
*/
static VIDEO_DRIVER_GLES3: 0;

/**
 * Sunday.
 *
*/
static DAY_SUNDAY: 0;

/**
 * Monday.
 *
*/
static DAY_MONDAY: 1;

/**
 * Tuesday.
 *
*/
static DAY_TUESDAY: 2;

/**
 * Wednesday.
 *
*/
static DAY_WEDNESDAY: 3;

/**
 * Thursday.
 *
*/
static DAY_THURSDAY: 4;

/**
 * Friday.
 *
*/
static DAY_FRIDAY: 5;

/**
 * Saturday.
 *
*/
static DAY_SATURDAY: 6;

/**
 * January.
 *
*/
static MONTH_JANUARY: 1;

/**
 * February.
 *
*/
static MONTH_FEBRUARY: 2;

/**
 * March.
 *
*/
static MONTH_MARCH: 3;

/**
 * April.
 *
*/
static MONTH_APRIL: 4;

/**
 * May.
 *
*/
static MONTH_MAY: 5;

/**
 * June.
 *
*/
static MONTH_JUNE: 6;

/**
 * July.
 *
*/
static MONTH_JULY: 7;

/**
 * August.
 *
*/
static MONTH_AUGUST: 8;

/**
 * September.
 *
*/
static MONTH_SEPTEMBER: 9;

/**
 * October.
 *
*/
static MONTH_OCTOBER: 10;

/**
 * November.
 *
*/
static MONTH_NOVEMBER: 11;

/**
 * December.
 *
*/
static MONTH_DECEMBER: 12;

/**
 * Landscape screen orientation.
 *
*/
static SCREEN_ORIENTATION_LANDSCAPE: 0;

/**
 * Portrait screen orientation.
 *
*/
static SCREEN_ORIENTATION_PORTRAIT: 1;

/**
 * Reverse landscape screen orientation.
 *
*/
static SCREEN_ORIENTATION_REVERSE_LANDSCAPE: 2;

/**
 * Reverse portrait screen orientation.
 *
*/
static SCREEN_ORIENTATION_REVERSE_PORTRAIT: 3;

/**
 * Uses landscape or reverse landscape based on the hardware sensor.
 *
*/
static SCREEN_ORIENTATION_SENSOR_LANDSCAPE: 4;

/**
 * Uses portrait or reverse portrait based on the hardware sensor.
 *
*/
static SCREEN_ORIENTATION_SENSOR_PORTRAIT: 5;

/**
 * Uses most suitable orientation based on the hardware sensor.
 *
*/
static SCREEN_ORIENTATION_SENSOR: 6;

/**
 * Desktop directory path.
 *
*/
static SYSTEM_DIR_DESKTOP: 0;

/**
 * DCIM (Digital Camera Images) directory path.
 *
*/
static SYSTEM_DIR_DCIM: 1;

/**
 * Documents directory path.
 *
*/
static SYSTEM_DIR_DOCUMENTS: 2;

/**
 * Downloads directory path.
 *
*/
static SYSTEM_DIR_DOWNLOADS: 3;

/**
 * Movies directory path.
 *
*/
static SYSTEM_DIR_MOVIES: 4;

/**
 * Music directory path.
 *
*/
static SYSTEM_DIR_MUSIC: 5;

/**
 * Pictures directory path.
 *
*/
static SYSTEM_DIR_PICTURES: 6;

/**
 * Ringtones directory path.
 *
*/
static SYSTEM_DIR_RINGTONES: 7;

/**
 * Unknown powerstate.
 *
*/
static POWERSTATE_UNKNOWN: 0;

/**
 * Unplugged, running on battery.
 *
*/
static POWERSTATE_ON_BATTERY: 1;

/**
 * Plugged in, no battery available.
 *
*/
static POWERSTATE_NO_BATTERY: 2;

/**
 * Plugged in, battery charging.
 *
*/
static POWERSTATE_CHARGING: 3;

/**
 * Plugged in, battery fully charged.
 *
*/
static POWERSTATE_CHARGED: 4;


  
}
