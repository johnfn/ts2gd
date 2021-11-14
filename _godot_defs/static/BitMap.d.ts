
/**
 * A two-dimensional array of boolean values, can be used to efficiently store a binary matrix (every matrix element takes only one bit) and query the values using natural cartesian coordinates.
 *
*/
declare class BitMap extends Resource  {

  
/**
 * A two-dimensional array of boolean values, can be used to efficiently store a binary matrix (every matrix element takes only one bit) and query the values using natural cartesian coordinates.
 *
*/
  new(): BitMap; 
  static "new"(): BitMap 



/** Creates a bitmap with the specified size, filled with [code]false[/code]. */
create(size: Vector2): void;

/** Creates a bitmap that matches the given image dimensions, every element of the bitmap is set to [code]false[/code] if the alpha value of the image at that position is equal to [code]threshold[/code] or less, and [code]true[/code] in other case. */
create_from_image_alpha(image: Image, threshold?: float): void;

/** Returns bitmap's value at the specified position. */
get_bit(position: Vector2): boolean;

/** Returns bitmap's dimensions. */
get_size(): Vector2;

/** Returns the amount of bitmap elements that are set to [code]true[/code]. */
get_true_bit_count(): int;

/** Applies morphological dilation or erosion to the bitmap. If [code]pixels[/code] is positive, dilation is applied to the bitmap. If [code]pixels[/code] is negative, erosion is applied to the bitmap. [code]rect[/code] defines the area where the morphological operation is applied. Pixels located outside the [code]rect[/code] are unaffected by [method grow_mask]. */
grow_mask(pixels: int, rect: Rect2): void;

/** No documentation provided. */
opaque_to_polygons(rect: Rect2, epsilon?: float): any[];

/** Sets the bitmap's element at the specified position, to the specified value. */
set_bit(position: Vector2, bit: boolean): void;

/** Sets a rectangular portion of the bitmap to the specified value. */
set_bit_rect(rect: Rect2, bit: boolean): void;

  connect<T extends SignalsOf<BitMap>>(signal: T, method: SignalFunction<BitMap[T]>): number;






}

