
/**
 * CPU-based 2D particle node used to create a variety of particle systems and effects.
 *
 * See also [Particles2D], which provides the same functionality with hardware acceleration, but may not run on older devices.
 *
 * **Note:** Unlike [Particles2D], the visibility rect is generated on-the-fly and doesn't need to be configured by the user.
 *
*/
declare class CPUParticles2D extends Node2D {

  
/**
 * CPU-based 2D particle node used to create a variety of particle systems and effects.
 *
 * See also [Particles2D], which provides the same functionality with hardware acceleration, but may not run on older devices.
 *
 * **Note:** Unlike [Particles2D], the visibility rect is generated on-the-fly and doesn't need to be configured by the user.
 *
*/
  "new"(): CPUParticles2D;
  static "new"(): CPUParticles2D;



/**
 * The number of particles emitted in one emission cycle (corresponding to the [member lifetime]).
 *
 * **Note:** Changing [member amount] will reset the particle emission, therefore removing all particles that were already emitted before changing [member amount].
 *
*/
amount: int;

/** Initial rotation applied to each particle, in degrees. */
angle: float;

/** Each particle's rotation will be animated along this [Curve]. */
angle_curve: Curve;

/** Rotation randomness ratio. */
angle_random: float;

/** Initial angular velocity applied to each particle. Sets the speed of rotation of the particle. */
angular_velocity: float;

/** Each particle's angular velocity will vary along this [Curve]. */
angular_velocity_curve: Curve;

/** Angular velocity randomness ratio. */
angular_velocity_random: float;

/** Particle animation offset. */
anim_offset: float;

/** Each particle's animation offset will vary along this [Curve]. */
anim_offset_curve: Curve;

/** Animation offset randomness ratio. */
anim_offset_random: float;

/** Particle animation speed. */
anim_speed: float;

/** Each particle's animation speed will vary along this [Curve]. */
anim_speed_curve: Curve;

/** Animation speed randomness ratio. */
anim_speed_random: float;

/** Each particle's initial color. If [member texture] is defined, it will be multiplied by this color. */
color: Color;

/** Each particle's color will vary along this [Gradient] (multiplied with [member color]). */
color_ramp: Gradient;

/** The rate at which particles lose velocity. */
damping: float;

/** Damping will vary along this [Curve]. */
damping_curve: Curve;

/** Damping randomness ratio. */
damping_random: float;

/** Unit vector specifying the particles' emission direction. */
direction: Vector2;

/** Particle draw order. Uses [enum DrawOrder] values. */
draw_order: int;

/** Sets the [Color]s to modulate particles by when using [constant EMISSION_SHAPE_POINTS] or [constant EMISSION_SHAPE_DIRECTED_POINTS]. */
emission_colors: PoolColorArray;

/** Sets the direction the particles will be emitted in when using [constant EMISSION_SHAPE_DIRECTED_POINTS]. */
emission_normals: PoolVector2Array;

/** Sets the initial positions to spawn particles when using [constant EMISSION_SHAPE_POINTS] or [constant EMISSION_SHAPE_DIRECTED_POINTS]. */
emission_points: PoolVector2Array;

/** The rectangle's extents if [member emission_shape] is set to [constant EMISSION_SHAPE_RECTANGLE]. */
emission_rect_extents: Vector2;

/** Particles will be emitted inside this region. See [enum EmissionShape] for possible values. */
emission_shape: int;

/** The sphere's radius if [member emission_shape] is set to [constant EMISSION_SHAPE_SPHERE]. */
emission_sphere_radius: float;

/** If [code]true[/code], particles are being emitted. */
emitting: boolean;

/** How rapidly particles in an emission cycle are emitted. If greater than [code]0[/code], there will be a gap in emissions before the next cycle begins. */
explosiveness: float;

/** The particle system's frame rate is fixed to a value. For instance, changing the value to 2 will make the particles render at 2 frames per second. Note this does not slow down the simulation of the particle system itself. */
fixed_fps: int;

/** Align Y axis of particle with the direction of its velocity. */
flag_align_y: boolean;

/** If [code]true[/code], results in fractional delta calculation which has a smoother particles display effect. */
fract_delta: boolean;

/** Gravity applied to every particle. */
gravity: Vector2;

/** Initial hue variation applied to each particle. */
hue_variation: float;

/** Each particle's hue will vary along this [Curve]. */
hue_variation_curve: Curve;

/** Hue variation randomness ratio. */
hue_variation_random: float;

/** Initial velocity magnitude for each particle. Direction comes from [member spread] and the node's orientation. */
initial_velocity: float;

/** Initial velocity randomness ratio. */
initial_velocity_random: float;

/** The amount of time each particle will exist (in seconds). */
lifetime: float;

/** Particle lifetime randomness ratio. */
lifetime_randomness: float;

/** Linear acceleration applied to each particle in the direction of motion. */
linear_accel: float;

/** Each particle's linear acceleration will vary along this [Curve]. */
linear_accel_curve: Curve;

/** Linear acceleration randomness ratio. */
linear_accel_random: float;

/** If [code]true[/code], particles use the parent node's coordinate space. If [code]false[/code], they use global coordinates. */
local_coords: boolean;

/**
 * Normal map to be used for the [member texture] property.
 *
 * **Note:** Godot expects the normal map to use X+, Y-, and Z+ coordinates. See [url=http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates]this page[/url] for a comparison of normal map coordinates expected by popular engines.
 *
*/
normalmap: Texture;

/** If [code]true[/code], only one emission cycle occurs. If set [code]true[/code] during a cycle, emission will stop at the cycle's end. */
one_shot: boolean;

/** Orbital velocity applied to each particle. Makes the particles circle around origin. Specified in number of full rotations around origin per second. */
orbit_velocity: float;

/** Each particle's orbital velocity will vary along this [Curve]. */
orbit_velocity_curve: Curve;

/** Orbital velocity randomness ratio. */
orbit_velocity_random: float;

/** Particle system starts as if it had already run for this many seconds. */
preprocess: float;

/** Radial acceleration applied to each particle. Makes particle accelerate away from origin. */
radial_accel: float;

/** Each particle's radial acceleration will vary along this [Curve]. */
radial_accel_curve: Curve;

/** Radial acceleration randomness ratio. */
radial_accel_random: float;

/** Emission lifetime randomness ratio. */
randomness: float;

/** Initial scale applied to each particle. */
scale_amount: float;

/** Each particle's scale will vary along this [Curve]. */
scale_amount_curve: Curve;

/** Scale randomness ratio. */
scale_amount_random: float;

/** Particle system's running speed scaling ratio. A value of [code]0[/code] can be used to pause the particles. */
speed_scale: float;

/** Each particle's initial direction range from [code]+spread[/code] to [code]-spread[/code] degrees. */
spread: float;

/** Tangential acceleration applied to each particle. Tangential acceleration is perpendicular to the particle's velocity giving the particles a swirling motion. */
tangential_accel: float;

/** Each particle's tangential acceleration will vary along this [Curve]. */
tangential_accel_curve: Curve;

/** Tangential acceleration randomness ratio. */
tangential_accel_random: float;

/** Particle texture. If [code]null[/code], particles will be squares. */
texture: Texture;

/** Sets this node's properties to match a given [Particles2D] node with an assigned [ParticlesMaterial]. */
convert_from_particles(particles: Node): void;

/** Returns the base value of the parameter specified by [enum Parameter]. */
get_param(param: int): float;

/** Returns the [Curve] of the parameter specified by [enum Parameter]. */
get_param_curve(param: int): Curve;

/** Returns the randomness factor of the parameter specified by [enum Parameter]. */
get_param_randomness(param: int): float;

/** Returns the enabled state of the given flag (see [enum Flags] for options). */
get_particle_flag(flag: int): boolean;

/** Restarts the particle emitter. */
restart(): void;

/** Sets the base value of the parameter specified by [enum Parameter]. */
set_param(param: int, value: float): void;

/** Sets the [Curve] of the parameter specified by [enum Parameter]. */
set_param_curve(param: int, curve: Curve): void;

/** Sets the randomness factor of the parameter specified by [enum Parameter]. */
set_param_randomness(param: int, randomness: float): void;

/** Enables or disables the given flag (see [enum Flags] for options). */
set_particle_flag(flag: int, enable: boolean): void;

