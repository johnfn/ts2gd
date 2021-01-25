
/**
 * ParticlesMaterial defines particle properties and behavior. It is used in the `process_material` of [Particles] and [Particles2D] emitter nodes.
 *
 * Some of this material's properties are applied to each particle when emitted, while others can have a [CurveTexture] applied to vary values over the lifetime of the particle.
 *
 * When a randomness ratio is applied to a property it is used to scale that property by a random amount. The random ratio is used to interpolate between `1.0` and a random number less than one, the result is multiplied by the property to obtain the randomized property. For example a random ratio of `0.4` would scale the original property between `0.4-1.0` of its original value.
 *
*/
declare class ParticlesMaterial extends Material {

  
/**
 * ParticlesMaterial defines particle properties and behavior. It is used in the `process_material` of [Particles] and [Particles2D] emitter nodes.
 *
 * Some of this material's properties are applied to each particle when emitted, while others can have a [CurveTexture] applied to vary values over the lifetime of the particle.
 *
 * When a randomness ratio is applied to a property it is used to scale that property by a random amount. The random ratio is used to interpolate between `1.0` and a random number less than one, the result is multiplied by the property to obtain the randomized property. For example a random ratio of `0.4` would scale the original property between `0.4-1.0` of its original value.
 *
*/
  "new"(): ParticlesMaterial;
  static "new"(): ParticlesMaterial;



/**
 * Initial rotation applied to each particle, in degrees.
 *
 * Only applied when [member flag_disable_z] or [member flag_rotate_y] are `true` or the [SpatialMaterial] being used to draw the particle is using [constant SpatialMaterial.BILLBOARD_PARTICLES].
 *
*/
angle: float;

/** Each particle's rotation will be animated along this [CurveTexture]. */
angle_curve: Texture;

/** Rotation randomness ratio. */
angle_random: float;

/**
 * Initial angular velocity applied to each particle. Sets the speed of rotation of the particle.
 *
 * Only applied when [member flag_disable_z] or [member flag_rotate_y] are `true` or the [SpatialMaterial] being used to draw the particle is using [constant SpatialMaterial.BILLBOARD_PARTICLES].
 *
*/
angular_velocity: float;

/** Each particle's angular velocity will vary along this [CurveTexture]. */
angular_velocity_curve: Texture;

/** Angular velocity randomness ratio. */
angular_velocity_random: float;

/** Particle animation offset. */
anim_offset: float;

/** Each particle's animation offset will vary along this [CurveTexture]. */
anim_offset_curve: Texture;

/** Animation offset randomness ratio. */
anim_offset_random: float;

/** Particle animation speed. */
anim_speed: float;

/** Each particle's animation speed will vary along this [CurveTexture]. */
anim_speed_curve: Texture;

/** Animation speed randomness ratio. */
anim_speed_random: float;

/** Each particle's initial color. If the [Particles2D]'s [code]texture[/code] is defined, it will be multiplied by this color. To have particle display color in a [SpatialMaterial] make sure to set [member SpatialMaterial.vertex_color_use_as_albedo] to [code]true[/code]. */
color: Color;

/** Each particle's color will vary along this [GradientTexture]. */
color_ramp: Texture;

/** The rate at which particles lose velocity. */
damping: float;

/** Damping will vary along this [CurveTexture]. */
damping_curve: Texture;

/** Damping randomness ratio. */
damping_random: float;

/** Unit vector specifying the particles' emission direction. */
direction: Vector3;

/** The box's extents if [code]emission_shape[/code] is set to [constant EMISSION_SHAPE_BOX]. */
emission_box_extents: Vector3;

/** Particle color will be modulated by color determined by sampling this texture at the same point as the [member emission_point_texture]. */
emission_color_texture: Texture;

/** Particle velocity and rotation will be set by sampling this texture at the same point as the [member emission_point_texture]. Used only in [constant EMISSION_SHAPE_DIRECTED_POINTS]. Can be created automatically from mesh or node by selecting "Create Emission Points from Mesh/Node" under the "Particles" tool in the toolbar. */
emission_normal_texture: Texture;

/** The number of emission points if [code]emission_shape[/code] is set to [constant EMISSION_SHAPE_POINTS] or [constant EMISSION_SHAPE_DIRECTED_POINTS]. */
emission_point_count: int;

/** Particles will be emitted at positions determined by sampling this texture at a random position. Used with [constant EMISSION_SHAPE_POINTS] and [constant EMISSION_SHAPE_DIRECTED_POINTS]. Can be created automatically from mesh or node by selecting "Create Emission Points from Mesh/Node" under the "Particles" tool in the toolbar. */
emission_point_texture: Texture;

/** Particles will be emitted inside this region. Use [enum EmissionShape] constants for values. */
emission_shape: int;

/** The sphere's radius if [code]emission_shape[/code] is set to [constant EMISSION_SHAPE_SPHERE]. */
emission_sphere_radius: float;

/** Align Y axis of particle with the direction of its velocity. */
flag_align_y: boolean;

/** If [code]true[/code], particles will not move on the z axis. */
flag_disable_z: boolean;

/** If [code]true[/code], particles rotate around Y axis by [member angle]. */
flag_rotate_y: boolean;

/** Amount of [member spread] in Y/Z plane. A value of [code]1[/code] restricts particles to X/Z plane. */
flatness: float;

/** Gravity applied to every particle. */
gravity: Vector3;

/** Initial hue variation applied to each particle. */
hue_variation: float;

/** Each particle's hue will vary along this [CurveTexture]. */
hue_variation_curve: Texture;

/** Hue variation randomness ratio. */
hue_variation_random: float;

/** Initial velocity magnitude for each particle. Direction comes from [member spread] and the node's orientation. */
initial_velocity: float;

/** Initial velocity randomness ratio. */
initial_velocity_random: float;

/** Particle lifetime randomness ratio. */
lifetime_randomness: float;

/** Linear acceleration applied to each particle in the direction of motion. */
linear_accel: float;

/** Each particle's linear acceleration will vary along this [CurveTexture]. */
linear_accel_curve: Texture;

/** Linear acceleration randomness ratio. */
linear_accel_random: float;

/**
 * Orbital velocity applied to each particle. Makes the particles circle around origin. Specified in number of full rotations around origin per second.
 *
 * Only available when [member flag_disable_z] is `true`.
 *
*/
orbit_velocity: float;

/** Each particle's orbital velocity will vary along this [CurveTexture]. */
orbit_velocity_curve: Texture;

/** Orbital velocity randomness ratio. */
orbit_velocity_random: float;

/** Radial acceleration applied to each particle. Makes particle accelerate away from origin. */
radial_accel: float;

/** Each particle's radial acceleration will vary along this [CurveTexture]. */
radial_accel_curve: Texture;

/** Radial acceleration randomness ratio. */
radial_accel_random: float;

/** Initial scale applied to each particle. */
scale: float;

/** Each particle's scale will vary along this [CurveTexture]. */
scale_curve: Texture;

/** Scale randomness ratio. */
scale_random: float;

/** Each particle's initial direction range from [code]+spread[/code] to [code]-spread[/code] degrees. Applied to X/Z plane and Y/Z planes. */
spread: float;

/** Tangential acceleration applied to each particle. Tangential acceleration is perpendicular to the particle's velocity giving the particles a swirling motion. */
tangential_accel: float;

/** Each particle's tangential acceleration will vary along this [CurveTexture]. */
tangential_accel_curve: Texture;

/** Tangential acceleration randomness ratio. */
tangential_accel_random: float;

/** Trail particles' color will vary along this [GradientTexture]. */
trail_color_modifier: GradientTexture;

/** Emitter will emit [code]amount[/code] divided by [code]trail_divisor[/code] particles. The remaining particles will be used as trail(s). */
trail_divisor: int;

/** Trail particles' size will vary along this [CurveTexture]. */
trail_size_modifier: CurveTexture;

/** Returns [code]true[/code] if the specified flag is enabled. */
get_flag(flag: int): boolean;

/** Returns the value of the specified parameter. */
get_param(param: int): float;

/** Returns the randomness ratio associated with the specified parameter. */
get_param_randomness(param: int): float;

/** Returns the [Texture] used by the specified parameter. */
get_param_texture(param: int): Texture;

/** If [code]true[/code], enables the specified flag. See [enum Flags] for options. */
set_flag(flag: int, enable: boolean): void;

/** Sets the specified [enum Parameter]. */
set_param(param: int, value: float): void;

/** Sets the randomness ratio for the specified [enum Parameter]. */
set_param_randomness(param: int, randomness: float): void;

/** Sets the [Texture] for the specified [enum Parameter]. */
set_param_texture(param: int, texture: Texture): void;

