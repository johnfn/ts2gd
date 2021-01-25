
/**
 * Optimized translation. Uses real-time compressed translations, which results in very small dictionaries.
 *
*/
declare class PHashTranslation extends Translation {

  
/**
 * Optimized translation. Uses real-time compressed translations, which results in very small dictionaries.
 *
*/
  "new"(): PHashTranslation;
  static "new"(): PHashTranslation;




/** Generates and sets an optimized translation from the given [Translation] resource. */
generate(from: Translation): void;

  connect<T extends SignalsOf<PHashTranslation>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
