
/**
*/
declare class VisualShaderNodeScalarOp extends VisualShaderNode {

  
/**
*/
  "new"(): VisualShaderNodeScalarOp;
  static "new"(): VisualShaderNodeScalarOp;






  // connect<T extends SignalsOf<VisualShaderNodeScalarOp>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<VisualShaderNodeScalarOpSignals>>(signal: T, method: SignalFunction<VisualShaderNodeScalarOpSignals[T]>): number;



/** No documentation provided. */
static OP_ADD: any;

/** No documentation provided. */
static OP_SUB: any;

/** No documentation provided. */
static OP_MUL: any;

/** No documentation provided. */
static OP_DIV: any;

/** No documentation provided. */
static OP_MOD: any;

/** No documentation provided. */
static OP_POW: any;

/** No documentation provided. */
static OP_MAX: any;

/** No documentation provided. */
static OP_MIN: any;

/** No documentation provided. */
static OP_ATAN2: any;

/** No documentation provided. */
static OP_STEP: any;

}

declare class VisualShaderNodeScalarOpSignals extends VisualShaderNodeSignals {
  
}
