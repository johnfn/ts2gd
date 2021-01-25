
/**
 * This is a helper spatial node that is linked to the tracking of controllers. It also offers several handy passthroughs to the state of buttons and such on the controllers.
 *
 * Controllers are linked by their ID. You can create controller nodes before the controllers are available. If your game always uses two controllers (one for each hand), you can predefine the controllers with ID 1 and 2; they will become active as soon as the controllers are identified. If you expect additional controllers to be used, you should react to the signals and add ARVRController nodes to your scene.
 *
 * The position of the controller node is automatically updated by the [ARVRServer]. This makes this node ideal to add child nodes to visualize the controller.
 *
*/
declare class ARVRController extends Spatial {

  
/**
 * This is a helper spatial node that is linked to the tracking of controllers. It also offers several handy passthroughs to the state of buttons and such on the controllers.
 *
 * Controllers are linked by their ID. You can create controller nodes before the controllers are available. If your game always uses two controllers (one for each hand), you can predefine the controllers with ID 1 and 2; they will become active as soon as the controllers are identified. If you expect additional controllers to be used, you should react to the signals and add ARVRController nodes to your scene.
 *
 * The position of the controller node is automatically updated by the [ARVRServer]. This makes this node ideal to add child nodes to visualize the controller.
 *
*/
  "new"(): ARVRController;
  static "new"(): ARVRController;



/**
 * The controller's ID.
 *
 * A controller ID of 0 is unbound and will always result in an inactive node. Controller ID 1 is reserved for the first controller that identifies itself as the left-hand controller and ID 2 is reserved for the first controller that identifies itself as the right-hand controller.
 *
 * For any other controller that the [ARVRServer] detects, we continue with controller ID 3.
 *
 * When a controller is turned off, its slot is freed. This ensures controllers will keep the same ID even when controllers with lower IDs are turned off.
 *
*/
controller_id: int;

/**
 * The degree to which the controller vibrates. Ranges from `0.0` to `1.0` with precision `.01`. If changed, updates [member ARVRPositionalTracker.rumble] accordingly.
 *
 * This is a useful property to animate if you want the controller to vibrate for a limited duration.
 *
*/
rumble: float;

/** If active, returns the name of the associated controller if provided by the AR/VR SDK used. */
get_controller_name(): string;

/** Returns the hand holding this controller, if known. See [enum ARVRPositionalTracker.TrackerHand]. */
get_hand(): int;

/** Returns [code]true[/code] if the bound controller is active. ARVR systems attempt to track active controllers. */
get_is_active(): boolean;

/** Returns the value of the given axis for things like triggers, touchpads, etc. that are embedded into the controller. */
get_joystick_axis(axis: int): float;

/** Returns the ID of the joystick object bound to this. Every controller tracked by the [ARVRServer] that has buttons and axis will also be registered as a joystick within Godot. This means that all the normal joystick tracking and input mapping will work for buttons and axis found on the AR/VR controllers. This ID is purely offered as information so you can link up the controller with its joystick entry. */
get_joystick_id(): int;

/** If provided by the [ARVRInterface], this returns a mesh associated with the controller. This can be used to visualize the controller. */
get_mesh(): Mesh;

/** Returns [code]true[/code] if the button at index [code]button[/code] is pressed. See [enum JoystickList], in particular the [code]JOY_VR_*[/code] constants. */
is_button_pressed(button: int): int;

  connect<T extends SignalsOf<ARVRController>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when a button on this controller is pressed.
 *
*/
button_pressed: Signal<(button: int) => void>

/**
 * Emitted when a button on this controller is released.
 *
*/
button_release: Signal<(button: int) => void>

/**
 * Emitted when the mesh associated with the controller changes or when one becomes available. Generally speaking this will be a static mesh after becoming available.
 *
*/
mesh_updated: Signal<(mesh: Mesh) => void>

}
