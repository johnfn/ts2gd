
/**
 * [TextureArray]s store an array of [Image]s in a single [Texture] primitive. Each layer of the texture array has its own mipmap chain. This makes it is a good alternative to texture atlases.
 *
 * [TextureArray]s must be displayed using shaders. After importing your file as a [TextureArray] and setting the appropriate Horizontal and Vertical Slices, display it by setting it as a uniform to a shader, for example:
 *
 * @example 
 * 
 * shader_type canvas_item;
 * uniform sampler2DArray tex;
 * uniform int index;
 * void fragment() {
 *     COLOR = texture(tex, vec3(UV.x, UV.y, float(index)));
 * }
 * @summary 
 * 
 *
 * Set the integer uniform "index" to show a particular part of the texture as defined by the Horizontal and Vertical Slices in the importer.
 *
*/
declare class TextureArray extends TextureLayered  {

  
/**
 * [TextureArray]s store an array of [Image]s in a single [Texture] primitive. Each layer of the texture array has its own mipmap chain. This makes it is a good alternative to texture atlases.
 *
 * [TextureArray]s must be displayed using shaders. After importing your file as a [TextureArray] and setting the appropriate Horizontal and Vertical Slices, display it by setting it as a uniform to a shader, for example:
 *
 * @example 
 * 
 * shader_type canvas_item;
 * uniform sampler2DArray tex;
 * uniform int index;
 * void fragment() {
 *     COLOR = texture(tex, vec3(UV.x, UV.y, float(index)));
 * }
 * @summary 
 * 
 *
 * Set the integer uniform "index" to show a particular part of the texture as defined by the Horizontal and Vertical Slices in the importer.
 *
*/
  new(): TextureArray; 
  static "new"(): TextureArray 



/** Creates the TextureArray with specified [code]width[/code], [code]height[/code], and [code]depth[/code]. See [enum Image.Format] for [code]format[/code] options. See [enum TextureLayered.Flags] enumerator for [code]flags[/code] options. */
create(width: int, height: int, depth: int, format: int, flags?: int): void;

  connect<T extends SignalsOf<TextureArray>>(signal: T, method: SignalFunction<TextureArray[T]>): number;






}