  // connect<T extends SignalsOf<CPUParticles2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CPUParticles2DSignals>>(signal: T, method: SignalFunction<CPUParticles2DSignals[T]>): number;



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
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set initial velocity properties.
 *
*/
static PARAM_INITIAL_LINEAR_VELOCITY: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set angular velocity properties.
 *
*/
static PARAM_ANGULAR_VELOCITY: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set orbital velocity properties.
 *
*/
static PARAM_ORBIT_VELOCITY: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set linear acceleration properties.
 *
*/
static PARAM_LINEAR_ACCEL: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set radial acceleration properties.
 *
*/
static PARAM_RADIAL_ACCEL: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set tangential acceleration properties.
 *
*/
static PARAM_TANGENTIAL_ACCEL: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set damping properties.
 *
*/
static PARAM_DAMPING: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set angle properties.
 *
*/
static PARAM_ANGLE: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set scale properties.
 *
*/
static PARAM_SCALE: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set hue variation properties.
 *
*/
static PARAM_HUE_VARIATION: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set animation speed properties.
 *
*/
static PARAM_ANIM_SPEED: any;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_curve] to set animation offset properties.
 *
*/
static PARAM_ANIM_OFFSET: any;

/**
 * Represents the size of the [enum Parameter] enum.
 *
*/
static PARAM_MAX: any;

/**
 * Use with [method set_particle_flag] to set [member flag_align_y].
 *
*/
static FLAG_ALIGN_Y_TO_VELOCITY: any;

/**
 * Present for consistency with 3D particle nodes, not used in 2D.
 *
*/
static FLAG_ROTATE_Y: any;

/**
 * Present for consistency with 3D particle nodes, not used in 2D.
 *
*/
static FLAG_DISABLE_Z: any;

/**
 * Represents the size of the [enum Flags] enum.
 *
*/
static FLAG_MAX: any;

/**
 * All particles will be emitted from a single point.
 *
*/
static EMISSION_SHAPE_POINT: any;

/**
 * Particles will be emitted on the surface of a sphere flattened to two dimensions.
 *
*/
static EMISSION_SHAPE_SPHERE: any;

/**
 * Particles will be emitted in the area of a rectangle.
 *
*/
static EMISSION_SHAPE_RECTANGLE: any;

/**
 * Particles will be emitted at a position chosen randomly among [member emission_points]. Particle color will be modulated by [member emission_colors].
 *
*/
static EMISSION_SHAPE_POINTS: any;

/**
 * Particles will be emitted at a position chosen randomly among [member emission_points]. Particle velocity and rotation will be set based on [member emission_normals]. Particle color will be modulated by [member emission_colors].
 *
*/
static EMISSION_SHAPE_DIRECTED_POINTS: any;

/**
 * Represents the size of the [enum EmissionShape] enum.
 *
*/
static EMISSION_SHAPE_MAX: any;

}

declare class CPUParticles2DSignals extends Node2DSignals {
  
}
