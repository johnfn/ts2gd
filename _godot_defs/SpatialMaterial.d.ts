
/**
 * This provides a default material with a wide variety of rendering features and properties without the need to write shader code. See the tutorial below for details.
 *
*/
declare class SpatialMaterial extends Material {

  
/**
 * This provides a default material with a wide variety of rendering features and properties without the need to write shader code. See the tutorial below for details.
 *
*/
  "new"(): SpatialMaterial;
  static "new"(): SpatialMaterial;



/** The material's base color. */
albedo_color: Color;

/** Texture to multiply by [member albedo_color]. Used for basic texturing of objects. */
albedo_texture: Texture;

/** The strength of the anisotropy effect. */
anisotropy: float;

/** If [code]true[/code], anisotropy is enabled. Changes the shape of the specular blob and aligns it to tangent space. Mesh tangents are needed for this to work. If the mesh does not contain tangents the anisotropy effect will appear broken. */
anisotropy_enabled: boolean;

/** Texture that offsets the tangent map for anisotropy calculations. */
anisotropy_flowmap: Texture;

/** If [code]true[/code], ambient occlusion is enabled. Ambient occlusion darkens areas based on the [member ao_texture]. */
ao_enabled: boolean;

/** Amount that ambient occlusion affects lighting from lights. If [code]0[/code], ambient occlusion only affects ambient light. If [code]1[/code], ambient occlusion affects lights just as much as it affects ambient light. This can be used to impact the strength of the ambient occlusion effect, but typically looks unrealistic. */
ao_light_affect: float;

/** If [code]true[/code], use [code]UV2[/code] coordinates to look up from the [member ao_texture]. */
ao_on_uv2: boolean;

/** Texture that defines the amount of ambient occlusion for a given point on the object. */
ao_texture: Texture;

/** Specifies the channel of the [member ao_texture] in which the ambient occlusion information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use. */
ao_texture_channel: int;

/** Sets the strength of the clearcoat effect. Setting to [code]0[/code] looks the same as disabling the clearcoat effect. */
clearcoat: float;

/** If [code]true[/code], clearcoat rendering is enabled. Adds a secondary transparent pass to the lighting calculation resulting in an added specular blob. This makes materials appear as if they have a clear layer on them that can be either glossy or rough. */
clearcoat_enabled: boolean;

/** Sets the roughness of the clearcoat pass. A higher value results in a smoother clearcoat while a lower value results in a rougher clearcoat. */
clearcoat_gloss: float;

/** Texture that defines the strength of the clearcoat effect and the glossiness of the clearcoat. Strength is specified in the red channel while glossiness is specified in the green channel. */
clearcoat_texture: Texture;

/** If [code]true[/code], the shader will read depth texture at multiple points along the view ray to determine occlusion and parrallax. This can be very performance demanding, but results in more realistic looking depth mapping. */
depth_deep_parallax: boolean;

/** If [code]true[/code], depth mapping is enabled (also called "parallax mapping" or "height mapping"). See also [member normal_enabled]. */
depth_enabled: boolean;

/** If [code]true[/code], direction of the binormal is flipped before using in the depth effect. This may be necessary if you have encoded your binormals in a way that is conflicting with the depth effect. */
depth_flip_binormal: boolean;

/** If [code]true[/code], direction of the tangent is flipped before using in the depth effect. This may be necessary if you have encoded your tangents in a way that is conflicting with the depth effect. */
depth_flip_tangent: boolean;

/** Number of layers to use when using [member depth_deep_parallax] and the view direction is perpendicular to the surface of the object. A higher number will be more performance demanding while a lower number may not look as crisp. */
depth_max_layers: int;

/** Number of layers to use when using [member depth_deep_parallax] and the view direction is parallel to the surface of the object. A higher number will be more performance demanding while a lower number may not look as crisp. */
depth_min_layers: int;

/** Scales the depth offset effect. A higher number will create a larger depth. */
depth_scale: float;

/** Texture used to determine depth at a given pixel. Depth is always stored in the red channel. */
depth_texture: Texture;

/** Texture that specifies the color of the detail overlay. */
detail_albedo: Texture;

/** Specifies how the [member detail_albedo] should blend with the current [code]ALBEDO[/code]. See [enum BlendMode] for options. */
detail_blend_mode: int;

/** If [code]true[/code], enables the detail overlay. Detail is a second texture that gets mixed over the surface of the object based on [member detail_mask]. This can be used to add variation to objects, or to blend between two different albedo/normal textures. */
detail_enabled: boolean;

/** Texture used to specify how the detail textures get blended with the base textures. */
detail_mask: Texture;

/**
 * Texture that specifies the per-pixel normal of the detail overlay.
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
detail_normal: Texture;

/** Specifies whether to use [code]UV[/code] or [code]UV2[/code] for the detail layer. See [enum DetailUV] for options. */
detail_uv_layer: int;

/** Distance at which the object fades fully and is no longer visible. */
distance_fade_max_distance: float;

/** Distance at which the object starts to fade. If the object is less than this distance away it will appear normal. */
distance_fade_min_distance: float;

/** Specifies which type of fade to use. Can be any of the [enum DistanceFadeMode]s. */
distance_fade_mode: int;

/** The emitted light's color. See [member emission_enabled]. */
emission: Color;

/** If [code]true[/code], the body emits light. Emitting light makes the object appear brighter. The object can also cast light on other objects if a [GIProbe] or [BakedLightmap] is used and this object is used in baked lighting. */
emission_enabled: boolean;

/** The emitted light's strength. See [member emission_enabled]. */
emission_energy: float;

/** Use [code]UV2[/code] to read from the [member emission_texture]. */
emission_on_uv2: boolean;

/** Sets how [member emission] interacts with [member emission_texture]. Can either add or multiply. See [enum EmissionOperator] for options. */
emission_operator: int;

/** Texture that specifies how much surface emits light at a given point. */
emission_texture: Texture;

/** Forces a conversion of the [member albedo_texture] from sRGB space to linear space. */
flags_albedo_tex_force_srgb: boolean;

/** If [code]true[/code], the object receives no ambient light. */
flags_disable_ambient_light: boolean;

/** If [code]true[/code], the object receives no shadow that would otherwise be cast onto it. */
flags_do_not_receive_shadows: boolean;

/** If [code]true[/code], the shader will compute extra operations to make sure the normal stays correct when using a non-uniform scale. Only enable if using non-uniform scaling. */
flags_ensure_correct_normals: boolean;

/** If [code]true[/code], the object is rendered at the same size regardless of distance. */
flags_fixed_size: boolean;

/** If [code]true[/code], depth testing is disabled and the object will be drawn in render order. */
flags_no_depth_test: boolean;

/** If [code]true[/code], transparency is enabled on the body. See also [member params_blend_mode]. */
flags_transparent: boolean;

/** If [code]true[/code], the object is unaffected by lighting. */
flags_unshaded: boolean;

/**
 * If `true`, render point size can be changed.
 *
 * **Note:** this is only effective for objects whose geometry is point-based rather than triangle-based. See also [member params_point_size].
 *
*/
flags_use_point_size: boolean;

/** If [code]true[/code], enables the "shadow to opacity" render mode where lighting modifies the alpha so shadowed areas are opaque and non-shadowed areas are transparent. Useful for overlaying shadows onto a camera feed in AR. */
flags_use_shadow_to_opacity: boolean;

/** If [code]true[/code], lighting is calculated per vertex rather than per pixel. This may increase performance on low-end devices. */
flags_vertex_lighting: boolean;

/** If [code]true[/code], triplanar mapping is calculated in world space rather than object local space. See also [member uv1_triplanar]. */
flags_world_triplanar: boolean;

/** A high value makes the material appear more like a metal. Non-metals use their albedo as the diffuse color and add diffuse to the specular reflection. With non-metals, the reflection appears on top of the albedo color. Metals use their albedo as a multiplier to the specular reflection and set the diffuse color to black resulting in a tinted reflection. Materials work better when fully metal or fully non-metal, values between [code]0[/code] and [code]1[/code] should only be used for blending between metal and non-metal sections. To alter the amount of reflection use [member roughness]. */
metallic: float;

/**
 * Sets the size of the specular lobe. The specular lobe is the bright spot that is reflected from light sources.
 *
 * **Note:** unlike [member metallic], this is not energy-conserving, so it should be left at `0.5` in most cases. See also [member roughness].
 *
*/
metallic_specular: float;

/** Texture used to specify metallic for an object. This is multiplied by [member metallic]. */
metallic_texture: Texture;

/** Specifies the channel of the [member metallic_texture] in which the metallic information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use. */
metallic_texture_channel: int;

/** If [code]true[/code], normal mapping is enabled. */
normal_enabled: boolean;

/** The strength of the normal map's effect. */
normal_scale: float;

/**
 * Texture used to specify the normal at a given pixel. The `normal_texture` only uses the red and green channels. The normal read from `normal_texture` is oriented around the surface normal provided by the [Mesh].
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
normal_texture: Texture;

/** Threshold at which the alpha scissor will discard values. */
params_alpha_scissor_threshold: float;

/** If [code]true[/code], the shader will keep the scale set for the mesh. Otherwise the scale is lost when billboarding. Only applies when [member params_billboard_mode] is [constant BILLBOARD_ENABLED]. */
params_billboard_keep_scale: boolean;

/** Controls how the object faces the camera. See [enum BillboardMode]. */
params_billboard_mode: int;

/**
 * The material's blend mode.
 *
 * **Note:** Values other than `Mix` force the object into the transparent pipeline. See [enum BlendMode].
 *
*/
params_blend_mode: int;

/** Which side of the object is not drawn when backfaces are rendered. See [enum CullMode]. */
params_cull_mode: int;

/** Determines when depth rendering takes place. See [enum DepthDrawMode]. See also [member flags_transparent]. */
params_depth_draw_mode: int;

/** The algorithm used for diffuse light scattering. See [enum DiffuseMode]. */
params_diffuse_mode: int;

/** If [code]true[/code], enables the vertex grow setting. See [member params_grow_amount]. */
params_grow: boolean;

/** Grows object vertices in the direction of their normals. */
params_grow_amount: float;

/** Currently unimplemented in Godot. */
params_line_width: float;

/** The point size in pixels. See [member flags_use_point_size]. */
params_point_size: float;

/** The method for rendering the specular blob. See [enum SpecularMode]. */
params_specular_mode: int;

/** If [code]true[/code], the shader will discard all pixels that have an alpha value less than [member params_alpha_scissor_threshold]. */
params_use_alpha_scissor: boolean;

/** The number of horizontal frames in the particle sprite sheet. Only enabled when using [constant BILLBOARD_PARTICLES]. See [member params_billboard_mode]. */
particles_anim_h_frames: int;

/** If [code]true[/code], particle animations are looped. Only enabled when using [constant BILLBOARD_PARTICLES]. See [member params_billboard_mode]. */
particles_anim_loop: boolean;

/** The number of vertical frames in the particle sprite sheet. Only enabled when using [constant BILLBOARD_PARTICLES]. See [member params_billboard_mode]. */
particles_anim_v_frames: int;

/** Distance over which the fade effect takes place. The larger the distance the longer it takes for an object to fade. */
proximity_fade_distance: float;

/** If [code]true[/code], the proximity fade effect is enabled. The proximity fade effect fades out each pixel based on its distance to another object. */
proximity_fade_enable: boolean;

/** If [code]true[/code], the refraction effect is enabled. Distorts transparency based on light from behind the object. */
refraction_enabled: boolean;

/** The strength of the refraction effect. */
refraction_scale: float;

/** Texture that controls the strength of the refraction per-pixel. Multiplied by [member refraction_scale]. */
refraction_texture: Texture;

/** Specifies the channel of the [member ao_texture] in which the ambient occlusion information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use. */
refraction_texture_channel: int;

/** Sets the strength of the rim lighting effect. */
rim: float;

/** If [code]true[/code], rim effect is enabled. Rim lighting increases the brightness at glancing angles on an object. */
rim_enabled: boolean;

/** Texture used to set the strength of the rim lighting effect per-pixel. Multiplied by [member rim]. */
rim_texture: Texture;

/** The amount of to blend light and albedo color when rendering rim effect. If [code]0[/code] the light color is used, while [code]1[/code] means albedo color is used. An intermediate value generally works best. */
rim_tint: float;

/** Surface reflection. A value of [code]0[/code] represents a perfect mirror while a value of [code]1[/code] completely blurs the reflection. See also [member metallic]. */
roughness: float;

/** Texture used to control the roughness per-pixel. Multiplied by [member roughness]. */
roughness_texture: Texture;

/** Specifies the channel of the [member ao_texture] in which the ambient occlusion information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use. */
roughness_texture_channel: int;

/** If [code]true[/code], subsurface scattering is enabled. Emulates light that penetrates an object's surface, is scattered, and then emerges. */
subsurf_scatter_enabled: boolean;

/** The strength of the subsurface scattering effect. */
subsurf_scatter_strength: float;

/** Texture used to control the subsurface scattering strength. Stored in the red texture channel. Multiplied by [member subsurf_scatter_strength]. */
subsurf_scatter_texture: Texture;

/** The color used by the transmission effect. Represents the light passing through an object. */
transmission: Color;

/** If [code]true[/code], the transmission effect is enabled. */
transmission_enabled: boolean;

/** Texture used to control the transmission effect per-pixel. Added to [member transmission]. */
transmission_texture: Texture;

/** How much to offset the [code]UV[/code] coordinates. This amount will be added to [code]UV[/code] in the vertex function. This can be used to offset a texture. */
uv1_offset: Vector3;

/** How much to scale the [code]UV[/code] coordinates. This is multiplied by [code]UV[/code] in the vertex function. */
uv1_scale: Vector3;

/** If [code]true[/code], instead of using [code]UV[/code] textures will use a triplanar texture lookup to determine how to apply textures. Triplanar uses the orientation of the object's surface to blend between texture coordinates. It reads from the source texture 3 times, once for each axis and then blends between the results based on how closely the pixel aligns with each axis. This is often used for natural features to get a realistic blend of materials. Because triplanar texturing requires many more texture reads per-pixel it is much slower than normal UV texturing. Additionally, because it is blending the texture between the three axes, it is unsuitable when you are trying to achieve crisp texturing. */
uv1_triplanar: boolean;

/** A lower number blends the texture more softly while a higher number blends the texture more sharply. */
uv1_triplanar_sharpness: float;

/** How much to offset the [code]UV2[/code] coordinates. This amount will be added to [code]UV2[/code] in the vertex function. This can be used to offset a texture. */
uv2_offset: Vector3;

/** How much to scale the [code]UV2[/code] coordinates. This is multiplied by [code]UV2[/code] in the vertex function. */
uv2_scale: Vector3;

/** If [code]true[/code], instead of using [code]UV2[/code] textures will use a triplanar texture lookup to determine how to apply textures. Triplanar uses the orientation of the object's surface to blend between texture coordinates. It reads from the source texture 3 times, once for each axis and then blends between the results based on how closely the pixel aligns with each axis. This is often used for natural features to get a realistic blend of materials. Because triplanar texturing requires many more texture reads per-pixel it is much slower than normal UV texturing. Additionally, because it is blending the texture between the three axes, it is unsuitable when you are trying to achieve crisp texturing. */
uv2_triplanar: boolean;

/** A lower number blends the texture more softly while a higher number blends the texture more sharply. */
uv2_triplanar_sharpness: float;

/** If [code]true[/code], the model's vertex colors are processed as sRGB mode. */
vertex_color_is_srgb: boolean;

/** If [code]true[/code], the vertex color is used as albedo color. */
vertex_color_use_as_albedo: boolean;

/** Returns [code]true[/code], if the specified [enum Feature] is enabled. */
get_feature(feature: int): boolean;

/** Returns [code]true[/code], if the specified flag is enabled. See [enum Flags] enumerator for options. */
get_flag(flag: int): boolean;

/** Returns the [Texture] associated with the specified [enum TextureParam]. */
get_texture(param: int): Texture;

/** If [code]true[/code], enables the specified [enum Feature]. Many features that are available in [SpatialMaterial]s need to be enabled before use. This way the cost for using the feature is only incurred when specified. Features can also be enabled by setting the corresponding member to [code]true[/code]. */
set_feature(feature: int, enable: boolean): void;

/** If [code]true[/code], enables the specified flag. Flags are optional behaviour that can be turned on and off. Only one flag can be enabled at a time with this function, the flag enumerators cannot be bit-masked together to enable or disable multiple flags at once. Flags can also be enabled by setting the corresponding member to [code]true[/code]. See [enum Flags] enumerator for options. */
set_flag(flag: int, enable: boolean): void;

/** Sets the [Texture] to be used by the specified [enum TextureParam]. This function is called when setting members ending in [code]*_texture[/code]. */
set_texture(param: int, texture: Texture): void;

