
/**
 * A directional light is a type of [Light] node that models an infinite number of parallel rays covering the entire scene. It is used for lights with strong intensity that are located far away from the scene to model sunlight or moonlight. The worldspace location of the DirectionalLight transform (origin) is ignored. Only the basis is used to determine light direction.
 *
*/
declare class DirectionalLight extends Light  {

  
/**
 * A directional light is a type of [Light] node that models an infinite number of parallel rays covering the entire scene. It is used for lights with strong intensity that are located far away from the scene to model sunlight or moonlight. The worldspace location of the DirectionalLight transform (origin) is ignored. Only the basis is used to determine light direction.
 *
*/
  new(): DirectionalLight; 
  static "new"(): DirectionalLight 


/** Amount of extra bias for shadow splits that are far away. If self-shadowing occurs only on the splits far away, increasing this value can fix them. */
directional_shadow_bias_split_scale: float;

/** If [code]true[/code], shadow detail is sacrificed in exchange for smoother transitions between splits. */
directional_shadow_blend_splits: boolean;

/** Optimizes shadow rendering for detail versus movement. See [enum ShadowDepthRange]. */
directional_shadow_depth_range: int;

/** The maximum distance for shadow splits. */
directional_shadow_max_distance: float;

/** The light's shadow rendering algorithm. See [enum ShadowMode]. */
directional_shadow_mode: int;

/** Can be used to fix special cases of self shadowing when objects are perpendicular to the light. */
directional_shadow_normal_bias: float;

/** The distance from camera to shadow split 1. Relative to [member directional_shadow_max_distance]. Only used when [member directional_shadow_mode] is [code]SHADOW_PARALLEL_2_SPLITS[/code] or [code]SHADOW_PARALLEL_4_SPLITS[/code]. */
directional_shadow_split_1: float;

/** The distance from shadow split 1 to split 2. Relative to [member directional_shadow_max_distance]. Only used when [member directional_shadow_mode] is [code]SHADOW_PARALLEL_2_SPLITS[/code] or [code]SHADOW_PARALLEL_4_SPLITS[/code]. */
directional_shadow_split_2: float;

/** The distance from shadow split 2 to split 3. Relative to [member directional_shadow_max_distance]. Only used when [member directional_shadow_mode] is [code]SHADOW_PARALLEL_4_SPLITS[/code]. */
directional_shadow_split_3: float;




  connect<T extends SignalsOf<DirectionalLight>>(signal: T, method: SignalFunction<DirectionalLight[T]>): number;



/**
 * Renders the entire scene's shadow map from an orthogonal point of view. This is the fastest directional shadow mode. May result in blurrier shadows on close objects.
 *
*/
static SHADOW_ORTHOGONAL: any;

/**
 * Splits the view frustum in 2 areas, each with its own shadow map. This shadow mode is a compromise between [constant SHADOW_ORTHOGONAL] and [constant SHADOW_PARALLEL_4_SPLITS] in terms of performance.
 *
*/
static SHADOW_PARALLEL_2_SPLITS: any;

/**
 * Splits the view frustum in 4 areas, each with its own shadow map. This is the slowest directional shadow mode.
 *
*/
static SHADOW_PARALLEL_4_SPLITS: any;

/**
 * Keeps the shadow stable when the camera moves, at the cost of lower effective shadow resolution.
 *
*/
static SHADOW_DEPTH_RANGE_STABLE: any;

/**
 * Tries to achieve maximum shadow resolution. May result in saw effect on shadow edges. This mode typically works best in games where the camera will often move at high speeds, such as most racing games.
 *
*/
static SHADOW_DEPTH_RANGE_OPTIMIZED: any;



}

