
/**
 * Displays a color picker widget. Useful for selecting a color from an RGB/RGBA colorspace.
 *
 * **Note:** This control is the color picker widget itself. You can use a [ColorPickerButton] instead if you need a button that brings up a [ColorPicker] in a pop-up.
 *
*/
declare class ColorPicker extends BoxContainer  {

  
/**
 * Displays a color picker widget. Useful for selecting a color from an RGB/RGBA colorspace.
 *
 * **Note:** This control is the color picker widget itself. You can use a [ColorPickerButton] instead if you need a button that brings up a [ColorPicker] in a pop-up.
 *
*/
  new(): ColorPicker; 
  static "new"(): ColorPicker 


/** The currently selected color. */
color: Color;

/** If [code]true[/code], the color will apply only after the user releases the mouse button, otherwise it will apply immediately even in mouse motion event (which can cause performance issues). */
deferred_mode: boolean;

/** If [code]true[/code], shows an alpha channel slider (transparency). */
edit_alpha: boolean;

/**
 * If `true`, allows editing the color with Hue/Saturation/Value sliders.
 *
 * **Note:** Cannot be enabled if raw mode is on.
 *
*/
hsv_mode: boolean;

/** If [code]true[/code], the "add preset" button is enabled. */
presets_enabled: boolean;

/** If [code]true[/code], saved color presets are visible. */
presets_visible: boolean;

/**
 * If `true`, allows the color R, G, B component values to go beyond 1.0, which can be used for certain special operations that require it (like tinting without darkening or rendering sprites in HDR).
 *
 * **Note:** Cannot be enabled if HSV mode is on.
 *
*/
raw_mode: boolean;

/**
 * Adds the given color to a list of color presets. The presets are displayed in the color picker and the user will be able to select them.
 *
 * **Note:** The presets list is only for **this** color picker.
 *
*/
add_preset(color: Color): void;

/** Removes the given color from the list of color presets of this color picker. */
erase_preset(color: Color): void;

/** Returns the list of colors in the presets of the color picker. */
get_presets(): PoolColorArray;

  connect<T extends SignalsOf<ColorPicker>>(signal: T, method: SignalFunction<ColorPicker[T]>): number;





/**
 * Emitted when the color is changed.
 *
*/
$color_changed: Signal<(color: Color) => void>

/**
 * Emitted when a preset is added.
 *
*/
$preset_added: Signal<(color: Color) => void>

/**
 * Emitted when a preset is removed.
 *
*/
$preset_removed: Signal<(color: Color) => void>

}

