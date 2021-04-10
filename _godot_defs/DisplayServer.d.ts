
/**
*/
declare class DisplayServerClass extends Object {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
alert(text: String, title?: String): void;

/** No documentation provided. */
clipboard_get(): String;

/** No documentation provided. */
clipboard_set(clipboard: String): void;

/** No documentation provided. */
console_set_visible(console_visible: boolean): void;

/** No documentation provided. */
create_sub_window(mode: int, flags: int, rect?: Rect2i): int;

/** No documentation provided. */
cursor_get_shape(): int;

/** No documentation provided. */
cursor_set_custom_image(cursor: Resource, shape?: int, hotspot?: Vector2): void;

/** No documentation provided. */
cursor_set_shape(shape: int): void;

/** No documentation provided. */
delete_sub_window(window_id: int): void;

/** No documentation provided. */
dialog_input_text(title: String, description: String, existing_text: String, callback: Callable): int;

/** No documentation provided. */
dialog_show(title: String, description: String, buttons: PackedStringArray, callback: Callable): int;

/** No documentation provided. */
enable_for_stealing_focus(process_id: int): void;

/** No documentation provided. */
force_process_and_drop_events(): void;

/** No documentation provided. */
get_name(): String;

/** No documentation provided. */
get_screen_count(): int;

/** No documentation provided. */
get_swap_cancel_ok(): boolean;

/** No documentation provided. */
get_window_at_screen_position(position: Vector2i): int;

/** No documentation provided. */
get_window_list(): PackedInt32Array;

/** No documentation provided. */
global_menu_add_check_item(menu_root: String, label: String, callback: Callable, tag?: any): void;

/** No documentation provided. */
global_menu_add_item(menu_root: String, label: String, callback: Callable, tag?: any): void;

/** No documentation provided. */
global_menu_add_separator(menu_root: String): void;

/** No documentation provided. */
global_menu_add_submenu_item(menu_root: String, label: String, submenu: String): void;

/** No documentation provided. */
global_menu_clear(menu_root: String): void;

/** No documentation provided. */
global_menu_get_item_callback(menu_root: String, idx: int): Callable;

/** No documentation provided. */
global_menu_get_item_submenu(menu_root: String, idx: int): String;

/** No documentation provided. */
global_menu_get_item_tag(menu_root: String, idx: int): any;

/** No documentation provided. */
global_menu_get_item_text(menu_root: String, idx: int): String;

/** No documentation provided. */
global_menu_is_item_checkable(menu_root: String, idx: int): boolean;

/** No documentation provided. */
global_menu_is_item_checked(menu_root: String, idx: int): boolean;

/** No documentation provided. */
global_menu_remove_item(menu_root: String, idx: int): void;

/** No documentation provided. */
global_menu_set_item_callback(menu_root: String, idx: int, callback: Callable): void;

/** No documentation provided. */
global_menu_set_item_checkable(menu_root: String, idx: int, checkable: boolean): void;

/** No documentation provided. */
global_menu_set_item_checked(menu_root: String, idx: int, checked: boolean): void;

/** No documentation provided. */
global_menu_set_item_submenu(menu_root: String, idx: int, submenu: String): void;

/** No documentation provided. */
global_menu_set_item_tag(menu_root: String, idx: int, tag: any): void;

/** No documentation provided. */
global_menu_set_item_text(menu_root: String, idx: int, text: String): void;

/** No documentation provided. */
has_feature(feature: int): boolean;

/** No documentation provided. */
ime_get_selection(): Vector2i;

/** No documentation provided. */
ime_get_text(): String;

/** No documentation provided. */
is_console_visible(): boolean;

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
keyboard_get_layout_language(index: int): String;

/**
 * Returns the localized name of the keyboard layout at position `index`.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_get_layout_name(index: int): String;

/**
 * Sets active keyboard layout.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
keyboard_set_current_layout(index: int): void;

/** No documentation provided. */
mouse_get_absolute_position(): Vector2i;

/** No documentation provided. */
mouse_get_button_state(): int;

/** No documentation provided. */
mouse_get_mode(): int;

/** No documentation provided. */
mouse_get_position(): Vector2i;

/** No documentation provided. */
mouse_set_mode(mouse_mode: int): void;

/** No documentation provided. */
mouse_warp_to_position(position: Vector2i): void;

/** No documentation provided. */
native_video_is_playing(): boolean;

/** No documentation provided. */
native_video_pause(): void;

/** No documentation provided. */
native_video_play(path: String, volume: float, audio_track: String, subtitle_track: String, arg4: int): int;

/** No documentation provided. */
native_video_stop(): void;

/** No documentation provided. */
native_video_unpause(): void;

/** No documentation provided. */
process_events(): void;

/**
 * Returns the dots per inch density of the specified screen. If `screen` is `SCREEN_OF_MAIN_WINDOW` (the default value), a screen with the main window will be used.
 *
 * **Note:** On macOS, returned value is inaccurate if fractional display scaling mode is used.
 *
 * **Note:** On Android devices, the actual screen densities are grouped into six generalized densities:
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
screen_get_dpi(screen?: int): int;

/**
 * Return the greatest scale factor of all screens.
 *
 * **Note:** On macOS returned value is `2.0` if there is at least one hiDPI (Retina) screen in the system, and `1.0` in all other cases.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
screen_get_max_scale(): float;

/** No documentation provided. */
screen_get_orientation(screen?: int): int;

/** No documentation provided. */
screen_get_position(screen?: int): Vector2i;

/**
 * Return the scale factor of the specified screen by index.
 *
 * **Note:** On macOS returned value is `2.0` for hiDPI (Retina) screen, and `1.0` for all other cases.
 *
 * **Note:** This method is implemented on macOS.
 *
*/
screen_get_scale(screen?: int): float;

/** No documentation provided. */
screen_get_size(screen?: int): Vector2i;

/** No documentation provided. */
screen_get_usable_rect(screen?: int): Rect2i;

/** No documentation provided. */
screen_is_kept_on(): boolean;

/** No documentation provided. */
screen_is_touchscreen(screen?: int): boolean;

/** No documentation provided. */
screen_set_keep_on(enable: boolean): void;

/** No documentation provided. */
screen_set_orientation(orientation: int, screen?: int): void;

/** No documentation provided. */
set_icon(image: Image): void;

/** No documentation provided. */
set_native_icon(filename: String): void;

/** Returns the on-screen keyboard's height in pixels. Returns 0 if there is no keyboard or if it is currently hidden. */
virtual_keyboard_get_height(): int;

/** Hides the virtual keyboard if it is shown, does nothing otherwise. */
virtual_keyboard_hide(): void;

/**
 * Shows the virtual keyboard if the platform has one.
 *
 * `existing_text` parameter is useful for implementing your own [LineEdit] or [TextEdit], as it tells the virtual keyboard what text has already been typed (the virtual keyboard uses it for auto-correct and predictions).
 *
 * `position` parameter is the screen space [Rect2] of the edited text.
 *
 * `multiline` parameter needs to be set to `true` to be able to enter multiple lines of text, as in [TextEdit].
 *
 * `max_length` limits the number of characters that can be entered if different from `-1`.
 *
 * `cursor_start` can optionally define the current text cursor position if `cursor_end` is not set.
 *
 * `cursor_start` and `cursor_end` can optionally define the current text selection.
 *
 * **Note:** This method is implemented on Android, iOS and UWP.
 *
*/
virtual_keyboard_show(existing_text: String, position?: Rect2, multiline?: boolean, max_length?: int, cursor_start?: int, cursor_end?: int): void;

/** No documentation provided. */
vsync_is_enabled(): boolean;

/** No documentation provided. */
vsync_is_using_via_compositor(): boolean;

/** No documentation provided. */
vsync_set_enabled(enabled: boolean): void;

/** No documentation provided. */
vsync_set_use_via_compositor(enabled: boolean): void;

/** No documentation provided. */
window_attach_instance_id(instance_id: int, window_id?: int): void;

/** No documentation provided. */
window_can_draw(window_id?: int): boolean;

/** No documentation provided. */
window_get_attached_instance_id(window_id?: int): int;

/** No documentation provided. */
window_get_current_screen(window_id?: int): int;

/** No documentation provided. */
window_get_flag(flag: int, window_id?: int): boolean;

/** No documentation provided. */
window_get_max_size(window_id?: int): Vector2i;

/** No documentation provided. */
window_get_min_size(window_id?: int): Vector2i;

/** No documentation provided. */
window_get_mode(window_id?: int): int;

/** No documentation provided. */
window_get_position(window_id?: int): Vector2i;

/** No documentation provided. */
window_get_real_size(window_id?: int): Vector2i;

/** No documentation provided. */
window_get_size(window_id?: int): Vector2i;

/** No documentation provided. */
window_move_to_foreground(window_id?: int): void;

/** No documentation provided. */
window_request_attention(window_id?: int): void;

/** No documentation provided. */
window_set_current_screen(screen: int, window_id?: int): void;

/** No documentation provided. */
window_set_drop_files_callback(callback: Callable, window_id?: int): void;

/** No documentation provided. */
window_set_flag(flag: int, enabled: boolean, window_id?: int): void;

/** No documentation provided. */
window_set_ime_active(active: boolean, window_id?: int): void;

/** No documentation provided. */
window_set_ime_position(position: Vector2i, window_id?: int): void;

/** No documentation provided. */
window_set_input_event_callback(callback: Callable, window_id?: int): void;

/** No documentation provided. */
window_set_input_text_callback(callback: Callable, window_id?: int): void;

/** No documentation provided. */
window_set_max_size(max_size: Vector2i, window_id?: int): void;

/** No documentation provided. */
window_set_min_size(min_size: Vector2i, window_id?: int): void;

/** No documentation provided. */
window_set_mode(mode: int, window_id?: int): void;

/**
 * Sets a polygonal region of the window which accepts mouse events. Mouse events outside the region will be passed through.
 *
 * Passing an empty array will disable passthrough support (all mouse events will be intercepted by the window, which is the default behavior).
 *
 * @example 
 * 
 * # Set region, using Path2D node.
 * DisplayServer.window_set_mouse_passthrough($Path2D.curve.get_baked_points())
 * # Set region, using Polygon2D node.
 * DisplayServer.window_set_mouse_passthrough($Polygon2D.polygon)
 * # Reset region to default.
 * DisplayServer.window_set_mouse_passthrough([])
 * @summary 
 * 
 *
 * **Note:** On Windows, the portion of a window that lies outside the region is not drawn, while on Linux and macOS it is.
 *
 * **Note:** This method is implemented on Linux, macOS and Windows.
 *
*/
window_set_mouse_passthrough(region: PackedVector2Array, window_id?: int): void;

/** No documentation provided. */
window_set_position(position: Vector2i, window_id?: int): void;

/** No documentation provided. */
window_set_rect_changed_callback(callback: Callable, window_id?: int): void;

/** No documentation provided. */
window_set_size(size: Vector2i, window_id?: int): void;

/** No documentation provided. */
window_set_title(title: String, window_id?: int): void;

/** No documentation provided. */
window_set_transient(window_id: int, parent_window_id: int): void;

/** No documentation provided. */
window_set_window_event_callback(callback: Callable, window_id?: int): void;

