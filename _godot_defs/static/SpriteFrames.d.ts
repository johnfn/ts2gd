
/**
 * Sprite frame library for [AnimatedSprite]. Contains frames and animation data for playback.
 *
 * **Note:** You can associate a set of normal maps by creating additional [SpriteFrames] resources with a `_normal` suffix. For example, having 2 [SpriteFrames] resources `run` and `run_normal` will make it so the `run` animation uses the normal map.
 *
*/
declare class SpriteFrames extends Resource {

  
/**
 * Sprite frame library for [AnimatedSprite]. Contains frames and animation data for playback.
 *
 * **Note:** You can associate a set of normal maps by creating additional [SpriteFrames] resources with a `_normal` suffix. For example, having 2 [SpriteFrames] resources `run` and `run_normal` will make it so the `run` animation uses the normal map.
 *
*/
  "new"(): SpriteFrames;
  static "new"(): SpriteFrames;



/** Compatibility property, always equals to an empty array. */
frames: any[];

/** Adds a new animation to the library. */
add_animation(anim: string): void;

/** Adds a frame to the given animation. */
add_frame(anim: string, frame: Texture, at_position?: int): void;

/** Removes all frames from the given animation. */
clear(anim: string): void;

/** Removes all animations. A "default" animation will be created. */
clear_all(): void;

/** Returns [code]true[/code] if the given animation is configured to loop when it finishes playing. Otherwise, returns [code]false[/code]. */
get_animation_loop(anim: string): boolean;

/** Returns an array containing the names associated to each animation. Values are placed in alphabetical order. */
get_animation_names(): PoolStringArray;

/** The animation's speed in frames per second. */
get_animation_speed(anim: string): float;

/** Returns the animation's selected frame. */
get_frame(anim: string, idx: int): Texture;

/** Returns the number of frames in the animation. */
get_frame_count(anim: string): int;

/** If [code]true[/code], the named animation exists. */
has_animation(anim: string): boolean;

/** Removes the given animation. */
remove_animation(anim: string): void;

/** Removes the animation's selected frame. */
remove_frame(anim: string, idx: int): void;

/** Changes the animation's name to [code]newname[/code]. */
rename_animation(anim: string, newname: string): void;

/** If [code]true[/code], the animation will loop. */
set_animation_loop(anim: string, loop: boolean): void;

/** The animation's speed in frames per second. */
set_animation_speed(anim: string, speed: float): void;

/** Sets the texture of the given frame. */
set_frame(anim: string, idx: int, txt: Texture): void;

  // connect<T extends SignalsOf<SpriteFrames>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<SpriteFramesSignals>>(signal: T, method: SignalFunction<SpriteFramesSignals[T]>): number;




}

declare class SpriteFramesSignals extends ResourceSignals {
  
}
