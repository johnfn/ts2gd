
/**
 * This node extends [Camera] to add collisions with [Area] and/or [PhysicsBody] nodes. The camera cannot move through colliding objects.
 *
*/
declare class ClippedCamera extends Camera {

  
/**
 * This node extends [Camera] to add collisions with [Area] and/or [PhysicsBody] nodes. The camera cannot move through colliding objects.
 *
*/
  "new"(): ClippedCamera;
  static "new"(): ClippedCamera;



/** If [code]true[/code], the camera stops on contact with [Area]s. */
clip_to_areas: boolean;

/** If [code]true[/code], the camera stops on contact with [PhysicsBody]s. */
clip_to_bodies: boolean;

/** The camera's collision mask. Only objects in at least one collision layer matching the mask will be detected. See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** The camera's collision margin. The camera can't get closer than this distance to a colliding object. */
margin: float;

/** The camera's process callback. See [enum ProcessMode]. */
process_mode: int;

/** Adds a collision exception so the camera does not collide with the specified node. */
add_exception(node: Object): void;

/** Adds a collision exception so the camera does not collide with the specified [RID]. */
add_exception_rid(rid: RID): void;

/** Removes all collision exceptions. */
clear_exceptions(): void;

/** Returns the distance the camera has been offset due to a collision. */
get_clip_offset(): float;

/**
 * Returns `true` if the specified bit index is on.
 *
 * **Note:** Bit indices range from 0-19.
 *
*/
get_collision_mask_bit(bit: int): boolean;

/** Removes a collision exception with the specified node. */
remove_exception(node: Object): void;

/** Removes a collision exception with the specified [RID]. */
remove_exception_rid(rid: RID): void;

/**
 * Sets the specified bit index to the `value`.
 *
 * **Note:** Bit indices range from 0-19.
 *
*/
set_collision_mask_bit(bit: int, value: boolean): void;

  // connect<T extends SignalsOf<ClippedCamera>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ClippedCameraSignals>>(signal: T, method: SignalFunction<ClippedCameraSignals[T]>): number;



/**
 * The camera updates with the `_physics_process` callback.
 *
*/
static CLIP_PROCESS_PHYSICS: any;

/**
 * The camera updates with the `_process` callback.
 *
*/
static CLIP_PROCESS_IDLE: any;

}

declare class ClippedCameraSignals extends CameraSignals {
  
}
