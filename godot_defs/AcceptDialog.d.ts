
/**
 * This dialog is useful for small notifications to the user about an event. It can only be accepted or closed, with the same result.
 *
*/
declare class AcceptDialog extends WindowDialog {

  
/**
 * This dialog is useful for small notifications to the user about an event. It can only be accepted or closed, with the same result.
 *
*/
  "new"(): AcceptDialog;
  static "new"(): AcceptDialog;



/** Sets autowrapping for the text in the dialog. */
dialog_autowrap: boolean;

/**
 * If `true`, the dialog is hidden when the OK button is pressed. You can set it to `false` if you want to do e.g. input validation when receiving the [signal confirmed] signal, and handle hiding the dialog in your own logic.
 *
 * **Note:** Some nodes derived from this class can have a different default value, and potentially their own built-in logic overriding this setting. For example [FileDialog] defaults to `false`, and has its own input validation code that is called when you press OK, which eventually hides the dialog if the input is valid. As such, this property can't be used in [FileDialog] to disable hiding the dialog when pressing OK.
 *
*/
dialog_hide_on_ok: boolean;

/** The text displayed by the dialog. */
dialog_text: string;


/**
 * Adds a button with label `text` and a custom `action` to the dialog and returns the created button. `action` will be passed to the [signal custom_action] signal when pressed.
 *
 * If `true`, `right` will place the button to the right of any sibling buttons.
 *
*/
add_button(text: string, right?: boolean, action?: string): Button;

/** Adds a button with label [code]name[/code] and a cancel action to the dialog and returns the created button. */
add_cancel(name: string): Button;

/** Returns the label used for built-in text. */
get_label(): Label;

/** Returns the OK [Button] instance. */
get_ok(): Button;

/** Registers a [LineEdit] in the dialog. When the enter key is pressed, the dialog will be accepted. */
register_text_enter(line_edit: Node): void;

  connect<T extends SignalsOf<AcceptDialog>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the dialog is accepted, i.e. the OK button is pressed.
 *
*/
confirmed: Signal<() => void>

/**
 * Emitted when a custom button is pressed. See [method add_button].
 *
*/
custom_action: Signal<(action: string) => void>

}
