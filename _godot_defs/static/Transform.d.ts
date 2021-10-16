
/**
 * 3×4 matrix (3 rows, 4 columns) used for 3D linear transformations. It can represent transformations such as translation, rotation, or scaling. It consists of a [member basis] (first 3 columns) and a [Vector3] for the [member origin] (last column).
 *
 * For more information, read the "Matrices and transforms" documentation article.
 *
*/
declare class Transform {

  
/**
 * 3×4 matrix (3 rows, 4 columns) used for 3D linear transformations. It can represent transformations such as translation, rotation, or scaling. It consists of a [member basis] (first 3 columns) and a [Vector3] for the [member origin] (last column).
 *
 * For more information, read the "Matrices and transforms" documentation article.
 *
*/

  constructor(x_axis: Vector3, y_axis: Vector3, z_axis: Vector3, origin: Vector3);
  constructor(basis: Basis, origin: Vector3);
  constructor(from: Transform2D);
  constructor(from: Quat);
  constructor(from: Basis);
  static "new"(): Transform;



/** The basis is a matrix containing 3 [Vector3] as its columns: X axis, Y axis, and Z axis. These vectors can be interpreted as the basis vectors of local coordinate system traveling with the object. */
basis: Basis;

/** The translation offset of the transform (column 3, the fourth column). Equivalent to array index [code]3[/code]. */
origin: Vector3;











/** Returns the inverse of the transform, under the assumption that the transformation is composed of rotation, scaling and translation. */
affine_inverse(): Transform;

/** Interpolates the transform to other Transform by weight amount (on the range of 0.0 to 1.0). */
interpolate_with(transform: Transform, weight: float): Transform;

/** Returns the inverse of the transform, under the assumption that the transformation is composed of rotation and translation (no scaling, use affine_inverse for transforms with scaling). */
inverse(): Transform;

/** Returns [code]true[/code] if this transform and [code]transform[/code] are approximately equal, by calling [code]is_equal_approx[/code] on each component. */
is_equal_approx(transform: Transform): boolean;

/**
 * Returns a copy of the transform rotated such that its -Z axis points towards the `target` position.
 *
 * The transform will first be rotated around the given `up` vector, and then fully aligned to the target by a further rotation around an axis perpendicular to both the `target` and `up` vectors.
 *
 * Operations take place in global space.
 *
*/
looking_at(target: Vector3, up: Vector3): Transform;

/** Returns the transform with the basis orthogonal (90 degrees), and normalized axis vectors. */
orthonormalized(): Transform;

/** Rotates the transform around the given axis by the given angle (in radians), using matrix multiplication. The axis must be a normalized vector. */
rotated(axis: Vector3, phi: float): Transform;

/** Scales basis and origin of the transform by the given scale factor, using matrix multiplication. */
scaled(scale: Vector3): Transform;

/**
 * Translates the transform by the given offset, relative to the transform's basis vectors.
 *
 * Unlike [method rotated] and [method scaled], this does not use matrix multiplication.
 *
*/
translated(offset: Vector3): Transform;

/** Transforms the given [Vector3], [Plane], [AABB], or [PoolVector3Array] by this transform. */
xform(v: any): any;

/** Inverse-transforms the given [Vector3], [Plane], [AABB], or [PoolVector3Array] by this transform. */
xform_inv(v: any): any;

  // connect<T extends SignalsOf<Transform>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TransformSignals>>(signal: T, method: SignalFunction<TransformSignals[T]>): number;



/**
 * [Transform] with no translation, rotation or scaling applied. When applied to other data structures, [constant IDENTITY] performs no transformation.
 *
*/
static IDENTITY: Transform;

/**
 * [Transform] with mirroring applied perpendicular to the YZ plane.
 *
*/
static FLIP_X: Transform;

/**
 * [Transform] with mirroring applied perpendicular to the XZ plane.
 *
*/
static FLIP_Y: Transform;

/**
 * [Transform] with mirroring applied perpendicular to the XY plane.
 *
*/
static FLIP_Z: Transform;

}

declare class TransformSignals {
  
}
