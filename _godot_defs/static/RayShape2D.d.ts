
/**
 * Ray shape for 2D collisions. A ray is not really a collision body; instead, it tries to separate itself from whatever is touching its far endpoint. It's often useful for characters.
 *
*/
declare class RayShape2D extends Shape2D  {

  
/**
 * Ray shape for 2D collisions. A ray is not really a collision body; instead, it tries to separate itself from whatever is touching its far endpoint. It's often useful for characters.
 *
*/
  new(): RayShape2D; 
  static "new"(): RayShape2D 


/** The ray's length. */
length: float;

/** If [code]true[/code], allow the shape to return the correct normal. */
slips_on_slope: boolean;



  connect<T extends SignalsOf<RayShape2D>>(signal: T, method: SignalFunction<RayShape2D[T]>): number;






}

