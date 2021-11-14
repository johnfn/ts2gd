
/**
 * Material is a base [Resource] used for coloring and shading geometry. All materials inherit from it and almost all [VisualInstance] derived nodes carry a Material. A few flags and parameters are shared between all material types and are configured here.
 *
*/
declare class Material extends Resource  {

  
/**
 * Material is a base [Resource] used for coloring and shading geometry. All materials inherit from it and almost all [VisualInstance] derived nodes carry a Material. A few flags and parameters are shared between all material types and are configured here.
 *
*/
  new(): Material; 
  static "new"(): Material 


/**
 * Sets the [Material] to be used for the next pass. This renders the object again using a different material.
 *
 * **Note:** This only applies to [SpatialMaterial]s and [ShaderMaterial]s with type "Spatial".
 *
*/
next_pass: Material;

/**
 * Sets the render priority for transparent objects in 3D scenes. Higher priority objects will be sorted in front of lower priority objects.
 *
 * **Note:** This only applies to sorting of transparent objects. This will not impact how transparent objects are sorted relative to opaque objects. This is because opaque objects are not sorted, while transparent objects are sorted from back to front (subject to priority).
 *
*/
render_priority: int;



  connect<T extends SignalsOf<Material>>(signal: T, method: SignalFunction<Material[T]>): number;



/**
 * Maximum value for the [member render_priority] parameter.
 *
*/
static RENDER_PRIORITY_MAX: any;

/**
 * Minimum value for the [member render_priority] parameter.
 *
*/
static RENDER_PRIORITY_MIN: any;



}

