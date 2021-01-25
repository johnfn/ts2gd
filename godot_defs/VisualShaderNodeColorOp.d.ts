
/**
 * Applies [member operator] to two color inputs.
 *
*/
declare class VisualShaderNodeColorOp extends VisualShaderNode {

  
/**
 * Applies [member operator] to two color inputs.
 *
*/
  "new"(): VisualShaderNodeColorOp;
  static "new"(): VisualShaderNodeColorOp;



/** An operator to be applied to the inputs. See [enum Operator] for options. */
operator: int;



  connect<T extends SignalsOf<VisualShaderNodeColorOp>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Produce a screen effect with the following formula:
 *
 * @example 
 * 
 * result = vec3(1.0) - (vec3(1.0) - a) * (vec3(1.0) - b);
 * @summary 
 * 
 *
*/
static OP_SCREEN: 0;

/**
 * Produce a difference effect with the following formula:
 *
 * @example 
 * 
 * result = abs(a - b);
 * @summary 
 * 
 *
*/
static OP_DIFFERENCE: 1;

/**
 * Produce a darken effect with the following formula:
 *
 * @example 
 * 
 * result = min(a, b);
 * @summary 
 * 
 *
*/
static OP_DARKEN: 2;

/**
 * Produce a lighten effect with the following formula:
 *
 * @example 
 * 
 * result = max(a, b);
 * @summary 
 * 
 *
*/
static OP_LIGHTEN: 3;

/**
 * Produce an overlay effect with the following formula:
 *
 * @example 
 * 
 * for (int i = 0; i < 3; i++) {
 *     float base = a**;
 *     float blend = b**;
 *     if (base < 0.5) {
 *         result** = 2.0 * base * blend;
 *     } else {
 *         result** = 1.0 - 2.0 * (1.0 - blend) * (1.0 - base);
 *     }
 * }
 * @summary 
 * 
 *
*/
static OP_OVERLAY: 4;

/**
 * Produce a dodge effect with the following formula:
 *
 * @example 
 * 
 * result = a / (vec3(1.0) - b);
 * @summary 
 * 
 *
*/
static OP_DODGE: 5;

/**
 * Produce a burn effect with the following formula:
 *
 * @example 
 * 
 * result = vec3(1.0) - (vec3(1.0) - a) / b;
 * @summary 
 * 
 *
*/
static OP_BURN: 6;

/**
 * Produce a soft light effect with the following formula:
 *
 * @example 
 * 
 * for (int i = 0; i < 3; i++) {
 *     float base = a**;
 *     float blend = b**;
 *     if (base < 0.5) {
 *         result** = base * (blend + 0.5);
 *     } else {
 *         result** = 1.0 - (1.0 - base) * (1.0 - (blend - 0.5));
 *     }
 * }
 * @summary 
 * 
 *
*/
static OP_SOFT_LIGHT: 7;

/**
 * Produce a hard light effect with the following formula:
 *
 * @example 
 * 
 * for (int i = 0; i < 3; i++) {
 *     float base = a**;
 *     float blend = b**;
 *     if (base < 0.5) {
 *         result** = base * (2.0 * blend);
 *     } else {
 *         result** = 1.0 - (1.0 - base) * (1.0 - 2.0 * (blend - 0.5));
 *     }
 * }
 * @summary 
 * 
 *
*/
static OP_HARD_LIGHT: 8;


  
}
