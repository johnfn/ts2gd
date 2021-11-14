
/**
 * Adds a top, left, bottom, and right margin to all [Control] nodes that are direct children of the container. To control the [MarginContainer]'s margin, use the `margin_*` theme properties listed below.
 *
 * **Note:** Be careful, [Control] margin values are different than the constant margin values. If you want to change the custom margin values of the [MarginContainer] by code, you should use the following examples:
 *
 * @example 
 * 
 * # This code sample assumes the current script is extending MarginContainer.
 * var margin_value = 100
 * add_constant_override("margin_top", margin_value)
 * add_constant_override("margin_left", margin_value)
 * add_constant_override("margin_bottom", margin_value)
 * add_constant_override("margin_right", margin_value)
 * @summary 
 * 
 *
*/
declare class MarginContainer extends Container  {

  
/**
 * Adds a top, left, bottom, and right margin to all [Control] nodes that are direct children of the container. To control the [MarginContainer]'s margin, use the `margin_*` theme properties listed below.
 *
 * **Note:** Be careful, [Control] margin values are different than the constant margin values. If you want to change the custom margin values of the [MarginContainer] by code, you should use the following examples:
 *
 * @example 
 * 
 * # This code sample assumes the current script is extending MarginContainer.
 * var margin_value = 100
 * add_constant_override("margin_top", margin_value)
 * add_constant_override("margin_left", margin_value)
 * add_constant_override("margin_bottom", margin_value)
 * add_constant_override("margin_right", margin_value)
 * @summary 
 * 
 *
*/
  new(): MarginContainer; 
  static "new"(): MarginContainer 





  connect<T extends SignalsOf<MarginContainer>>(signal: T, method: SignalFunction<MarginContainer[T]>): number;






}

