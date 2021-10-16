
/**
 * The VisibilityEnabler2D will disable [RigidBody2D], [AnimationPlayer], and other nodes when they are not visible. It will only affect nodes with the same root node as the VisibilityEnabler2D, and the root node itself.
 *
 * If you just want to receive notifications, use [VisibilityNotifier2D] instead.
 *
 * **Note:** For performance reasons, VisibilityEnabler2D uses an approximate heuristic with precision determined by [member ProjectSettings.world/2d/cell_size]. If you need precise visibility checking, use another method such as adding an [Area2D] node as a child of a [Camera2D] node.
 *
 * **Note:** VisibilityEnabler2D will not affect nodes added after scene initialization.
 *
*/
declare class VisibilityEnabler2D extends VisibilityNotifier2D {

  
/**
 * The VisibilityEnabler2D will disable [RigidBody2D], [AnimationPlayer], and other nodes when they are not visible. It will only affect nodes with the same root node as the VisibilityEnabler2D, and the root node itself.
 *
 * If you just want to receive notifications, use [VisibilityNotifier2D] instead.
 *
 * **Note:** For performance reasons, VisibilityEnabler2D uses an approximate heuristic with precision determined by [member ProjectSettings.world/2d/cell_size]. If you need precise visibility checking, use another method such as adding an [Area2D] node as a child of a [Camera2D] node.
 *
 * **Note:** VisibilityEnabler2D will not affect nodes added after scene initialization.
 *
*/
  "new"(): VisibilityEnabler2D;
  static "new"(): VisibilityEnabler2D;



/** If [code]true[/code], [RigidBody2D] nodes will be paused. */
freeze_bodies: boolean;

/** If [code]true[/code], [AnimatedSprite] nodes will be paused. */
pause_animated_sprites: boolean;

/** If [code]true[/code], [AnimationPlayer] nodes will be paused. */
pause_animations: boolean;

/** If [code]true[/code], [Particles2D] nodes will be paused. */
pause_particles: boolean;

/** If [code]true[/code], the parent's [method Node._physics_process] will be stopped. */
physics_process_parent: boolean;

/** If [code]true[/code], the parent's [method Node._process] will be stopped. */
process_parent: boolean;

/** Returns whether the enabler identified by given [enum Enabler] constant is active. */
is_enabler_enabled(enabler: int): boolean;

/** Sets active state of the enabler identified by given [enum Enabler] constant. */
set_enabler(enabler: int, enabled: boolean): void;

  // connect<T extends SignalsOf<VisibilityEnabler2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisibilityEnabler2DSignals>>(signal: T, method: SignalFunction<VisibilityEnabler2DSignals[T]>): number;



/**
 * This enabler will pause [AnimationPlayer] nodes.
 *
*/
static ENABLER_PAUSE_ANIMATIONS: any;

/**
 * This enabler will freeze [RigidBody2D] nodes.
 *
*/
static ENABLER_FREEZE_BODIES: any;

/**
 * This enabler will stop [Particles2D] nodes.
 *
*/
static ENABLER_PAUSE_PARTICLES: any;

/**
 * This enabler will stop the parent's _process function.
 *
*/
static ENABLER_PARENT_PROCESS: any;

/**
 * This enabler will stop the parent's _physics_process function.
 *
*/
static ENABLER_PARENT_PHYSICS_PROCESS: any;

/**
 * This enabler will stop [AnimatedSprite] nodes animations.
 *
*/
static ENABLER_PAUSE_ANIMATED_SPRITES: any;

/**
 * Represents the size of the [enum Enabler] enum.
 *
*/
static ENABLER_MAX: any;

}

declare class VisibilityEnabler2DSignals extends VisibilityNotifier2DSignals {
  
}
