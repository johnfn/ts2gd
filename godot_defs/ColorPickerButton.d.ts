
/**
 * Encapsulates a [ColorPicker] making it accessible by pressing a button. Pressing the button will toggle the [ColorPicker] visibility.
 *
*/
declare class ColorPickerButton extends Button {

  
/**
 * Encapsulates a [ColorPicker] making it accessible by pressing a button. Pressing the button will toggle the [ColorPicker] visibility.
 *
*/
  "new"(): ColorPickerButton;
  static "new"(): ColorPickerButton;



/** The currently selected color. */
color: Color;

/** If [code]true[/code], the alpha channel in the displayed [ColorPicker] will be visible. */
edit_alpha: boolean;


/** Returns the [ColorPicker] that this node toggles. */
get_picker(): ColorPicker;

/** Returns the control's [PopupPanel] which allows you to connect to popup signals. This allows you to handle events when the ColorPicker is shown or hidden. */
get_popup(): PopupPanel;

  connect<T extends SignalsOf<ColorPickerButton>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the color changes.
 *
*/
color_changed: Signal<(color: Color) => void>

/**
 * Emitted when the [ColorPicker] is created (the button is pressed for the first time).
 *
*/
picker_created: Signal<() => void>

/**
 * Emitted when the [ColorPicker] is closed.
 *
*/
popup_closed: Signal<() => void>

}
