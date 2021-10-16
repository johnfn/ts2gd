
/**
 * Renders a given [Curve] provided to it. Simplifies the task of drawing curves and/or saving them as image files.
 *
*/
declare class CurveTexture extends Texture {

  
/**
 * Renders a given [Curve] provided to it. Simplifies the task of drawing curves and/or saving them as image files.
 *
*/
  "new"(): CurveTexture;
  static "new"(): CurveTexture;



/** The [code]curve[/code] rendered onto the texture. */
curve: Curve;

/** The width of the texture. */
width: int;



  // connect<T extends SignalsOf<CurveTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<CurveTextureSignals>>(signal: T, method: SignalFunction<CurveTextureSignals[T]>): number;




}

declare class CurveTextureSignals extends TextureSignals {
  
}
