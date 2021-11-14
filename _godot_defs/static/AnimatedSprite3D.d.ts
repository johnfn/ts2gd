
/**
 * Animations are created using a [SpriteFrames] resource, which can be configured in the editor via the SpriteFrames panel.
 *
*/
declare class AnimatedSprite3D extends SpriteBase3D  {

  
/**
 * Animations are created using a [SpriteFrames] resource, which can be configured in the editor via the SpriteFrames panel.
 *
*/
  new(): AnimatedSprite3D; 
  static "new"(): AnimatedSprite3D 


/** The current animation from the [code]frames[/code] resource. If this value changes, the [code]frame[/code] counter is reset. */
animation: string;

/** The displayed animation frame's index. */
frame: int;

/** The [SpriteFrames] resource containing the animation(s). */
frames: SpriteFrames;

/** If [code]true[/code], the [member animation] is currently playing. */
playing: boolean;

/** Returns [code]true[/code] if an animation is currently being played. */
is_playing(): boolean;

/** Plays the animation named [code]anim[/code]. If no [code]anim[/code] is provided, the current animation is played. */
play(anim?: string): void;

/** Stops the current animation (does not reset the frame counter). */
stop(): void;

  connect<T extends SignalsOf<AnimatedSprite3D>>(signal: T, method: SignalFunction<AnimatedSprite3D[T]>): number;





/**
 * Emitted when the animation is finished (when it plays the last frame). If the animation is looping, this signal is emitted every time the last frame is drawn.
 *
*/
$animation_finished: Signal<() => void>

/**
 * Emitted when [member frame] changed.
 *
*/
$frame_changed: Signal<() => void>

}

