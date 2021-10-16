
/**
 * 3D particle node used to create a variety of particle systems and effects. [Particles] features an emitter that generates some number of particles at a given rate.
 *
 * Use the `process_material` property to add a [ParticlesMaterial] to configure particle appearance and behavior. Alternatively, you can add a [ShaderMaterial] which will be applied to all particles.
 *
 * **Note:** [Particles] only work when using the GLES3 renderer. If using the GLES2 renderer, use [CPUParticles] instead. You can convert [Particles] to [CPUParticles] by selecting the node, clicking the **Particles** menu at the top of the 3D editor viewport then choosing **Convert to CPUParticles**.
 *
 * **Note:** After working on a Particles node, remember to update its [member visibility_aabb] by selecting it, clicking the **Particles** menu at the top of the 3D editor viewport then choose **Generate Visibility AABB**. Otherwise, particles may suddenly disappear depending on the camera position and angle.
 *
*/
declare class Particles extends GeometryInstance {

  
/**
 * 3D particle node used to create a variety of particle systems and effects. [Particles] features an emitter that generates some number of particles at a given rate.
 *
 * Use the `process_material` property to add a [ParticlesMaterial] to configure particle appearance and behavior. Alternatively, you can add a [ShaderMaterial] which will be applied to all particles.
 *
 * **Note:** [Particles] only work when using the GLES3 renderer. If using the GLES2 renderer, use [CPUParticles] instead. You can convert [Particles] to [CPUParticles] by selecting the node, clicking the **Particles** menu at the top of the 3D editor viewport then choosing **Convert to CPUParticles**.
 *
 * **Note:** After working on a Particles node, remember to update its [member visibility_aabb] by selecting it, clicking the **Particles** menu at the top of the 3D editor viewport then choose **Generate Visibility AABB**. Otherwise, particles may suddenly disappear depending on the camera position and angle.
 *
*/
  "new"(): Particles;
  static "new"(): Particles;



/**
 * The number of particles emitted in one emission cycle (corresponding to the [member lifetime]).
 *
 * **Note:** Changing [member amount] will reset the particle emission, therefore removing all particles that were already emitted before changing [member amount].
 *
*/
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

/** The amount of time each particle will exist (in seconds). */
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

/**
 * The [AABB] that determines the node's region which needs to be visible on screen for the particle system to be active.
 *
 * Grow the box if particles suddenly appear/disappear when the node enters/exits the screen. The [AABB] can be grown via code or with the **Particles → Generate AABB** editor tool.
 *
 * **Note:** If the [ParticlesMaterial] in use is configured to cast shadows, you may want to enlarge this AABB to ensure the shadow is updated when particles are off-screen.
 *
*/
visibility_aabb: AABB;

/** Returns the axis-aligned bounding box that contains all the particles that are active in the current frame. */
capture_aabb(): AABB;

/** Returns the [Mesh] that is drawn at index [code]pass[/code]. */
get_draw_pass_mesh(pass: int): Mesh;

/** Restarts the particle emission, clearing existing particles. */
restart(): void;

/** Sets the [Mesh] that is drawn at index [code]pass[/code]. */
set_draw_pass_mesh(pass: int, mesh: Mesh): void;

  // connect<T extends SignalsOf<Particles>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ParticlesSignals>>(signal: T, method: SignalFunction<ParticlesSignals[T]>): number;



/**
 * Particles are drawn in the order emitted.
 *
*/
static DRAW_ORDER_INDEX: any;

/**
 * Particles are drawn in order of remaining lifetime.
 *
*/
static DRAW_ORDER_LIFETIME: any;

/**
 * Particles are drawn in order of depth.
 *
*/
static DRAW_ORDER_VIEW_DEPTH: any;

/**
 * Maximum number of draw passes supported.
 *
*/
static MAX_DRAW_PASSES: any;

}

declare class ParticlesSignals extends GeometryInstanceSignals {
  
}
