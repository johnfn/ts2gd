
/**
 * Used to draw icons and sprites in a user interface. The texture's placement can be controlled with the [member stretch_mode] property. It can scale, tile, or stay centered inside its bounding rectangle.
 *
 * **Note:** You should enable [member flip_v] when using a TextureRect to display a [ViewportTexture]. Alternatively, you can enable [member Viewport.render_target_v_flip] on the Viewport. Otherwise, the image will appear upside down.
 *
*/
declare class TextureRect extends Control {

  
/**
 * Used to draw icons and sprites in a user interface. The texture's placement can be controlled with the [member stretch_mode] property. It can scale, tile, or stay centered inside its bounding rectangle.
 *
 * **Note:** You should enable [member flip_v] when using a TextureRect to display a [ViewportTexture]. Alternatively, you can enable [member Viewport.render_target_v_flip] on the Viewport. Otherwise, the image will appear upside down.
 *
*/
  "new"(): TextureRect;
  static "new"(): TextureRect;



/** If [code]true[/code], the texture scales to fit its bounding rectangle. */
expand: boolean;

/** If [code]true[/code], texture is flipped horizontally. */
flip_h: boolean;

/** If [code]true[/code], texture is flipped vertically. */
flip_v: boolean;


/** Controls the texture's behavior when resizing the node's bounding rectangle. See [enum StretchMode]. */
stretch_mode: int;

/** The node's [Texture] resource. */
texture: Texture;



  connect<T extends SignalsOf<TextureRect>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Scale to fit the node's bounding rectangle, only if `expand` is `true`. Default `stretch_mode`, for backwards compatibility. Until you set `expand` to `true`, the texture will behave like [constant STRETCH_KEEP].
 *
*/
static STRETCH_SCALE_ON_EXPAND: 0;

/**
 * Scale to fit the node's bounding rectangle.
 *
*/
static STRETCH_SCALE: 1;

/**
 * Tile inside the node's bounding rectangle.
 *
*/
static STRETCH_TILE: 2;

/**
 * The texture keeps its original size and stays in the bounding rectangle's top-left corner.
 *
*/
static STRETCH_KEEP: 3;

/**
 * The texture keeps its original size and stays centered in the node's bounding rectangle.
 *
*/
static STRETCH_KEEP_CENTERED: 4;

/**
 * Scale the texture to fit the node's bounding rectangle, but maintain the texture's aspect ratio.
 *
*/
static STRETCH_KEEP_ASPECT: 5;

/**
 * Scale the texture to fit the node's bounding rectangle, center it and maintain its aspect ratio.
 *
*/
static STRETCH_KEEP_ASPECT_CENTERED: 6;

/**
 * Scale the texture so that the shorter side fits the bounding rectangle. The other side clips to the node's limits.
 *
*/
static STRETCH_KEEP_ASPECT_COVERED: 7;


  
}
