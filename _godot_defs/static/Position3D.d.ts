
/**
 * Generic 3D position hint for editing. It's just like a plain [Spatial], but it displays as a cross in the 3D editor at all times.
 *
*/
declare class Position3D extends Spatial  {

  
/**
 * Generic 3D position hint for editing. It's just like a plain [Spatial], but it displays as a cross in the 3D editor at all times.
 *
*/
  new(): Position3D; 
  static "new"(): Position3D 





  connect<T extends SignalsOf<Position3D>>(signal: T, method: SignalFunction<Position3D[T]>): number;






}

