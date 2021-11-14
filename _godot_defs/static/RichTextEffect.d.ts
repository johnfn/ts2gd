
/**
 * A custom effect for use with [RichTextLabel].
 *
 * **Note:** For a [RichTextEffect] to be usable, a BBCode tag must be defined as a member variable called `bbcode` in the script.
 *
 * @example 
 * 
 * # The RichTextEffect will be usable like this: `[example]Some text[/example]`
 * var bbcode = "example"
 * @summary 
 * 
 *
 * **Note:** As soon as a [RichTextLabel] contains at least one [RichTextEffect], it will continuously process the effect unless the project is paused. This may impact battery life negatively.
 *
*/
declare class RichTextEffect extends Resource  {

  
/**
 * A custom effect for use with [RichTextLabel].
 *
 * **Note:** For a [RichTextEffect] to be usable, a BBCode tag must be defined as a member variable called `bbcode` in the script.
 *
 * @example 
 * 
 * # The RichTextEffect will be usable like this: `[example]Some text[/example]`
 * var bbcode = "example"
 * @summary 
 * 
 *
 * **Note:** As soon as a [RichTextLabel] contains at least one [RichTextEffect], it will continuously process the effect unless the project is paused. This may impact battery life negatively.
 *
*/
  new(): RichTextEffect; 
  static "new"(): RichTextEffect 



/** Override this method to modify properties in [code]char_fx[/code]. The method must return [code]true[/code] if the character could be transformed successfully. If the method returns [code]false[/code], it will skip transformation to avoid displaying broken text. */
protected _process_custom_fx(char_fx: CharFXTransform): boolean;

  connect<T extends SignalsOf<RichTextEffect>>(signal: T, method: SignalFunction<RichTextEffect[T]>): number;






}

