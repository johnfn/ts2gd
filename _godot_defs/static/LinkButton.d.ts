
/**
 * This kind of button is primarily used when the interaction with the button causes a context change (like linking to a web page).
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
*/
declare class LinkButton extends BaseButton  {

  
/**
 * This kind of button is primarily used when the interaction with the button causes a context change (like linking to a web page).
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
*/
  new(): LinkButton; 
  static "new"(): LinkButton 




/** The button's text that will be displayed inside the button's area. */
text: string;

/** Determines when to show the underline. See [enum UnderlineMode] for options. */
underline: int;



  connect<T extends SignalsOf<LinkButton>>(signal: T, method: SignalFunction<LinkButton[T]>): number;



/**
 * The LinkButton will always show an underline at the bottom of its text.
 *
*/
static UNDERLINE_MODE_ALWAYS: any;

/**
 * The LinkButton will show an underline at the bottom of its text when the mouse cursor is over it.
 *
*/
static UNDERLINE_MODE_ON_HOVER: any;

/**
 * The LinkButton will never show an underline at the bottom of its text.
 *
*/
static UNDERLINE_MODE_NEVER: any;



}

