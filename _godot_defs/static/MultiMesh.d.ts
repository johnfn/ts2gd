
/**
 * MultiMesh provides low-level mesh instancing. Drawing thousands of [MeshInstance] nodes can be slow, since each object is submitted to the GPU then drawn individually.
 *
 * MultiMesh is much faster as it can draw thousands of instances with a single draw call, resulting in less API overhead.
 *
 * As a drawback, if the instances are too far away from each other, performance may be reduced as every single instance will always render (they are spatially indexed as one, for the whole object).
 *
 * Since instances may have any behavior, the AABB used for visibility must be provided by the user.
 *
*/
declare class MultiMesh extends Resource  {

  
/**
 * MultiMesh provides low-level mesh instancing. Drawing thousands of [MeshInstance] nodes can be slow, since each object is submitted to the GPU then drawn individually.
 *
 * MultiMesh is much faster as it can draw thousands of instances with a single draw call, resulting in less API overhead.
 *
 * As a drawback, if the instances are too far away from each other, performance may be reduced as every single instance will always render (they are spatially indexed as one, for the whole object).
 *
 * Since instances may have any behavior, the AABB used for visibility must be provided by the user.
 *
*/
  new(): MultiMesh; 
  static "new"(): MultiMesh 


/** Format of colors in color array that gets passed to shader. */
color_format: int;

/** Format of custom data in custom data array that gets passed to shader. */
custom_data_format: int;

/** Number of instances that will get drawn. This clears and (re)sizes the buffers. By default, all instances are drawn but you can limit this with [member visible_instance_count]. */
instance_count: int;

/** Mesh to be drawn. */
mesh: Mesh;

/** Format of transform used to transform mesh, either 2D or 3D. */
transform_format: int;

/** Limits the number of instances drawn, -1 draws all instances. Changing this does not change the sizes of the buffers. */
visible_instance_count: int;

/** Returns the visibility axis-aligned bounding box in local space. See also [method VisualInstance.get_transformed_aabb]. */
get_aabb(): AABB;

/** Gets a specific instance's color. */
get_instance_color(instance: int): Color;

/** Returns the custom data that has been set for a specific instance. */
get_instance_custom_data(instance: int): Color;

/** Returns the [Transform] of a specific instance. */
get_instance_transform(instance: int): Transform;

/** Returns the [Transform2D] of a specific instance. */
get_instance_transform_2d(instance: int): Transform2D;

/**
 * Sets all data related to the instances in one go. This is especially useful when loading the data from disk or preparing the data from GDNative.
 *
 * All data is packed in one large float array. An array may look like this: Transform for instance 1, color data for instance 1, custom data for instance 1, transform for instance 2, color data for instance 2, etc...
 *
 * [Transform] is stored as 12 floats, [Transform2D] is stored as 8 floats, `COLOR_8BIT` / `CUSTOM_DATA_8BIT` is stored as 1 float (4 bytes as is) and `COLOR_FLOAT` / `CUSTOM_DATA_FLOAT` is stored as 4 floats.
 *
*/
set_as_bulk_array(array: PoolRealArray): void;

/**
 * Sets the color of a specific instance by **multiplying** the mesh's existing vertex colors.
 *
 * For the color to take effect, ensure that [member color_format] is non-`null` on the [MultiMesh] and [member SpatialMaterial.vertex_color_use_as_albedo] is `true` on the material.
 *
*/
set_instance_color(instance: int, color: Color): void;

/** Sets custom data for a specific instance. Although [Color] is used, it is just a container for 4 floating point numbers. The format of the number can change depending on the [enum CustomDataFormat] used. */
set_instance_custom_data(instance: int, custom_data: Color): void;

/** Sets the [Transform] for a specific instance. */
set_instance_transform(instance: int, transform: Transform): void;

/** Sets the [Transform2D] for a specific instance. */
set_instance_transform_2d(instance: int, transform: Transform2D): void;

  connect<T extends SignalsOf<MultiMesh>>(signal: T, method: SignalFunction<MultiMesh[T]>): number;



/**
 * Use this when using 2D transforms.
 *
*/
static TRANSFORM_2D: any;

/**
 * Use this when using 3D transforms.
 *
*/
static TRANSFORM_3D: any;

/**
 * Use when you are not using per-instance [Color]s.
 *
*/
static COLOR_NONE: any;

/**
 * Compress [Color] data into 8 bits when passing to shader. This uses less memory and can be faster, but the [Color] loses precision.
 *
*/
static COLOR_8BIT: any;

/**
 * The [Color] passed into [method set_instance_color] will use 4 floats. Use this for highest precision [Color].
 *
*/
static COLOR_FLOAT: any;

/**
 * Use when you are not using per-instance custom data.
 *
*/
static CUSTOM_DATA_NONE: any;

/**
 * Compress custom_data into 8 bits when passing to shader. This uses less memory and can be faster, but loses precision and range. Floats packed into 8 bits can only represent values between 0 and 1, numbers outside that range will be clamped.
 *
*/
static CUSTOM_DATA_8BIT: any;

/**
 * The [Color] passed into [method set_instance_custom_data] will use 4 floats. Use this for highest precision.
 *
*/
static CUSTOM_DATA_FLOAT: any;



}