  connect<T extends SignalsOf<SpatialMaterial>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Texture specifying per-pixel color.
 *
*/
static TEXTURE_ALBEDO: 0;

/**
 * Texture specifying per-pixel metallic value.
 *
*/
static TEXTURE_METALLIC: 1;

/**
 * Texture specifying per-pixel roughness value.
 *
*/
static TEXTURE_ROUGHNESS: 2;

/**
 * Texture specifying per-pixel emission color.
 *
*/
static TEXTURE_EMISSION: 3;

/**
 * Texture specifying per-pixel normal vector.
 *
*/
static TEXTURE_NORMAL: 4;

/**
 * Texture specifying per-pixel rim value.
 *
*/
static TEXTURE_RIM: 5;

/**
 * Texture specifying per-pixel clearcoat value.
 *
*/
static TEXTURE_CLEARCOAT: 6;

/**
 * Texture specifying per-pixel flowmap direction for use with [member anisotropy].
 *
*/
static TEXTURE_FLOWMAP: 7;

/**
 * Texture specifying per-pixel ambient occlusion value.
 *
*/
static TEXTURE_AMBIENT_OCCLUSION: 8;

/**
 * Texture specifying per-pixel depth.
 *
*/
static TEXTURE_DEPTH: 9;

/**
 * Texture specifying per-pixel subsurface scattering.
 *
*/
static TEXTURE_SUBSURFACE_SCATTERING: 10;

/**
 * Texture specifying per-pixel transmission color.
 *
*/
static TEXTURE_TRANSMISSION: 11;

/**
 * Texture specifying per-pixel refraction strength.
 *
*/
static TEXTURE_REFRACTION: 12;

/**
 * Texture specifying per-pixel detail mask blending value.
 *
*/
static TEXTURE_DETAIL_MASK: 13;

/**
 * Texture specifying per-pixel detail color.
 *
*/
static TEXTURE_DETAIL_ALBEDO: 14;

/**
 * Texture specifying per-pixel detail normal.
 *
*/
static TEXTURE_DETAIL_NORMAL: 15;

/**
 * Represents the size of the [enum TextureParam] enum.
 *
*/
static TEXTURE_MAX: 16;

/**
 * Use `UV` with the detail texture.
 *
*/
static DETAIL_UV_1: 0;

/**
 * Use `UV2` with the detail texture.
 *
*/
static DETAIL_UV_2: 1;

/**
 * Constant for setting [member flags_transparent].
 *
*/
static FEATURE_TRANSPARENT: 0;

/**
 * Constant for setting [member emission_enabled].
 *
*/
static FEATURE_EMISSION: 1;

/**
 * Constant for setting [member normal_enabled].
 *
*/
static FEATURE_NORMAL_MAPPING: 2;

/**
 * Constant for setting [member rim_enabled].
 *
*/
static FEATURE_RIM: 3;

/**
 * Constant for setting [member clearcoat_enabled].
 *
*/
static FEATURE_CLEARCOAT: 4;

/**
 * Constant for setting [member anisotropy_enabled].
 *
*/
static FEATURE_ANISOTROPY: 5;

/**
 * Constant for setting [member ao_enabled].
 *
*/
static FEATURE_AMBIENT_OCCLUSION: 6;

/**
 * Constant for setting [member depth_enabled].
 *
*/
static FEATURE_DEPTH_MAPPING: 7;

/**
 * Constant for setting [member subsurf_scatter_enabled].
 *
*/
static FEATURE_SUBSURACE_SCATTERING: 8;

/**
 * Constant for setting [member transmission_enabled].
 *
*/
static FEATURE_TRANSMISSION: 9;

/**
 * Constant for setting [member refraction_enabled].
 *
*/
static FEATURE_REFRACTION: 10;

/**
 * Constant for setting [member detail_enabled].
 *
*/
static FEATURE_DETAIL: 11;

/**
 * Represents the size of the [enum Feature] enum.
 *
*/
static FEATURE_MAX: 12;

/**
 * Default blend mode. The color of the object is blended over the background based on the object's alpha value.
 *
*/
static BLEND_MODE_MIX: 0;

/**
 * The color of the object is added to the background.
 *
*/
static BLEND_MODE_ADD: 1;

/**
 * The color of the object is subtracted from the background.
 *
*/
static BLEND_MODE_SUB: 2;

/**
 * The color of the object is multiplied by the background.
 *
*/
static BLEND_MODE_MUL: 3;

/**
 * Default depth draw mode. Depth is drawn only for opaque objects.
 *
*/
static DEPTH_DRAW_OPAQUE_ONLY: 0;

/**
 * Depth draw is calculated for both opaque and transparent objects.
 *
*/
static DEPTH_DRAW_ALWAYS: 1;

/**
 * No depth draw.
 *
*/
static DEPTH_DRAW_DISABLED: 2;

/**
 * For transparent objects, an opaque pass is made first with the opaque parts, then transparency is drawn.
 *
*/
static DEPTH_DRAW_ALPHA_OPAQUE_PREPASS: 3;

/**
 * Default cull mode. The back of the object is culled when not visible.
 *
*/
static CULL_BACK: 0;

/**
 * The front of the object is culled when not visible.
 *
*/
static CULL_FRONT: 1;

/**
 * No culling is performed.
 *
*/
static CULL_DISABLED: 2;

/**
 * No lighting is used on the object. Color comes directly from `ALBEDO`.
 *
*/
static FLAG_UNSHADED: 0;

/**
 * Lighting is calculated per-vertex rather than per-pixel. This can be used to increase the speed of the shader at the cost of quality.
 *
*/
static FLAG_USE_VERTEX_LIGHTING: 1;

/**
 * Disables the depth test, so this object is drawn on top of all others. However, objects drawn after it in the draw order may cover it.
 *
*/
static FLAG_DISABLE_DEPTH_TEST: 2;

/**
 * Set `ALBEDO` to the per-vertex color specified in the mesh.
 *
*/
static FLAG_ALBEDO_FROM_VERTEX_COLOR: 3;

/**
 * Vertex color is in sRGB space and needs to be converted to linear. Only applies in the GLES3 renderer.
 *
*/
static FLAG_SRGB_VERTEX_COLOR: 4;

/**
 * Uses point size to alter the size of primitive points. Also changes the albedo texture lookup to use `POINT_COORD` instead of `UV`.
 *
*/
static FLAG_USE_POINT_SIZE: 5;

/**
 * Object is scaled by depth so that it always appears the same size on screen.
 *
*/
static FLAG_FIXED_SIZE: 6;

/**
 * Shader will keep the scale set for the mesh. Otherwise the scale is lost when billboarding. Only applies when [member params_billboard_mode] is [constant BILLBOARD_ENABLED].
 *
*/
static FLAG_BILLBOARD_KEEP_SCALE: 7;

/**
 * Use triplanar texture lookup for all texture lookups that would normally use `UV`.
 *
*/
static FLAG_UV1_USE_TRIPLANAR: 8;

/**
 * Use triplanar texture lookup for all texture lookups that would normally use `UV2`.
 *
*/
static FLAG_UV2_USE_TRIPLANAR: 9;

/**
 * Use `UV2` coordinates to look up from the [member ao_texture].
 *
*/
static FLAG_AO_ON_UV2: 11;

/**
 * Use `UV2` coordinates to look up from the [member emission_texture].
 *
*/
static FLAG_EMISSION_ON_UV2: 12;

/**
 * Use alpha scissor. Set by [member params_use_alpha_scissor].
 *
*/
static FLAG_USE_ALPHA_SCISSOR: 13;

/**
 * Use world coordinates in the triplanar texture lookup instead of local coordinates.
 *
*/
static FLAG_TRIPLANAR_USE_WORLD: 10;

/**
 * Forces the shader to convert albedo from sRGB space to linear space.
 *
*/
static FLAG_ALBEDO_TEXTURE_FORCE_SRGB: 14;

/**
 * Disables receiving shadows from other objects.
 *
*/
static FLAG_DONT_RECEIVE_SHADOWS: 15;

/**
 * Disables receiving ambient light.
 *
*/
static FLAG_DISABLE_AMBIENT_LIGHT: 17;

/**
 * Ensures that normals appear correct, even with non-uniform scaling.
 *
*/
static FLAG_ENSURE_CORRECT_NORMALS: 16;

/**
 * Enables the shadow to opacity feature.
 *
*/
static FLAG_USE_SHADOW_TO_OPACITY: 18;

/**
 * Represents the size of the [enum Flags] enum.
 *
*/
static FLAG_MAX: 19;

/**
 * Default diffuse scattering algorithm.
 *
*/
static DIFFUSE_BURLEY: 0;

/**
 * Diffuse scattering ignores roughness.
 *
*/
static DIFFUSE_LAMBERT: 1;

/**
 * Extends Lambert to cover more than 90 degrees when roughness increases.
 *
*/
static DIFFUSE_LAMBERT_WRAP: 2;

/**
 * Attempts to use roughness to emulate microsurfacing.
 *
*/
static DIFFUSE_OREN_NAYAR: 3;

/**
 * Uses a hard cut for lighting, with smoothing affected by roughness.
 *
*/
static DIFFUSE_TOON: 4;

/**
 * Default specular blob.
 *
*/
static SPECULAR_SCHLICK_GGX: 0;

/**
 * Older specular algorithm, included for compatibility.
 *
*/
static SPECULAR_BLINN: 1;

/**
 * Older specular algorithm, included for compatibility.
 *
*/
static SPECULAR_PHONG: 2;

/**
 * Toon blob which changes size based on roughness.
 *
*/
static SPECULAR_TOON: 3;

/**
 * No specular blob.
 *
*/
static SPECULAR_DISABLED: 4;

/**
 * Billboard mode is disabled.
 *
*/
static BILLBOARD_DISABLED: 0;

/**
 * The object's Z axis will always face the camera.
 *
*/
static BILLBOARD_ENABLED: 1;

/**
 * The object's X axis will always face the camera.
 *
*/
static BILLBOARD_FIXED_Y: 2;

/**
 * Used for particle systems when assigned to [Particles] and [CPUParticles] nodes. Enables `particles_anim_*` properties.
 *
 * The [member ParticlesMaterial.anim_speed] or [member CPUParticles.anim_speed] should also be set to a positive value for the animation to play.
 *
*/
static BILLBOARD_PARTICLES: 3;

/**
 * Used to read from the red channel of a texture.
 *
*/
static TEXTURE_CHANNEL_RED: 0;

/**
 * Used to read from the green channel of a texture.
 *
*/
static TEXTURE_CHANNEL_GREEN: 1;

/**
 * Used to read from the blue channel of a texture.
 *
*/
static TEXTURE_CHANNEL_BLUE: 2;

/**
 * Used to read from the alpha channel of a texture.
 *
*/
static TEXTURE_CHANNEL_ALPHA: 3;

/**
 * Currently unused.
 *
*/
static TEXTURE_CHANNEL_GRAYSCALE: 4;

/**
 * Adds the emission color to the color from the emission texture.
 *
*/
static EMISSION_OP_ADD: 0;

/**
 * Multiplies the emission color by the color from the emission texture.
 *
*/
static EMISSION_OP_MULTIPLY: 1;

/**
 * Do not use distance fade.
 *
*/
static DISTANCE_FADE_DISABLED: 0;

/**
 * Smoothly fades the object out based on each pixel's distance from the camera using the alpha channel.
 *
*/
static DISTANCE_FADE_PIXEL_ALPHA: 1;

/**
 * Smoothly fades the object out based on each pixel's distance from the camera using a dither approach. Dithering discards pixels based on a set pattern to smoothly fade without enabling transparency. On certain hardware this can be faster than [constant DISTANCE_FADE_PIXEL_ALPHA].
 *
*/
static DISTANCE_FADE_PIXEL_DITHER: 2;

/**
 * Smoothly fades the object out based on the object's distance from the camera using a dither approach. Dithering discards pixels based on a set pattern to smoothly fade without enabling transparency. On certain hardware this can be faster than [constant DISTANCE_FADE_PIXEL_ALPHA].
 *
*/
static DISTANCE_FADE_OBJECT_DITHER: 3;


  
}
