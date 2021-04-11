
/**
 * A checkbox allows the user to make a binary choice (choosing only one of two possible options). It's similar to [CheckButton] in functionality, but it has a different apperance. To follow established UX patterns, it's recommended to use CheckBox when toggling it has **no** immediate effect on something. For instance, it should be used when toggling it will only do something once a confirmation button is pressed.
 *
*/
declare class CheckBox extends Button {

  
/**
 * A checkbox allows the user to make a binary choice (choosing only one of two possible options). It's similar to [CheckButton] in functionality, but it has a different apperance. To follow established UX patterns, it's recommended to use CheckBox when toggling it has **no** immediate effect on something. For instance, it should be used when toggling it will only do something once a confirmation button is pressed.
 *
*/
  "new"(): CheckBox;
  static "new"(): CheckBox;







  connect<T extends SignalsOf<CheckBox>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
