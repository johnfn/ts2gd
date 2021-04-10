
/**
*/
declare class SyntaxHighlighter extends Resource {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
protected _get_line_syntax_highlighting(p_line: int): Dictionary;

/** No documentation provided. */
protected _update_cache(): void;

/** No documentation provided. */
clear_highlighting_cache(): void;

/** No documentation provided. */
get_line_syntax_highlighting(p_line: int): Dictionary;

/** No documentation provided. */
get_text_edit(): TextEdit;

/** No documentation provided. */
update_cache(): void;

  connect<T extends SignalsOf<SyntaxHighlighter>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
