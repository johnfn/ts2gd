
/**
 * Resource for environment nodes (like [WorldEnvironment]) that define multiple environment operations (such as background [Sky] or [Color], ambient light, fog, depth-of-field...). These parameters affect the final render of the scene. The order of these operations is:
 *
 * - Depth of Field Blur
 *
 * - Glow
 *
 * - Tonemap (Auto Exposure)
 *
 * - Adjustments
 *
 * These effects will only apply when the [Viewport]'s intended usage is "3D" or "3D Without Effects". This can be configured for the root Viewport with [member ProjectSettings.rendering/quality/intended_usage/framebuffer_allocation], or for specific Viewports via the [member Viewport.usage] property.
 *
*/
declare class Environment extends Resource {

  
/**
 * Resource for environment nodes (like [WorldEnvironment]) that define multiple environment operations (such as background [Sky] or [Color], ambient light, fog, depth-of-field...). These parameters affect the final render of the scene. The order of these operations is:
 *
 * - Depth of Field Blur
 *
 * - Glow
 *
 * - Tonemap (Auto Exposure)
 *
 * - Adjustments
 *
 * These effects will only apply when the [Viewport]'s intended usage is "3D" or "3D Without Effects". This can be configured for the root Viewport with [member ProjectSettings.rendering/quality/intended_usage/framebuffer_allocation], or for specific Viewports via the [member Viewport.usage] property.
 *
*/
  "new"(): Environment;
  static "new"(): Environment;



/** The global brightness value of the rendered scene. Effective only if [code]adjustment_enabled[/code] is [code]true[/code]. */
adjustment_brightness: float;

/** Applies the provided [Texture] resource to affect the global color aspect of the rendered scene. Effective only if [code]adjustment_enabled[/code] is [code]true[/code]. */
adjustment_color_correction: Texture;

/** The global contrast value of the rendered scene (default value is 1). Effective only if [code]adjustment_enabled[/code] is [code]true[/code]. */
adjustment_contrast: float;

/** If [code]true[/code], enables the [code]adjustment_*[/code] properties provided by this resource. If [code]false[/code], modifications to the [code]adjustment_*[/code] properties will have no effect on the rendered scene. */
adjustment_enabled: boolean;

/** The global color saturation value of the rendered scene (default value is 1). Effective only if [code]adjustment_enabled[/code] is [code]true[/code]. */
adjustment_saturation: float;

/** The ambient light's [Color]. */
ambient_light_color: Color;

/** The ambient light's energy. The higher the value, the stronger the light. */
ambient_light_energy: float;

/** Defines the amount of light that the sky brings on the scene. A value of 0 means that the sky's light emission has no effect on the scene illumination, thus all ambient illumination is provided by the ambient light. On the contrary, a value of 1 means that all the light that affects the scene is provided by the sky, thus the ambient light parameter has no effect on the scene. */
ambient_light_sky_contribution: float;

/** If [code]true[/code], enables the tonemapping auto exposure mode of the scene renderer. If [code]true[/code], the renderer will automatically determine the exposure setting to adapt to the scene's illumination and the observed light. */
auto_exposure_enabled: boolean;

/** The maximum luminance value for the auto exposure. */
auto_exposure_max_luma: float;

/** The minimum luminance value for the auto exposure. */
auto_exposure_min_luma: float;

/** The scale of the auto exposure effect. Affects the intensity of auto exposure. */
auto_exposure_scale: float;

/** The speed of the auto exposure effect. Affects the time needed for the camera to perform auto exposure. */
auto_exposure_speed: float;

/** The ID of the camera feed to show in the background. */
background_camera_feed_id: int;

/** The maximum layer ID to display. Only effective when using the [constant BG_CANVAS] background mode. */
background_canvas_max_layer: int;

/** The [Color] displayed for clear areas of the scene. Only effective when using the [constant BG_COLOR] or [constant BG_COLOR_SKY] background modes). */
background_color: Color;

/** The power of the light emitted by the background. */
background_energy: float;

/** The background mode. See [enum BGMode] for possible values. */
background_mode: int;

/** The [Sky] resource defined as background. */
background_sky: Sky;

/** The [Sky] resource's custom field of view. */
background_sky_custom_fov: float;

/** The [Sky] resource's rotation expressed as a [Basis]. */
background_sky_orientation: Basis;

/** The [Sky] resource's rotation expressed as Euler angles in radians. */
background_sky_rotation: Vector3;

/** The [Sky] resource's rotation expressed as Euler angles in degrees. */
background_sky_rotation_degrees: Vector3;

/** The amount of far blur for the depth-of-field effect. */
dof_blur_far_amount: float;

/** The distance from the camera where the far blur effect affects the rendering. */
dof_blur_far_distance: float;

/** If [code]true[/code], enables the depth-of-field far blur effect. */
dof_blur_far_enabled: boolean;

/** The depth-of-field far blur's quality. Higher values can mitigate the visible banding effect seen at higher strengths, but are much slower. */
dof_blur_far_quality: int;

/** The length of the transition between the no-blur area and far blur. */
dof_blur_far_transition: float;

/** The amount of near blur for the depth-of-field effect. */
dof_blur_near_amount: float;

/** Distance from the camera where the near blur effect affects the rendering. */
dof_blur_near_distance: float;

/** If [code]true[/code], enables the depth-of-field near blur effect. */
dof_blur_near_enabled: boolean;

/** The depth-of-field near blur's quality. Higher values can mitigate the visible banding effect seen at higher strengths, but are much slower. */
dof_blur_near_quality: int;

/** The length of the transition between the near blur and no-blur area. */
dof_blur_near_transition: float;

/** The fog's [Color]. */
fog_color: Color;

/** The fog's depth starting distance from the camera. */
fog_depth_begin: float;

/** The fog depth's intensity curve. A number of presets are available in the [b]Inspector[/b] by right-clicking the curve. */
fog_depth_curve: float;

/** If [code]true[/code], the depth fog effect is enabled. When enabled, fog will appear in the distance (relative to the camera). */
fog_depth_enabled: boolean;

/** The fog's depth end distance from the camera. If this value is set to 0, it will be equal to the current camera's [member Camera.far] value. */
fog_depth_end: float;

/** If [code]true[/code], fog effects are enabled. [member fog_height_enabled] and/or [member fog_depth_enabled] must be set to [code]true[/code] to actually display fog. */
fog_enabled: boolean;

/** The height fog's intensity. A number of presets are available in the [b]Inspector[/b] by right-clicking the curve. */
fog_height_curve: float;

/** If [code]true[/code], the height fog effect is enabled. When enabled, fog will appear in a defined height range, regardless of the distance from the camera. This can be used to simulate "deep water" effects with a lower performance cost compared to a dedicated shader. */
fog_height_enabled: boolean;

/** The Y coordinate where the height fog will be the most intense. If this value is greater than [member fog_height_min], fog will be displayed from bottom to top. Otherwise, it will be displayed from top to bottom. */
fog_height_max: float;

/** The Y coordinate where the height fog will be the least intense. If this value is greater than [member fog_height_max], fog will be displayed from top to bottom. Otherwise, it will be displayed from bottom to top. */
fog_height_min: float;

/** The intensity of the depth fog color transition when looking towards the sun. The sun's direction is determined automatically using the DirectionalLight node in the scene. */
fog_sun_amount: float;

/** The depth fog's [Color] when looking towards the sun. */
fog_sun_color: Color;

/** The intensity of the fog light transmittance effect. Amount of light that the fog transmits. */
fog_transmit_curve: float;

/** Enables fog's light transmission effect. If [code]true[/code], light will be more visible in the fog to simulate light scattering as in real life. */
fog_transmit_enabled: boolean;

/**
 * Smooths out the blockiness created by sampling higher levels, at the cost of performance.
 *
 * **Note:** When using the GLES2 renderer, this is only available if the GPU supports the `GL_EXT_gpu_shader4` extension.
 *
*/
glow_bicubic_upscale: boolean;

/** The glow blending mode. */
glow_blend_mode: int;

/** The bloom's intensity. If set to a value higher than [code]0[/code], this will make glow visible in areas darker than the [member glow_hdr_threshold]. */
glow_bloom: float;

/** If [code]true[/code], the glow effect is enabled. */
glow_enabled: boolean;

/** The higher threshold of the HDR glow. Areas brighter than this threshold will be clamped for the purposes of the glow effect. */
glow_hdr_luminance_cap: float;

/** The bleed scale of the HDR glow. */
glow_hdr_scale: float;

/** The lower threshold of the HDR glow. When using the GLES2 renderer (which doesn't support HDR), this needs to be below [code]1.0[/code] for glow to be visible. A value of [code]0.9[/code] works well in this case. */
glow_hdr_threshold: float;

/** Takes more samples during downsample pass of glow. This ensures that single pixels are captured by glow which makes the glow look smoother and more stable during movement. However, it is very expensive and makes the glow post process take twice as long. */
glow_high_quality: boolean;

/** The glow intensity. When using the GLES2 renderer, this should be increased to 1.5 to compensate for the lack of HDR rendering. */
glow_intensity: float;

/** If [code]true[/code], the 1st level of glow is enabled. This is the most "local" level (least blurry). */
"glow_levels/1": boolean;

/** If [code]true[/code], the 2th level of glow is enabled. */
"glow_levels/2": boolean;

/** If [code]true[/code], the 3th level of glow is enabled. */
"glow_levels/3": boolean;

/** If [code]true[/code], the 4th level of glow is enabled. */
"glow_levels/4": boolean;

/** If [code]true[/code], the 5th level of glow is enabled. */
"glow_levels/5": boolean;

/** If [code]true[/code], the 6th level of glow is enabled. */
"glow_levels/6": boolean;

/** If [code]true[/code], the 7th level of glow is enabled. This is the most "global" level (blurriest). */
"glow_levels/7": boolean;

/** The glow strength. When using the GLES2 renderer, this should be increased to 1.3 to compensate for the lack of HDR rendering. */
glow_strength: float;

/** The depth tolerance for screen-space reflections. */
ss_reflections_depth_tolerance: float;

/** If [code]true[/code], screen-space reflections are enabled. Screen-space reflections are more accurate than reflections from [GIProbe]s or [ReflectionProbe]s, but are slower and can't reflect surfaces occluded by others. */
ss_reflections_enabled: boolean;

/** The fade-in distance for screen-space reflections. Affects the area from the reflected material to the screen-space reflection). */
ss_reflections_fade_in: float;

/** The fade-out distance for screen-space reflections. Affects the area from the screen-space reflection to the "global" reflection. */
ss_reflections_fade_out: float;

/** The maximum number of steps for screen-space reflections. Higher values are slower. */
ss_reflections_max_steps: int;

/** If [code]true[/code], screen-space reflections will take the material roughness into account. */
ss_reflections_roughness: boolean;

/** The screen-space ambient occlusion intensity on materials that have an AO texture defined. Values higher than [code]0[/code] will make the SSAO effect visible in areas darkened by AO textures. */
ssao_ao_channel_affect: float;

/** The screen-space ambient occlusion bias. This should be kept high enough to prevent "smooth" curves from being affected by ambient occlusion. */
ssao_bias: float;

/** The screen-space ambient occlusion blur quality. See [enum SSAOBlur] for possible values. */
ssao_blur: int;

/** The screen-space ambient occlusion color. */
ssao_color: Color;

/** The screen-space ambient occlusion edge sharpness. */
ssao_edge_sharpness: float;

/** If [code]true[/code], the screen-space ambient occlusion effect is enabled. This darkens objects' corners and cavities to simulate ambient light not reaching the entire object as in real life. This works well for small, dynamic objects, but baked lighting or ambient occlusion textures will do a better job at displaying ambient occlusion on large static objects. This is a costly effect and should be disabled first when running into performance issues. */
ssao_enabled: boolean;

/** The primary screen-space ambient occlusion intensity. See also [member ssao_radius]. */
ssao_intensity: float;

/** The secondary screen-space ambient occlusion intensity. See also [member ssao_radius2]. */
ssao_intensity2: float;

/** The screen-space ambient occlusion intensity in direct light. In real life, ambient occlusion only applies to indirect light, which means its effects can't be seen in direct light. Values higher than [code]0[/code] will make the SSAO effect visible in direct light. */
ssao_light_affect: float;

/** The screen-space ambient occlusion quality. Higher qualities will make better use of small objects for ambient occlusion, but are slower. */
ssao_quality: int;

/** The primary screen-space ambient occlusion radius. */
ssao_radius: float;

/** The secondary screen-space ambient occlusion radius. If set to a value higher than [code]0[/code], enables the secondary screen-space ambient occlusion effect which can be used to improve the effect's appearance (at the cost of performance). */
ssao_radius2: float;

/** The default exposure used for tonemapping. */
tonemap_exposure: float;

/** The tonemapping mode to use. Tonemapping is the process that "converts" HDR values to be suitable for rendering on a LDR display. (Godot doesn't support rendering on HDR displays yet.) */
tonemap_mode: int;

/** The white reference value for tonemapping. Only effective if the [member tonemap_mode] isn't set to [constant TONE_MAPPER_LINEAR]. */
tonemap_white: float;

/** Returns [code]true[/code] if the glow level [code]idx[/code] is specified, [code]false[/code] otherwise. */
is_glow_level_enabled(idx: int): boolean;

/** Enables or disables the glow level at index [code]idx[/code]. Each level relies on the previous level. This means that enabling higher glow levels will slow down the glow effect rendering, even if previous levels aren't enabled. */
set_glow_level(idx: int, enabled: boolean): void;

