
/**
 * Base class for all 2D shapes. All 2D shape types inherit from this.
 *
*/
declare class Shape2D extends Resource {

  
/**
 * Base class for all 2D shapes. All 2D shape types inherit from this.
 *
*/
  "new"(): Shape2D;
  static "new"(): Shape2D;



/** The shape's custom solver bias. */
custom_solver_bias: float;

/**
 * Returns `true` if this shape is colliding with another.
 *
 * This method needs the transformation matrix for this shape (`local_xform`), the shape to check collisions with (`with_shape`), and the transformation matrix of that shape (`shape_xform`).
 *
*/
collide(local_xform: Transform2D, with_shape: Shape2D, shape_xform: Transform2D): boolean;

/**
 * Returns a list of the points where this shape touches another. If there are no collisions the list is empty.
 *
 * This method needs the transformation matrix for this shape (`local_xform`), the shape to check collisions with (`with_shape`), and the transformation matrix of that shape (`shape_xform`).
 *
*/
collide_and_get_contacts(local_xform: Transform2D, with_shape: Shape2D, shape_xform: Transform2D): any[];

/**
 * Returns whether this shape would collide with another, if a given movement was applied.
 *
 * This method needs the transformation matrix for this shape (`local_xform`), the movement to test on this shape (`local_motion`), the shape to check collisions with (`with_shape`), the transformation matrix of that shape (`shape_xform`), and the movement to test onto the other object (`shape_motion`).
 *
*/
collide_with_motion(local_xform: Transform2D, local_motion: Vector2, with_shape: Shape2D, shape_xform: Transform2D, shape_motion: Vector2): boolean;

/**
 * Returns a list of the points where this shape would touch another, if a given movement was applied. If there are no collisions the list is empty.
 *
 * This method needs the transformation matrix for this shape (`local_xform`), the movement to test on this shape (`local_motion`), the shape to check collisions with (`with_shape`), the transformation matrix of that shape (`shape_xform`), and the movement to test onto the other object (`shape_motion`).
 *
*/
collide_with_motion_and_get_contacts(local_xform: Transform2D, local_motion: Vector2, with_shape: Shape2D, shape_xform: Transform2D, shape_motion: Vector2): any[];

/** Draws a solid shape onto a [CanvasItem] with the [VisualServer] API filled with the specified [code]color[/code]. The exact drawing method is specific for each shape and cannot be configured. */
draw(canvas_item: RID, color: Color): void;

  // connect<T extends SignalsOf<Shape2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Shape2DSignals>>(signal: T, method: SignalFunction<Shape2DSignals[T]>): number;




}

declare class Shape2DSignals extends ResourceSignals {
  
}
