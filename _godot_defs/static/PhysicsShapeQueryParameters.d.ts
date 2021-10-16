
/**
 * This class contains the shape and other parameters for 3D intersection/collision queries.
 *
*/
declare class PhysicsShapeQueryParameters extends Reference {

  
/**
 * This class contains the shape and other parameters for 3D intersection/collision queries.
 *
*/
  "new"(): PhysicsShapeQueryParameters;
  static "new"(): PhysicsShapeQueryParameters;



/** If [code]true[/code], the query will take [Area]s into account. */
collide_with_areas: boolean;

/** If [code]true[/code], the query will take [PhysicsBody]s into account. */
collide_with_bodies: boolean;

/** The physics layer(s) the query will take into account (as a bitmask). See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** The list of objects or object [RID]s that will be excluded from collisions. */
exclude: any[];

/** The collision margin for the shape. */
margin: float;

/** The queried shape's [RID]. See also [method set_shape]. */
shape_rid: RID;

/** The queried shape's transform matrix. */
transform: Transform;

/** Sets the [Shape] that will be used for collision/intersection queries. */
set_shape(shape: Resource): void;

  // connect<T extends SignalsOf<PhysicsShapeQueryParameters>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PhysicsShapeQueryParametersSignals>>(signal: T, method: SignalFunction<PhysicsShapeQueryParametersSignals[T]>): number;




}

declare class PhysicsShapeQueryParametersSignals extends ReferenceSignals {
  
}
