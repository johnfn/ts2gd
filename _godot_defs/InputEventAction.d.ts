
/**
 * Contains a generic action which can be targeted from several types of inputs. Actions can be created from the **Input Map** tab in the **Project > Project Settings** menu. See [method Node._input].
 *
*/
declare class InputEventAction extends InputEvent {

  
/**
 * Contains a generic action which can be targeted from several types of inputs. Actions can be created from the **Input Map** tab in the **Project > Project Settings** menu. See [method Node._input].
 *
*/
  "new"(): InputEventAction;
  static "new"(): InputEventAction;



/** The action's name. Actions are accessed via this [String]. */
action: string;

/** If [code]true[/code], the action's state is pressed. If [code]false[/code], the action's state is released. */
pressed: boolean;

/** The action's strength between 0 and 1. This value is considered as equal to 0 if pressed is [code]false[/code]. The event strength allows faking analog joypad motion events, by precising how strongly is the joypad axis bent or pressed. */
strength: float;



  connect<T extends SignalsOf<InputEventAction>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
