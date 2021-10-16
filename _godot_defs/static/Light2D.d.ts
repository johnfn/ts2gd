
/**
 * Casts light in a 2D environment. Light is defined by a (usually grayscale) texture, a color, an energy value, a mode (see constants), and various other parameters (range and shadows-related).
 *
 * **Note:** Light2D can also be used as a mask.
 *
*/
declare class Light2D extends Node2D {

  
/**
 * Casts light in a 2D environment. Light is defined by a (usually grayscale) texture, a color, an energy value, a mode (see constants), and various other parameters (range and shadows-related).
 *
 * **Note:** Light2D can also be used as a mask.
 *
*/
  "new"(): Light2D;
  static "new"(): Light2D;



/** The Light2D's [Color]. */
color: Color;

/** If [code]true[/code], Light2D will only appear when editing the scene. */
editor_only: boolean;

/** If [code]true[/code], Light2D will emit light. */
enabled: boolean;

/** The Light2D's energy value. The larger the value, the stronger the light. */
energy: float;

/** The Light2D's mode. See [enum Mode] constants for values. */
mode: int;

/** The offset of the Light2D's [code]texture[/code]. */
offset: Vector2;

/** The height of the Light2D. Used with 2D normal mapping. */
range_height: float;

/** The layer mask. Only objects with a matching mask will be affected by the Light2D. */
range_item_cull_mask: int;

/** Maximum layer value of objects that are affected by the Light2D. */
range_layer_max: int;

/** Minimum layer value of objects that are affected by the Light2D. */
range_layer_min: int;

/** Maximum [code]z[/code] value of objects that are affected by the Light2D. */
range_z_max: int;

/** Minimum [code]z[/code] value of objects that are affected by the Light2D. */
range_z_min: int;

/** Shadow buffer size. */
shadow_buffer_size: int;

/** [Color] of shadows cast by the Light2D. */
shadow_color: Color;

/** If [code]true[/code], the Light2D will cast shadows. */
shadow_enabled: boolean;

/** Shadow filter type. See [enum ShadowFilter] for possible values. */
shadow_filter: int;

/** Smoothing value for shadows. */
shadow_filter_smooth: float;

/** Smooth shadow gradient length. */
shadow_gradient_length: float;

/** The shadow mask. Used with [LightOccluder2D] to cast shadows. Only occluders with a matching light mask will cast shadows. */
shadow_item_cull_mask: int;

/** [Texture] used for the Light2D's appearance. */
texture: Texture;

/** The [code]texture[/code]'s scale factor. */
texture_scale: float;



  // connect<T extends SignalsOf<Light2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Light2DSignals>>(signal: T, method: SignalFunction<Light2DSignals[T]>): number;



/**
 * Adds the value of pixels corresponding to the Light2D to the values of pixels under it. This is the common behavior of a light.
 *
*/
static MODE_ADD: any;

/**
 * Subtracts the value of pixels corresponding to the Light2D to the values of pixels under it, resulting in inversed light effect.
 *
*/
static MODE_SUB: any;

/**
 * Mix the value of pixels corresponding to the Light2D to the values of pixels under it by linear interpolation.
 *
*/
static MODE_MIX: any;

/**
 * The light texture of the Light2D is used as a mask, hiding or revealing parts of the screen underneath depending on the value of each pixel of the light (mask) texture.
 *
*/
static MODE_MASK: any;

/**
 * No filter applies to the shadow map. See [member shadow_filter].
 *
*/
static SHADOW_FILTER_NONE: any;

/**
 * Percentage closer filtering (3 samples) applies to the shadow map. See [member shadow_filter].
 *
*/
static SHADOW_FILTER_PCF3: any;

/**
 * Percentage closer filtering (5 samples) applies to the shadow map. See [member shadow_filter].
 *
*/
static SHADOW_FILTER_PCF5: any;

/**
 * Percentage closer filtering (7 samples) applies to the shadow map. See [member shadow_filter].
 *
*/
static SHADOW_FILTER_PCF7: any;

/**
 * Percentage closer filtering (9 samples) applies to the shadow map. See [member shadow_filter].
 *
*/
static SHADOW_FILTER_PCF9: any;

/**
 * Percentage closer filtering (13 samples) applies to the shadow map. See [member shadow_filter].
 *
*/
static SHADOW_FILTER_PCF13: any;

}

declare class Light2DSignals extends Node2DSignals {
  
}
