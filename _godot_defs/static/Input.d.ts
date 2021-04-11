
/**
 * A singleton that deals with inputs. This includes key presses, mouse buttons and movement, joypads, and input actions. Actions and their events can be set in the **Input Map** tab in the **Project > Project Settings**, or with the [InputMap] class.
 *
*/
declare class InputClass extends Object {

  
/**
 * A singleton that deals with inputs. This includes key presses, mouse buttons and movement, joypads, and input actions. Actions and their events can be set in the **Input Map** tab in the **Project > Project Settings**, or with the [InputMap] class.
 *
*/
  "new"(): InputClass;
  static "new"(): InputClass;




/**
 * This will simulate pressing the specified action.
 *
 * The strength can be used for non-boolean actions, it's ranged between 0 and 1 representing the intensity of the given action.
 *
 * **Note:** This method will not cause any [method Node._input] calls. It is intended to be used with [method is_action_pressed] and [method is_action_just_pressed]. If you want to simulate `_input`, use [method parse_input_event] instead.
 *
*/
action_press(action: string, strength?: float): void;

/** If the specified action is already pressed, this will release it. */
action_release(action: string): void;

/** Adds a new mapping entry (in SDL2 format) to the mapping database. Optionally update already connected devices. */
add_joy_mapping(mapping: string, update_existing?: boolean): void;

/**
 * Returns the acceleration of the device's accelerometer, if the device has one. Otherwise, the method returns [constant Vector3.ZERO].
 *
 * Note this method returns an empty [Vector3] when running from the editor even when your device has an accelerometer. You must export your project to a supported device to read values from the accelerometer.
 *
 * **Note:** This method only works on iOS, Android, and UWP. On other platforms, it always returns [constant Vector3.ZERO].
 *
*/
get_accelerometer(): Vector3;

/** Returns a value between 0 and 1 representing the intensity of the given action. In a joypad, for example, the further away the axis (analog sticks or L2, R2 triggers) is from the dead zone, the closer the value will be to 1. If the action is mapped to a control that has no axis as the keyboard, the value returned will be 0 or 1. */
get_action_strength(action: string): float;

/** Returns an [Array] containing the device IDs of all currently connected joypads. */
get_connected_joypads(): any[];

/** Returns the currently assigned cursor shape (see [enum CursorShape]). */
get_current_cursor_shape(): int;

/**
 * Returns the gravity of the device's accelerometer, if the device has one. Otherwise, the method returns [constant Vector3.ZERO].
 *
 * **Note:** This method only works on Android and iOS. On other platforms, it always returns [constant Vector3.ZERO].
 *
*/
get_gravity(): Vector3;

/**
 * Returns the rotation rate in rad/s around a device's X, Y, and Z axes of the gyroscope, if the device has one. Otherwise, the method returns [constant Vector3.ZERO].
 *
 * **Note:** This method only works on Android. On other platforms, it always returns [constant Vector3.ZERO].
 *
*/
get_gyroscope(): Vector3;

/** Returns the current value of the joypad axis at given index (see [enum JoystickList]). */
get_joy_axis(device: int, axis: int): float;

/** Returns the index of the provided axis name. */
get_joy_axis_index_from_string(axis: string): int;

/** Receives a [enum JoystickList] axis and returns its equivalent name as a string. */
get_joy_axis_string(axis_index: int): string;

/** Returns the index of the provided button name. */
get_joy_button_index_from_string(button: string): int;

/** Receives a gamepad button from [enum JoystickList] and returns its equivalent name as a string. */
get_joy_button_string(button_index: int): string;

/** Returns a SDL2-compatible device GUID on platforms that use gamepad remapping. Returns [code]"Default Gamepad"[/code] otherwise. */
get_joy_guid(device: int): string;

/** Returns the name of the joypad at the specified device index. */
get_joy_name(device: int): string;

/** Returns the duration of the current vibration effect in seconds. */
get_joy_vibration_duration(device: int): float;

/** Returns the strength of the joypad vibration: x is the strength of the weak motor, and y is the strength of the strong motor. */
get_joy_vibration_strength(device: int): Vector2;

/** Returns the mouse speed for the last time the cursor was moved, and this until the next frame where the mouse moves. This means that even if the mouse is not moving, this function will still return the value of the last motion. */
get_last_mouse_speed(): Vector2;

/**
 * Returns the the magnetic field strength in micro-Tesla for all axes of the device's magnetometer, if the device has one. Otherwise, the method returns [constant Vector3.ZERO].
 *
 * **Note:** This method only works on Android and UWP. On other platforms, it always returns [constant Vector3.ZERO].
 *
*/
get_magnetometer(): Vector3;

/** Returns mouse buttons as a bitmask. If multiple mouse buttons are pressed at the same time, the bits are added together. */
get_mouse_button_mask(): int;

/** Returns the mouse mode. See the constants for more information. */
get_mouse_mode(): int;

/**
 * Returns `true` when the user starts pressing the action event, meaning it's `true` only on the frame that the user pressed down the button.
 *
 * This is useful for code that needs to run only once when an action is pressed, instead of every frame while it's pressed.
 *
*/
is_action_just_pressed(action: string): boolean;

/** Returns [code]true[/code] when the user stops pressing the action event, meaning it's [code]true[/code] only on the frame that the user released the button. */
is_action_just_released(action: string): boolean;

/** Returns [code]true[/code] if you are pressing the action event. Note that if an action has multiple buttons assigned and more than one of them is pressed, releasing one button will release the action, even if some other button assigned to this action is still pressed. */
is_action_pressed(action: string): boolean;

/** Returns [code]true[/code] if you are pressing the joypad button (see [enum JoystickList]). */
is_joy_button_pressed(device: int, button: int): boolean;

/** Returns [code]true[/code] if the system knows the specified device. This means that it sets all button and axis indices exactly as defined in [enum JoystickList]. Unknown joypads are not expected to match these constants, but you can still retrieve events from them. */
is_joy_known(device: int): boolean;

/** Returns [code]true[/code] if you are pressing the key. You can pass a [enum KeyList] constant. */
is_key_pressed(scancode: int): boolean;

/** Returns [code]true[/code] if you are pressing the mouse button specified with [enum ButtonList]. */
is_mouse_button_pressed(button: int): boolean;

/**
 * Notifies the [Input] singleton that a connection has changed, to update the state for the `device` index.
 *
 * This is used internally and should not have to be called from user scripts. See [signal joy_connection_changed] for the signal emitted when this is triggered internally.
 *
*/
joy_connection_changed(device: int, connected: boolean, name: string, guid: string): void;

/**
 * Feeds an [InputEvent] to the game. Can be used to artificially trigger input events from code. Also generates [method Node._input] calls.
 *
 * Example:
 *
 * @example 
 * 
 * var a = InputEventAction.new()
 * a.action = "ui_cancel"
 * a.pressed = true
 * Input.parse_input_event(a)
 * @summary 
 * 
 *
*/
parse_input_event(event: InputEvent): void;

/** Removes all mappings from the internal database that match the given GUID. */
remove_joy_mapping(guid: string): void;

/**
 * Sets a custom mouse cursor image, which is only visible inside the game window. The hotspot can also be specified. Passing `null` to the image parameter resets to the system cursor. See [enum CursorShape] for the list of shapes.
 *
 * `image`'s size must be lower than 256×256.
 *
 * `hotspot` must be within `image`'s size.
 *
 * **Note:** [AnimatedTexture]s aren't supported as custom mouse cursors. If using an [AnimatedTexture], only the first frame will be displayed.
 *
 * **Note:** Only images imported with the **Lossless**, **Lossy** or **Uncompressed** compression modes are supported. The **Video RAM** compression mode can't be used for custom cursors.
 *
*/
set_custom_mouse_cursor(image: Resource, shape?: int, hotspot?: Vector2): void;

/**
 * Sets the default cursor shape to be used in the viewport instead of [constant CURSOR_ARROW].
 *
 * **Note:** If you want to change the default cursor shape for [Control]'s nodes, use [member Control.mouse_default_cursor_shape] instead.
 *
 * **Note:** This method generates an [InputEventMouseMotion] to update cursor immediately.
 *
*/
set_default_cursor_shape(shape?: int): void;

/** Sets the mouse mode. See the constants for more information. */
set_mouse_mode(mode: int): void;

/**
 * Enables or disables the accumulation of similar input events sent by the operating system. When input accumulation is enabled, all input events generated during a frame will be merged and emitted when the frame is done rendering. Therefore, this limits the number of input method calls per second to the rendering FPS.
 *
 * Input accumulation is enabled by default. It can be disabled to get slightly more precise/reactive input at the cost of increased CPU usage. In applications where drawing freehand lines is required, input accumulation should generally be disabled while the user is drawing the line to get results that closely follow the actual input.
 *
*/
set_use_accumulated_input(enable: boolean): void;

/**
 * Starts to vibrate the joypad. Joypads usually come with two rumble motors, a strong and a weak one. `weak_magnitude` is the strength of the weak motor (between 0 and 1) and `strong_magnitude` is the strength of the strong motor (between 0 and 1). `duration` is the duration of the effect in seconds (a duration of 0 will try to play the vibration indefinitely).
 *
 * **Note:** Not every hardware is compatible with long effect durations; it is recommended to restart an effect if it has to be played for more than a few seconds.
 *
*/
start_joy_vibration(device: int, weak_magnitude: float, strong_magnitude: float, duration?: float): void;

/** Stops the vibration of the joypad. */
stop_joy_vibration(device: int): void;

/**
 * Vibrate Android and iOS devices.
 *
 * **Note:** It needs VIBRATE permission for Android at export settings. iOS does not support duration.
 *
*/
vibrate_handheld(duration_ms?: int): void;

/** Sets the mouse position to the specified vector. */
warp_mouse_position(to: Vector2): void;

