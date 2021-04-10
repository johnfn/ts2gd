
/**
*/
declare class ScriptEditorBase extends VBoxContainer {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
add_syntax_highlighter(highlighter: Object): void;

  connect<T extends SignalsOf<ScriptEditorBase>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
*/
edited_script_changed: Signal<() => void>

/**
*/
go_to_help: Signal<(what: String) => void>

/**
*/
name_changed: Signal<() => void>

/**
*/
replace_in_files_requested: Signal<(text: String) => void>

/**
*/
request_help: Signal<(topic: String) => void>

/**
*/
request_open_script_at_line: Signal<(script: Object, line: int) => void>

/**
*/
request_save_history: Signal<() => void>

/**
*/
search_in_files_requested: Signal<(text: String) => void>

}


 
