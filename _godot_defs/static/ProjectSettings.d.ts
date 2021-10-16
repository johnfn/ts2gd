
/**
 * Contains global variables accessible from everywhere. Use [method get_setting], [method set_setting] or [method has_setting] to access them. Variables stored in `project.godot` are also loaded into ProjectSettings, making this object very useful for reading custom game configuration options.
 *
 * When naming a Project Settings property, use the full path to the setting including the category. For example, `"application/config/name"` for the project name. Category and property names can be viewed in the Project Settings dialog.
 *
 * **Feature tags:** Project settings can be overridden for specific platforms and configurations (debug, release, ...) using [url=https://docs.godotengine.org/en/latest/tutorials/export/feature_tags.html]feature tags[/url].
 *
 * **Overriding:** Any project setting can be overridden by creating a file named `override.cfg` in the project's root directory. This can also be used in exported projects by placing this file in the same directory as the project binary. Overriding will still take the base project settings' [url=https://docs.godotengine.org/en/latest/tutorials/export/feature_tags.html]feature tags[/url] in account. Therefore, make sure to **also** override the setting with the desired feature tags if you want them to override base project settings on all platforms and configurations.
 *
*/
declare class ProjectSettingsClass extends Object {

  
/**
 * Contains global variables accessible from everywhere. Use [method get_setting], [method set_setting] or [method has_setting] to access them. Variables stored in `project.godot` are also loaded into ProjectSettings, making this object very useful for reading custom game configuration options.
 *
 * When naming a Project Settings property, use the full path to the setting including the category. For example, `"application/config/name"` for the project name. Category and property names can be viewed in the Project Settings dialog.
 *
 * **Feature tags:** Project settings can be overridden for specific platforms and configurations (debug, release, ...) using [url=https://docs.godotengine.org/en/latest/tutorials/export/feature_tags.html]feature tags[/url].
 *
 * **Overriding:** Any project setting can be overridden by creating a file named `override.cfg` in the project's root directory. This can also be used in exported projects by placing this file in the same directory as the project binary. Overriding will still take the base project settings' [url=https://docs.godotengine.org/en/latest/tutorials/export/feature_tags.html]feature tags[/url] in account. Therefore, make sure to **also** override the setting with the desired feature tags if you want them to override base project settings on all platforms and configurations.
 *
*/
  "new"(): ProjectSettingsClass;
  static "new"(): ProjectSettingsClass;



/**
 * Comma-separated list of custom Android modules (which must have been built in the Android export templates) using their Java package path, e.g. `"org/godotengine/godot/MyCustomSingleton,com/example/foo/FrenchFriesFactory"`.
 *
 * **Note:** Since Godot 3.2.2, the `org/godotengine/godot/GodotPaymentV3` module was deprecated and replaced by the `GodotPayment` plugin which should be enabled in the Android export preset under `Plugins` section. The singleton to access in code was also renamed to `GodotPayment`.
 *
*/
"android/modules": string;

/** Background color for the boot splash. */
"application/boot_splash/bg_color": Color;

/** If [code]true[/code], scale the boot splash image to the full window length when engine starts. If [code]false[/code], the engine will leave it at the default pixel size. */
"application/boot_splash/fullsize": boolean;

/** Path to an image used as the boot splash. */
"application/boot_splash/image": string;

/** If [code]true[/code], applies linear filtering when scaling the image (recommended for high resolution artwork). If [code]false[/code], uses nearest-neighbor interpolation (recommended for pixel art). */
"application/boot_splash/use_filter": boolean;

/**
 * This user directory is used for storing persistent data (`user://` filesystem). If left empty, `user://` resolves to a project-specific folder in Godot's own configuration folder (see [method OS.get_user_data_dir]). If a custom directory name is defined, this name will be used instead and appended to the system-specific user data directory (same parent folder as the Godot configuration folder documented in [method OS.get_user_data_dir]).
 *
 * The [member application/config/use_custom_user_dir] setting must be enabled for this to take effect.
 *
*/
"application/config/custom_user_dir_name": string;

/** The project's description, displayed as a tooltip in the Project Manager when hovering the project. */
"application/config/description": string;

/** Icon used for the project, set when project loads. Exporters will also use this icon when possible. */
"application/config/icon": string;

/** Icon set in [code].icns[/code] format used on macOS to set the game's icon. This is done automatically on start by calling [method OS.set_native_icon]. */
"application/config/macos_native_icon": string;

/**
 * The project's name. It is used both by the Project Manager and by exporters. The project name can be translated by translating its value in localization files. The window title will be set to match the project name automatically on startup.
 *
 * **Note:** Changing this value will also change the user data folder's path if [member application/config/use_custom_user_dir] is `false`. After renaming the project, you will no longer be able to access existing data in `user://` unless you rename the old folder to match the new project name. See [url=https://docs.godotengine.org/en/3.4/tutorials/io/data_paths.html]Data paths[/url] in the documentation for more information.
 *
*/
"application/config/name": string;

/**
 * Specifies a file to override project settings. For example: `user://custom_settings.cfg`. See "Overriding" in the [ProjectSettings] class description at the top for more information.
 *
 * **Note:** Regardless of this setting's value, `res://override.cfg` will still be read to override the project settings.
 *
*/
"application/config/project_settings_override": string;

/** If [code]true[/code], the project will save user data to its own user directory (see [member application/config/custom_user_dir_name]). This setting is only effective on desktop platforms. A name must be set in the [member application/config/custom_user_dir_name] setting for this to take effect. If [code]false[/code], the project will save user data to [code](OS user data directory)/Godot/app_userdata/(project name)[/code]. */
"application/config/use_custom_user_dir": boolean;

/** Icon set in [code].ico[/code] format used on Windows to set the game's icon. This is done automatically on start by calling [method OS.set_native_icon]. */
"application/config/windows_native_icon": string;

/**
 * Time samples for frame deltas are subject to random variation introduced by the platform, even when frames are displayed at regular intervals thanks to V-Sync. This can lead to jitter. Delta smoothing can often give a better result by filtering the input deltas to correct for minor fluctuations from the refresh rate.
 *
 * **Note:** Delta smoothing is only attempted when [member display/window/vsync/use_vsync] is switched on, as it does not work well without V-Sync.
 *
 * It may take several seconds at a stable frame rate before the smoothing is initially activated. It will only be active on machines where performance is adequate to render frames at the refresh rate.
 *
*/
"application/run/delta_smoothing": boolean;

/** [b]Experimental.[/b] Shifts the measurement of delta time for each frame to just after the drawing has taken place. This may lead to more consistent deltas and a reduction in frame stutters. */
"application/run/delta_sync_after_draw": boolean;

/**
 * If `true`, disables printing to standard error. If `true`, this also hides error and warning messages printed by [method @GDScript.push_error] and [method @GDScript.push_warning]. See also [member application/run/disable_stdout].
 *
 * Changes to this setting will only be applied upon restarting the application.
 *
*/
"application/run/disable_stderr": boolean;

/**
 * If `true`, disables printing to standard output. This is equivalent to starting the editor or project with the `--quiet` command line argument. See also [member application/run/disable_stderr].
 *
 * Changes to this setting will only be applied upon restarting the application.
 *
*/
"application/run/disable_stdout": boolean;

/**
 * If `true`, flushes the standard output stream every time a line is printed. This affects both terminal logging and file logging.
 *
 * When running a project, this setting must be enabled if you want logs to be collected by service managers such as systemd/journalctl. This setting is disabled by default on release builds, since flushing on every printed line will negatively affect performance if lots of lines are printed in a rapid succession. Also, if this setting is enabled, logged files will still be written successfully if the application crashes or is otherwise killed by the user (without being closed "normally").
 *
 * **Note:** Regardless of this setting, the standard error stream (`stderr`) is always flushed when a line is printed to it.
 *
 * Changes to this setting will only be applied upon restarting the application.
 *
*/
"application/run/flush_stdout_on_print": boolean;

/**
 * Debug build override for [member application/run/flush_stdout_on_print], as performance is less important during debugging.
 *
 * Changes to this setting will only be applied upon restarting the application.
 *
*/
"application/run/flush_stdout_on_print_debug": boolean;

/** Forces a delay between frames in the main loop (in milliseconds). This may be useful if you plan to disable vertical synchronization. */
"application/run/frame_delay_msec": int;

/** If [code]true[/code], enables low-processor usage mode. This setting only works on desktop platforms. The screen is not redrawn if nothing changes visually. This is meant for writing applications and editors, but is pretty useless (and can hurt performance) in most games. */
"application/run/low_processor_mode": boolean;

/** Amount of sleeping between frames when the low-processor usage mode is enabled (in microseconds). Higher values will result in lower CPU usage. */
"application/run/low_processor_mode_sleep_usec": int;

/** Path to the main scene file that will be loaded when the project runs. */
"application/run/main_scene": string;

/** Audio buses will disable automatically when sound goes below a given dB threshold for a given time. This saves CPU as effects assigned to that bus will no longer do any processing. */
"audio/channel_disable_threshold_db": float;

/** Audio buses will disable automatically when sound goes below a given dB threshold for a given time. This saves CPU as effects assigned to that bus will no longer do any processing. */
"audio/channel_disable_time": float;

/** Default [AudioBusLayout] resource file to use in the project, unless overridden by the scene. */
"audio/default_bus_layout": string;

/** Specifies the audio driver to use. This setting is platform-dependent as each platform supports different audio drivers. If left empty, the default audio driver will be used. */
"audio/driver": string;

/** If [code]true[/code], microphone input will be allowed. This requires appropriate permissions to be set when exporting to Android or iOS. */
"audio/enable_audio_input": boolean;

/** The mixing rate used for audio (in Hz). In general, it's better to not touch this and leave it to the host operating system. */
"audio/mix_rate": int;

/** Safer override for [member audio/mix_rate] in the Web platform. Here [code]0[/code] means "let the browser choose" (since some browsers do not like forcing the mix rate). */
"audio/mix_rate_web": int;

/** Output latency in milliseconds for audio. Lower values will result in lower audio latency at the cost of increased CPU usage. Low values may result in audible cracking on slower hardware. */
"audio/output_latency": int;

/** Safer override for [member audio/output_latency] in the Web platform, to avoid audio issues especially on mobile devices. */
"audio/output_latency_web": int;

/** Setting to hardcode audio delay when playing video. Best to leave this untouched unless you know what you are doing. */
"audio/video_delay_compensation_ms": int;

/** The default compression level for gzip. Affects compressed scenes and resources. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level. [code]-1[/code] uses the default gzip compression level, which is identical to [code]6[/code] but could change in the future due to underlying zlib updates. */
"compression/formats/gzip/compression_level": int;

/** The default compression level for Zlib. Affects compressed scenes and resources. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level. [code]-1[/code] uses the default gzip compression level, which is identical to [code]6[/code] but could change in the future due to underlying zlib updates. */
"compression/formats/zlib/compression_level": int;

/** The default compression level for Zstandard. Affects compressed scenes and resources. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level. */
"compression/formats/zstd/compression_level": int;

/** Enables [url=https://github.com/facebook/zstd/releases/tag/v1.3.2]long-distance matching[/url] in Zstandard. */
"compression/formats/zstd/long_distance_matching": boolean;

/** Largest size limit (in power of 2) allowed when compressing using long-distance matching with Zstandard. Higher values can result in better compression, but will require more memory when compressing and decompressing. */
"compression/formats/zstd/window_log_size": int;

/** If [code]true[/code], displays getters and setters in autocompletion results in the script editor. This setting is meant to be used when porting old projects (Godot 2), as using member variables is the preferred style from Godot 3 onwards. */
"debug/gdscript/completion/autocomplete_setters_and_getters": boolean;

/** If [code]true[/code], enables warnings when a constant is used as a function. */
"debug/gdscript/warnings/constant_used_as_function": boolean;

/** If [code]true[/code], enables warnings when deprecated keywords such as [code]slave[/code] are used. */
"debug/gdscript/warnings/deprecated_keyword": boolean;

/** If [code]true[/code], enables specific GDScript warnings (see [code]debug/gdscript/warnings/*[/code] settings). If [code]false[/code], disables all GDScript warnings. */
"debug/gdscript/warnings/enable": boolean;

/** If [code]true[/code], scripts in the [code]res://addons[/code] folder will not generate warnings. */
"debug/gdscript/warnings/exclude_addons": boolean;

/** If [code]true[/code], enables warnings when a function is declared with the same name as a constant. */
"debug/gdscript/warnings/function_conflicts_constant": boolean;

/** If [code]true[/code], enables warnings when a function is declared with the same name as a variable. This will turn into an error in a future version when first-class functions become supported in GDScript. */
"debug/gdscript/warnings/function_conflicts_variable": boolean;

/** If [code]true[/code], enables warnings when a function assigned to a variable may yield and return a function state instead of a value. */
"debug/gdscript/warnings/function_may_yield": boolean;

/** If [code]true[/code], enables warnings when using a function as if it was a property. */
"debug/gdscript/warnings/function_used_as_property": boolean;

/** If [code]true[/code], enables warnings when a ternary operator may emit values with incompatible types. */
"debug/gdscript/warnings/incompatible_ternary": boolean;

/** If [code]true[/code], enables warnings when dividing an integer by another integer (the decimal part will be discarded). */
"debug/gdscript/warnings/integer_division": boolean;

/** If [code]true[/code], enables warnings when passing a floating-point value to a function that expects an integer (it will be converted and lose precision). */
"debug/gdscript/warnings/narrowing_conversion": boolean;

/** If [code]true[/code], enables warnings when using a property as if it was a function. */
"debug/gdscript/warnings/property_used_as_function": boolean;

/** If [code]true[/code], enables warnings when calling a function without using its return value (by assigning it to a variable or using it as a function argument). Such return values are sometimes used to denote possible errors using the [enum Error] enum. */
"debug/gdscript/warnings/return_value_discarded": boolean;

/** If [code]true[/code], enables warnings when defining a local or subclass member variable that would shadow a variable at an upper level (such as a member variable). */
"debug/gdscript/warnings/shadowed_variable": boolean;

/** If [code]true[/code], enables warnings when calling an expression that has no effect on the surrounding code, such as writing [code]2 + 2[/code] as a statement. */
"debug/gdscript/warnings/standalone_expression": boolean;

/** If [code]true[/code], enables warnings when calling a ternary expression that has no effect on the surrounding code, such as writing [code]42 if active else 0[/code] as a statement. */
"debug/gdscript/warnings/standalone_ternary": boolean;

/** If [code]true[/code], all warnings will be reported as if they were errors. */
"debug/gdscript/warnings/treat_warnings_as_errors": boolean;

/** If [code]true[/code], enables warnings when using a variable that wasn't previously assigned. */
"debug/gdscript/warnings/unassigned_variable": boolean;

/** If [code]true[/code], enables warnings when assigning a variable using an assignment operator like [code]+=[/code] if the variable wasn't previously assigned. */
"debug/gdscript/warnings/unassigned_variable_op_assign": boolean;

/** If [code]true[/code], enables warnings when unreachable code is detected (such as after a [code]return[/code] statement that will always be executed). */
"debug/gdscript/warnings/unreachable_code": boolean;

/** If [code]true[/code], enables warnings when using an expression whose type may not be compatible with the function parameter expected. */
"debug/gdscript/warnings/unsafe_call_argument": boolean;

/** If [code]true[/code], enables warnings when performing an unsafe cast. */
"debug/gdscript/warnings/unsafe_cast": boolean;

/** If [code]true[/code], enables warnings when calling a method whose presence is not guaranteed at compile-time in the class. */
"debug/gdscript/warnings/unsafe_method_access": boolean;

/** If [code]true[/code], enables warnings when accessing a property whose presence is not guaranteed at compile-time in the class. */
"debug/gdscript/warnings/unsafe_property_access": boolean;

/** If [code]true[/code], enables warnings when a function parameter is unused. */
"debug/gdscript/warnings/unused_argument": boolean;

/** If [code]true[/code], enables warnings when a member variable is unused. */
"debug/gdscript/warnings/unused_class_variable": boolean;

/** If [code]true[/code], enables warnings when a signal is unused. */
"debug/gdscript/warnings/unused_signal": boolean;

/** If [code]true[/code], enables warnings when a local variable is unused. */
"debug/gdscript/warnings/unused_variable": boolean;

/** If [code]true[/code], enables warnings when a variable is declared with the same name as a function. This will turn into an error in a future version when first-class functions become supported in GDScript. */
"debug/gdscript/warnings/variable_conflicts_function": boolean;

/** If [code]true[/code], enables warnings when assigning the result of a function that returns [code]void[/code] to a variable. */
"debug/gdscript/warnings/void_assignment": boolean;

/** Message to be displayed before the backtrace when the engine crashes. */
"debug/settings/crash_handler/message": string;

/**
 * Maximum number of frames per second allowed. The actual number of frames per second may still be below this value if the game is lagging.
 *
 * If [member display/window/vsync/use_vsync] is enabled, it takes precedence and the forced FPS number cannot exceed the monitor's refresh rate.
 *
 * This setting is therefore mostly relevant for lowering the maximum FPS below VSync, e.g. to perform non-real-time rendering of static frames, or test the project under lag conditions.
 *
*/
"debug/settings/fps/force_fps": int;

/** Maximum call stack allowed for debugging GDScript. */
"debug/settings/gdscript/max_call_stack": int;

/** Maximum amount of functions per frame allowed when profiling. */
"debug/settings/profiler/max_functions": int;

/** Print frames per second to standard output every second. */
"debug/settings/stdout/print_fps": boolean;

/** Print more information to standard output when running. It displays information such as memory leaks, which scenes and resources are being loaded, etc. */
"debug/settings/stdout/verbose_stdout": boolean;

/** Maximum call stack in visual scripting, to avoid infinite recursion. */
"debug/settings/visual_script/max_call_stack": int;

/** Color of the contact points between collision shapes, visible when "Visible Collision Shapes" is enabled in the Debug menu. */
"debug/shapes/collision/contact_color": Color;

/** Sets whether 2D physics will display collision outlines in game when "Visible Collision Shapes" is enabled in the Debug menu. */
"debug/shapes/collision/draw_2d_outlines": boolean;

/** Maximum number of contact points between collision shapes to display when "Visible Collision Shapes" is enabled in the Debug menu. */
"debug/shapes/collision/max_contacts_displayed": int;

/** Color of the collision shapes, visible when "Visible Collision Shapes" is enabled in the Debug menu. */
"debug/shapes/collision/shape_color": Color;

/** Color of the disabled navigation geometry, visible when "Visible Navigation" is enabled in the Debug menu. */
"debug/shapes/navigation/disabled_geometry_color": Color;

/** Color of the navigation geometry, visible when "Visible Navigation" is enabled in the Debug menu. */
"debug/shapes/navigation/geometry_color": Color;

/** Custom image for the mouse cursor (limited to 256×256). */
"display/mouse_cursor/custom_image": string;

/** Hotspot for the custom mouse cursor image. */
"display/mouse_cursor/custom_image_hotspot": Vector2;

/** Position offset for tooltips, relative to the mouse cursor's hotspot. */
"display/mouse_cursor/tooltip_position_offset": Vector2;

/** If [code]true[/code], allows HiDPI display on Windows, macOS, and the HTML5 platform. This setting has no effect on desktop Linux, as DPI-awareness fallbacks are not supported there. */
"display/window/dpi/allow_hidpi": boolean;

/** If [code]true[/code], keeps the screen on (even in case of inactivity), so the screensaver does not take over. Works on desktop and mobile platforms. */
"display/window/energy_saving/keep_screen_on": boolean;

/**
 * The default screen orientation to use on mobile devices.
 *
 * **Note:** When set to a portrait orientation, this project setting does not flip the project resolution's width and height automatically. Instead, you have to set [member display/window/size/width] and [member display/window/size/height] accordingly.
 *
*/
"display/window/handheld/orientation": string;

/** If [code]true[/code], the home indicator is hidden automatically. This only affects iOS devices without a physical home button. */
"display/window/ios/hide_home_indicator": boolean;

/**
 * If `true`, allows per-pixel transparency for the window background. This affects performance, so leave it on `false` unless you need it.
 *
 * See [member OS.window_per_pixel_transparency_enabled] for more details.
 *
 * **Note:** This feature is implemented on HTML5, Linux, macOS, Windows, and Android.
 *
*/
"display/window/per_pixel_transparency/allowed": boolean;

/**
 * Sets the window background to transparent when it starts.
 *
 * See [member OS.window_per_pixel_transparency_enabled] for more details.
 *
 * **Note:** This feature is implemented on HTML5, Linux, macOS, Windows, and Android.
 *
*/
"display/window/per_pixel_transparency/enabled": boolean;

/**
 * Forces the main window to be always on top.
 *
 * **Note:** This setting is ignored on iOS, Android, and HTML5.
 *
*/
"display/window/size/always_on_top": boolean;

/**
 * Forces the main window to be borderless.
 *
 * **Note:** This setting is ignored on iOS, Android, and HTML5.
 *
*/
"display/window/size/borderless": boolean;

/**
 * Sets the main window to full screen when the project starts. Note that this is not **exclusive** fullscreen. On Windows and Linux, a borderless window is used to emulate fullscreen. On macOS, a new desktop is used to display the running project.
 *
 * Regardless of the platform, enabling fullscreen will change the window size to match the monitor's size. Therefore, make sure your project supports [url=https://docs.godotengine.org/en/3.4/tutorials/rendering/multiple_resolutions.html]multiple resolutions[/url] when enabling fullscreen mode.
 *
 * **Note:** This setting is ignored on iOS, Android, and HTML5.
 *
*/
"display/window/size/fullscreen": boolean;

/** Sets the game's main viewport height. On desktop platforms, this is the default window size. Stretch mode settings also use this as a reference when enabled. */
"display/window/size/height": int;

/**
 * Allows the window to be resizable by default.
 *
 * **Note:** This setting is ignored on iOS and Android.
 *
*/
"display/window/size/resizable": boolean;

/** If greater than zero, overrides the window height when running the game. Useful for testing stretch modes. */
"display/window/size/test_height": int;

/** If greater than zero, overrides the window width when running the game. Useful for testing stretch modes. */
"display/window/size/test_width": int;

/** Sets the game's main viewport width. On desktop platforms, this is the default window size. Stretch mode settings also use this as a reference when enabled. */
"display/window/size/width": int;

/** Specifies the tablet driver to use. If left empty, the default driver will be used. */
"display/window/tablet_driver": string;

/** If [code]true[/code], enables vertical synchronization. This eliminates tearing that may appear in moving scenes, at the cost of higher input latency and stuttering at lower framerates. If [code]false[/code], vertical synchronization will be disabled, however, many platforms will enforce it regardless (such as mobile platforms and HTML5). */
"display/window/vsync/use_vsync": boolean;

/**
 * If `Use Vsync` is enabled and this setting is `true`, enables vertical synchronization via the operating system's window compositor when in windowed mode and the compositor is enabled. This will prevent stutter in certain situations. (Windows only.)
 *
 * **Note:** This option is experimental and meant to alleviate stutter experienced by some users. However, some users have experienced a Vsync framerate halving (e.g. from 60 FPS to 30 FPS) when using it.
 *
*/
"display/window/vsync/vsync_via_compositor": boolean;

/**
 * The command-line arguments to append to Godot's own command line when running the project. This doesn't affect the editor itself.
 *
 * It is possible to make another executable run Godot by using the `%command%` placeholder. The placeholder will be replaced with Godot's own command line. Program-specific arguments should be placed **before** the placeholder, whereas Godot-specific arguments should be placed **after** the placeholder.
 *
 * For example, this can be used to force the project to run on the dedicated GPU in a NVIDIA Optimus system on Linux:
 *
 * @example 
 * 
 * prime-run %command%
 * @summary 
 * 
 *
*/
"editor/main_run_args": string;

/** Search path for project-specific script templates. Godot will search for script templates both in the editor-specific path and in this project-specific path. */
"editor/script_templates_search_path": string;

/** Text-based file extensions to include in the script editor's "Find in Files" feature. You can add e.g. [code]tscn[/code] if you wish to also parse your scene files, especially if you use built-in scripts which are serialized in the scene files. */
"editor/search_in_file_extensions": PoolStringArray;

/** Default value for [member ScrollContainer.scroll_deadzone], which will be used for all [ScrollContainer]s unless overridden. */
"gui/common/default_scroll_deadzone": int;

/** If [code]true[/code], swaps OK and Cancel buttons in dialogs on Windows and UWP to follow interface conventions. */
"gui/common/swap_ok_cancel": boolean;


/** Path to a custom [Theme] resource file to use for the project ([code]theme[/code] or generic [code]tres[/code]/[code]res[/code] extension). */
"gui/theme/custom": string;

/** Path to a custom [Font] resource to use as default for all GUI elements of the project. */
"gui/theme/custom_font": string;

/** If [code]true[/code], makes sure the theme used works with HiDPI. */
"gui/theme/use_hidpi": boolean;

/** Timer setting for incremental search in [Tree], [ItemList], etc. controls (in milliseconds). */
"gui/timers/incremental_search_max_interval_msec": int;

/** Timer for detecting idle in [TextEdit] (in seconds). */
"gui/timers/text_edit_idle_detect_sec": float;

/** Default delay for tooltips (in seconds). */
"gui/timers/tooltip_delay_sec": float;

/**
 * Default [InputEventAction] to confirm a focused button, menu or list item, or validate input.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_accept": Dictionary<any, any>;

/**
 * Default [InputEventAction] to discard a modal or pending input.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_cancel": Dictionary<any, any>;

/**
 * Default [InputEventAction] to move down in the UI.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_down": Dictionary<any, any>;

/**
 * Default [InputEventAction] to go to the end position of a [Control] (e.g. last item in an [ItemList] or a [Tree]), matching the behavior of [constant KEY_END] on typical desktop UI systems.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_end": Dictionary<any, any>;

/**
 * Default [InputEventAction] to focus the next [Control] in the scene. The focus behavior can be configured via [member Control.focus_next].
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_focus_next": Dictionary<any, any>;

/**
 * Default [InputEventAction] to focus the previous [Control] in the scene. The focus behavior can be configured via [member Control.focus_previous].
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_focus_prev": Dictionary<any, any>;

/**
 * Default [InputEventAction] to go to the start position of a [Control] (e.g. first item in an [ItemList] or a [Tree]), matching the behavior of [constant KEY_HOME] on typical desktop UI systems.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_home": Dictionary<any, any>;

/**
 * Default [InputEventAction] to move left in the UI.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_left": Dictionary<any, any>;

/**
 * Default [InputEventAction] to go down a page in a [Control] (e.g. in an [ItemList] or a [Tree]), matching the behavior of [constant KEY_PAGEDOWN] on typical desktop UI systems.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_page_down": Dictionary<any, any>;

/**
 * Default [InputEventAction] to go up a page in a [Control] (e.g. in an [ItemList] or a [Tree]), matching the behavior of [constant KEY_PAGEUP] on typical desktop UI systems.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_page_up": Dictionary<any, any>;

/**
 * Default [InputEventAction] to move right in the UI.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_right": Dictionary<any, any>;

/**
 * Default [InputEventAction] to select an item in a [Control] (e.g. in an [ItemList] or a [Tree]).
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_select": Dictionary<any, any>;

/**
 * Default [InputEventAction] to move up in the UI.
 *
 * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several [Control]s. The events assigned to the action can however be modified.
 *
*/
"input/ui_up": Dictionary<any, any>;

/**
 * If `true`, key/touch/joystick events will be flushed just before every idle and physics frame.
 *
 * If `false`, such events will be flushed only once per idle frame, between iterations of the engine.
 *
 * Enabling this can greatly improve the responsiveness to input, specially in devices that need to run multiple physics frames per visible (idle) frame, because they can't run at the target frame rate.
 *
 * **Note:** Currently implemented only in Android.
 *
*/
"input_devices/buffering/agile_event_flushing": boolean;

/** If [code]true[/code], sends mouse input events when tapping or swiping on the touchscreen. */
"input_devices/pointing/emulate_mouse_from_touch": boolean;

/** If [code]true[/code], sends touch input events when clicking or dragging the mouse. */
"input_devices/pointing/emulate_touch_from_mouse": boolean;

/** Default delay for touch events. This only affects iOS devices. */
"input_devices/pointing/ios/touch_delay": float;

/** Optional name for the 2D physics layer 1. */
"layer_names/2d_physics/layer_1": string;

/** Optional name for the 2D physics layer 10. */
"layer_names/2d_physics/layer_10": string;

/** Optional name for the 2D physics layer 11. */
"layer_names/2d_physics/layer_11": string;

/** Optional name for the 2D physics layer 12. */
"layer_names/2d_physics/layer_12": string;

/** Optional name for the 2D physics layer 13. */
"layer_names/2d_physics/layer_13": string;

/** Optional name for the 2D physics layer 14. */
"layer_names/2d_physics/layer_14": string;

/** Optional name for the 2D physics layer 15. */
"layer_names/2d_physics/layer_15": string;

/** Optional name for the 2D physics layer 16. */
"layer_names/2d_physics/layer_16": string;

/** Optional name for the 2D physics layer 17. */
"layer_names/2d_physics/layer_17": string;

/** Optional name for the 2D physics layer 18. */
"layer_names/2d_physics/layer_18": string;

/** Optional name for the 2D physics layer 19. */
"layer_names/2d_physics/layer_19": string;

/** Optional name for the 2D physics layer 2. */
"layer_names/2d_physics/layer_2": string;

/** Optional name for the 2D physics layer 20. */
"layer_names/2d_physics/layer_20": string;

/** Optional name for the 2D physics layer 21. */
"layer_names/2d_physics/layer_21": string;

/** Optional name for the 2D physics layer 22. */
"layer_names/2d_physics/layer_22": string;

/** Optional name for the 2D physics layer 23. */
"layer_names/2d_physics/layer_23": string;

/** Optional name for the 2D physics layer 24. */
"layer_names/2d_physics/layer_24": string;

/** Optional name for the 2D physics layer 25. */
"layer_names/2d_physics/layer_25": string;

/** Optional name for the 2D physics layer 26. */
"layer_names/2d_physics/layer_26": string;

/** Optional name for the 2D physics layer 27. */
"layer_names/2d_physics/layer_27": string;

/** Optional name for the 2D physics layer 28. */
"layer_names/2d_physics/layer_28": string;

/** Optional name for the 2D physics layer 29. */
"layer_names/2d_physics/layer_29": string;

/** Optional name for the 2D physics layer 3. */
"layer_names/2d_physics/layer_3": string;

/** Optional name for the 2D physics layer 30. */
"layer_names/2d_physics/layer_30": string;

/** Optional name for the 2D physics layer 31. */
"layer_names/2d_physics/layer_31": string;

/** Optional name for the 2D physics layer 32. */
"layer_names/2d_physics/layer_32": string;

/** Optional name for the 2D physics layer 4. */
"layer_names/2d_physics/layer_4": string;

/** Optional name for the 2D physics layer 5. */
"layer_names/2d_physics/layer_5": string;

/** Optional name for the 2D physics layer 6. */
"layer_names/2d_physics/layer_6": string;

/** Optional name for the 2D physics layer 7. */
"layer_names/2d_physics/layer_7": string;

/** Optional name for the 2D physics layer 8. */
"layer_names/2d_physics/layer_8": string;

/** Optional name for the 2D physics layer 9. */
"layer_names/2d_physics/layer_9": string;

/** Optional name for the 2D render layer 1. */
"layer_names/2d_render/layer_1": string;

/** Optional name for the 2D render layer 10. */
"layer_names/2d_render/layer_10": string;

/** Optional name for the 2D render layer 11. */
"layer_names/2d_render/layer_11": string;

/** Optional name for the 2D render layer 12. */
"layer_names/2d_render/layer_12": string;

/** Optional name for the 2D render layer 13. */
"layer_names/2d_render/layer_13": string;

/** Optional name for the 2D render layer 14. */
"layer_names/2d_render/layer_14": string;

/** Optional name for the 2D render layer 15. */
"layer_names/2d_render/layer_15": string;

/** Optional name for the 2D render layer 16. */
"layer_names/2d_render/layer_16": string;

/** Optional name for the 2D render layer 17. */
"layer_names/2d_render/layer_17": string;

/** Optional name for the 2D render layer 18. */
"layer_names/2d_render/layer_18": string;

/** Optional name for the 2D render layer 19. */
"layer_names/2d_render/layer_19": string;

/** Optional name for the 2D render layer 2. */
"layer_names/2d_render/layer_2": string;

/** Optional name for the 2D render layer 20. */
"layer_names/2d_render/layer_20": string;

/** Optional name for the 2D render layer 3. */
"layer_names/2d_render/layer_3": string;

/** Optional name for the 2D render layer 4. */
"layer_names/2d_render/layer_4": string;

/** Optional name for the 2D render layer 5. */
"layer_names/2d_render/layer_5": string;

/** Optional name for the 2D render layer 6. */
"layer_names/2d_render/layer_6": string;

/** Optional name for the 2D render layer 7. */
"layer_names/2d_render/layer_7": string;

/** Optional name for the 2D render layer 8. */
"layer_names/2d_render/layer_8": string;

/** Optional name for the 2D render layer 9. */
"layer_names/2d_render/layer_9": string;

/** Optional name for the 3D physics layer 1. */
"layer_names/3d_physics/layer_1": string;

/** Optional name for the 3D physics layer 10. */
"layer_names/3d_physics/layer_10": string;

/** Optional name for the 3D physics layer 11. */
"layer_names/3d_physics/layer_11": string;

/** Optional name for the 3D physics layer 12. */
"layer_names/3d_physics/layer_12": string;

/** Optional name for the 3D physics layer 13. */
"layer_names/3d_physics/layer_13": string;

/** Optional name for the 3D physics layer 14. */
"layer_names/3d_physics/layer_14": string;

/** Optional name for the 3D physics layer 15. */
"layer_names/3d_physics/layer_15": string;

/** Optional name for the 3D physics layer 16. */
"layer_names/3d_physics/layer_16": string;

/** Optional name for the 3D physics layer 17. */
"layer_names/3d_physics/layer_17": string;

/** Optional name for the 3D physics layer 18. */
"layer_names/3d_physics/layer_18": string;

/** Optional name for the 3D physics layer 19. */
"layer_names/3d_physics/layer_19": string;

/** Optional name for the 3D physics layer 2. */
"layer_names/3d_physics/layer_2": string;

/** Optional name for the 3D physics layer 20. */
"layer_names/3d_physics/layer_20": string;

/** Optional name for the 3D physics layer 21. */
"layer_names/3d_physics/layer_21": string;

/** Optional name for the 3D physics layer 22. */
"layer_names/3d_physics/layer_22": string;

/** Optional name for the 3D physics layer 23. */
"layer_names/3d_physics/layer_23": string;

/** Optional name for the 3D physics layer 24. */
"layer_names/3d_physics/layer_24": string;

/** Optional name for the 3D physics layer 25. */
"layer_names/3d_physics/layer_25": string;

/** Optional name for the 3D physics layer 26. */
"layer_names/3d_physics/layer_26": string;

/** Optional name for the 3D physics layer 27. */
"layer_names/3d_physics/layer_27": string;

/** Optional name for the 3D physics layer 28. */
"layer_names/3d_physics/layer_28": string;

/** Optional name for the 3D physics layer 29. */
"layer_names/3d_physics/layer_29": string;

/** Optional name for the 3D physics layer 3. */
"layer_names/3d_physics/layer_3": string;

/** Optional name for the 3D physics layer 30. */
"layer_names/3d_physics/layer_30": string;

/** Optional name for the 3D physics layer 31. */
"layer_names/3d_physics/layer_31": string;

/** Optional name for the 3D physics layer 32. */
"layer_names/3d_physics/layer_32": string;

/** Optional name for the 3D physics layer 4. */
"layer_names/3d_physics/layer_4": string;

/** Optional name for the 3D physics layer 5. */
"layer_names/3d_physics/layer_5": string;

/** Optional name for the 3D physics layer 6. */
"layer_names/3d_physics/layer_6": string;

/** Optional name for the 3D physics layer 7. */
"layer_names/3d_physics/layer_7": string;

/** Optional name for the 3D physics layer 8. */
"layer_names/3d_physics/layer_8": string;

/** Optional name for the 3D physics layer 9. */
"layer_names/3d_physics/layer_9": string;

/** Optional name for the 3D render layer 1. */
"layer_names/3d_render/layer_1": string;

/** Optional name for the 3D render layer 10. */
"layer_names/3d_render/layer_10": string;

/** Optional name for the 3D render layer 11. */
"layer_names/3d_render/layer_11": string;

/** Optional name for the 3D render layer 12. */
"layer_names/3d_render/layer_12": string;

/** Optional name for the 3D render layer 13. */
"layer_names/3d_render/layer_13": string;

/** Optional name for the 3D render layer 14 */
"layer_names/3d_render/layer_14": string;

/** Optional name for the 3D render layer 15. */
"layer_names/3d_render/layer_15": string;

/** Optional name for the 3D render layer 16. */
"layer_names/3d_render/layer_16": string;

/** Optional name for the 3D render layer 17. */
"layer_names/3d_render/layer_17": string;

/** Optional name for the 3D render layer 18. */
"layer_names/3d_render/layer_18": string;

/** Optional name for the 3D render layer 19. */
"layer_names/3d_render/layer_19": string;

/** Optional name for the 3D render layer 2. */
"layer_names/3d_render/layer_2": string;

/** Optional name for the 3D render layer 20. */
"layer_names/3d_render/layer_20": string;

/** Optional name for the 3D render layer 3. */
"layer_names/3d_render/layer_3": string;

/** Optional name for the 3D render layer 4. */
"layer_names/3d_render/layer_4": string;

/** Optional name for the 3D render layer 5. */
"layer_names/3d_render/layer_5": string;

/** Optional name for the 3D render layer 6. */
"layer_names/3d_render/layer_6": string;

/** Optional name for the 3D render layer 7. */
"layer_names/3d_render/layer_7": string;

/** Optional name for the 3D render layer 8. */
"layer_names/3d_render/layer_8": string;

/** Optional name for the 3D render layer 9. */
"layer_names/3d_render/layer_9": string;

/** The locale to fall back to if a translation isn't available in a given language. If left empty, [code]en[/code] (English) will be used. */
"locale/fallback": string;

/** If non-empty, this locale will be used when running the project from the editor. */
"locale/test": string;

/** If [code]true[/code], logs all output to files. */
"logging/file_logging/enable_file_logging": boolean;

/** Desktop override for [member logging/file_logging/enable_file_logging], as log files are not readily accessible on mobile/Web platforms. */
"logging/file_logging/enable_file_logging_pc": boolean;

/** Path to logs within the project. Using an [code]user://[/code] path is recommended. */
"logging/file_logging/log_path": string;

/** Specifies the maximum amount of log files allowed (used for rotation). */
"logging/file_logging/max_log_files": int;


/** Godot uses a message queue to defer some function calls. If you run out of space on it (you will see an error), you can increase the size here. */
"memory/limits/message_queue/max_size_kb": int;

/** This is used by servers when used in multi-threading mode (servers and visual). RIDs are preallocated to avoid stalling the server requesting them on threads. If servers get stalled too often when loading resources in a thread, increase this number. */
"memory/limits/multithreaded_server/rid_pool_prealloc": int;

/** Maximum amount of characters allowed to send as output from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection. */
"network/limits/debugger_stdout/max_chars_per_second": int;

/** Maximum number of errors allowed to be sent as output from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection. */
"network/limits/debugger_stdout/max_errors_per_second": int;

/** Maximum amount of messages allowed to send as output from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection. */
"network/limits/debugger_stdout/max_messages_per_frame": int;

/** Maximum number of warnings allowed to be sent as output from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection. */
"network/limits/debugger_stdout/max_warnings_per_second": int;

/** Default size of packet peer stream for deserializing Godot data (in bytes, specified as a power of two). The default value [code]16[/code] is equal to 65,536 bytes. Over this size, data is dropped. */
"network/limits/packet_peer_stream/max_buffer_po2": int;

/** Timeout (in seconds) for connection attempts using TCP. */
"network/limits/tcp/connect_timeout_seconds": int;

/** Maximum size (in kiB) for the [WebRTCDataChannel] input buffer. */
"network/limits/webrtc/max_channel_in_buffer_kb": int;

/** Maximum size (in kiB) for the [WebSocketClient] input buffer. */
"network/limits/websocket_client/max_in_buffer_kb": int;

/** Maximum number of concurrent input packets for [WebSocketClient]. */
"network/limits/websocket_client/max_in_packets": int;

/** Maximum size (in kiB) for the [WebSocketClient] output buffer. */
"network/limits/websocket_client/max_out_buffer_kb": int;

/** Maximum number of concurrent output packets for [WebSocketClient]. */
"network/limits/websocket_client/max_out_packets": int;

/** Maximum size (in kiB) for the [WebSocketServer] input buffer. */
"network/limits/websocket_server/max_in_buffer_kb": int;

/** Maximum number of concurrent input packets for [WebSocketServer]. */
"network/limits/websocket_server/max_in_packets": int;

/** Maximum size (in kiB) for the [WebSocketServer] output buffer. */
"network/limits/websocket_server/max_out_buffer_kb": int;

/** Maximum number of concurrent output packets for [WebSocketServer]. */
"network/limits/websocket_server/max_out_packets": int;

/** Amount of read ahead used by remote filesystem. Higher values decrease the effects of latency at the cost of higher bandwidth usage. */
"network/remote_fs/page_read_ahead": int;

/** Page size used by remote filesystem (in bytes). */
"network/remote_fs/page_size": int;

/**
 * The CA certificates bundle to use for SSL connections. If this is set to a non-empty value, this will **override** Godot's default [url=https://github.com/godotengine/godot/blob/master/thirdparty/certs/ca-certificates.crt]Mozilla certificate bundle[/url]. If left empty, the default certificate bundle will be used.
 *
 * If in doubt, leave this setting empty.
 *
*/
"network/ssl/certificates": string;

/** When creating node names automatically, set the type of casing in this project. This is mostly an editor setting. */
"node/name_casing": int;

/** What to use to separate node name from number. This is mostly an editor setting. */
"node/name_num_separator": int;

/**
 * Size of the hash table used for the broad-phase 2D hash grid algorithm.
 *
 * **Note:** Not used if [member ProjectSettings.physics/2d/use_bvh] is enabled.
 *
*/
"physics/2d/bp_hash_table_size": int;

/**
 * Cell size used for the broad-phase 2D hash grid algorithm (in pixels).
 *
 * **Note:** Not used if [member ProjectSettings.physics/2d/use_bvh] is enabled.
 *
*/
"physics/2d/cell_size": int;

/**
 * The default angular damp in 2D.
 *
 * **Note:** Good values are in the range `0` to `1`. At value `0` objects will keep moving with the same velocity. Values greater than `1` will aim to reduce the velocity to `0` in less than a second e.g. a value of `2` will aim to reduce the velocity to `0` in half a second. A value equal to or greater than the physics frame rate ([member ProjectSettings.physics/common/physics_fps], `60` by default) will bring the object to a stop in one iteration.
 *
*/
"physics/2d/default_angular_damp": float;

/**
 * The default gravity strength in 2D (in pixels per second squared).
 *
 * **Note:** This property is only read when the project starts. To change the default gravity at runtime, use the following code sample:
 *
 * @example 
 * 
 * # Set the default gravity strength to 98.
 * Physics2DServer.area_set_param(get_viewport().find_world_2d().get_space(), Physics2DServer.AREA_PARAM_GRAVITY, 98)
 * @summary 
 * 
 *
*/
"physics/2d/default_gravity": int;

/**
 * The default gravity direction in 2D.
 *
 * **Note:** This property is only read when the project starts. To change the default gravity vector at runtime, use the following code sample:
 *
 * @example 
 * 
 * # Set the default gravity direction to `Vector2(0, 1)`.
 * Physics2DServer.area_set_param(get_viewport().find_world_2d().get_space(), Physics2DServer.AREA_PARAM_GRAVITY_VECTOR, Vector2(0, 1))
 * @summary 
 * 
 *
*/
"physics/2d/default_gravity_vector": Vector2;

/**
 * The default linear damp in 2D.
 *
 * **Note:** Good values are in the range `0` to `1`. At value `0` objects will keep moving with the same velocity. Values greater than `1` will aim to reduce the velocity to `0` in less than a second e.g. a value of `2` will aim to reduce the velocity to `0` in half a second. A value equal to or greater than the physics frame rate ([member ProjectSettings.physics/common/physics_fps], `60` by default) will bring the object to a stop in one iteration.
 *
*/
"physics/2d/default_linear_damp": float;

/**
 * Threshold defining the surface size that constitutes a large object with regard to cells in the broad-phase 2D hash grid algorithm.
 *
 * **Note:** Not used if [member ProjectSettings.physics/2d/use_bvh] is enabled.
 *
*/
"physics/2d/large_object_surface_threshold_in_cells": int;

/**
 * Sets which physics engine to use for 2D physics.
 *
 * "DEFAULT" and "GodotPhysics" are the same, as there is currently no alternative 2D physics server implemented.
 *
*/
"physics/2d/physics_engine": string;

/** Threshold angular velocity under which a 2D physics body will be considered inactive. See [constant Physics2DServer.SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD]. */
"physics/2d/sleep_threshold_angular": float;

/** Threshold linear velocity under which a 2D physics body will be considered inactive. See [constant Physics2DServer.SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD]. */
"physics/2d/sleep_threshold_linear": float;

/**
 * Sets whether physics is run on the main thread or a separate one. Running the server on a thread increases performance, but restricts API access to only physics process.
 *
 * **Warning:** As of Godot 3.2, there are mixed reports about the use of a Multi-Threaded thread model for physics. Be sure to assess whether it does give you extra performance and no regressions when using it.
 *
*/
"physics/2d/thread_model": int;

/** Time (in seconds) of inactivity before which a 2D physics body will put to sleep. See [constant Physics2DServer.SPACE_PARAM_BODY_TIME_TO_SLEEP]. */
"physics/2d/time_before_sleep": float;

/** Enables the use of bounding volume hierarchy instead of hash grid for 2D physics spatial partitioning. This may give better performance. */
"physics/2d/use_bvh": boolean;

/** Sets whether the 3D physics world will be created with support for [SoftBody] physics. Only applies to the Bullet physics engine. */
"physics/3d/active_soft_world": boolean;

/**
 * The default angular damp in 3D.
 *
 * **Note:** Good values are in the range `0` to `1`. At value `0` objects will keep moving with the same velocity. Values greater than `1` will aim to reduce the velocity to `0` in less than a second e.g. a value of `2` will aim to reduce the velocity to `0` in half a second. A value equal to or greater than the physics frame rate ([member ProjectSettings.physics/common/physics_fps], `60` by default) will bring the object to a stop in one iteration.
 *
*/
"physics/3d/default_angular_damp": float;

/**
 * The default gravity strength in 3D (in meters per second squared).
 *
 * **Note:** This property is only read when the project starts. To change the default gravity at runtime, use the following code sample:
 *
 * @example 
 * 
 * # Set the default gravity strength to 9.8.
 * PhysicsServer.area_set_param(get_viewport().find_world().get_space(), PhysicsServer.AREA_PARAM_GRAVITY, 9.8)
 * @summary 
 * 
 *
*/
"physics/3d/default_gravity": float;

/**
 * The default gravity direction in 3D.
 *
 * **Note:** This property is only read when the project starts. To change the default gravity vector at runtime, use the following code sample:
 *
 * @example 
 * 
 * # Set the default gravity direction to `Vector3(0, -1, 0)`.
 * PhysicsServer.area_set_param(get_viewport().find_world().get_space(), PhysicsServer.AREA_PARAM_GRAVITY_VECTOR, Vector3(0, -1, 0))
 * @summary 
 * 
 *
*/
"physics/3d/default_gravity_vector": Vector3;

/**
 * The default linear damp in 3D.
 *
 * **Note:** Good values are in the range `0` to `1`. At value `0` objects will keep moving with the same velocity. Values greater than `1` will aim to reduce the velocity to `0` in less than a second e.g. a value of `2` will aim to reduce the velocity to `0` in half a second. A value equal to or greater than the physics frame rate ([member ProjectSettings.physics/common/physics_fps], `60` by default) will bring the object to a stop in one iteration.
 *
*/
"physics/3d/default_linear_damp": float;

/** Enables the use of bounding volume hierarchy instead of octree for 3D physics spatial partitioning. This may give better performance. */
"physics/3d/godot_physics/use_bvh": boolean;

/**
 * Sets which physics engine to use for 3D physics.
 *
 * "DEFAULT" is currently the [url=https://bulletphysics.org]Bullet[/url] physics engine. The "GodotPhysics" engine is still supported as an alternative.
 *
*/
"physics/3d/physics_engine": string;

/** Enables [member Viewport.physics_object_picking] on the root viewport. */
"physics/common/enable_object_picking": boolean;

/**
 * If enabled, 2D and 3D physics picking behaves this way in relation to pause:
 *
 * - When pause is started, every collision object that is hovered or captured (3D only) is released from that condition, getting the relevant mouse-exit callback, unless its pause mode makes it immune to pause.
 *
 * - During pause, picking only considers collision objects immune to pause, sending input events and enter/exit callbacks to them as expected.
 *
 * If disabled, the legacy behavior is used, which consists in queuing the picking input events during pause (so nodes won't get them) and flushing that queue on resume, against the state of the 2D/3D world at that point.
 *
*/
"physics/common/enable_pause_aware_picking": boolean;

/**
 * The number of fixed iterations per second. This controls how often physics simulation and [method Node._physics_process] methods are run.
 *
 * **Note:** This property is only read when the project starts. To change the physics FPS at runtime, set [member Engine.iterations_per_second] instead.
 *
*/
"physics/common/physics_fps": int;

/**
 * Controls how much physics ticks are synchronized with real time. For 0 or less, the ticks are synchronized. Such values are recommended for network games, where clock synchronization matters. Higher values cause higher deviation of in-game clock and real clock, but allows smoothing out framerate jitters. The default value of 0.5 should be fine for most; values above 2 could cause the game to react to dropped frames with a noticeable delay and are not recommended.
 *
 * **Note:** For best results, when using a custom physics interpolation solution, the physics jitter fix should be disabled by setting [member physics/common/physics_jitter_fix] to `0`.
 *
 * **Note:** This property is only read when the project starts. To change the physics FPS at runtime, set [member Engine.physics_jitter_fix] instead.
 *
*/
"physics/common/physics_jitter_fix": float;

/**
 * **Experimental.** Calls `glBufferData` with NULL data prior to uploading batching data. This may not be necessary but can be used for safety.
 *
 * **Note:** Use with care. You are advised to leave this as default for exports. A non-default setting that works better on your machine may adversely affect performance for end users.
 *
*/
"rendering/2d/opengl/batching_send_null": int;

/**
 * **Experimental.** If set to on, uses the `GL_STREAM_DRAW` flag for batching buffer uploads. If off, uses the `GL_DYNAMIC_DRAW` flag.
 *
 * **Note:** Use with care. You are advised to leave this as default for exports. A non-default setting that works better on your machine may adversely affect performance for end users.
 *
*/
"rendering/2d/opengl/batching_stream": int;

/**
 * **Experimental.** If set to on, this applies buffer orphaning - `glBufferData` is called with NULL data and the full buffer size prior to uploading new data. This can be important to avoid stalling on some hardware.
 *
 * **Note:** Use with care. You are advised to leave this as default for exports. A non-default setting that works better on your machine may adversely affect performance for end users.
 *
*/
"rendering/2d/opengl/legacy_orphan_buffers": int;

/**
 * **Experimental.** If set to on, uses the `GL_STREAM_DRAW` flag for legacy buffer uploads. If off, uses the `GL_DYNAMIC_DRAW` flag.
 *
 * **Note:** Use with care. You are advised to leave this as default for exports. A non-default setting that works better on your machine may adversely affect performance for end users.
 *
*/
"rendering/2d/opengl/legacy_stream": int;

/**
 * Choose between fixed mode where corner scalings are preserved matching the artwork, and scaling mode.
 *
 * Not available in GLES3 when [member rendering/batching/options/use_batching] is off.
 *
*/
"rendering/2d/options/ninepatch_mode": int;

/**
 * Some NVIDIA GPU drivers have a bug which produces flickering issues for the `draw_rect` method, especially as used in [TileMap]. Refer to [url=https://github.com/godotengine/godot/issues/9913]GitHub issue 9913[/url] for details.
 *
 * If `true`, this option enables a "safe" code path for such NVIDIA GPUs at the cost of performance. This option affects GLES2 and GLES3 rendering, but only on desktop platforms.
 *
*/
"rendering/2d/options/use_nvidia_rect_flicker_workaround": boolean;

/**
 * If `true`, performs 2D skinning on the CPU rather than the GPU. This provides greater compatibility with a wide range of hardware, and also may be faster in some circumstances.
 *
 * Currently only available when [member rendering/batching/options/use_batching] is active.
 *
 * **Note:** Antialiased software skinned polys are not supported, and will be rendered without antialiasing.
 *
 * **Note:** Custom shaders that use the `VERTEX` built-in operate with `VERTEX` position **after** skinning, whereas with hardware skinning, `VERTEX` is the position **before** skinning.
 *
*/
"rendering/2d/options/use_software_skinning": boolean;

/**
 * If `true`, forces snapping of vertices to pixels in 2D rendering. May help in some pixel art styles.
 *
 * This snapping is performed on the GPU in the vertex shader.
 *
 * Consider using the project setting [member rendering/batching/precision/uv_contract] to prevent artifacts.
 *
*/
"rendering/2d/snapping/use_gpu_pixel_snap": boolean;

/** When batching is on, this regularly prints a frame diagnosis log. Note that this will degrade performance. */
"rendering/batching/debug/diagnose_frame": boolean;

/** [b]Experimental.[/b] For regression testing against the old renderer. If this is switched on, and [code]use_batching[/code] is set, the renderer will swap alternately between using the old renderer, and the batched renderer, on each frame. This makes it easy to identify visual differences. Performance will be degraded. */
"rendering/batching/debug/flash_batching": boolean;

/** Lights have the potential to prevent joining items, and break many of the performance benefits of batching. This setting enables some complex logic to allow joining items if their lighting is similar, and overlap tests pass. This can significantly improve performance in some games. Set to 0 to switch off. With large values the cost of overlap tests may lead to diminishing returns. */
"rendering/batching/lights/max_join_items": int;

/** Sets the proportion of the total screen area (in pixels) that must be saved by a scissor operation in order to activate light scissoring. This can prevent parts of items being rendered outside the light area. Lower values scissor more aggressively. A value of 1 scissors none of the items, a value of 0 scissors every item. The power of 4 of the value is used, in order to emphasize the lower range, and multiplied by the total screen area in pixels to give the threshold. This can reduce fill rate requirements in scenes with a lot of lighting. */
"rendering/batching/lights/scissor_area_threshold": float;

/** Enabling this setting uses the legacy method to draw batches containing only one rect. The legacy method is faster (approx twice as fast), but can cause flicker on some systems. In order to directly compare performance with the non-batching renderer you can set this to true, but it is recommended to turn this off unless you can guarantee your target hardware will work with this method. */
"rendering/batching/options/single_rect_fallback": boolean;

/** Turns 2D batching on and off. Batching increases performance by reducing the amount of graphics API drawcalls. */
"rendering/batching/options/use_batching": boolean;

/** Switches on 2D batching within the editor. */
"rendering/batching/options/use_batching_in_editor": boolean;

/** Size of buffer reserved for batched vertices. Larger size enables larger batches, but there are diminishing returns for the memory used. This should only have a minor effect on performance. */
"rendering/batching/parameters/batch_buffer_size": int;

/** Including color in the vertex format has a cost, however, not including color prevents batching across color changes. This threshold determines the ratio of [code]number of vertex color changes / total number of vertices[/code] above which vertices will be translated to colored format. A value of 0 will always use colored vertices, 1 will never use colored vertices. */
"rendering/batching/parameters/colored_vertex_format_threshold": float;

/** In certain circumstances, the batcher can reorder items in order to better join them. This may result in better performance. An overlap test is needed however for each item lookahead, so there is a trade off, with diminishing returns. If you are getting no benefit, setting this to 0 will switch it off. */
"rendering/batching/parameters/item_reordering_lookahead": int;

/** Sets the number of commands to lookahead to determine whether to batch render items. A value of 1 can join items consisting of single commands, 0 turns off joining. Higher values are in theory more likely to join, however this has diminishing returns and has a runtime cost so a small value is recommended. */
"rendering/batching/parameters/max_join_item_commands": int;

/**
 * On some platforms (especially mobile), precision issues in shaders can lead to reading 1 texel outside of bounds, particularly where rects are scaled. This can particularly lead to border artifacts around tiles in tilemaps.
 *
 * This adjustment corrects for this by making a small contraction to the UV coordinates used. Note that this can result in a slight squashing of border texels.
 *
*/
"rendering/batching/precision/uv_contract": boolean;

/**
 * The amount of UV contraction. This figure is divided by 1000000, and is a proportion of the total texture dimensions, where the width and height are both ranged from 0.0 to 1.0.
 *
 * Use the default unless correcting for a problem on particular hardware.
 *
*/
"rendering/batching/precision/uv_contract_amount": int;

/** Amount of light samples taken when using [constant BakedLightmap.BAKE_QUALITY_HIGH]. */
"rendering/cpu_lightmapper/quality/high_quality_ray_count": int;

/** Amount of light samples taken when using [constant BakedLightmap.BAKE_QUALITY_LOW]. */
"rendering/cpu_lightmapper/quality/low_quality_ray_count": int;

/** Amount of light samples taken when using [constant BakedLightmap.BAKE_QUALITY_MEDIUM]. */
"rendering/cpu_lightmapper/quality/medium_quality_ray_count": int;

/** Amount of light samples taken when using [constant BakedLightmap.BAKE_QUALITY_ULTRA]. */
"rendering/cpu_lightmapper/quality/ultra_quality_ray_count": int;

/** Default background clear color. Overridable per [Viewport] using its [Environment]. See [member Environment.background_mode] and [member Environment.background_color] in particular. To change this default color programmatically, use [method VisualServer.set_default_clear_color]. */
"rendering/environment/default_clear_color": Color;

/** [Environment] that will be used as a fallback environment in case a scene does not specify its own environment. The default environment is loaded in at scene load time regardless of whether you have set an environment or not. If you do not rely on the fallback environment, it is best to delete [code]default_env.tres[/code], or to specify a different default environment here. */
"rendering/environment/default_environment": string;

/** The use of half-float vertex compression may be producing rendering errors on some platforms (especially iOS). These have been seen particularly in particles. Disabling half-float may resolve these problems. */
"rendering/gles2/compatibility/disable_half_float": boolean;

/**
 * If `true` and available on the target device, enables high floating point precision for all shader computations in GLES2.
 *
 * **Warning:** High floating point precision can be extremely slow on older devices and is often not available at all. Use with caution.
 *
*/
"rendering/gles2/compatibility/enable_high_float_Android": boolean;

/** Max buffer size for blend shapes. Any blend shape bigger than this will not work. */
"rendering/limits/buffers/blend_shape_max_buffer_size_kb": int;

/** Max buffer size for drawing polygons. Any polygon bigger than this will not work. */
"rendering/limits/buffers/canvas_polygon_buffer_size_kb": int;

/** Max index buffer size for drawing polygons. Any polygon bigger than this will not work. */
"rendering/limits/buffers/canvas_polygon_index_buffer_size_kb": int;

/** Max buffer size for drawing immediate objects (ImmediateGeometry nodes). Nodes using more than this size will not work. */
"rendering/limits/buffers/immediate_buffer_size_kb": int;

/** Max number of lights renderable per object. This is further limited by hardware support. Most devices only support 409 lights, while many devices (especially mobile) only support 102. Setting this low will slightly reduce memory usage and may decrease shader compile times. */
"rendering/limits/rendering/max_lights_per_object": int;

/** Max amount of elements renderable in a frame. If more elements than this are visible per frame, they will not be drawn. Keep in mind elements refer to mesh surfaces and not meshes themselves. Setting this low will slightly reduce memory usage and may decrease shader compile times, particularly on web. For most uses, the default value is suitable, but consider lowering as much as possible on web export. */
"rendering/limits/rendering/max_renderable_elements": int;

/** Max number of lights renderable in a frame. If more lights than this number are used, they will be ignored. Setting this low will slightly reduce memory usage and may decrease shader compile times, particularly on web. For most uses, the default value is suitable, but consider lowering as much as possible on web export. */
"rendering/limits/rendering/max_renderable_lights": int;

/** Max number of reflection probes renderable in a frame. If more reflection probes than this number are used, they will be ignored. Setting this low will slightly reduce memory usage and may decrease shader compile times, particularly on web. For most uses, the default value is suitable, but consider lowering as much as possible on web export. */
"rendering/limits/rendering/max_renderable_reflections": int;

/** Shaders have a time variable that constantly increases. At some point, it needs to be rolled back to zero to avoid precision errors on shader animations. This setting specifies when (in seconds). */
"rendering/limits/time/time_rollover_secs": float;

/** If [code]true[/code], the texture importer will import lossless textures using the PNG format. Otherwise, it will default to using WebP. */
"rendering/misc/lossless_compression/force_png": boolean;

/** The default compression level for lossless WebP. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level. Supported values are 0 to 9. Note that compression levels above 6 are very slow and offer very little savings. */
"rendering/misc/lossless_compression/webp_compression_level": int;

/** On import, mesh vertex data will be split into two streams within a single vertex buffer, one for position data and the other for interleaved attributes data. Recommended to be enabled if targeting mobile devices. Requires manual reimport of meshes after toggling. */
"rendering/misc/mesh_storage/split_stream": boolean;

/**
 * Determines the maximum number of sphere occluders that will be used at any one time.
 *
 * Although you can have many occluders in a scene, each frame the system will choose from these the most relevant based on a screen space metric, in order to give the best overall performance.
 *
*/
"rendering/misc/occlusion_culling/max_active_spheres": int;

/**
 * The default convention is for portal normals to point outward (face outward) from the source room.
 *
 * If you accidentally build your level with portals facing the wrong way, this setting can fix the problem.
 *
 * It will flip named portal meshes (i.e. `-portal`) on the initial convertion to [Portal] nodes.
 *
*/
"rendering/portals/advanced/flip_imported_portals": boolean;

/**
 * Show conversion logs.
 *
 * **Note:** This will automatically be disabled in exports.
 *
*/
"rendering/portals/debug/logging": boolean;

/** If [code]true[/code], gameplay callbacks will be sent as [code]signals[/code]. If [code]false[/code], they will be sent as [code]notifications[/code]. */
"rendering/portals/gameplay/use_signals": boolean;

/**
 * If enabled, while merging meshes, the system will also attempt to remove [Spatial] nodes that no longer have any children.
 *
 * Reducing the number of [Node]s in the scene tree can make traversal more efficient, but can be switched off in case you wish to use empty [Spatial]s for markers or some other purpose.
 *
*/
"rendering/portals/optimize/remove_danglers": boolean;

/**
 * Show logs during PVS generation.
 *
 * **Note:** This will automatically be disabled in exports.
 *
*/
"rendering/portals/pvs/pvs_logging": boolean;

/**
 * Uses a simplified method of generating PVS (potentially visible set) data. The results may not be accurate where more than one portal join adjacent rooms.
 *
 * **Note:** Generally you should only use this option if you encounter bugs when it is set to `false`, i.e. there are problems with the default method.
 *
*/
"rendering/portals/pvs/use_simple_pvs": boolean;

/**
 * If `true`, allocates the main framebuffer with high dynamic range. High dynamic range allows the use of [Color] values greater than 1.
 *
 * **Note:** Only available on the GLES3 backend.
 *
*/
"rendering/quality/depth/hdr": boolean;

/** Lower-end override for [member rendering/quality/depth/hdr] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/depth/hdr_mobile": boolean;

/** Disables depth pre-pass for some GPU vendors (usually mobile), as their architecture already does this. */
"rendering/quality/depth_prepass/disable_for_vendors": string;

/** If [code]true[/code], performs a previous depth pass before rendering materials. This increases performance in scenes with high overdraw, when complex materials and lighting are used. */
"rendering/quality/depth_prepass/enable": boolean;

/** The directional shadow's size in pixels. Higher values will result in sharper shadows, at the cost of performance. The value will be rounded up to the nearest power of 2. */
"rendering/quality/directional_shadow/size": int;

/** Lower-end override for [member rendering/quality/directional_shadow/size] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/directional_shadow/size_mobile": int;

/**
 * The video driver to use ("GLES2" or "GLES3").
 *
 * **Note:** The backend in use can be overridden at runtime via the `--video-driver` command line argument, or by the [member rendering/quality/driver/fallback_to_gles2] option if the target system does not support GLES3 and falls back to GLES2. In such cases, this property is not updated, so use [method OS.get_current_video_driver] to query it at run-time.
 *
*/
"rendering/quality/driver/driver_name": string;

/**
 * If `true`, allows falling back to the GLES2 driver if the GLES3 driver is not supported.
 *
 * **Note:** The two video drivers are not drop-in replacements for each other, so a game designed for GLES3 might not work properly when falling back to GLES2. In particular, some features of the GLES3 backend are not available in GLES2. Enabling this setting also means that both ETC and ETC2 VRAM-compressed textures will be exported on Android and iOS, increasing the data pack's size.
 *
*/
"rendering/quality/driver/fallback_to_gles2": boolean;

/** Maximum anisotropic filter level used for textures with anisotropy enabled. Higher values will result in sharper textures when viewed from oblique angles, at the cost of performance. Only power-of-two values are valid (2, 4, 8, 16). */
"rendering/quality/filters/anisotropic_filter_level": int;

/**
 * Sets the number of MSAA samples to use. MSAA is used to reduce aliasing around the edges of polygons. A higher MSAA value results in smoother edges but can be significantly slower on some hardware.
 *
 * **Note:** MSAA is not available on HTML5 export using the GLES2 backend.
 *
*/
"rendering/quality/filters/msaa": int;

/** If set to a value greater than [code]0.0[/code], contrast-adaptive sharpening will be applied to the 3D viewport. This has a low performance cost and can be used to recover some of the sharpness lost from using FXAA. Values around [code]0.5[/code] generally give the best results. See also [member rendering/quality/filters/use_fxaa]. */
"rendering/quality/filters/sharpen_intensity": float;

/**
 * If `true`, uses a fast post-processing filter to make banding significantly less visible. In some cases, debanding may introduce a slightly noticeable dithering pattern. It's recommended to enable debanding only when actually needed since the dithering pattern will make lossless-compressed screenshots larger.
 *
 * **Note:** Only available on the GLES3 backend. [member rendering/quality/depth/hdr] must also be `true` for debanding to be effective.
 *
 * **Note:** There are known issues with debanding breaking rendering on mobile platforms. Due to this, it is recommended to leave this option disabled when targeting mobile platforms.
 *
*/
"rendering/quality/filters/use_debanding": boolean;

/** Enables FXAA in the root Viewport. FXAA is a popular screen-space antialiasing method, which is fast but will make the image look blurry, especially at lower resolutions. It can still work relatively well at large resolutions such as 1440p and 4K. Some of the lost sharpness can be recovered by enabling contrast-adaptive sharpening (see [member rendering/quality/filters/sharpen_intensity]). */
"rendering/quality/filters/use_fxaa": boolean;

/** If [code]true[/code], uses nearest-neighbor mipmap filtering when using mipmaps (also called "bilinear filtering"), which will result in visible seams appearing between mipmap stages. This may increase performance in mobile as less memory bandwidth is used. If [code]false[/code], linear mipmap filtering (also called "trilinear filtering") is used. */
"rendering/quality/filters/use_nearest_mipmap_filter": boolean;

/** Strategy used for framebuffer allocation. The simpler it is, the less resources it uses (but the less features it supports). If set to "2D Without Sampling" or "3D Without Effects", sample buffers will not be allocated. This means [code]SCREEN_TEXTURE[/code] and [code]DEPTH_TEXTURE[/code] will not be available in shaders and post-processing effects will not be available in the [Environment]. */
"rendering/quality/intended_usage/framebuffer_allocation": int;

/** Lower-end override for [member rendering/quality/intended_usage/framebuffer_allocation] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/intended_usage/framebuffer_allocation_mobile": int;

/** Enable usage of bicubic sampling in baked lightmaps. This results in smoother looking lighting at the expense of more bandwidth usage. On GLES2, changes to this setting will only be applied upon restarting the application. */
"rendering/quality/lightmapping/use_bicubic_sampling": boolean;

/** Lower-end override for [member rendering/quality/lightmapping/use_bicubic_sampling] on mobile devices, in order to reduce bandwidth usage. */
"rendering/quality/lightmapping/use_bicubic_sampling_mobile": boolean;

/** Size of the atlas used by reflection probes. A larger size can result in higher visual quality, while a smaller size will be faster and take up less memory. */
"rendering/quality/reflections/atlas_size": int;

/** Number of subdivisions to use for the reflection atlas. A higher number lowers the quality of each atlas, but allows you to use more. */
"rendering/quality/reflections/atlas_subdiv": int;

/** If [code]true[/code], uses a high amount of samples to create blurred variants of reflection probes and panorama backgrounds (sky). Those blurred variants are used by rough materials. */
"rendering/quality/reflections/high_quality_ggx": boolean;

/** Lower-end override for [member rendering/quality/reflections/high_quality_ggx] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/reflections/high_quality_ggx_mobile": boolean;

/**
 * Limits the size of the irradiance map which is normally determined by [member Sky.radiance_size]. A higher size results in a higher quality irradiance map similarly to [member rendering/quality/reflections/high_quality_ggx]. Use a higher value when using high-frequency HDRI maps, otherwise keep this as low as possible.
 *
 * **Note:** Low and mid range hardware do not support complex irradiance maps well and may crash if this is set too high.
 *
*/
"rendering/quality/reflections/irradiance_max_size": int;

/** If [code]true[/code], uses texture arrays instead of mipmaps for reflection probes and panorama backgrounds (sky). This reduces jitter noise on reflections, but costs more performance and memory. */
"rendering/quality/reflections/texture_array_reflections": boolean;

/** Lower-end override for [member rendering/quality/reflections/texture_array_reflections] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/reflections/texture_array_reflections_mobile": boolean;

/** If [code]true[/code], uses faster but lower-quality Blinn model to generate blurred reflections instead of the GGX model. */
"rendering/quality/shading/force_blinn_over_ggx": boolean;

/** Lower-end override for [member rendering/quality/shading/force_blinn_over_ggx] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/shading/force_blinn_over_ggx_mobile": boolean;

/** If [code]true[/code], uses faster but lower-quality Lambert material lighting model instead of Burley. */
"rendering/quality/shading/force_lambert_over_burley": boolean;

/** Lower-end override for [member rendering/quality/shading/force_lambert_over_burley] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/shading/force_lambert_over_burley_mobile": boolean;

/** If [code]true[/code], forces vertex shading for all rendering. This can increase performance a lot, but also reduces quality immensely. Can be used to optimize performance on low-end mobile devices. */
"rendering/quality/shading/force_vertex_shading": boolean;

/** Lower-end override for [member rendering/quality/shading/force_vertex_shading] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/shading/force_vertex_shading_mobile": boolean;

/**
 * If `true`, enables new physical light attenuation for [OmniLight]s and [SpotLight]s. This results in more realistic lighting appearance with a very small performance cost. When physical light attenuation is enabled, lights will appear to be darker as a result of the new attenuation formula. This can be compensated by adjusting the lights' energy or attenuation values.
 *
 * Changes to this setting will only be applied upon restarting the application.
 *
*/
"rendering/quality/shading/use_physical_light_attenuation": boolean;

/** Size for cubemap into which the shadow is rendered before being copied into the shadow atlas. A higher number can result in higher resolution shadows when used with a higher [member rendering/quality/shadow_atlas/size]. Setting higher than a quarter of the [member rendering/quality/shadow_atlas/size] will not result in a perceptible increase in visual quality. */
"rendering/quality/shadow_atlas/cubemap_size": int;

/** Subdivision quadrant size for shadow mapping. See shadow mapping documentation. */
"rendering/quality/shadow_atlas/quadrant_0_subdiv": int;

/** Subdivision quadrant size for shadow mapping. See shadow mapping documentation. */
"rendering/quality/shadow_atlas/quadrant_1_subdiv": int;

/** Subdivision quadrant size for shadow mapping. See shadow mapping documentation. */
"rendering/quality/shadow_atlas/quadrant_2_subdiv": int;

/** Subdivision quadrant size for shadow mapping. See shadow mapping documentation. */
"rendering/quality/shadow_atlas/quadrant_3_subdiv": int;

/** Size for shadow atlas (used for OmniLights and SpotLights). See documentation. */
"rendering/quality/shadow_atlas/size": int;

/** Lower-end override for [member rendering/quality/shadow_atlas/size] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/shadow_atlas/size_mobile": int;

/**
 * Shadow filter mode. Higher-quality settings result in smoother shadows that flicker less when moving. "Disabled" is the fastest option, but also has the lowest quality. "PCF5" is smoother but is also slower. "PCF13" is the smoothest option, but is also the slowest.
 *
 * **Note:** When using the GLES2 backend, the "PCF13" option actually uses 16 samples to emulate linear filtering in the shader. This results in a shadow appearance similar to the one produced by the GLES3 backend.
 *
*/
"rendering/quality/shadows/filter_mode": int;

/** Lower-end override for [member rendering/quality/shadows/filter_mode] on mobile devices, due to performance concerns or driver support. */
"rendering/quality/shadows/filter_mode_mobile": int;

/**
 * Forces [MeshInstance] to always perform skinning on the CPU (applies to both GLES2 and GLES3).
 *
 * See also [member rendering/quality/skinning/software_skinning_fallback].
 *
*/
"rendering/quality/skinning/force_software_skinning": boolean;

/**
 * Allows [MeshInstance] to perform skinning on the CPU when the hardware doesn't support the default GPU skinning process with GLES2.
 *
 * If `false`, an alternative skinning process on the GPU is used in this case (slower in most cases).
 *
 * See also [member rendering/quality/skinning/force_software_skinning].
 *
 * **Note:** When the software skinning fallback is triggered, custom vertex shaders will behave in a different way, because the bone transform will be already applied to the modelview matrix.
 *
*/
"rendering/quality/skinning/software_skinning_fallback": boolean;

/**
 * The rendering octree balance can be changed to favor smaller (`0`), or larger (`1`) branches.
 *
 * Larger branches can increase performance significantly in some projects.
 *
*/
"rendering/quality/spatial_partitioning/render_tree_balance": float;

/** Enables the use of bounding volume hierarchy instead of octree for rendering spatial partitioning. This may give better performance. */
"rendering/quality/spatial_partitioning/use_bvh": boolean;

/** Improves quality of subsurface scattering, but cost significantly increases. */
"rendering/quality/subsurface_scattering/follow_surface": boolean;

/** Quality setting for subsurface scattering (samples taken). */
"rendering/quality/subsurface_scattering/quality": int;

/** Max radius used for subsurface scattering samples. */
"rendering/quality/subsurface_scattering/scale": int;

/** Weight subsurface scattering samples. Helps to avoid reading samples from unrelated parts of the screen. */
"rendering/quality/subsurface_scattering/weight_samples": boolean;

/** Use high-quality voxel cone tracing. This results in better-looking reflections, but is much more expensive on the GPU. */
"rendering/quality/voxel_cone_tracing/high_quality": boolean;

/** Thread model for rendering. Rendering on a thread can vastly improve performance, but synchronizing to the main thread can cause a bit more jitter. */
"rendering/threads/thread_model": int;

/**
 * If `true`, a thread safe version of BVH (bounding volume hierarchy) will be used in rendering and Godot physics.
 *
 * Try enabling this option if you see any visual anomalies in 3D (such as incorrect object visibility).
 *
*/
"rendering/threads/thread_safe_bvh": boolean;

/**
 * If `true`, the texture importer will import VRAM-compressed textures using the BPTC algorithm. This texture compression algorithm is only supported on desktop platforms, and only when using the GLES3 renderer.
 *
 * **Note:** Changing this setting does **not** impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.import/` folder located inside the project folder then restart the editor.
 *
*/
"rendering/vram_compression/import_bptc": boolean;

/**
 * If `true`, the texture importer will import VRAM-compressed textures using the Ericsson Texture Compression algorithm. This algorithm doesn't support alpha channels in textures.
 *
 * **Note:** Changing this setting does **not** impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.import/` folder located inside the project folder then restart the editor.
 *
*/
"rendering/vram_compression/import_etc": boolean;

/**
 * If `true`, the texture importer will import VRAM-compressed textures using the Ericsson Texture Compression 2 algorithm. This texture compression algorithm is only supported when using the GLES3 renderer.
 *
 * **Note:** Changing this setting does **not** impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.import/` folder located inside the project folder then restart the editor.
 *
*/
"rendering/vram_compression/import_etc2": boolean;

/**
 * If `true`, the texture importer will import VRAM-compressed textures using the PowerVR Texture Compression algorithm. This texture compression algorithm is only supported on iOS.
 *
 * **Note:** Changing this setting does **not** impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.import/` folder located inside the project folder then restart the editor.
 *
*/
"rendering/vram_compression/import_pvrtc": boolean;

/**
 * If `true`, the texture importer will import VRAM-compressed textures using the S3 Texture Compression algorithm. This algorithm is only supported on desktop platforms and consoles.
 *
 * **Note:** Changing this setting does **not** impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.import/` folder located inside the project folder then restart the editor.
 *
*/
"rendering/vram_compression/import_s3tc": boolean;

/** Cell size used for the 2D hash grid that [VisibilityNotifier2D] uses (in pixels). */
"world/2d/cell_size": int;

/**
 * Adds a custom property info to a property. The dictionary must contain:
 *
 * - `name`: [String] (the property's name)
 *
 * - `type`: [int] (see [enum Variant.Type])
 *
 * - optionally `hint`: [int] (see [enum PropertyHint]) and `hint_string`: [String]
 *
 * **Example:**
 *
 * @example 
 * 
 * ProjectSettings.set("category/property_name", 0)
 * var property_info = {
 *     "name": "category/property_name",
 *     "type": TYPE_INT,
 *     "hint": PROPERTY_HINT_ENUM,
 *     "hint_string": "one,two,three"
 * }
 * ProjectSettings.add_property_info(property_info)
 * @summary 
 * 
 *
*/
add_property_info(hint: Dictionary<any, any>): void;

/** Clears the whole configuration (not recommended, may break things). */
clear(name: string): void;

/** Returns the order of a configuration value (influences when saved to the config file). */
get_order(name: string): int;

/**
 * Returns the value of a setting.
 *
 * **Example:**
 *
 * @example 
 * 
 * print(ProjectSettings.get_setting("application/config/name"))
 * @summary 
 * 
 *
*/
get_setting(name: string): any;

/**
 * Returns the absolute, native OS path corresponding to the localized `path` (starting with `res://` or `user://`). The returned path will vary depending on the operating system and user preferences. See [url=https://docs.godotengine.org/en/3.4/tutorials/io/data_paths.html]File paths in Godot projects[/url] to see what those paths convert to. See also [method localize_path].
 *
 * **Note:** [method globalize_path] with `res://` will not work in an exported project. Instead, prepend the executable's base directory to the path when running from an exported project:
 *
 * @example 
 * 
 * var path = ""
 * if OS.has_feature("editor"):
 *     # Running from an editor binary.
 *     # `path` will contain the absolute path to `hello.txt` located in the project root.
 *     path = ProjectSettings.globalize_path("res://hello.txt")
 * else:
 *     # Running from an exported project.
 *     # `path` will contain the absolute path to `hello.txt` next to the executable.
 *     # This is *not* identical to using `ProjectSettings.globalize_path()` with a `res://` path,
 *     # but is close enough in spirit.
 *     path = OS.get_executable_path().get_base_dir().plus_file("hello.txt")
 * @summary 
 * 
 *
*/
globalize_path(path: string): string;

/** Returns [code]true[/code] if a configuration value is present. */
has_setting(name: string): boolean;

/**
 * Loads the contents of the .pck or .zip file specified by `pack` into the resource filesystem (`res://`). Returns `true` on success.
 *
 * **Note:** If a file from `pack` shares the same path as a file already in the resource filesystem, any attempts to load that file will use the file from `pack` unless `replace_files` is set to `false`.
 *
 * **Note:** The optional `offset` parameter can be used to specify the offset in bytes to the start of the resource pack. This is only supported for .pck files.
 *
*/
load_resource_pack(pack: string, replace_files?: boolean, offset?: int): boolean;

/** Returns the localized path (starting with [code]res://[/code]) corresponding to the absolute, native OS [code]path[/code]. See also [method globalize_path]. */
localize_path(path: string): string;

/** Returns [code]true[/code] if the specified property exists and its initial value differs from the current value. */
property_can_revert(name: string): boolean;

/** Returns the specified property's initial value. Returns [code]null[/code] if the property does not exist. */
property_get_revert(name: string): any;

/**
 * Saves the configuration to the `project.godot` file.
 *
 * **Note:** This method is intended to be used by editor plugins, as modified [ProjectSettings] can't be loaded back in the running app. If you want to change project settings in exported projects, use [method save_custom] to save `override.cfg` file.
 *
*/
save(): int;

/** Saves the configuration to a custom file. The file extension must be [code].godot[/code] (to save in text-based [ConfigFile] format) or [code].binary[/code] (to save in binary format). You can also save [code]override.cfg[/code] file, which is also text, but can be used in exported projects unlike other formats. */
save_custom(file: string): int;

/** Sets the specified property's initial value. This is the value the property reverts to. */
set_initial_value(name: string, value: any): void;

/** Sets the order of a configuration value (influences when saved to the config file). */
set_order(name: string, position: int): void;

/**
 * Sets the value of a setting.
 *
 * **Example:**
 *
 * @example 
 * 
 * ProjectSettings.set_setting("application/config/name", "Example")
 * @summary 
 * 
 *
*/
set_setting(name: string, value: any): void;

  // connect<T extends SignalsOf<ProjectSettingsClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ProjectSettingsClassSignals>>(signal: T, method: SignalFunction<ProjectSettingsClassSignals[T]>): number;




}

declare class ProjectSettingsClassSignals extends ObjectSignals {
  
}
