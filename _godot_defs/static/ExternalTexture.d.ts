
/**
 * Enable support for the OpenGL ES external texture extension as defined by [url=https://www.khronos.org/registry/OpenGL/extensions/OES/OES_EGL_image_external.txt]OES_EGL_image_external[/url].
 *
 * **Note:** This is only supported for Android platforms.
 *
*/
declare class ExternalTexture extends Texture {

  
/**
 * Enable support for the OpenGL ES external texture extension as defined by [url=https://www.khronos.org/registry/OpenGL/extensions/OES/OES_EGL_image_external.txt]OES_EGL_image_external[/url].
 *
 * **Note:** This is only supported for Android platforms.
 *
*/
  "new"(): ExternalTexture;
  static "new"(): ExternalTexture;




/** External texture size. */
size: Vector2;

/** Returns the external texture name. */
get_external_texture_id(): int;

  // connect<T extends SignalsOf<ExternalTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ExternalTextureSignals>>(signal: T, method: SignalFunction<ExternalTextureSignals[T]>): number;




}

declare class ExternalTextureSignals extends TextureSignals {
  
}
