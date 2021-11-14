
/**
 * A deformable physics body. Used to create elastic or deformable objects such as cloth, rubber, or other flexible materials.
 *
*/
declare class SoftBody extends MeshInstance  {

  
/**
 * A deformable physics body. Used to create elastic or deformable objects such as cloth, rubber, or other flexible materials.
 *
*/
  new(): SoftBody; 
  static "new"(): SoftBody 



/**
 * The physics layers this SoftBody is in.
 *
 * Collidable objects can exist in any of 32 different layers. These layers work like a tagging system, and are not visual. A collidable can use these layers to select with which objects it can collide, using the collision_mask property.
 *
 * A contact is detected if object A is in any of the layers that object B scans, or object B is in any layer scanned by object A. See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
 *
*/
collision_layer: int;

/** The physics layers this SoftBody scans for collisions. See [url=https://docs.godotengine.org/en/3.4/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
collision_mask: int;




/** [NodePath] to a [CollisionObject] this SoftBody should avoid clipping. */
parent_collision_ignore: NodePathType;

/** If [code]true[/code], the [SoftBody] is simulated in physics. Can be set to [code]false[/code] to pause the physics simulation. */
physics_enabled: boolean;



/** If [code]true[/code], the [SoftBody] will respond to [RayCast]s. */
ray_pickable: boolean;

/** Increasing this value will improve the resulting simulation, but can affect performance. Use with care. */
simulation_precision: int;

/** The SoftBody's mass. */
total_mass: float;


/** Adds a body to the list of bodies that this body can't collide with. */
add_collision_exception_with(body: Node): void;

/** Returns an array of nodes that were added as collision exceptions for this body. */
get_collision_exceptions(): any[];

/** Returns an individual bit on the collision mask. */
get_collision_layer_bit(bit: int): boolean;

/** Returns an individual bit on the collision mask. */
get_collision_mask_bit(bit: int): boolean;

/** Returns local translation of a vertex in the surface array. */
get_point_transform(point_index: int): Vector3;

/** Returns [code]true[/code] if vertex is set to pinned. */
is_point_pinned(point_index: int): boolean;

/** Removes a body from the list of bodies that this body can't collide with. */
remove_collision_exception_with(body: Node): void;

/** Sets individual bits on the layer mask. Use this if you only need to change one layer's value. */
set_collision_layer_bit(bit: int, value: boolean): void;

/** Sets individual bits on the collision mask. Use this if you only need to change one layer's value. */
set_collision_mask_bit(bit: int, value: boolean): void;

/** Sets the pinned state of a surface vertex. When set to [code]true[/code], the optional [code]attachment_path[/code] can define a [Spatial] the pinned vertex will be attached to. */
set_point_pinned(point_index: int, pinned: boolean, attachment_path?: NodePathType): void;

  connect<T extends SignalsOf<SoftBody>>(signal: T, method: SignalFunction<SoftBody[T]>): number;






}

