
/**
 * Arranges child controls in a way to preserve their aspect ratio automatically whenever the container is resized. Solves the problem where the container size is dynamic and the contents' size needs to adjust accordingly without losing proportions.
 *
*/
declare class AspectRatioContainer extends Container  {

  
/**
 * Arranges child controls in a way to preserve their aspect ratio automatically whenever the container is resized. Solves the problem where the container size is dynamic and the contents' size needs to adjust accordingly without losing proportions.
 *
*/
  new(): AspectRatioContainer; 
  static "new"(): AspectRatioContainer 


/** Specifies the horizontal relative position of child controls. */
alignment_horizontal: int;

/** Specifies the vertical relative position of child controls. */
alignment_vertical: int;

/** The aspect ratio to enforce on child controls. This is the width divided by the height. The ratio depends on the [member stretch_mode]. */
ratio: float;

/** The stretch mode used to align child controls. */
stretch_mode: int;



  connect<T extends SignalsOf<AspectRatioContainer>>(signal: T, method: SignalFunction<AspectRatioContainer[T]>): number;



/**
 * The height of child controls is automatically adjusted based on the width of the container.
 *
*/
static STRETCH_WIDTH_CONTROLS_HEIGHT: any;

/**
 * The width of child controls is automatically adjusted based on the height of the container.
 *
*/
static STRETCH_HEIGHT_CONTROLS_WIDTH: any;

/**
 * The bounding rectangle of child controls is automatically adjusted to fit inside the container while keeping the aspect ratio.
 *
*/
static STRETCH_FIT: any;

/**
 * The width and height of child controls is automatically adjusted to make their bounding rectangle cover the entire area of the container while keeping the aspect ratio.
 *
 * When the bounding rectangle of child controls exceed the container's size and [member Control.rect_clip_content] is enabled, this allows to show only the container's area restricted by its own bounding rectangle.
 *
*/
static STRETCH_COVER: any;

/**
 * Aligns child controls with the beginning (left or top) of the container.
 *
*/
static ALIGN_BEGIN: any;

/**
 * Aligns child controls with the center of the container.
 *
*/
static ALIGN_CENTER: any;

/**
 * Aligns child controls with the end (right or bottom) of the container.
 *
*/
static ALIGN_END: any;



}

