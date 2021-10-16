
/**
 * An array of 2D points is extruded to quickly and easily create a variety of 3D meshes.
 *
*/
declare class CSGPolygon extends CSGPrimitive {

  
/**
 * An array of 2D points is extruded to quickly and easily create a variety of 3D meshes.
 *
*/
  "new"(): CSGPolygon;
  static "new"(): CSGPolygon;



/** When [member mode] is [constant MODE_DEPTH], the depth of the extrusion. */
depth: float;

/** Material to use for the resulting mesh. The UV maps the top half of the material to the extruded shape (U along the the length of the extrusions and V around the outline of the [member polygon]), the bottom-left quarter to the front end face, and the bottom-right quarter to the back end face. */
material: Material;

/** The [member mode] used to extrude the [member polygon]. */
mode: int;

/** When [member mode] is [constant MODE_PATH], by default, the top half of the [member material] is stretched along the entire length of the extruded shape. If [code]false[/code] the top half of the material is repeated every step of the extrusion. */
path_continuous_u: boolean;

/** When [member mode] is [constant MODE_PATH], the path interval or ratio of path points to extrusions. */
path_interval: float;

/** When [member mode] is [constant MODE_PATH], this will determine if the interval should be by distance ([constant PATH_INTERVAL_DISTANCE]) or subdivision fractions ([constant PATH_INTERVAL_SUBDIVIDE]). */
path_interval_type: int;

/** When [member mode] is [constant MODE_PATH], if [code]true[/code] the ends of the path are joined, by adding an extrusion between the last and first points of the path. */
path_joined: boolean;

/** When [member mode] is [constant MODE_PATH], if [code]true[/code] the [Transform] of the [CSGPolygon] is used as the starting point for the extrusions, not the [Transform] of the [member path_node]. */
path_local: boolean;

/** When [member mode] is [constant MODE_PATH], the location of the [Path] object used to extrude the [member polygon]. */
path_node: NodePathType;

/** When [member mode] is [constant MODE_PATH], the [enum PathRotation] method used to rotate the [member polygon] as it is extruded. */
path_rotation: int;

/** When [member mode] is [constant MODE_PATH], extrusions that are less than this angle, will be merged together to reduce polygon count. */
path_simplify_angle: float;

/** When [member mode] is [constant MODE_PATH], this is the distance along the path, in meters, the texture coordinates will tile. When set to 0, texture coordinates will match geometry exactly with no tiling. */
path_u_distance: float;

/** The point array that defines the 2D polygon that is extruded. */
polygon: PoolVector2Array;

/** If [code]true[/code], applies smooth shading to the extrusions. */
smooth_faces: boolean;

/** When [member mode] is [constant MODE_SPIN], the total number of degrees the [member polygon] is rotated when extruding. */
spin_degrees: float;

/** When [member mode] is [constant MODE_SPIN], the number of extrusions made. */
spin_sides: int;



  // connect<T extends SignalsOf<CSGPolygon>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CSGPolygonSignals>>(signal: T, method: SignalFunction<CSGPolygonSignals[T]>): number;



/**
 * The [member polygon] shape is extruded along the negative Z axis.
 *
*/
static MODE_DEPTH: any;

/**
 * The [member polygon] shape is extruded by rotating it around the Y axis.
 *
*/
static MODE_SPIN: any;

/**
 * The [member polygon] shape is extruded along the [Path] specified in [member path_node].
 *
*/
static MODE_PATH: any;

/**
 * The [member polygon] shape is not rotated.
 *
 * **Note:** Requires the path's Z coordinates to continually decrease to ensure viable shapes.
 *
*/
static PATH_ROTATION_POLYGON: any;

/**
 * The [member polygon] shape is rotated along the path, but it is not rotated around the path axis.
 *
 * **Note:** Requires the path's Z coordinates to continually decrease to ensure viable shapes.
 *
*/
static PATH_ROTATION_PATH: any;

/**
 * The [member polygon] shape follows the path and its rotations around the path axis.
 *
*/
static PATH_ROTATION_PATH_FOLLOW: any;

/**
 * When [member mode] is set to [constant MODE_PATH], [member path_interval] will determine the distance, in meters, each interval of the path will extrude.
 *
*/
static PATH_INTERVAL_DISTANCE: any;

/**
 * When [member mode] is set to [constant MODE_PATH], [member path_interval] will subdivide the polygons along the path.
 *
*/
static PATH_INTERVAL_SUBDIVIDE: any;

}

declare class CSGPolygonSignals extends CSGPrimitiveSignals {
  
}
