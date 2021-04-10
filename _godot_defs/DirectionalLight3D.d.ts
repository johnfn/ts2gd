
/**
 * A directional light is a type of [Light3D] node that models an infinite number of parallel rays covering the entire scene. It is used for lights with strong intensity that are located far away from the scene to model sunlight or moonlight. The worldspace location of the DirectionalLight3D transform (origin) is ignored. Only the basis is used to determine light direction.
 *
*/
declare class DirectionalLight3D extends Light3D {

  
/**
 * A directional light is a type of [Light3D] node that models an infinite number of parallel rays covering the entire scene. It is used for lights with strong intensity that are located far away from the scene to model sunlight or moonlight. The worldspace location of the DirectionalLight3D transform (origin) is ignored. Only the basis is used to determine light direction.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], shadow detail is sacrificed in exchange for smoother transitions between splits. */
directional_shadow_blend_splits: boolean;

/** Optimizes shadow rendering for detail versus movement. See [enum ShadowDepthRange]. */
directional_shadow_depth_range: int;

/** Proportion of [member directional_shadow_max_distance] at which point the shadow starts to fade. At [member directional_shadow_max_distance] the shadow will disappear. */
directional_shadow_fade_start: float;

/** The maximum distance for shadow splits. */
directional_shadow_max_distance: float;

/** The light's shadow rendering algorithm. See [enum ShadowMode]. */
directional_shadow_mode: int;

/** Sets the size of the directional shadow pancake. The pancake offsets the start of the shadow's camera frustum to provide a higher effective depth resolution for the shadow. However, a high pancake size can cause artifacts in the shadows of large objects that are close to the edge of the frustum. Reducing the pancake size can help. Setting the size to [code]0[/code] turns off the pancaking effect. */
directional_shadow_pancake_size: float;

/** The distance from camera to shadow split 1. Relative to [member directional_shadow_max_distance]. Only used when [member directional_shadow_mode] is [code]SHADOW_PARALLEL_2_SPLITS[/code] or [code]SHADOW_PARALLEL_4_SPLITS[/code]. */
directional_shadow_split_1: float;

/** The distance from shadow split 1 to split 2. Relative to [member directional_shadow_max_distance]. Only used when [member directional_shadow_mode] is [code]SHADOW_PARALLEL_2_SPLITS[/code] or [code]SHADOW_PARALLEL_4_SPLITS[/code]. */
directional_shadow_split_2: float;

/** The distance from shadow split 2 to split 3. Relative to [member directional_shadow_max_distance]. Only used when [member directional_shadow_mode] is [code]SHADOW_PARALLEL_4_SPLITS[/code]. */
directional_shadow_split_3: float;





  connect<T extends SignalsOf<DirectionalLight3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Renders the entire scene's shadow map from an orthogonal point of view. This is the fastest directional shadow mode. May result in blurrier shadows on close objects.
 *
*/
static SHADOW_ORTHOGONAL: 0;

/**
 * Splits the view frustum in 2 areas, each with its own shadow map. This shadow mode is a compromise between [constant SHADOW_ORTHOGONAL] and [constant SHADOW_PARALLEL_4_SPLITS] in terms of performance.
 *
*/
static SHADOW_PARALLEL_2_SPLITS: 1;

/**
 * Splits the view frustum in 4 areas, each with its own shadow map. This is the slowest directional shadow mode.
 *
*/
static SHADOW_PARALLEL_4_SPLITS: 2;

/**
 * Keeps the shadow stable when the camera moves, at the cost of lower effective shadow resolution.
 *
*/
static SHADOW_DEPTH_RANGE_STABLE: 0;

/**
 * Tries to achieve maximum shadow resolution. May result in saw effect on shadow edges. This mode typically works best in games where the camera will often move at high speeds, such as most racing games.
 *
*/
static SHADOW_DEPTH_RANGE_OPTIMIZED: 1;


  
}


 
