
/**
 * 2×3 matrix (2 rows, 3 columns) used for 2D linear transformations. It can represent transformations such as translation, rotation, or scaling. It consists of three [Vector2] values: [member x], [member y], and the [member origin].
 *
 * For more information, read the "Matrices and transforms" documentation article.
 *
*/
declare class Transform2D {

  
/**
 * 2×3 matrix (2 rows, 3 columns) used for 2D linear transformations. It can represent transformations such as translation, rotation, or scaling. It consists of three [Vector2] values: [member x], [member y], and the [member origin].
 *
 * For more information, read the "Matrices and transforms" documentation article.
 *
*/

  new(from: Transform): Transform2D;
  new(x_axis: Vector2, y_axis: Vector2, origin: Vector2): Transform2D;
  new(rotation: float, position: Vector2): Transform2D;
  static "new"(): Transform2D 


/** The origin vector (column 2, the third column). Equivalent to array index [code]2[/code]. The origin vector represents translation. */
origin: Vector2;

/** The basis matrix's X vector (column 0). Equivalent to array index [code]0[/code]. */
x: Vector2;

/** The basis matrix's Y vector (column 1). Equivalent to array index [code]1[/code]. */
y: Vector2;







/** Returns the inverse of the transform, under the assumption that the transformation is composed of rotation, scaling and translation. */
affine_inverse(): Transform2D;

/**
 * Returns a vector transformed (multiplied) by the basis matrix.
 *
 * This method does not account for translation (the origin vector).
 *
*/
basis_xform(v: Vector2): Vector2;

/**
 * Returns a vector transformed (multiplied) by the inverse basis matrix.
 *
 * This method does not account for translation (the origin vector).
 *
*/
basis_xform_inv(v: Vector2): Vector2;

/** Returns the transform's origin (translation). */
get_origin(): Vector2;

/** Returns the transform's rotation (in radians). */
get_rotation(): float;

/** Returns the scale. */
get_scale(): Vector2;

/** Returns a transform interpolated between this transform and another by a given [code]weight[/code] (on the range of 0.0 to 1.0). */
interpolate_with(transform: Transform2D, weight: float): Transform2D;

/** Returns the inverse of the transform, under the assumption that the transformation is composed of rotation and translation (no scaling, use [method affine_inverse] for transforms with scaling). */
inverse(): Transform2D;

/** Returns [code]true[/code] if this transform and [code]transform[/code] are approximately equal, by calling [code]is_equal_approx[/code] on each component. */
is_equal_approx(transform: Transform2D): boolean;

/** Returns the transform with the basis orthogonal (90 degrees), and normalized axis vectors (scale of 1 or -1). */
orthonormalized(): Transform2D;

/** Rotates the transform by the given angle (in radians), using matrix multiplication. */
rotated(phi: float): Transform2D;

/** Scales the transform by the given scale factor, using matrix multiplication. */
scaled(scale: Vector2): Transform2D;

/**
 * Translates the transform by the given offset, relative to the transform's basis vectors.
 *
 * Unlike [method rotated] and [method scaled], this does not use matrix multiplication.
 *
*/
translated(offset: Vector2): Transform2D;

/** Transforms the given [Vector2], [Rect2], or [PoolVector2Array] by this transform. */
xform(v: any): any;

/** Inverse-transforms the given [Vector2], [Rect2], or [PoolVector2Array] by this transform. */
xform_inv(v: any): any;

  connect<T extends SignalsOf<Transform2D>>(signal: T, method: SignalFunction<Transform2D[T]>): number;



/**
 * The identity [Transform2D] with no translation, rotation or scaling applied. When applied to other data structures, [constant IDENTITY] performs no transformation.
 *
*/
static IDENTITY: Transform2D;

/**
 * The [Transform2D] that will flip something along the X axis.
 *
*/
static FLIP_X: Transform2D;

/**
 * The [Transform2D] that will flip something along the Y axis.
 *
*/
static FLIP_Y: Transform2D;



}

