
/**
 * This class contains the shape and other parameters for 2D intersection/collision queries.
 *
*/
declare class Physics2DShapeQueryParameters extends Reference  {

  
/**
 * This class contains the shape and other parameters for 2D intersection/collision queries.
 *
*/
  new(): Physics2DShapeQueryParameters; 
  static "new"(): Physics2DShapeQueryParameters 


/** If [code]true[/code], the query will take [Area2D]s into account. */
collide_with_areas: boolean;

/** If [code]true[/code], the query will take [PhysicsBody2D]s into account. */
collide_with_bodies: boolean;

/** The physics layer(s) the query will take into account (as a bitmask). See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_layer: int;

/** The list of objects or object [RID]s that will be excluded from collisions. */
exclude: any[];

/** The collision margin for the shape. */
margin: float;

/** The motion of the shape being queried for. */
motion: Vector2;

/** The queried shape's [RID]. See also [method set_shape]. */
shape_rid: RID;

/** The queried shape's transform matrix. */
transform: Transform2D;

/** Sets the [Shape2D] that will be used for collision/intersection queries. */
set_shape(shape: Resource): void;

  connect<T extends SignalsOf<Physics2DShapeQueryParameters>>(signal: T, method: SignalFunction<Physics2DShapeQueryParameters[T]>): number;






}

