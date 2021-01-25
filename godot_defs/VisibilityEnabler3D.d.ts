
/**
 * The VisibilityEnabler3D will disable [RigidBody3D] and [AnimationPlayer] nodes when they are not visible. It will only affect other nodes within the same scene as the VisibilityEnabler3D itself.
 *
 * If you just want to receive notifications, use [VisibilityNotifier3D] instead.
 *
 * **Note:** VisibilityEnabler3D uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area3D] node as a child of a [Camera3D] node and/or [method Vector3.dot].
 *
 * **Note:** VisibilityEnabler3D will not affect nodes added after scene initialization.
 *
*/
declare class VisibilityEnabler3D extends VisibilityNotifier3D {

  
/**
 * The VisibilityEnabler3D will disable [RigidBody3D] and [AnimationPlayer] nodes when they are not visible. It will only affect other nodes within the same scene as the VisibilityEnabler3D itself.
 *
 * If you just want to receive notifications, use [VisibilityNotifier3D] instead.
 *
 * **Note:** VisibilityEnabler3D uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area3D] node as a child of a [Camera3D] node and/or [method Vector3.dot].
 *
 * **Note:** VisibilityEnabler3D will not affect nodes added after scene initialization.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], [RigidBody3D] nodes will be paused. */
freeze_bodies: boolean;

/** If [code]true[/code], [AnimationPlayer] nodes will be paused. */
pause_animations: boolean;

/** Returns whether the enabler identified by given [enum Enabler] constant is active. */
is_enabler_enabled(enabler: int): boolean;

/** Sets active state of the enabler identified by given [enum Enabler] constant. */
set_enabler(enabler: int, enabled: boolean): void;

  connect<T extends SignalsOf<VisibilityEnabler3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * This enabler will pause [AnimationPlayer] nodes.
 *
*/
static ENABLER_PAUSE_ANIMATIONS: 0;

/**
 * This enabler will freeze [RigidBody3D] nodes.
 *
*/
static ENABLER_FREEZE_BODIES: 1;

/**
 * Represents the size of the [enum Enabler] enum.
 *
*/
static ENABLER_MAX: 2;


  
}


 
