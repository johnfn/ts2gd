
/**
 * The [ARVRAnchor] point is a spatial node that maps a real world location identified by the AR platform to a position within the game world. For example, as long as plane detection in ARKit is on, ARKit will identify and update the position of planes (tables, floors, etc) and create anchors for them.
 *
 * This node is mapped to one of the anchors through its unique ID. When you receive a signal that a new anchor is available, you should add this node to your scene for that anchor. You can predefine nodes and set the ID; the nodes will simply remain on 0,0,0 until a plane is recognized.
 *
 * Keep in mind that, as long as plane detection is enabled, the size, placing and orientation of an anchor will be updated as the detection logic learns more about the real world out there especially if only part of the surface is in view.
 *
*/
declare class ARVRAnchor extends Spatial  {

  
/**
 * The [ARVRAnchor] point is a spatial node that maps a real world location identified by the AR platform to a position within the game world. For example, as long as plane detection in ARKit is on, ARKit will identify and update the position of planes (tables, floors, etc) and create anchors for them.
 *
 * This node is mapped to one of the anchors through its unique ID. When you receive a signal that a new anchor is available, you should add this node to your scene for that anchor. You can predefine nodes and set the ID; the nodes will simply remain on 0,0,0 until a plane is recognized.
 *
 * Keep in mind that, as long as plane detection is enabled, the size, placing and orientation of an anchor will be updated as the detection logic learns more about the real world out there especially if only part of the surface is in view.
 *
*/
  new(): ARVRAnchor; 
  static "new"(): ARVRAnchor 


/** The anchor's ID. You can set this before the anchor itself exists. The first anchor gets an ID of [code]1[/code], the second an ID of [code]2[/code], etc. When anchors get removed, the engine can then assign the corresponding ID to new anchors. The most common situation where anchors "disappear" is when the AR server identifies that two anchors represent different parts of the same plane and merges them. */
anchor_id: int;

/** Returns the name given to this anchor. */
get_anchor_name(): string;

/** Returns [code]true[/code] if the anchor is being tracked and [code]false[/code] if no anchor with this ID is currently known. */
get_is_active(): boolean;

/** If provided by the [ARVRInterface], this returns a mesh object for the anchor. For an anchor, this can be a shape related to the object being tracked or it can be a mesh that provides topology related to the anchor and can be used to create shadows/reflections on surfaces or for generating collision shapes. */
get_mesh(): Mesh;

/** Returns a plane aligned with our anchor; handy for intersection testing. */
get_plane(): Plane;

/** Returns the estimated size of the plane that was detected. Say when the anchor relates to a table in the real world, this is the estimated size of the surface of that table. */
get_size(): Vector3;

  connect<T extends SignalsOf<ARVRAnchor>>(signal: T, method: SignalFunction<ARVRAnchor[T]>): number;





/**
 * Emitted when the mesh associated with the anchor changes or when one becomes available. This is especially important for topology that is constantly being `mesh_updated`.
 *
*/
$mesh_updated: Signal<(mesh: Mesh) => void>

}

