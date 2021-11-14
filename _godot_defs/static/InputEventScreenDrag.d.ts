
/**
 * Contains screen drag information. See [method Node._input].
 *
*/
declare class InputEventScreenDrag extends InputEvent  {

  
/**
 * Contains screen drag information. See [method Node._input].
 *
*/
  new(): InputEventScreenDrag; 
  static "new"(): InputEventScreenDrag 


/** The drag event index in the case of a multi-drag event. */
index: int;

/** The drag position. */
position: Vector2;

/** The drag position relative to the previous position (position at the last frame). */
relative: Vector2;

/** The drag speed. */
speed: Vector2;



  connect<T extends SignalsOf<InputEventScreenDrag>>(signal: T, method: SignalFunction<InputEventScreenDrag[T]>): number;






}

