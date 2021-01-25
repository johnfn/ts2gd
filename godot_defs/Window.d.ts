
/**
*/
declare class Window extends Viewport {

  
/**
*/
  "new"(): this;
  static "new"(): this;























/** No documentation provided. */
can_draw(): boolean;

/** No documentation provided. */
child_controls_changed(): void;

/** No documentation provided. */
get_flag(flag: int): boolean;

/** No documentation provided. */
get_real_size(): Vector2i;

/** No documentation provided. */
get_theme_color(name: StringName, type?: StringName): Color;

/** No documentation provided. */
get_theme_constant(name: StringName, type?: StringName): int;

/** No documentation provided. */
get_theme_font(name: StringName, type?: StringName): Font;

/** No documentation provided. */
get_theme_icon(name: StringName, type?: StringName): Texture2D;

/** No documentation provided. */
get_theme_stylebox(name: StringName, type?: StringName): StyleBox;

/** No documentation provided. */
grab_focus(): void;

/** No documentation provided. */
has_focus(): boolean;

/** No documentation provided. */
has_theme_color(name: StringName, type?: StringName): boolean;

/** No documentation provided. */
has_theme_constant(name: StringName, type?: StringName): boolean;

/** No documentation provided. */
has_theme_font(name: StringName, type?: StringName): boolean;

/** No documentation provided. */
has_theme_icon(name: StringName, type?: StringName): boolean;

/** No documentation provided. */
has_theme_stylebox(name: StringName, type?: StringName): boolean;

/** No documentation provided. */
hide(): void;

/** No documentation provided. */
is_embedded(): boolean;

/** No documentation provided. */
is_maximize_allowed(): boolean;

/** No documentation provided. */
is_using_font_oversampling(): boolean;

/** No documentation provided. */
move_to_foreground(): void;

/** No documentation provided. */
popup(rect?: Rect2i): void;

/** No documentation provided. */
popup_centered(minsize?: Vector2i): void;

/** No documentation provided. */
popup_centered_clamped(minsize?: Vector2i, fallback_ratio?: float): void;

/** No documentation provided. */
popup_centered_ratio(ratio?: float): void;

/** No documentation provided. */
popup_on_parent(parent_rect: Rect2i): void;

/** No documentation provided. */
request_attention(): void;

/** No documentation provided. */
set_flag(flag: int, enabled: boolean): void;

/** No documentation provided. */
set_ime_active(arg0: boolean): void;

/** No documentation provided. */
set_ime_position(arg0: Vector2i): void;

/** No documentation provided. */
set_use_font_oversampling(enable: boolean): void;

/** No documentation provided. */
show(): void;

  connect<T extends SignalsOf<Window>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static NOTIFICATION_VISIBILITY_CHANGED: 30;

/** No documentation provided. */
static MODE_WINDOWED: 0;

/** No documentation provided. */
static MODE_MINIMIZED: 1;

/** No documentation provided. */
static MODE_MAXIMIZED: 2;

/** No documentation provided. */
static MODE_FULLSCREEN: 3;

/** No documentation provided. */
static FLAG_RESIZE_DISABLED: 0;

/** No documentation provided. */
static FLAG_BORDERLESS: 1;

/** No documentation provided. */
static FLAG_ALWAYS_ON_TOP: 2;

/** No documentation provided. */
static FLAG_TRANSPARENT: 3;

/** No documentation provided. */
static FLAG_NO_FOCUS: 4;

/** No documentation provided. */
static FLAG_MAX: 5;

/** No documentation provided. */
static CONTENT_SCALE_MODE_DISABLED: 0;

/** No documentation provided. */
static CONTENT_SCALE_MODE_CANVAS_ITEMS: 1;

/** No documentation provided. */
static CONTENT_SCALE_MODE_VIEWPORT: 2;

/** No documentation provided. */
static CONTENT_SCALE_ASPECT_IGNORE: 0;

/** No documentation provided. */
static CONTENT_SCALE_ASPECT_KEEP: 1;

/** No documentation provided. */
static CONTENT_SCALE_ASPECT_KEEP_WIDTH: 2;

/** No documentation provided. */
static CONTENT_SCALE_ASPECT_KEEP_HEIGHT: 3;

/** No documentation provided. */
static CONTENT_SCALE_ASPECT_EXPAND: 4;


  /**
*/
about_to_popup: Signal<() => void>

/**
*/
close_requested: Signal<() => void>

/**
*/
files_dropped: Signal<(files: PackedStringArray) => void>

/**
*/
focus_entered: Signal<() => void>

/**
*/
focus_exited: Signal<() => void>

/**
*/
go_back_requested: Signal<() => void>

/**
*/
mouse_entered: Signal<() => void>

/**
*/
mouse_exited: Signal<() => void>

/**
*/
visibility_changed: Signal<() => void>

/**
*/
window_input: Signal<(event: InputEvent) => void>

}


 
