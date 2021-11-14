
/**
 * Line shape for 2D collisions. It works like a 2D plane and will not allow any physics body to go to the negative side. Not recommended for rigid bodies, and usually not recommended for static bodies either because it forces checks against it on every frame.
 *
*/
declare class LineShape2D extends Shape2D  {

  
/**
 * Line shape for 2D collisions. It works like a 2D plane and will not allow any physics body to go to the negative side. Not recommended for rigid bodies, and usually not recommended for static bodies either because it forces checks against it on every frame.
 *
*/
  new(): LineShape2D; 
  static "new"(): LineShape2D 


/** The line's distance from the origin. */
d: float;

/** The line's normal. */
normal: Vector2;



  connect<T extends SignalsOf<LineShape2D>>(signal: T, method: SignalFunction<LineShape2D[T]>): number;






}

