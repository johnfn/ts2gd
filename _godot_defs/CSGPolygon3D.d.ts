
/**
 * This node takes a 2D polygon shape and extrudes it to create a 3D mesh.
 *
*/
declare class CSGPolygon3D extends CSGPrimitive3D {

  
/**
 * This node takes a 2D polygon shape and extrudes it to create a 3D mesh.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Extrusion depth when [member mode] is [constant MODE_DEPTH]. */
depth: float;

/** Material to use for the resulting mesh. */
material: Material;

/** Extrusion mode. */
mode: int;

/** If [code]true[/code] the u component of our uv will continuously increase in unison with the distance traveled along our path when [member mode] is [constant MODE_PATH]. */
path_continuous_u: boolean;

/** Interval at which a new extrusion slice is added along the path when [member mode] is [constant MODE_PATH]. */
path_interval: float;

/** If [code]true[/code] the start and end of our path are joined together ensuring there is no seam when [member mode] is [constant MODE_PATH]. */
path_joined: boolean;

/** If [code]false[/code] we extrude centered on our path, if [code]true[/code] we extrude in relation to the position of our CSGPolygon3D when [member mode] is [constant MODE_PATH]. */
path_local: boolean;

/** The [Shape3D] object containing the path along which we extrude when [member mode] is [constant MODE_PATH]. */
path_node: NodePathType;

/** The method by which each slice is rotated along the path when [member mode] is [constant MODE_PATH]. */
path_rotation: int;

/** Point array that defines the shape that we'll extrude. */
polygon: PackedVector2Array;

/** Generates smooth normals so smooth shading is applied to our mesh. */
smooth_faces: boolean;

/** Degrees to rotate our extrusion for each slice when [member mode] is [constant MODE_SPIN]. */
spin_degrees: float;

/** Number of extrusion when [member mode] is [constant MODE_SPIN]. */
spin_sides: int;



  connect<T extends SignalsOf<CSGPolygon3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Shape3D is extruded to [member depth].
 *
*/
static MODE_DEPTH: 0;

/**
 * Shape3D is extruded by rotating it around an axis.
 *
*/
static MODE_SPIN: 1;

/**
 * Shape3D is extruded along a path set by a [Shape3D] set in [member path_node].
 *
*/
static MODE_PATH: 2;

/**
 * Slice is not rotated.
 *
*/
static PATH_ROTATION_POLYGON: 0;

/**
 * Slice is rotated around the up vector of the path.
 *
*/
static PATH_ROTATION_PATH: 1;

/**
 * Slice is rotate to match the path exactly.
 *
*/
static PATH_ROTATION_PATH_FOLLOW: 2;


  
}


 
