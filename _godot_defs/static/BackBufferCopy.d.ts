
/**
 * Node for back-buffering the currently-displayed screen. The region defined in the BackBufferCopy node is buffered with the content of the screen it covers, or the entire screen according to the copy mode set. Use the `texture(SCREEN_TEXTURE, ...)` function in your shader scripts to access the buffer.
 *
 * **Note:** Since this node inherits from [Node2D] (and not [Control]), anchors and margins won't apply to child [Control]-derived nodes. This can be problematic when resizing the window. To avoid this, add [Control]-derived nodes as **siblings** to the BackBufferCopy node instead of adding them as children.
 *
*/
declare class BackBufferCopy extends Node2D  {

  
/**
 * Node for back-buffering the currently-displayed screen. The region defined in the BackBufferCopy node is buffered with the content of the screen it covers, or the entire screen according to the copy mode set. Use the `texture(SCREEN_TEXTURE, ...)` function in your shader scripts to access the buffer.
 *
 * **Note:** Since this node inherits from [Node2D] (and not [Control]), anchors and margins won't apply to child [Control]-derived nodes. This can be problematic when resizing the window. To avoid this, add [Control]-derived nodes as **siblings** to the BackBufferCopy node instead of adding them as children.
 *
*/
  new(): BackBufferCopy; 
  static "new"(): BackBufferCopy 


/** Buffer mode. See [enum CopyMode] constants. */
copy_mode: int;

/** The area covered by the BackBufferCopy. Only used if [member copy_mode] is [constant COPY_MODE_RECT]. */
rect: Rect2;



  connect<T extends SignalsOf<BackBufferCopy>>(signal: T, method: SignalFunction<BackBufferCopy[T]>): number;



/**
 * Disables the buffering mode. This means the BackBufferCopy node will directly use the portion of screen it covers.
 *
*/
static COPY_MODE_DISABLED: any;

/**
 * BackBufferCopy buffers a rectangular region.
 *
*/
static COPY_MODE_RECT: any;

/**
 * BackBufferCopy buffers the entire screen.
 *
*/
static COPY_MODE_VIEWPORT: any;



}