  connect<T extends SignalsOf<DisplayServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static FEATURE_GLOBAL_MENU: 0;

/** No documentation provided. */
static FEATURE_SUBWINDOWS: 1;

/** No documentation provided. */
static FEATURE_TOUCHSCREEN: 2;

/** No documentation provided. */
static FEATURE_MOUSE: 3;

/** No documentation provided. */
static FEATURE_MOUSE_WARP: 4;

/** No documentation provided. */
static FEATURE_CLIPBOARD: 5;

/** No documentation provided. */
static FEATURE_VIRTUAL_KEYBOARD: 6;

/** No documentation provided. */
static FEATURE_CURSOR_SHAPE: 7;

/** No documentation provided. */
static FEATURE_CUSTOM_CURSOR_SHAPE: 8;

/** No documentation provided. */
static FEATURE_NATIVE_VIDEO: 9;

/** No documentation provided. */
static FEATURE_NATIVE_DIALOG: 10;

/** No documentation provided. */
static FEATURE_CONSOLE_WINDOW: 11;

/** No documentation provided. */
static FEATURE_IME: 12;

/** No documentation provided. */
static FEATURE_WINDOW_TRANSPARENCY: 13;

/** No documentation provided. */
static FEATURE_HIDPI: 14;

/** No documentation provided. */
static FEATURE_ICON: 15;

/** No documentation provided. */
static FEATURE_NATIVE_ICON: 16;

/** No documentation provided. */
static FEATURE_ORIENTATION: 17;

/** No documentation provided. */
static FEATURE_SWAP_BUFFERS: 18;

/** No documentation provided. */
static MOUSE_MODE_VISIBLE: 0;

/** No documentation provided. */
static MOUSE_MODE_HIDDEN: 1;

/** No documentation provided. */
static MOUSE_MODE_CAPTURED: 2;

/** No documentation provided. */
static MOUSE_MODE_CONFINED: 3;

/** No documentation provided. */
 static SCREEN_OF_MAIN_WINDOW: null;

/** No documentation provided. */
static MAIN_WINDOW_ID: 0;

/** No documentation provided. */
 static INVALID_WINDOW_ID: null;

/** No documentation provided. */
static SCREEN_LANDSCAPE: 0;

/** No documentation provided. */
static SCREEN_PORTRAIT: 1;

/** No documentation provided. */
static SCREEN_REVERSE_LANDSCAPE: 2;

/** No documentation provided. */
static SCREEN_REVERSE_PORTRAIT: 3;

/** No documentation provided. */
static SCREEN_SENSOR_LANDSCAPE: 4;

/** No documentation provided. */
static SCREEN_SENSOR_PORTRAIT: 5;

/** No documentation provided. */
static SCREEN_SENSOR: 6;

/** No documentation provided. */
static CURSOR_ARROW: 0;

/** No documentation provided. */
static CURSOR_IBEAM: 1;

/** No documentation provided. */
static CURSOR_POINTING_HAND: 2;

/** No documentation provided. */
static CURSOR_CROSS: 3;

/** No documentation provided. */
static CURSOR_WAIT: 4;

/** No documentation provided. */
static CURSOR_BUSY: 5;

/** No documentation provided. */
static CURSOR_DRAG: 6;

/** No documentation provided. */
static CURSOR_CAN_DROP: 7;

/** No documentation provided. */
static CURSOR_FORBIDDEN: 8;

/** No documentation provided. */
static CURSOR_VSIZE: 9;

/** No documentation provided. */
static CURSOR_HSIZE: 10;

/** No documentation provided. */
static CURSOR_BDIAGSIZE: 11;

/** No documentation provided. */
static CURSOR_FDIAGSIZE: 12;

/** No documentation provided. */
static CURSOR_MOVE: 13;

/** No documentation provided. */
static CURSOR_VSPLIT: 14;

/** No documentation provided. */
static CURSOR_HSPLIT: 15;

/** No documentation provided. */
static CURSOR_HELP: 16;

/** No documentation provided. */
static CURSOR_MAX: 17;

/** No documentation provided. */
static WINDOW_MODE_WINDOWED: 0;

/** No documentation provided. */
static WINDOW_MODE_MINIMIZED: 1;

/** No documentation provided. */
static WINDOW_MODE_MAXIMIZED: 2;

/** No documentation provided. */
static WINDOW_MODE_FULLSCREEN: 3;

/** No documentation provided. */
static WINDOW_FLAG_RESIZE_DISABLED: 0;

/** No documentation provided. */
static WINDOW_FLAG_BORDERLESS: 1;

/** No documentation provided. */
static WINDOW_FLAG_ALWAYS_ON_TOP: 2;

/** No documentation provided. */
static WINDOW_FLAG_TRANSPARENT: 3;

/** No documentation provided. */
static WINDOW_FLAG_NO_FOCUS: 4;

/** No documentation provided. */
static WINDOW_FLAG_MAX: 5;

/** No documentation provided. */
static WINDOW_EVENT_MOUSE_ENTER: 0;

/** No documentation provided. */
static WINDOW_EVENT_MOUSE_EXIT: 1;

/** No documentation provided. */
static WINDOW_EVENT_FOCUS_IN: 2;

/** No documentation provided. */
static WINDOW_EVENT_FOCUS_OUT: 3;

/** No documentation provided. */
static WINDOW_EVENT_CLOSE_REQUEST: 4;

/** No documentation provided. */
static WINDOW_EVENT_GO_BACK_REQUEST: 5;

/** No documentation provided. */
static WINDOW_EVENT_DPI_CHANGE: 6;


  
}


 
