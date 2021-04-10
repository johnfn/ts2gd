
/**
 * Compares `a` and `b` of [member type] by [member function]. Returns a boolean scalar. Translates to `if` instruction in shader code.
 *
*/
declare class VisualShaderNodeCompare extends VisualShaderNode {

  
/**
 * Compares `a` and `b` of [member type] by [member function]. Returns a boolean scalar. Translates to `if` instruction in shader code.
 *
*/
  "new"(): VisualShaderNodeCompare;
  static "new"(): VisualShaderNodeCompare;



/** Extra condition which is applied if [member type] is set to [constant CTYPE_VECTOR]. */
condition: int;

/** A comparison function. See [enum Function] for options. */
function: int;

/** The type to be used in the comparison. See [enum ComparisonType] for options. */
type: int;



  connect<T extends SignalsOf<VisualShaderNodeCompare>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * A floating-point scalar.
 *
*/
static CTYPE_SCALAR: 0;

/**
 * A 3D vector type.
 *
*/
static CTYPE_VECTOR: 1;

/**
 * A boolean type.
 *
*/
static CTYPE_BOOLEAN: 2;

/**
 * A transform (`mat4`) type.
 *
*/
static CTYPE_TRANSFORM: 3;

/**
 * Comparison for equality (`a == b`).
 *
*/
static FUNC_EQUAL: 0;

/**
 * Comparison for inequality (`a != b`).
 *
*/
static FUNC_NOT_EQUAL: 1;

/**
 * Comparison for greater than (`a > b`). Cannot be used if [member type] set to [constant CTYPE_BOOLEAN] or [constant CTYPE_TRANSFORM].
 *
*/
static FUNC_GREATER_THAN: 2;

/**
 * Comparison for greater than or equal (`a >= b`). Cannot be used if [member type] set to [constant CTYPE_BOOLEAN] or [constant CTYPE_TRANSFORM].
 *
*/
static FUNC_GREATER_THAN_EQUAL: 3;

/**
 * Comparison for less than (`a < b`). Cannot be used if [member type] set to [constant CTYPE_BOOLEAN] or [constant CTYPE_TRANSFORM].
 *
*/
static FUNC_LESS_THAN: 4;

/**
 * Comparison for less than or equal (`a < b`). Cannot be used if [member type] set to [constant CTYPE_BOOLEAN] or [constant CTYPE_TRANSFORM].
 *
*/
static FUNC_LESS_THAN_EQUAL: 5;

/**
 * The result will be true if all of component in vector satisfy the comparison condition.
 *
*/
static COND_ALL: 0;

/**
 * The result will be true if any of component in vector satisfy the comparison condition.
 *
*/
static COND_ANY: 1;


  
}
