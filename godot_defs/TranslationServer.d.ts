
/**
 * Server that manages all translations. Translations can be set to it and removed from it.
 *
*/
declare class TranslationServerClass extends Object {

  
/**
 * Server that manages all translations. Translations can be set to it and removed from it.
 *
*/
  "new"(): TranslationServerClass;
  static "new"(): TranslationServerClass;




/** Adds a [Translation] resource. */
add_translation(translation: Translation): void;

/** Clears the server from all translations. */
clear(): void;

/** Returns an Array of all loaded locales of the game. */
get_loaded_locales(): any[];

/** Returns the current locale of the game. */
get_locale(): string;

/** Returns a locale's language and its variant (e.g. [code]"en_US"[/code] would return [code]"English (United States)"[/code]). */
get_locale_name(locale: string): string;

/** Removes the given translation from the server. */
remove_translation(translation: Translation): void;

/** Sets the locale of the game. */
set_locale(locale: string): void;

/** Returns the current locale's translation for the given message (key). */
translate(message: string): string;

  connect<T extends SignalsOf<TranslationServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
