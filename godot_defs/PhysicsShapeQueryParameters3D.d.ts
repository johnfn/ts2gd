
/**
 * This class contains the shape and other parameters for 3D intersection/collision queries. See also [PhysicsShapeQueryResult3D].
 *
*/
declare class PhysicsShapeQueryParameters3D extends Reference {

  
/**
 * This class contains the shape and other parameters for 3D intersection/collision queries. See also [PhysicsShapeQueryResult3D].
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], the query will take [Area3D]s into account. */
collide_with_areas: boolean;

/** If [code]true[/code], the query will take [PhysicsBody3D]s into account. */
collide_with_bodies: boolean;

/** The physics layer(s) the query will take into account (as a bitmask). See [url=https://docs.godotengine.org/en/latest/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;

/** The list of objects or object [RID]s that will be excluded from collisions. */
exclude: any[];

/** The collision margin for the shape. */
margin: float;

/** The [Shape3D] that will be used for collision/intersection queries. This stores the actual reference which avoids the shape to be released while being used for queries, so always prefer using this over [member shape_rid]. */
shape: Resource;

/**
 * The queried shape's [RID] that will be used for collision/intersection queries. Use this over [member shape] if you want to optimize for performance using the Servers API:
 *
 * @example 
 * 
 * var shape_rid = PhysicsServer3D.shape_create(PhysicsServer3D.SHAPE_SPHERE)
 * var radius = 2.0
 * PhysicsServer3D.shape_set_data(shape_rid, radius)
 * var params = PhysicsShapeQueryParameters3D.new()
 * params.shape_rid = shape_rid
 * # Execute physics queries here...
 * # Release the shape when done with physics queries.
 * PhysicsServer3D.free_rid(shape_rid)
 * @summary 
 * 
 *
*/
shape_rid: RID;

/** The queried shape's transform matrix. */
transform: Transform;



  connect<T extends SignalsOf<PhysicsShapeQueryParameters3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
