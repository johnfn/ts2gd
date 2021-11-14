
/**
 * Encapsulates a [ColorPicker] making it accessible by pressing a button. Pressing the button will toggle the [ColorPicker] visibility.
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
 * **Note:** By default, the button may not be wide enough for the color preview swatch to be visible. Make sure to set [member Control.rect_min_size] to a big enough value to give the button enough space.
 *
*/
declare class ColorPickerButton extends Button  {

  
/**
 * Encapsulates a [ColorPicker] making it accessible by pressing a button. Pressing the button will toggle the [ColorPicker] visibility.
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
 * **Note:** By default, the button may not be wide enough for the color preview swatch to be visible. Make sure to set [member Control.rect_min_size] to a big enough value to give the button enough space.
 *
*/
  new(): ColorPickerButton; 
  static "new"(): ColorPickerButton 


/** The currently selected color. */
color: Color;

/** If [code]true[/code], the alpha channel in the displayed [ColorPicker] will be visible. */
edit_alpha: boolean;


/**
 * Returns the [ColorPicker] that this node toggles.
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_picker(): ColorPicker;

/**
 * Returns the control's [PopupPanel] which allows you to connect to popup signals. This allows you to handle events when the ColorPicker is shown or hidden.
 *
 * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
 *
*/
get_popup(): PopupPanel;

  connect<T extends SignalsOf<ColorPickerButton>>(signal: T, method: SignalFunction<ColorPickerButton[T]>): number;





/**
 * Emitted when the color changes.
 *
*/
$color_changed: Signal<(color: Color) => void>

/**
 * Emitted when the [ColorPicker] is created (the button is pressed for the first time).
 *
*/
$picker_created: Signal<() => void>

/**
 * Emitted when the [ColorPicker] is closed.
 *
*/
$popup_closed: Signal<() => void>

}

