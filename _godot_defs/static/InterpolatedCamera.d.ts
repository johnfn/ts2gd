
/**
 * **Deprecated (will be removed in Godot 4.0).** InterpolatedCamera is a [Camera] which smoothly moves to match a target node's position and rotation.
 *
 * If it is not [member enabled] or does not have a valid target set, InterpolatedCamera acts like a normal Camera.
 *
*/
declare class InterpolatedCamera extends Camera  {

  
/**
 * **Deprecated (will be removed in Godot 4.0).** InterpolatedCamera is a [Camera] which smoothly moves to match a target node's position and rotation.
 *
 * If it is not [member enabled] or does not have a valid target set, InterpolatedCamera acts like a normal Camera.
 *
*/
  new(): InterpolatedCamera; 
  static "new"(): InterpolatedCamera 


/** If [code]true[/code], and a target is set, the camera will move automatically. */
enabled: boolean;

/** How quickly the camera moves toward its target. Higher values will result in tighter camera motion. */
speed: float;

/** The target's [NodePath]. */
target: NodePathType;

/** Sets the node to move toward and orient with. */
set_target(target: Object): void;

  connect<T extends SignalsOf<InterpolatedCamera>>(signal: T, method: SignalFunction<InterpolatedCamera[T]>): number;






}

