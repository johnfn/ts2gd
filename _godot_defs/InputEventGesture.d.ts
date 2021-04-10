
/**
*/
declare class InputEventGesture extends InputEventWithModifiers {

  
/**
*/
  "new"(): InputEventGesture;
  static "new"(): InputEventGesture;



/** The local gesture position relative to the [Viewport]. If used in [method Control._gui_input], the position is relative to the current [Control] that received this gesture. */
position: Vector2;



  connect<T extends SignalsOf<InputEventGesture>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
