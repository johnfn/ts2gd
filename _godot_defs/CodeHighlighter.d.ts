
/**
*/
declare class CodeHighlighter extends SyntaxHighlighter {

  
/**
*/
  "new"(): this;
  static "new"(): this;










/** No documentation provided. */
add_color_region(p_start_key: String, p_end_key: String, p_color: Color, p_line_only?: boolean): void;

/** No documentation provided. */
add_keyword_color(keyword: String, color: Color): void;

/** No documentation provided. */
add_member_keyword_color(member_keyword: String, color: Color): void;

/** No documentation provided. */
clear_color_regions(): void;

/** No documentation provided. */
clear_keyword_colors(): void;

/** No documentation provided. */
clear_member_keyword_colors(): void;

/** No documentation provided. */
get_keyword_color(keyword: String): Color;

/** No documentation provided. */
get_member_keyword_color(member_keyword: String): Color;

/** No documentation provided. */
has_color_region(p_start_key: String): boolean;

/** No documentation provided. */
has_keyword_color(keyword: String): boolean;

/** No documentation provided. */
has_member_keyword_color(member_keyword: String): boolean;

/** No documentation provided. */
remove_color_region(p_start_key: String): void;

/** No documentation provided. */
remove_keyword_color(keyword: String): void;

/** No documentation provided. */
remove_member_keyword_color(member_keyword: String): void;

  connect<T extends SignalsOf<CodeHighlighter>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
