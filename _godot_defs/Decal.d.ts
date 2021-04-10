
/**
 * [Decal]s are used to project a texture onto a [Mesh] in the scene. Use Decals to add detail to a scene without affecting the underlying [Mesh]. They are often used to add weathering to building, add dirt or mud to the ground, or add variety to props. Decals can be moved at any time, making them suitable for things like blob shadows or laser sight dots.
 *
 * They are made of an [AABB] and a group of [Texture2D]s specifying [Color], normal, ORM (ambient occlusion, roughness, metallic), and emission. Decals are projected within their [AABB] so altering the orientation of the Decal affects the direction in which they are projected. By default, Decals are projected down (i.e. from positive Y to negative Y).
 *
 * The [Texture2D]s associated with the Decal are automatically stored in a texture atlas which is used for drawing the decals so all decals can be drawn at once. Godot uses clustered decals, meaning they are stored in cluster data and drawn when the mesh is drawn, they are not drawn as a postprocessing effect after.
 *
*/
declare class Decal extends VisualInstance3D {

  
/**
 * [Decal]s are used to project a texture onto a [Mesh] in the scene. Use Decals to add detail to a scene without affecting the underlying [Mesh]. They are often used to add weathering to building, add dirt or mud to the ground, or add variety to props. Decals can be moved at any time, making them suitable for things like blob shadows or laser sight dots.
 *
 * They are made of an [AABB] and a group of [Texture2D]s specifying [Color], normal, ORM (ambient occlusion, roughness, metallic), and emission. Decals are projected within their [AABB] so altering the orientation of the Decal affects the direction in which they are projected. By default, Decals are projected down (i.e. from positive Y to negative Y).
 *
 * The [Texture2D]s associated with the Decal are automatically stored in a texture atlas which is used for drawing the decals so all decals can be drawn at once. Godot uses clustered decals, meaning they are stored in cluster data and drawn when the mesh is drawn, they are not drawn as a postprocessing effect after.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Blends the albedo [Color] of the decal with albedo [Color] of the underlying mesh. */
albedo_mix: float;

/** Specifies which [member VisualInstance3D.layers] this decal will project on. By default, Decals affect all layers. This is used so you can specify which types of objects receive the Decal and which do not. This is especially useful so you an ensure that dynamic objects don't accidentally receive a Decal intended for the terrain under them. */
cull_mask: int;

/** Distance from the camera at which the Decal begins to fade away. */
distance_fade_begin: float;

/** If [code]true[/code], decals will smoothly fade away when far from the active [Camera3D] starting at [member distance_fade_begin]. The Decal will fade out over [member distance_fade_length], after which it will be culled and not sent to the shader at all. Use this to reduce the number of active Decals in a scene and thus improve performance. */
distance_fade_enabled: boolean;

/** Distance over which the Decal fades. The Decal becomes slowly more transparent over this distance and is completely invisible at the end. */
distance_fade_length: float;

/** Energy multiplier for the emission texture. This will make the decal emit light at a higher intensity. */
emission_energy: float;

/** Sets the size of the [AABB] used by the decal. The AABB goes from [code]-extents[/code] to [code]extents[/code]. */
extents: Vector3;

/** Sets the curve over which the decal will fade as the surface gets further from the center of the [AABB]. */
lower_fade: float;

/** Changes the [Color] of the Decal by multiplying it with this value. */
modulate: Color;

/** Fades the Decal if the angle between the Decal's [AABB] and the target surface becomes too large. A value of [code]0[/code] projects the Decal regardless of angle, a value of [code]1[/code] limits the Decal to surfaces that are nearly perpendicular. */
normal_fade: float;

/** [Texture2D] with the base [Color] of the Decal. Either this or the [member texture_emission] must be set for the Decal to be visible. Use the alpha channel like a mask to smoothly blend the edges of the decal with the underlying object. */
texture_albedo: Texture2D;

/** [Texture2D] with the emission [Color] of the Decal. Either this or the [member texture_emission] must be set for the Decal to be visible. Use the alpha channel like a mask to smoothly blend the edges of the decal with the underlying object. */
texture_emission: Texture2D;

/** [Texture2D] with the per-pixel normalmap for the decal. Use this to add extra detail to decals. */
texture_normal: Texture2D;

/** [Texture2D] storing ambient occlusion, roughness, and metallic for the decal. Use this to add extra detail to decals. */
texture_orm: Texture2D;

/** Sets the curve over which the decal will fade as the surface gets further from the center of the [AABB]. */
upper_fade: float;

/**
 * Returns the [Texture2D] associated with the specified [enum DecalTexture]. This is a convenience method, in most cases you should access the texture directly.
 *
 * For example, instead of `albedo_tex = $Decal.get_texture(Decal.TEXTURE_ALBEDO)`, use `albedo_tex = $Decal.texture_albedo`.
 *
 * One case where this is better than accessing the texture directly is when you want to copy one Decal's textures to another. For example:
 *
 * @example 
 * 
 * for i in Decal.TEXTURE_MAX:
 *     $NewDecal.set_texture(i, $OldDecal.get_texture(i))
 * @summary 
 * 
 *
*/
get_texture(type: int): Texture2D;

/**
 * Sets the [Texture2D] associated with the specified [enum DecalTexture]. This is a convenience method, in most cases you should access the texture directly.
 *
 * For example, instead of `$Decal.set_texture(Decal.TEXTURE_ALBEDO, albedo_tex)`, use `$Decal.texture_albedo = albedo_tex`.
 *
 * One case where this is better than accessing the texture directly is when you want to copy one Decal's textures to another. For example:
 *
 * @example 
 * 
 * for i in Decal.TEXTURE_MAX:
 *     $NewDecal.set_texture(i, $OldDecal.get_texture(i))
 * @summary 
 * 
 *
*/
set_texture(type: int, texture: Texture2D): void;

  connect<T extends SignalsOf<Decal>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * [Texture2D] corresponding to [member texture_albedo].
 *
*/
static TEXTURE_ALBEDO: 0;

/**
 * [Texture2D] corresponding to [member texture_normal].
 *
*/
static TEXTURE_NORMAL: 1;

/**
 * [Texture2D] corresponding to [member texture_orm].
 *
*/
static TEXTURE_ORM: 2;

/**
 * [Texture2D] corresponding to [member texture_emission].
 *
*/
static TEXTURE_EMISSION: 3;

/**
 * Max size of [enum DecalTexture] enum.
 *
*/
static TEXTURE_MAX: 4;


  
}


 
