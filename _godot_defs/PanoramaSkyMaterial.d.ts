
/**
 * A resource referenced in a [Sky] that is used to draw a background. The Panorama sky material functions similar to skyboxes in other engines, except it uses an equirectangular sky map instead of a cube map.
 *
 * Using an HDR panorama is strongly recommended for accurate, high-quality reflections. Godot supports the Radiance HDR (`.hdr`) and OpenEXR (`.exr`) image formats for this purpose.
 *
 * You can use [url=https://danilw.github.io/GLSL-howto/cubemap_to_panorama_js/cubemap_to_panorama.html]this tool[/url] to convert a cube map to an equirectangular sky map.
 *
*/
declare class PanoramaSkyMaterial extends Material {

  
/**
 * A resource referenced in a [Sky] that is used to draw a background. The Panorama sky material functions similar to skyboxes in other engines, except it uses an equirectangular sky map instead of a cube map.
 *
 * Using an HDR panorama is strongly recommended for accurate, high-quality reflections. Godot supports the Radiance HDR (`.hdr`) and OpenEXR (`.exr`) image formats for this purpose.
 *
 * You can use [url=https://danilw.github.io/GLSL-howto/cubemap_to_panorama_js/cubemap_to_panorama.html]this tool[/url] to convert a cube map to an equirectangular sky map.
 *
*/
  "new"(): this;
  static "new"(): this;



/** [Texture2D] to be applied to the [PanoramaSkyMaterial]. */
panorama: Texture2D;



  connect<T extends SignalsOf<PanoramaSkyMaterial>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
