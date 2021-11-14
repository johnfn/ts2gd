
/**
 * A resource referenced in an [Environment] that is used to draw a background. The Panorama sky functions similar to skyboxes in other engines, except it uses an equirectangular sky map instead of a cube map.
 *
 * Using an HDR panorama is strongly recommended for accurate, high-quality reflections. Godot supports the Radiance HDR (`.hdr`) and OpenEXR (`.exr`) image formats for this purpose.
 *
 * You can use [url=https://danilw.github.io/GLSL-howto/cubemap_to_panorama_js/cubemap_to_panorama.html]this tool[/url] to convert a cube map to an equirectangular sky map.
 *
*/
declare class PanoramaSky extends Sky  {

  
/**
 * A resource referenced in an [Environment] that is used to draw a background. The Panorama sky functions similar to skyboxes in other engines, except it uses an equirectangular sky map instead of a cube map.
 *
 * Using an HDR panorama is strongly recommended for accurate, high-quality reflections. Godot supports the Radiance HDR (`.hdr`) and OpenEXR (`.exr`) image formats for this purpose.
 *
 * You can use [url=https://danilw.github.io/GLSL-howto/cubemap_to_panorama_js/cubemap_to_panorama.html]this tool[/url] to convert a cube map to an equirectangular sky map.
 *
*/
  new(): PanoramaSky; 
  static "new"(): PanoramaSky 


/** [Texture] to be applied to the PanoramaSky. */
panorama: Texture;



  connect<T extends SignalsOf<PanoramaSky>>(signal: T, method: SignalFunction<PanoramaSky[T]>): number;






}

