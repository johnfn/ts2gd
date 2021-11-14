
/**
 * Used with [DynamicFont] to describe the location of a vector font file for dynamic rendering at runtime.
 *
*/
declare class DynamicFontData extends Resource  {

  
/**
 * Used with [DynamicFont] to describe the location of a vector font file for dynamic rendering at runtime.
 *
*/
  new(): DynamicFontData; 
  static "new"(): DynamicFontData 


/** If [code]true[/code], the font is rendered with anti-aliasing. This property applies both to the main font and its outline (if it has one). */
antialiased: boolean;

/** The path to the vector font file. */
font_path: string;

/** The font hinting mode used by FreeType. See [enum Hinting] for options. */
hinting: int;



  connect<T extends SignalsOf<DynamicFontData>>(signal: T, method: SignalFunction<DynamicFontData[T]>): number;



/**
 * Disables font hinting (smoother but less crisp).
 *
*/
static HINTING_NONE: any;

/**
 * Use the light font hinting mode.
 *
*/
static HINTING_LIGHT: any;

/**
 * Use the default font hinting mode (crisper but less smooth).
 *
*/
static HINTING_NORMAL: any;



}

