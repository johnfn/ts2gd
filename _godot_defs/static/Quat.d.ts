
/**
 * A unit quaternion used for representing 3D rotations. Quaternions need to be normalized to be used for rotation.
 *
 * It is similar to Basis, which implements matrix representation of rotations, and can be parametrized using both an axis-angle pair or Euler angles. Basis stores rotation, scale, and shearing, while Quat only stores rotation.
 *
 * Due to its compactness and the way it is stored in memory, certain operations (obtaining axis-angle and performing SLERP, in particular) are more efficient and robust against floating-point errors.
 *
*/
declare class Quat {

  
/**
 * A unit quaternion used for representing 3D rotations. Quaternions need to be normalized to be used for rotation.
 *
 * It is similar to Basis, which implements matrix representation of rotations, and can be parametrized using both an axis-angle pair or Euler angles. Basis stores rotation, scale, and shearing, while Quat only stores rotation.
 *
 * Due to its compactness and the way it is stored in memory, certain operations (obtaining axis-angle and performing SLERP, in particular) are more efficient and robust against floating-point errors.
 *
*/

  new(from: Basis): Quat;
  new(euler: Vector3): Quat;
  new(axis: Vector3, angle: float): Quat;
  new(x: float, y: float, z: float, w: float): Quat;
  static "new"(): Quat 


/**
 * W component of the quaternion (real part).
 *
 * Quaternion components should usually not be manipulated directly.
 *
*/
w: float;

/**
 * X component of the quaternion (imaginary `i` axis part).
 *
 * Quaternion components should usually not be manipulated directly.
 *
*/
x: float;

/**
 * Y component of the quaternion (imaginary `j` axis part).
 *
 * Quaternion components should usually not be manipulated directly.
 *
*/
y: float;

/**
 * Z component of the quaternion (imaginary `k` axis part).
 *
 * Quaternion components should usually not be manipulated directly.
 *
*/
z: float;









/**
 * Returns the angle between this quaternion and `to`. This is the magnitude of the angle you would need to rotate by to get from one to the other.
 *
 * **Note:** This method has an abnormally high amount of floating-point error, so methods such as [method @GDScript.is_zero_approx] will not work reliably.
 *
*/
angle_to(to: Quat): float;

/** Performs a cubic spherical interpolation between quaternions [code]pre_a[/code], this vector, [code]b[/code], and [code]post_b[/code], by the given amount [code]weight[/code]. */
cubic_slerp(b: Quat, pre_a: Quat, post_b: Quat, weight: float): Quat;

/** Returns the dot product of two quaternions. */
dot(b: Quat): float;

/** Returns Euler angles (in the YXZ convention: when decomposing, first Z, then X, and Y last) corresponding to the rotation represented by the unit quaternion. Returned vector contains the rotation angles in the format (X angle, Y angle, Z angle). */
get_euler(): Vector3;

/** Returns the inverse of the quaternion. */
inverse(): Quat;

/** Returns [code]true[/code] if this quaternion and [code]quat[/code] are approximately equal, by running [method @GDScript.is_equal_approx] on each component. */
is_equal_approx(quat: Quat): boolean;

/** Returns whether the quaternion is normalized or not. */
is_normalized(): boolean;

/** Returns the length of the quaternion. */
length(): float;

/** Returns the length of the quaternion, squared. */
length_squared(): float;

/** Returns a copy of the quaternion, normalized to unit length. */
normalized(): Quat;

/** Sets the quaternion to a rotation which rotates around axis by the specified angle, in radians. The axis must be a normalized vector. */
set_axis_angle(axis: Vector3, angle: float): any;

/** Sets the quaternion to a rotation specified by Euler angles (in the YXZ convention: when decomposing, first Z, then X, and Y last), given in the vector format as (X angle, Y angle, Z angle). */
set_euler(euler: Vector3): any;

/**
 * Returns the result of the spherical linear interpolation between this quaternion and `to` by amount `weight`.
 *
 * **Note:** Both quaternions must be normalized.
 *
*/
slerp(to: Quat, weight: float): Quat;

/** Returns the result of the spherical linear interpolation between this quaternion and [code]to[/code] by amount [code]weight[/code], but without checking if the rotation path is not bigger than 90 degrees. */
slerpni(to: Quat, weight: float): Quat;

/** Returns a vector transformed (multiplied) by this quaternion. */
xform(v: Vector3): Vector3;

  connect<T extends SignalsOf<Quat>>(signal: T, method: SignalFunction<Quat[T]>): number;



/**
 * The identity quaternion, representing no rotation. Equivalent to an identity [Basis] matrix. If a vector is transformed by an identity quaternion, it will not change.
 *
*/
static IDENTITY: Quat;



}

