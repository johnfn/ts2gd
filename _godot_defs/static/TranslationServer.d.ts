
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

/** Returns an array of all loaded locales of the project. */
get_loaded_locales(): any[];

/**
 * Returns the current locale of the project.
 *
 * See also [method OS.get_locale] and [method OS.get_locale_language] to query the locale of the user system.
 *
*/
get_locale(): string;

/** Returns a locale's language and its variant (e.g. [code]"en_US"[/code] would return [code]"English (United States)"[/code]). */
get_locale_name(locale: string): string;

/** Removes the given translation from the server. */
remove_translation(translation: Translation): void;

/**
 * Sets the locale of the project. The `locale` string will be standardized to match known locales (e.g. `en-US` would be matched to `en_US`).
 *
 * If translations have been loaded beforehand for the new locale, they will be applied.
 *
*/
set_locale(locale: string): void;

/** Returns the current locale's translation for the given message (key). */
translate(message: string): string;

  // connect<T extends SignalsOf<TranslationServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<TranslationServerClassSignals>>(signal: T, method: SignalFunction<TranslationServerClassSignals[T]>): number;




}

declare class TranslationServerClassSignals extends ObjectSignals {
  
}
