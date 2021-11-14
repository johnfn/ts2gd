
/**
 * [CanvasItemMaterial]s provide a means of modifying the textures associated with a CanvasItem. They specialize in describing blend and lighting behaviors for textures. Use a [ShaderMaterial] to more fully customize a material's interactions with a [CanvasItem].
 *
*/
declare class CanvasItemMaterial extends Material  {

  
/**
 * [CanvasItemMaterial]s provide a means of modifying the textures associated with a CanvasItem. They specialize in describing blend and lighting behaviors for textures. Use a [ShaderMaterial] to more fully customize a material's interactions with a [CanvasItem].
 *
*/
  new(): CanvasItemMaterial; 
  static "new"(): CanvasItemMaterial 


/** The manner in which a material's rendering is applied to underlying textures. */
blend_mode: int;

/** The manner in which material reacts to lighting. */
light_mode: int;

/**
 * The number of columns in the spritesheet assigned as [Texture] for a [Particles2D] or [CPUParticles2D].
 *
 * **Note:** This property is only used and visible in the editor if [member particles_animation] is `true`.
 *
*/
particles_anim_h_frames: int;

/**
 * If `true`, the particles animation will loop.
 *
 * **Note:** This property is only used and visible in the editor if [member particles_animation] is `true`.
 *
*/
particles_anim_loop: boolean;

/**
 * The number of rows in the spritesheet assigned as [Texture] for a [Particles2D] or [CPUParticles2D].
 *
 * **Note:** This property is only used and visible in the editor if [member particles_animation] is `true`.
 *
*/
particles_anim_v_frames: int;

/**
 * If `true`, enable spritesheet-based animation features when assigned to [Particles2D] and [CPUParticles2D] nodes. The [member ParticlesMaterial.anim_speed] or [member CPUParticles2D.anim_speed] should also be set to a positive value for the animation to play.
 *
 * This property (and other `particles_anim_*` properties that depend on it) has no effect on other types of nodes.
 *
*/
particles_animation: boolean;



  connect<T extends SignalsOf<CanvasItemMaterial>>(signal: T, method: SignalFunction<CanvasItemMaterial[T]>): number;



/**
 * Mix blending mode. Colors are assumed to be independent of the alpha (opacity) value.
 *
*/
static BLEND_MODE_MIX: any;

/**
 * Additive blending mode.
 *
*/
static BLEND_MODE_ADD: any;

/**
 * Subtractive blending mode.
 *
*/
static BLEND_MODE_SUB: any;

/**
 * Multiplicative blending mode.
 *
*/
static BLEND_MODE_MUL: any;

/**
 * Mix blending mode. Colors are assumed to be premultiplied by the alpha (opacity) value.
 *
*/
static BLEND_MODE_PREMULT_ALPHA: any;

/**
 * Render the material using both light and non-light sensitive material properties.
 *
*/
static LIGHT_MODE_NORMAL: any;

/**
 * Render the material as if there were no light.
 *
*/
static LIGHT_MODE_UNSHADED: any;

/**
 * Render the material as if there were only light.
 *
*/
static LIGHT_MODE_LIGHT_ONLY: any;



}

