
/**
 * [TextureButton] has the same functionality as [Button], except it uses sprites instead of Godot's [Theme] resource. It is faster to create, but it doesn't support localization like more complex [Control]s.
 *
 * The "normal" state must contain a texture ([member texture_normal]); other textures are optional.
 *
*/
declare class TextureButton extends BaseButton {

  
/**
 * [TextureButton] has the same functionality as [Button], except it uses sprites instead of Godot's [Theme] resource. It is faster to create, but it doesn't support localization like more complex [Control]s.
 *
 * The "normal" state must contain a texture ([member texture_normal]); other textures are optional.
 *
*/
  "new"(): TextureButton;
  static "new"(): TextureButton;



/** If [code]true[/code], the texture stretches to the edges of the node's bounding rectangle using the [member stretch_mode]. If [code]false[/code], the texture will not scale with the node. */
expand: boolean;

/** Controls the texture's behavior when you resize the node's bounding rectangle, [b]only if[/b] [member expand] is [code]true[/code]. Set it to one of the [enum StretchMode] constants. See the constants to learn more. */
stretch_mode: int;

/** Pure black and white [BitMap] image to use for click detection. On the mask, white pixels represent the button's clickable area. Use it to create buttons with curved shapes. */
texture_click_mask: BitMap;

/** Texture to display when the node is disabled. See [member BaseButton.disabled]. */
texture_disabled: Texture;

/** Texture to display when the node has mouse or keyboard focus. */
texture_focused: Texture;

/** Texture to display when the mouse hovers the node. */
texture_hover: Texture;

/** Texture to display by default, when the node is [b]not[/b] in the disabled, focused, hover or pressed state. */
texture_normal: Texture;

/** Texture to display on mouse down over the node, if the node has keyboard focus and the player presses the Enter key or if the player presses the [member BaseButton.shortcut] key. */
texture_pressed: Texture;



  connect<T extends SignalsOf<TextureButton>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Scale to fit the node's bounding rectangle.
 *
*/
static STRETCH_SCALE: 0;

/**
 * Tile inside the node's bounding rectangle.
 *
*/
static STRETCH_TILE: 1;

/**
 * The texture keeps its original size and stays in the bounding rectangle's top-left corner.
 *
*/
static STRETCH_KEEP: 2;

/**
 * The texture keeps its original size and stays centered in the node's bounding rectangle.
 *
*/
static STRETCH_KEEP_CENTERED: 3;

/**
 * Scale the texture to fit the node's bounding rectangle, but maintain the texture's aspect ratio.
 *
*/
static STRETCH_KEEP_ASPECT: 4;

/**
 * Scale the texture to fit the node's bounding rectangle, center it, and maintain its aspect ratio.
 *
*/
static STRETCH_KEEP_ASPECT_CENTERED: 5;

/**
 * Scale the texture so that the shorter side fits the bounding rectangle. The other side clips to the node's limits.
 *
*/
static STRETCH_KEEP_ASPECT_COVERED: 6;


  
}
