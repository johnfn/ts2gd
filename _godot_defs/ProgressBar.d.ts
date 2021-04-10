
/**
 * General-purpose progress bar. Shows fill percentage from right to left.
 *
*/
declare class ProgressBar extends Range {

  
/**
 * General-purpose progress bar. Shows fill percentage from right to left.
 *
*/
  "new"(): ProgressBar;
  static "new"(): ProgressBar;



/** If [code]true[/code], the fill percentage is displayed on the bar. */
percent_visible: boolean;





  connect<T extends SignalsOf<ProgressBar>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
