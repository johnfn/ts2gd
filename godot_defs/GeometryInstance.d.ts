
/**
 * Base node for geometry-based visual instances. Shares some common functionality like visibility and custom materials.
 *
*/
declare class GeometryInstance extends VisualInstance {

  
/**
 * Base node for geometry-based visual instances. Shares some common functionality like visibility and custom materials.
 *
*/
  "new"(): GeometryInstance;
  static "new"(): GeometryInstance;



/** The selected shadow casting flag. See [enum ShadowCastingSetting] for possible values. */
cast_shadow: int;

/** The extra distance added to the GeometryInstance's bounding box ([AABB]) to increase its cull box. */
extra_cull_margin: float;

/**
 * The GeometryInstance's max LOD distance.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_max_distance: float;

/**
 * The GeometryInstance's max LOD margin.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_max_hysteresis: float;

/**
 * The GeometryInstance's min LOD distance.
 *
 * **Note:** This property currently has no effect.
 *
*/
lod_min_distance: float;

/**
 * The GeometryInstance's min LOD margin.
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

/** If [code]true[/code], this GeometryInstance will be used when baking lights using a [GIProbe] or [BakedLightmap]. */
use_in_baked_light: boolean;

/** Returns the [enum GeometryInstance.Flags] that have been set for this object. */
get_flag(flag: int): boolean;

/** Overrides the bounding box of this node with a custom one. To remove it, set an [AABB] with all fields set to zero. */
set_custom_aabb(aabb: AABB): void;

/** Sets the [enum GeometryInstance.Flags] specified. See [enum GeometryInstance.Flags] for options. */
set_flag(flag: int, value: boolean): void;

  connect<T extends SignalsOf<GeometryInstance>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Will not cast any shadows.
 *
*/
static SHADOW_CASTING_SETTING_OFF: 0;

/**
 * Will cast shadows from all visible faces in the GeometryInstance.
 *
 * Will take culling into account, so faces not being rendered will not be taken into account when shadow casting.
 *
*/
static SHADOW_CASTING_SETTING_ON: 1;

/**
 * Will cast shadows from all visible faces in the GeometryInstance.
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

/**
 * Will allow the GeometryInstance to be used when baking lights using a [GIProbe] or [BakedLightmap].
 *
*/
static FLAG_USE_BAKED_LIGHT: 0;

/**
 * Unused in this class, exposed for consistency with [enum VisualServer.InstanceFlags].
 *
*/
static FLAG_DRAW_NEXT_FRAME_IF_VISIBLE: 1;

/**
 * Represents the size of the [enum Flags] enum.
 *
*/
static FLAG_MAX: 2;


  
}
