
/**
 * 3×3 matrix used for 3D rotation and scale. Almost always used as an orthogonal basis for a Transform.
 *
 * Contains 3 vector fields X, Y and Z as its columns, which are typically interpreted as the local basis vectors of a transformation. For such use, it is composed of a scaling and a rotation matrix, in that order (M = R.S).
 *
 * Can also be accessed as array of 3D vectors. These vectors are normally orthogonal to each other, but are not necessarily normalized (due to scaling).
 *
 * For more information, read the "Matrices and transforms" documentation article.
 *
*/
declare class Basis {

  
/**
 * 3×3 matrix used for 3D rotation and scale. Almost always used as an orthogonal basis for a Transform.
 *
 * Contains 3 vector fields X, Y and Z as its columns, which are typically interpreted as the local basis vectors of a transformation. For such use, it is composed of a scaling and a rotation matrix, in that order (M = R.S).
 *
 * Can also be accessed as array of 3D vectors. These vectors are normally orthogonal to each other, but are not necessarily normalized (due to scaling).
 *
 * For more information, read the "Matrices and transforms" documentation article.
 *
*/

  constructor(from: Quat);
  constructor(from: Vector3);
  constructor(axis: Vector3, phi: float);
  constructor(x_axis: Vector3, y_axis: Vector3, z_axis: Vector3);
  static "new"(): Basis;



/** The basis matrix's X vector (column 0). Equivalent to array index [code]0[/code]. */
x: Vector3;

/** The basis matrix's Y vector (column 1). Equivalent to array index [code]1[/code]. */
y: Vector3;

/** The basis matrix's Z vector (column 2). Equivalent to array index [code]2[/code]. */
z: Vector3;









/**
 * Returns the determinant of the basis matrix. If the basis is uniformly scaled, its determinant is the square of the scale.
 *
 * A negative determinant means the basis has a negative scale. A zero determinant means the basis isn't invertible, and is usually considered invalid.
 *
*/
determinant(): float;

/**
 * Returns the basis's rotation in the form of Euler angles (in the YXZ convention: when decomposing, first Z, then X, and Y last). The returned vector contains the rotation angles in the format (X angle, Y angle, Z angle).
 *
 * Consider using the [method get_rotation_quat] method instead, which returns a [Quat] quaternion instead of Euler angles.
 *
*/
get_euler(): Vector3;

/** This function considers a discretization of rotations into 24 points on unit sphere, lying along the vectors (x,y,z) with each component being either -1, 0, or 1, and returns the index of the point best representing the orientation of the object. It is mainly used by the [GridMap] editor. For further details, refer to the Godot source code. */
get_orthogonal_index(): int;

/** Returns the basis's rotation in the form of a quaternion. See [method get_euler] if you need Euler angles, but keep in mind quaternions should generally be preferred to Euler angles. */
get_rotation_quat(): Quat;

/** Assuming that the matrix is the combination of a rotation and scaling, return the absolute value of scaling factors along each axis. */
get_scale(): Vector3;

/** Returns the inverse of the matrix. */
inverse(): Basis;

/** Returns [code]true[/code] if this basis and [code]b[/code] are approximately equal, by calling [code]is_equal_approx[/code] on each component. */
is_equal_approx(b: Basis, epsilon?: float): boolean;

/** Returns the orthonormalized version of the matrix (useful to call from time to time to avoid rounding error for orthogonal matrices). This performs a Gram-Schmidt orthonormalization on the basis of the matrix. */
orthonormalized(): Basis;

/** Introduce an additional rotation around the given axis by phi (radians). The axis must be a normalized vector. */
rotated(axis: Vector3, phi: float): Basis;

/** Introduce an additional scaling specified by the given 3D scaling factor. */
scaled(scale: Vector3): Basis;

/** Assuming that the matrix is a proper rotation matrix, slerp performs a spherical-linear interpolation with another rotation matrix. */
slerp(b: Basis, t: float): Basis;

/** Transposed dot product with the X axis of the matrix. */
tdotx(_with: Vector3): float;

/** Transposed dot product with the Y axis of the matrix. */
tdoty(_with: Vector3): float;

/** Transposed dot product with the Z axis of the matrix. */
tdotz(_with: Vector3): float;

/** Returns the transposed version of the matrix. */
transposed(): Basis;

/** Returns a vector transformed (multiplied) by the matrix. */
xform(v: Vector3): Vector3;

/**
 * Returns a vector transformed (multiplied) by the transposed basis matrix.
 *
 * **Note:** This results in a multiplication by the inverse of the matrix only if it represents a rotation-reflection.
 *
*/
xform_inv(v: Vector3): Vector3;

  connect<T extends SignalsOf<Basis>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The identity basis, with no rotation or scaling applied.
 *
 * This is identical to calling `Basis()` without any parameters. This constant can be used to make your code clearer, and for consistency with C#.
 *
*/
static IDENTITY: Basis;

/**
 * The basis that will flip something along the X axis when used in a transformation.
 *
*/
static FLIP_X: Basis;

/**
 * The basis that will flip something along the Y axis when used in a transformation.
 *
*/
static FLIP_Y: Basis;

/**
 * The basis that will flip something along the Z axis when used in a transformation.
 *
*/
static FLIP_Z: Basis;


  
}
