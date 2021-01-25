
/**
 * 3D particle node used to create a variety of particle systems and effects. [GPUParticles3D] features an emitter that generates some number of particles at a given rate.
 *
 * Use the `process_material` property to add a [ParticlesMaterial] to configure particle appearance and behavior. Alternatively, you can add a [ShaderMaterial] which will be applied to all particles.
 *
*/
declare class GPUParticles3D extends GeometryInstance3D {

  
/**
 * 3D particle node used to create a variety of particle systems and effects. [GPUParticles3D] features an emitter that generates some number of particles at a given rate.
 *
 * Use the `process_material` property to add a [ParticlesMaterial] to configure particle appearance and behavior. Alternatively, you can add a [ShaderMaterial] which will be applied to all particles.
 *
*/
  "new"(): this;
  static "new"(): this;



/** Number of particles to emit. */
amount: int;


/** Particle draw order. Uses [enum DrawOrder] values. */
draw_order: int;

/** [Mesh] that is drawn for the first draw pass. */
draw_pass_1: Mesh;

/** [Mesh] that is drawn for the second draw pass. */
draw_pass_2: Mesh;

/** [Mesh] that is drawn for the third draw pass. */
draw_pass_3: Mesh;

/** [Mesh] that is drawn for the fourth draw pass. */
draw_pass_4: Mesh;

/** The number of draw passes when rendering particles. */
draw_passes: int;

/** If [code]true[/code], particles are being emitted. */
emitting: boolean;

/** Time ratio between each emission. If [code]0[/code], particles are emitted continuously. If [code]1[/code], all particles are emitted simultaneously. */
explosiveness: float;

/** The particle system's frame rate is fixed to a value. For instance, changing the value to 2 will make the particles render at 2 frames per second. Note this does not slow down the simulation of the particle system itself. */
fixed_fps: int;

/** If [code]true[/code], results in fractional delta calculation which has a smoother particles display effect. */
fract_delta: boolean;

/** Amount of time each particle will exist. */
lifetime: float;

/** If [code]true[/code], particles use the parent node's coordinate space. If [code]false[/code], they use global coordinates. */
local_coords: boolean;

/** If [code]true[/code], only [code]amount[/code] particles will be emitted. */
one_shot: boolean;

/** Amount of time to preprocess the particles before animation starts. Lets you start the animation some time after particles have started emitting. */
preprocess: float;

/** [Material] for processing particles. Can be a [ParticlesMaterial] or a [ShaderMaterial]. */
process_material: Material;

/** Emission randomness ratio. */
randomness: float;

/** Speed scaling ratio. A value of [code]0[/code] can be used to pause the particles. */
speed_scale: float;


/** The [AABB] that determines the area of the world part of which needs to be visible on screen for the particle system to be active. */
visibility_aabb: AABB;

/** Returns the axis-aligned bounding box that contains all the particles that are active in the current frame. */
capture_aabb(): AABB;

/** No documentation provided. */
emit_particle(xform: Transform, velocity: Vector3, color: Color, custom: Color, flags: int): void;

/** Returns the [Mesh] that is drawn at index [code]pass[/code]. */
get_draw_pass_mesh(pass: int): Mesh;

/** Restarts the particle emission, clearing existing particles. */
restart(): void;

/** Sets the [Mesh] that is drawn at index [code]pass[/code]. */
set_draw_pass_mesh(pass: int, mesh: Mesh): void;

  connect<T extends SignalsOf<GPUParticles3D>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Particles are drawn in the order emitted.
 *
*/
static DRAW_ORDER_INDEX: 0;

/**
 * Particles are drawn in order of remaining lifetime.
 *
*/
static DRAW_ORDER_LIFETIME: 1;

/**
 * Particles are drawn in order of depth.
 *
*/
static DRAW_ORDER_VIEW_DEPTH: 2;

/** No documentation provided. */
static EMIT_FLAG_POSITION: 1;

/** No documentation provided. */
static EMIT_FLAG_ROTATION_SCALE: 2;

/** No documentation provided. */
static EMIT_FLAG_VELOCITY: 4;

/** No documentation provided. */
static EMIT_FLAG_COLOR: 8;

/** No documentation provided. */
static EMIT_FLAG_CUSTOM: 16;

/**
 * Maximum number of draw passes supported.
 *
*/
static MAX_DRAW_PASSES: 4;


  
}


 
