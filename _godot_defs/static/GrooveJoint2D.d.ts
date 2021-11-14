
/**
 * Groove constraint for 2D physics. This is useful for making a body "slide" through a segment placed in another.
 *
*/
declare class GrooveJoint2D extends Joint2D  {

  
/**
 * Groove constraint for 2D physics. This is useful for making a body "slide" through a segment placed in another.
 *
*/
  new(): GrooveJoint2D; 
  static "new"(): GrooveJoint2D 


/** The body B's initial anchor position defined by the joint's origin and a local offset [member initial_offset] along the joint's Y axis (along the groove). */
initial_offset: float;

/** The groove's length. The groove is from the joint's origin towards [member length] along the joint's local Y axis. */
length: float;



  connect<T extends SignalsOf<GrooveJoint2D>>(signal: T, method: SignalFunction<GrooveJoint2D[T]>): number;






}

