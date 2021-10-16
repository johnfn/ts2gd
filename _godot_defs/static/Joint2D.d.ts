
/**
 * Base node for all joint constraints in 2D physics. Joints take 2 bodies and apply a custom constraint.
 *
*/
declare class Joint2D extends Node2D {

  
/**
 * Base node for all joint constraints in 2D physics. Joints take 2 bodies and apply a custom constraint.
 *
*/
  "new"(): Joint2D;
  static "new"(): Joint2D;



/** When [member node_a] and [member node_b] move in different directions the [code]bias[/code] controls how fast the joint pulls them back to their original position. The lower the [code]bias[/code] the more the two bodies can pull on the joint. */
bias: float;

/** If [code]true[/code], [member node_a] and [member node_b] can not collide. */
disable_collision: boolean;

/** The first body attached to the joint. Must derive from [PhysicsBody2D]. */
node_a: NodePathType;

/** The second body attached to the joint. Must derive from [PhysicsBody2D]. */
node_b: NodePathType;



  // connect<T extends SignalsOf<Joint2D>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<Joint2DSignals>>(signal: T, method: SignalFunction<Joint2DSignals[T]>): number;




}

declare class Joint2DSignals extends Node2DSignals {
  
}
