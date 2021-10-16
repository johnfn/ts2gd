
/**
 * This node takes its parent [Path2D], and returns the coordinates of a point within it, given a distance from the first vertex.
 *
 * It is useful for making other nodes follow a path, without coding the movement pattern. For that, the nodes must be children of this node. The descendant nodes will then move accordingly when setting an offset in this node.
 *
*/
declare class PathFollow2D extends Node2D {

  
/**
 * This node takes its parent [Path2D], and returns the coordinates of a point within it, given a distance from the first vertex.
 *
 * It is useful for making other nodes follow a path, without coding the movement pattern. For that, the nodes must be children of this node. The descendant nodes will then move accordingly when setting an offset in this node.
 *
*/
  "new"(): PathFollow2D;
  static "new"(): PathFollow2D;



/**
 * If `true`, the position between two cached points is interpolated cubically, and linearly otherwise.
 *
 * The points along the [Curve2D] of the [Path2D] are precomputed before use, for faster calculations. The point at the requested offset is then calculated interpolating between two adjacent cached points. This may present a problem if the curve makes sharp turns, as the cached points may not follow the curve closely enough.
 *
 * There are two answers to this problem: either increase the number of cached points and increase memory consumption, or make a cubic interpolation between two points at the cost of (slightly) slower calculations.
 *
*/
cubic_interp: boolean;

/** The node's offset along the curve. */
h_offset: float;

/** How far to look ahead of the curve to calculate the tangent if the node is rotating. E.g. shorter lookaheads will lead to faster rotations. */
lookahead: float;

/** If [code]true[/code], any offset outside the path's length will wrap around, instead of stopping at the ends. Use it for cyclic paths. */
loop: boolean;

/** The distance along the path in pixels. */
offset: float;


/** The distance along the path as a number in the range 0.0 (for the first vertex) to 1.0 (for the last). This is just another way of expressing the offset within the path, as the offset supplied is multiplied internally by the path's length. */
unit_offset: float;

/** The node's offset perpendicular to the curve. */
v_offset: float;



  // connect<T extends SignalsOf<PathFollow2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PathFollow2DSignals>>(signal: T, method: SignalFunction<PathFollow2DSignals[T]>): number;




}

declare class PathFollow2DSignals extends Node2DSignals {
  
}
