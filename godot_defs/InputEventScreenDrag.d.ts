
/**
 * Contains screen drag information. See [method Node._input].
 *
*/
declare class InputEventScreenDrag extends InputEvent {

  
/**
 * Contains screen drag information. See [method Node._input].
 *
*/
  "new"(): InputEventScreenDrag;
  static "new"(): InputEventScreenDrag;



/** The drag event index in the case of a multi-drag event. */
index: int;

/** The drag position. */
position: Vector2;

/** The drag position relative to its start position. */
relative: Vector2;

/** The drag speed. */
speed: Vector2;



  connect<T extends SignalsOf<InputEventScreenDrag>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
