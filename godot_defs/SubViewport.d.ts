
/**
*/
declare class SubViewport extends Viewport {

  
/**
*/
  "new"(): this;
  static "new"(): this;



/**
 * The clear mode when the sub-viewport is used as a render target.
 *
 * **Note:** This property is intended for 2D usage.
 *
*/
render_target_clear_mode: int;

/** The update mode when the sub-viewport is used as a render target. */
render_target_update_mode: int;

/** The width and height of the sub-viewport. */
size: Vector2i;

/** The 2D size override of the sub-viewport. If either the width or height is [code]0[/code], the override is disabled. */
size_2d_override: Vector2i;

/** If [code]true[/code], the 2D size override affects stretch as well. */
size_2d_override_stretch: boolean;

/** If [code]true[/code], the sub-viewport will be used in AR/VR process. */
xr: boolean;



  connect<T extends SignalsOf<SubViewport>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Always clear the render target before drawing.
 *
*/
static CLEAR_MODE_ALWAYS: 0;

/**
 * Never clear the render target.
 *
*/
static CLEAR_MODE_NEVER: 1;

/**
 * Clear the render target next frame, then switch to [constant CLEAR_MODE_NEVER].
 *
*/
static CLEAR_MODE_ONLY_NEXT_FRAME: 2;

/**
 * Do not update the render target.
 *
*/
static UPDATE_DISABLED: 0;

/**
 * Update the render target once, then switch to [constant UPDATE_DISABLED].
 *
*/
static UPDATE_ONCE: 1;

/**
 * Update the render target only when it is visible. This is the default value.
 *
*/
static UPDATE_WHEN_VISIBLE: 2;

/**
 * Update the render target only when the its parent is visible.
 *
*/
static UPDATE_WHEN_PARENT_VISIBLE: 3;

/**
 * Always update the render target.
 *
*/
static UPDATE_ALWAYS: 4;


  
}


 
