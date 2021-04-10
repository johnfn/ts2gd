
/**
 * Light3D is the **abstract** base class for light nodes. As it can't be instanced, it shouldn't be used directly. Other types of light nodes inherit from it. Light3D contains the common variables and parameters used for lighting.
 *
*/
declare class Light3D extends VisualInstance3D {

  
/**
 * Light3D is the **abstract** base class for light nodes. As it can't be instanced, it shouldn't be used directly. Other types of light nodes inherit from it. Light3D contains the common variables and parameters used for lighting.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code], the light only appears in the editor and will not be visible at runtime. */
editor_only: boolean;

/** The light's angular size in degrees. Only available for [DirectionalLight3D]s. For reference, the Sun from the Earth is approximately [code]0.5[/code]. */
light_angular_distance: float;

/** The light's bake mode. See [enum BakeMode]. */
light_bake_mode: int;

/** The light's color. An [i]overbright[/i] color can be used to achieve a result equivalent to increasing the light's [member light_energy]. */
light_color: Color;

/** The light will affect objects in the selected layers. */
light_cull_mask: int;

/** The light's strength multiplier (this is not a physical unit). For [OmniLight3D] and [SpotLight3D], changing this value will only change the light color's intensity, not the light's radius. */
light_energy: float;

/** Secondary multiplier used with indirect light (light bounces). Used with [GIProbe]. */
light_indirect_energy: float;

/** If [code]true[/code], the light's effect is reversed, darkening areas and casting bright shadows. */
light_negative: boolean;

/** [Texture2D] projected by light. [member shadow_enabled] must be on for the projector to work. Light projectors make the light appear as if it is shining through a colored but transparent object, almost like light shining through stained glass. */
light_projector: Texture2D;

/** The size of the light in Godot units. Only available for [OmniLight3D]s and [SpotLight3D]s. Increasing this value will make the light fade out slower and shadows appear blurrier. This can be used to simulate area lights to an extent. */
light_size: float;

/** The intensity of the specular blob in objects affected by the light. At [code]0[/code], the light becomes a pure diffuse light. When not baking emission, this can be used to avoid unrealistic reflections when placing lights above an emissive surface. */
light_specular: float;

/** Used to adjust shadow appearance. Too small a value results in self-shadowing ("shadow acne"), while too large a value causes shadows to separate from casters ("peter-panning"). Adjust as needed. */
shadow_bias: float;

/** Blurs the edges of the shadow. Can be used to hide pixel artifacts in low-resolution shadow maps. A high value can impact performance, make shadows appear grainy and can cause other unwanted artifacts. Try to keep as near default as possible. */
shadow_blur: float;

/** The color of shadows cast by this light. */
shadow_color: Color;

/** If [code]true[/code], the light will cast shadows. */
shadow_enabled: boolean;


/** Offsets the lookup into the shadow map by the object's normal. This can be used to reduce self-shadowing artifacts without using [member shadow_bias]. In practice, this value should be tweaked along with [member shadow_bias] to reduce artifacts as much as possible. */
shadow_normal_bias: float;

/** If [code]true[/code], reverses the backface culling of the mesh. This can be useful when you have a flat mesh that has a light behind it. If you need to cast a shadow on both sides of the mesh, set the mesh to use double-sided shadows with [constant GeometryInstance3D.SHADOW_CASTING_SETTING_DOUBLE_SIDED]. */
shadow_reverse_cull_face: boolean;


/** Returns the value of the specified [enum Light3D.Param] parameter. */
get_param(param: int): float;

/** Sets the value of the specified [enum Light3D.Param] parameter. */
set_param(param: int, value: float): void;

  connect<T extends SignalsOf<Light3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Constant for accessing [member light_energy].
 *
*/
static PARAM_ENERGY: 0;

/**
 * Constant for accessing [member light_indirect_energy].
 *
*/
static PARAM_INDIRECT_ENERGY: 1;

/**
 * Constant for accessing [member light_specular].
 *
*/
static PARAM_SPECULAR: 2;

/**
 * Constant for accessing [member OmniLight3D.omni_range] or [member SpotLight3D.spot_range].
 *
*/
static PARAM_RANGE: 3;

/**
 * Constant for accessing [member light_size].
 *
*/
static PARAM_SIZE: 4;

/**
 * Constant for accessing [member OmniLight3D.omni_attenuation] or [member SpotLight3D.spot_attenuation].
 *
*/
static PARAM_ATTENUATION: 5;

/**
 * Constant for accessing [member SpotLight3D.spot_angle].
 *
*/
static PARAM_SPOT_ANGLE: 6;

/**
 * Constant for accessing [member SpotLight3D.spot_angle_attenuation].
 *
*/
static PARAM_SPOT_ATTENUATION: 7;

/**
 * Constant for accessing [member DirectionalLight3D.directional_shadow_max_distance].
 *
*/
static PARAM_SHADOW_MAX_DISTANCE: 8;

/**
 * Constant for accessing [member DirectionalLight3D.directional_shadow_split_1].
 *
*/
static PARAM_SHADOW_SPLIT_1_OFFSET: 9;

/**
 * Constant for accessing [member DirectionalLight3D.directional_shadow_split_2].
 *
*/
static PARAM_SHADOW_SPLIT_2_OFFSET: 10;

/**
 * Constant for accessing [member DirectionalLight3D.directional_shadow_split_3].
 *
*/
static PARAM_SHADOW_SPLIT_3_OFFSET: 11;

/**
 * Constant for accessing [member DirectionalLight3D.directional_shadow_fade_start].
 *
*/
static PARAM_SHADOW_FADE_START: 12;

/**
 * Constant for accessing [member shadow_normal_bias].
 *
*/
static PARAM_SHADOW_NORMAL_BIAS: 13;

/**
 * Constant for accessing [member shadow_bias].
 *
*/
static PARAM_SHADOW_BIAS: 14;

/**
 * Constant for accessing [member DirectionalLight3D.directional_shadow_pancake_size].
 *
*/
static PARAM_SHADOW_PANCAKE_SIZE: 15;

/**
 * Constant for accessing [member shadow_blur].
 *
*/
static PARAM_SHADOW_BLUR: 16;

/** No documentation provided. */
static PARAM_SHADOW_VOLUMETRIC_FOG_FADE: 17;

/**
 * Constant for accessing [member shadow_transmittance_bias].
 *
*/
static PARAM_TRANSMITTANCE_BIAS: 18;

/**
 * Represents the size of the [enum Param] enum.
 *
*/
static PARAM_MAX: 19;

/**
 * Light is ignored when baking.
 *
 * **Note:** Hiding a light does **not** affect baking.
 *
*/
static BAKE_DISABLED: 0;

/** No documentation provided. */
static BAKE_DYNAMIC: 1;

/** No documentation provided. */
static BAKE_STATIC: 2;


  
}


 
