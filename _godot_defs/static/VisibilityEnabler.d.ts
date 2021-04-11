
/**
 * The VisibilityEnabler will disable [RigidBody] and [AnimationPlayer] nodes when they are not visible. It will only affect other nodes within the same scene as the VisibilityEnabler itself.
 *
 * If you just want to receive notifications, use [VisibilityNotifier] instead.
 *
 * **Note:** VisibilityEnabler uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area] node as a child of a [Camera] node and/or [method Vector3.dot].
 *
 * **Note:** VisibilityEnabler will not affect nodes added after scene initialization.
 *
*/
declare class VisibilityEnabler extends VisibilityNotifier {

  
/**
 * The VisibilityEnabler will disable [RigidBody] and [AnimationPlayer] nodes when they are not visible. It will only affect other nodes within the same scene as the VisibilityEnabler itself.
 *
 * If you just want to receive notifications, use [VisibilityNotifier] instead.
 *
 * **Note:** VisibilityEnabler uses an approximate heuristic for performance reasons. It doesn't take walls and other occlusion into account. The heuristic is an implementation detail and may change in future versions. If you need precise visibility checking, use another method such as adding an [Area] node as a child of a [Camera] node and/or [method Vector3.dot].
 *
 * **Note:** VisibilityEnabler will not affect nodes added after scene initialization.
 *
*/
  "new"(): VisibilityEnabler;
  static "new"(): VisibilityEnabler;



/** If [code]true[/code], [RigidBody] nodes will be paused. */
freeze_bodies: boolean;

/** If [code]true[/code], [AnimationPlayer] nodes will be paused. */
pause_animations: boolean;

/** Returns whether the enabler identified by given [enum Enabler] constant is active. */
is_enabler_enabled(enabler: int): boolean;

/** Sets active state of the enabler identified by given [enum Enabler] constant. */
set_enabler(enabler: int, enabled: boolean): void;

  connect<T extends SignalsOf<VisibilityEnabler>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * This enabler will pause [AnimationPlayer] nodes.
 *
*/
static ENABLER_PAUSE_ANIMATIONS: 0;

/**
 * This enabler will freeze [RigidBody] nodes.
 *
*/
static ENABLER_FREEZE_BODIES: 1;

/**
 * Represents the size of the [enum Enabler] enum.
 *
*/
static ENABLER_MAX: 2;


  
}