  connect<T extends SignalsOf<ParticlesMaterial>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set initial velocity properties.
 *
*/
static PARAM_INITIAL_LINEAR_VELOCITY: 0;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set angular velocity properties.
 *
*/
static PARAM_ANGULAR_VELOCITY: 1;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set orbital velocity properties.
 *
*/
static PARAM_ORBIT_VELOCITY: 2;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set linear acceleration properties.
 *
*/
static PARAM_LINEAR_ACCEL: 3;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set radial acceleration properties.
 *
*/
static PARAM_RADIAL_ACCEL: 4;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set tangential acceleration properties.
 *
*/
static PARAM_TANGENTIAL_ACCEL: 5;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set damping properties.
 *
*/
static PARAM_DAMPING: 6;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set angle properties.
 *
*/
static PARAM_ANGLE: 7;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set scale properties.
 *
*/
static PARAM_SCALE: 8;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set hue variation properties.
 *
*/
static PARAM_HUE_VARIATION: 9;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set animation speed properties.
 *
*/
static PARAM_ANIM_SPEED: 10;

/**
 * Use with [method set_param], [method set_param_randomness], and [method set_param_texture] to set animation offset properties.
 *
*/
static PARAM_ANIM_OFFSET: 11;

/**
 * Represents the size of the [enum Parameter] enum.
 *
*/
static PARAM_MAX: 12;

/**
 * Use with [method set_flag] to set [member flag_align_y].
 *
*/
static FLAG_ALIGN_Y_TO_VELOCITY: 0;

/**
 * Use with [method set_flag] to set [member flag_rotate_y].
 *
*/
static FLAG_ROTATE_Y: 1;

/**
 * Use with [method set_flag] to set [member flag_disable_z].
 *
*/
static FLAG_DISABLE_Z: 2;

/**
 * Represents the size of the [enum Flags] enum.
 *
*/
static FLAG_MAX: 3;

/**
 * All particles will be emitted from a single point.
 *
*/
static EMISSION_SHAPE_POINT: 0;

/**
 * Particles will be emitted in the volume of a sphere.
 *
*/
static EMISSION_SHAPE_SPHERE: 1;

/**
 * Particles will be emitted in the volume of a box.
 *
*/
static EMISSION_SHAPE_BOX: 2;

/**
 * Particles will be emitted at a position determined by sampling a random point on the [member emission_point_texture]. Particle color will be modulated by [member emission_color_texture].
 *
*/
static EMISSION_SHAPE_POINTS: 3;

/**
 * Particles will be emitted at a position determined by sampling a random point on the [member emission_point_texture]. Particle velocity and rotation will be set based on [member emission_normal_texture]. Particle color will be modulated by [member emission_color_texture].
 *
*/
static EMISSION_SHAPE_DIRECTED_POINTS: 4;

/**
 * Represents the size of the [enum EmissionShape] enum.
 *
*/
static EMISSION_SHAPE_MAX: 5;


  
}
