
/**
 * Base class for all 3D shape resources. Nodes that inherit from this can be used as shapes for a [PhysicsBody] or [Area] objects.
 *
*/
declare class Shape extends Resource  {

  
/**
 * Base class for all 3D shape resources. Nodes that inherit from this can be used as shapes for a [PhysicsBody] or [Area] objects.
 *
*/
  new(): Shape; 
  static "new"(): Shape 


/**
 * The collision margin for the shape. Used in Bullet Physics only.
 *
 * Collision margins allow collision detection to be more efficient by adding an extra shell around shapes. Collision algorithms are more expensive when objects overlap by more than their margin, so a higher value for margins is better for performance, at the cost of accuracy around edges as it makes them less sharp.
 *
*/
margin: float;

/** Returns the [ArrayMesh] used to draw the debug collision for this [Shape]. */
get_debug_mesh(): ArrayMesh;

  connect<T extends SignalsOf<Shape>>(signal: T, method: SignalFunction<Shape[T]>): number;






}

