
/**
 * Base node for geometry-based visual instances. Shares some common functionality like visibility and custom materials.
 *
*/
declare class GeometryInstance3D extends VisualInstance3D {

  
/**
 * Base node for geometry-based visual instances. Shares some common functionality like visibility and custom materials.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The selected shadow casting flag. See [enum ShadowCastingSetting] for possible values. */
cast_shadow: int;

/** The extra distance added to the GeometryInstance3D's bounding box ([AABB]) to increase its cull box. */
extra_cull_margin: float;



/**
 * The GeometryInstance3D's max LOD distance.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_max_distance: float;

/**
 * The GeometryInstance3D's max LOD margin.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_max_hysteresis: float;

/**
 * The GeometryInstance3D's min LOD distance.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_min_distance: float;

/**
 * The GeometryInstance3D's min LOD margin.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_min_hysteresis: float;

/**
 * The material override for the whole geometry.
 *
 * If a material is assigned to this property, it will be used instead of any material set in any material slot of the mesh.
 *
*/
material_override: Material;

/** No documentation provided. */
get_shader_instance_uniform(uniform: StringName): any;

/** Overrides the bounding box of this node with a custom one. To remove it, set an [AABB] with all fields set to zero. */
set_custom_aabb(aabb: AABB): void;

/** No documentation provided. */
set_shader_instance_uniform(uniform: StringName, value: any): void;

  connect<T extends SignalsOf<GeometryInstance3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Will not cast any shadows.
 *
*/
static SHADOW_CASTING_SETTING_OFF: 0;

/**
 * Will cast shadows from all visible faces in the GeometryInstance3D.
 *
 * Will take culling into account, so faces not being rendered will not be taken into account when shadow casting.
 *
*/
static SHADOW_CASTING_SETTING_ON: 1;

/**
 * Will cast shadows from all visible faces in the GeometryInstance3D.
 *
 * Will not take culling into account, so all faces will be taken into account when shadow casting.
 *
*/
static SHADOW_CASTING_SETTING_DOUBLE_SIDED: 2;

/**
 * Will only show the shadows casted from this object.
 *
 * In other words, the actual mesh will not be visible, only the shadows casted from the mesh will be.
 *
*/
static SHADOW_CASTING_SETTING_SHADOWS_ONLY: 3;

/** No documentation provided. */
static GI_MODE_DISABLED: 0;

/** No documentation provided. */
static GI_MODE_BAKED: 1;

/** No documentation provided. */
static GI_MODE_DYNAMIC: 2;

/** No documentation provided. */
static LIGHTMAP_SCALE_1X: 0;

/** No documentation provided. */
static LIGHTMAP_SCALE_2X: 1;

/** No documentation provided. */
static LIGHTMAP_SCALE_4X: 2;

/** No documentation provided. */
static LIGHTMAP_SCALE_8X: 3;

/** No documentation provided. */
static LIGHTMAP_SCALE_MAX: 4;


  
}


 