  connect<T extends SignalsOf<InputClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Makes the mouse cursor visible if it is hidden.
 *
*/
static MOUSE_MODE_VISIBLE: 0;

/**
 * Makes the mouse cursor hidden if it is visible.
 *
*/
static MOUSE_MODE_HIDDEN: 1;

/**
 * Captures the mouse. The mouse will be hidden and its position locked at the center of the screen.
 *
 * **Note:** If you want to process the mouse's movement in this mode, you need to use [member InputEventMouseMotion.relative].
 *
*/
static MOUSE_MODE_CAPTURED: 2;

/**
 * Makes the mouse cursor visible but confines it to the game window.
 *
*/
static MOUSE_MODE_CONFINED: 3;

/**
 * Arrow cursor. Standard, default pointing cursor.
 *
*/
static CURSOR_ARROW: 0;

/**
 * I-beam cursor. Usually used to show where the text cursor will appear when the mouse is clicked.
 *
*/
static CURSOR_IBEAM: 1;

/**
 * Pointing hand cursor. Usually used to indicate the pointer is over a link or other interactable item.
 *
*/
static CURSOR_POINTING_HAND: 2;

/**
 * Cross cursor. Typically appears over regions in which a drawing operation can be performed or for selections.
 *
*/
static CURSOR_CROSS: 3;

/**
 * Wait cursor. Indicates that the application is busy performing an operation. This cursor shape denotes that the application is still usable during the operation.
 *
*/
static CURSOR_WAIT: 4;

/**
 * Busy cursor. Indicates that the application is busy performing an operation. This cursor shape denotes that the application isn't usable during the operation (e.g. something is blocking its main thread).
 *
*/
static CURSOR_BUSY: 5;

/**
 * Drag cursor. Usually displayed when dragging something.
 *
*/
static CURSOR_DRAG: 6;

/**
 * Can drop cursor. Usually displayed when dragging something to indicate that it can be dropped at the current position.
 *
*/
static CURSOR_CAN_DROP: 7;

/**
 * Forbidden cursor. Indicates that the current action is forbidden (for example, when dragging something) or that the control at a position is disabled.
 *
*/
static CURSOR_FORBIDDEN: 8;

/**
 * Vertical resize mouse cursor. A double-headed vertical arrow. It tells the user they can resize the window or the panel vertically.
 *
*/
static CURSOR_VSIZE: 9;

/**
 * Horizontal resize mouse cursor. A double-headed horizontal arrow. It tells the user they can resize the window or the panel horizontally.
 *
*/
static CURSOR_HSIZE: 10;

/**
 * Window resize mouse cursor. The cursor is a double-headed arrow that goes from the bottom left to the top right. It tells the user they can resize the window or the panel both horizontally and vertically.
 *
*/
static CURSOR_BDIAGSIZE: 11;

/**
 * Window resize mouse cursor. The cursor is a double-headed arrow that goes from the top left to the bottom right, the opposite of [constant CURSOR_BDIAGSIZE]. It tells the user they can resize the window or the panel both horizontally and vertically.
 *
*/
static CURSOR_FDIAGSIZE: 12;

/**
 * Move cursor. Indicates that something can be moved.
 *
*/
static CURSOR_MOVE: 13;

/**
 * Vertical split mouse cursor. On Windows, it's the same as [constant CURSOR_VSIZE].
 *
*/
static CURSOR_VSPLIT: 14;

/**
 * Horizontal split mouse cursor. On Windows, it's the same as [constant CURSOR_HSIZE].
 *
*/
static CURSOR_HSPLIT: 15;

/**
 * Help cursor. Usually a question mark.
 *
*/
static CURSOR_HELP: 16;


  /**
 * Emitted when a joypad device has been connected or disconnected.
 *
*/
joy_connection_changed: Signal<(device: int, connected: boolean) => void>

}
