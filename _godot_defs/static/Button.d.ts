
/**
 * Button is the standard themed button. It can contain text and an icon, and will display them according to the current [Theme].
 *
 * **Example of creating a button and assigning an action when pressed by code:**
 *
 * @example 
 * 
 * func _ready():
 *     var button = Button.new()
 *     button.text = "Click me"
 *     button.connect("pressed", self, "_button_pressed")
 *     add_child(button)
 * func _button_pressed():
 *     print("Hello world!")
 * @summary 
 * 
 *
 * Buttons (like all Control nodes) can also be created in the editor, but some situations may require creating them from code.
 *
*/
declare class Button extends BaseButton {

  
/**
 * Button is the standard themed button. It can contain text and an icon, and will display them according to the current [Theme].
 *
 * **Example of creating a button and assigning an action when pressed by code:**
 *
 * @example 
 * 
 * func _ready():
 *     var button = Button.new()
 *     button.text = "Click me"
 *     button.connect("pressed", self, "_button_pressed")
 *     add_child(button)
 * func _button_pressed():
 *     print("Hello world!")
 * @summary 
 * 
 *
 * Buttons (like all Control nodes) can also be created in the editor, but some situations may require creating them from code.
 *
*/
  "new"(): Button;
  static "new"(): Button;



/** Text alignment policy for the button's text, use one of the [enum TextAlign] constants. */
align: int;

/** When this property is enabled, text that is too large to fit the button is clipped, when disabled the Button will always be wide enough to hold the text. */
clip_text: boolean;

/** When enabled, the button's icon will expand/shrink to fit the button's size while keeping its aspect. */
expand_icon: boolean;

/** Flat buttons don't display decoration. */
flat: boolean;

/** Button's icon, if text is present the icon will be placed before the text. */
icon: Texture;

/** The button's text that will be displayed inside the button's area. */
text: string;



  connect<T extends SignalsOf<Button>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Align the text to the left.
 *
*/
static ALIGN_LEFT: 0;

/**
 * Align the text to the center.
 *
*/
static ALIGN_CENTER: 1;

/**
 * Align the text to the right.
 *
*/
static ALIGN_RIGHT: 2;


  
}