  // connect<T extends SignalsOf<Environment>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<EnvironmentSignals>>(signal: T, method: SignalFunction<EnvironmentSignals[T]>): number;



/**
 * Keeps on screen every pixel drawn in the background. This is the fastest background mode, but it can only be safely used in fully-interior scenes (no visible sky or sky reflections). If enabled in a scene where the background is visible, "ghost trail" artifacts will be visible when moving the camera.
 *
*/
static BG_KEEP: any;

/**
 * Clears the background using the clear color defined in [member ProjectSettings.rendering/environment/default_clear_color].
 *
*/
static BG_CLEAR_COLOR: any;

/**
 * Clears the background using a custom clear color.
 *
*/
static BG_COLOR: any;

/**
 * Displays a user-defined sky in the background.
 *
*/
static BG_SKY: any;

/**
 * Clears the background using a custom clear color and allows defining a sky for shading and reflection. This mode is slightly faster than [constant BG_SKY] and should be preferred in scenes where reflections can be visible, but the sky itself never is (e.g. top-down camera).
 *
*/
static BG_COLOR_SKY: any;

/**
 * Displays a [CanvasLayer] in the background.
 *
*/
static BG_CANVAS: any;

/**
 * Displays a camera feed in the background.
 *
*/
static BG_CAMERA_FEED: any;

/**
 * Represents the size of the [enum BGMode] enum.
 *
*/
static BG_MAX: any;

/**
 * Additive glow blending mode. Mostly used for particles, glows (bloom), lens flare, bright sources.
 *
*/
static GLOW_BLEND_MODE_ADDITIVE: any;

/**
 * Screen glow blending mode. Increases brightness, used frequently with bloom.
 *
*/
static GLOW_BLEND_MODE_SCREEN: any;

/**
 * Soft light glow blending mode. Modifies contrast, exposes shadows and highlights (vivid bloom).
 *
*/
static GLOW_BLEND_MODE_SOFTLIGHT: any;

/**
 * Replace glow blending mode. Replaces all pixels' color by the glow value. This can be used to simulate a full-screen blur effect by tweaking the glow parameters to match the original image's brightness.
 *
*/
static GLOW_BLEND_MODE_REPLACE: any;

/**
 * Linear tonemapper operator. Reads the linear data and passes it on unmodified.
 *
*/
static TONE_MAPPER_LINEAR: any;

/**
 * Reinhardt tonemapper operator. Performs a variation on rendered pixels' colors by this formula: `color = color / (1 + color)`.
 *
*/
static TONE_MAPPER_REINHARDT: any;

/**
 * Filmic tonemapper operator.
 *
*/
static TONE_MAPPER_FILMIC: any;

/**
 * Academy Color Encoding System tonemapper operator. Performs an aproximation of the ACES tonemapping curve.
 *
*/
static TONE_MAPPER_ACES: any;

/**
 * High quality Academy Color Encoding System tonemapper operator that matches the industry standard. Performs a more physically accurate curve fit which better simulates how light works in the real world. The color of lights and emissive materials will become lighter as the emissive energy increases, and will eventually become white if the light is bright enough to saturate the camera sensor.
 *
*/
static TONE_MAPPER_ACES_FITTED: any;

/**
 * Low depth-of-field blur quality (fastest).
 *
*/
static DOF_BLUR_QUALITY_LOW: any;

/**
 * Medium depth-of-field blur quality.
 *
*/
static DOF_BLUR_QUALITY_MEDIUM: any;

/**
 * High depth-of-field blur quality (slowest).
 *
*/
static DOF_BLUR_QUALITY_HIGH: any;

/**
 * No blur for the screen-space ambient occlusion effect (fastest).
 *
*/
static SSAO_BLUR_DISABLED: any;

/**
 * 1×1 blur for the screen-space ambient occlusion effect.
 *
*/
static SSAO_BLUR_1x1: any;

/**
 * 2×2 blur for the screen-space ambient occlusion effect.
 *
*/
static SSAO_BLUR_2x2: any;

/**
 * 3×3 blur for the screen-space ambient occlusion effect (slowest).
 *
*/
static SSAO_BLUR_3x3: any;

/**
 * Low quality for the screen-space ambient occlusion effect (fastest).
 *
*/
static SSAO_QUALITY_LOW: any;

/**
 * Low quality for the screen-space ambient occlusion effect.
 *
*/
static SSAO_QUALITY_MEDIUM: any;

/**
 * Low quality for the screen-space ambient occlusion effect (slowest).
 *
*/
static SSAO_QUALITY_HIGH: any;

}

declare class EnvironmentSignals extends ResourceSignals {
  
}
