
/**
*/
declare class CodeEdit extends TextEdit {

  
/**
*/
  "new"(): this;
  static "new"(): this;









/** No documentation provided. */
clear_bookmarked_lines(): void;

/** No documentation provided. */
clear_breakpointed_lines(): void;

/** No documentation provided. */
clear_executing_lines(): void;

/** No documentation provided. */
get_bookmarked_lines(): any[];

/** No documentation provided. */
get_breakpointed_lines(): any[];

/** No documentation provided. */
get_executing_lines(): any[];

/** No documentation provided. */
is_line_bookmarked(line: int): boolean;

/** No documentation provided. */
is_line_breakpointed(line: int): boolean;

/** No documentation provided. */
is_line_executing(line: int): boolean;

/** No documentation provided. */
set_line_as_bookmarked(line: int, bookmarked: boolean): void;

/** No documentation provided. */
set_line_as_breakpoint(line: int, breakpointed: boolean): void;

/** No documentation provided. */
set_line_as_executing(line: int, executing: boolean): void;

  connect<T extends SignalsOf<CodeEdit>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
*/
breakpoint_toggled: Signal<(line: int) => void>

}


 
