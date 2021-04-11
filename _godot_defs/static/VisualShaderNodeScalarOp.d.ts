
/**
*/
declare class VisualShaderNodeScalarOp extends VisualShaderNode {

  
/**
*/
  "new"(): VisualShaderNodeScalarOp;
  static "new"(): VisualShaderNodeScalarOp;






  connect<T extends SignalsOf<VisualShaderNodeScalarOp>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static OP_ADD: 0;

/** No documentation provided. */
static OP_SUB: 1;

/** No documentation provided. */
static OP_MUL: 2;

/** No documentation provided. */
static OP_DIV: 3;

/** No documentation provided. */
static OP_MOD: 4;

/** No documentation provided. */
static OP_POW: 5;

/** No documentation provided. */
static OP_MAX: 6;

/** No documentation provided. */
static OP_MIN: 7;

/** No documentation provided. */
static OP_ATAN2: 8;

/** No documentation provided. */
static OP_STEP: 9;


  
}
