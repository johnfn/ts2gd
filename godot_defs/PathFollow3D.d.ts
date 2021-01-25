
/**
 * This node takes its parent [Path3D], and returns the coordinates of a point within it, given a distance from the first vertex.
 *
 * It is useful for making other nodes follow a path, without coding the movement pattern. For that, the nodes must be children of this node. The descendant nodes will then move accordingly when setting an offset in this node.
 *
*/
declare class PathFollow3D extends Node3D {

  
/**
 * This node takes its parent [Path3D], and returns the coordinates of a point within it, given a distance from the first vertex.
 *
 * It is useful for making other nodes follow a path, without coding the movement pattern. For that, the nodes must be children of this node. The descendant nodes will then move accordingly when setting an offset in this node.
 *
*/
  "new"(): this;
  static "new"(): this;



/**
 * If `true`, the position between two cached points is interpolated cubically, and linearly otherwise.
 *
 * The points along the [Curve3D] of the [Path3D] are precomputed before use, for faster calculations. The point at the requested offset is then calculated interpolating between two adjacent cached points. This may present a problem if the curve makes sharp turns, as the cached points may not follow the curve closely enough.
 *
 * There are two answers to this problem: either increase the number of cached points and increase memory consumption, or make a cubic interpolation between two points at the cost of (slightly) slower calculations.
 *
*/
cubic_interp: boolean;

/** The node's offset along the curve. */
h_offset: float;

/** If [code]true[/code], any offset outside the path's length will wrap around, instead of stopping at the ends. Use it for cyclic paths. */
loop: boolean;

/** The distance from the first vertex, measured in 3D units along the path. This sets this node's position to a point within the path. */
offset: float;

/** Allows or forbids rotation on one or more axes, depending on the [enum RotationMode] constants being used. */
rotation_mode: int;

/** The distance from the first vertex, considering 0.0 as the first vertex and 1.0 as the last. This is just another way of expressing the offset within the path, as the offset supplied is multiplied internally by the path's length. */
unit_offset: float;

/** The node's offset perpendicular to the curve. */
v_offset: float;



  connect<T extends SignalsOf<PathFollow3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Forbids the PathFollow3D to rotate.
 *
*/
static ROTATION_NONE: 0;

/**
 * Allows the PathFollow3D to rotate in the Y axis only.
 *
*/
static ROTATION_Y: 1;

/**
 * Allows the PathFollow3D to rotate in both the X, and Y axes.
 *
*/
static ROTATION_XY: 2;

/**
 * Allows the PathFollow3D to rotate in any axis.
 *
*/
static ROTATION_XYZ: 3;

/**
 * Uses the up vector information in a [Curve3D] to enforce orientation. This rotation mode requires the [Path3D]'s [member Curve3D.up_vector_enabled] property to be set to `true`.
 *
*/
static ROTATION_ORIENTED: 4;


  
}


 
