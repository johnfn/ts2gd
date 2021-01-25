
/**
 * Animations are created using a [SpriteFrames] resource, which can be configured in the editor via the SpriteFrames panel.
 *
 * **Note:** You can associate a set of normal or specular maps by creating additional [SpriteFrames] resources with a `_normal` or `_specular` suffix. For example, having 3 [SpriteFrames] resources `run`, `run_normal`, and `run_specular` will make it so the `run` animation uses normal and specular maps.
 *
*/
declare class AnimatedSprite2D extends Node2D {

  
/**
 * Animations are created using a [SpriteFrames] resource, which can be configured in the editor via the SpriteFrames panel.
 *
 * **Note:** You can associate a set of normal or specular maps by creating additional [SpriteFrames] resources with a `_normal` or `_specular` suffix. For example, having 3 [SpriteFrames] resources `run`, `run_normal`, and `run_specular` will make it so the `run` animation uses normal and specular maps.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The current animation from the [code]frames[/code] resource. If this value changes, the [code]frame[/code] counter is reset. */
animation: StringName;

/** If [code]true[/code], texture will be centered. */
centered: boolean;

/** If [code]true[/code], texture is flipped horizontally. */
flip_h: boolean;

/** If [code]true[/code], texture is flipped vertically. */
flip_v: boolean;

/** The displayed animation frame's index. */
frame: int;

/** The [SpriteFrames] resource containing the animation(s). */
frames: SpriteFrames;

/** The texture's drawing offset. */
offset: Vector2;

/** If [code]true[/code], the [member animation] is currently playing. */
playing: boolean;

/** Strength of the specular light effect of this [AnimatedSprite2D]. */
shininess: float;

/** The color of the specular light effect. */
specular_color: Color;

/** The animation speed is multiplied by this value. */
speed_scale: float;

/** Returns [code]true[/code] if an animation is currently being played. */
is_playing(): boolean;

/** Plays the animation named [code]anim[/code]. If no [code]anim[/code] is provided, the current animation is played. If [code]backwards[/code] is [code]true[/code], the animation will be played in reverse. */
play(anim?: StringName, backwards?: boolean): void;

/** Stops the current animation (does not reset the frame counter). */
stop(): void;

  connect<T extends SignalsOf<AnimatedSprite2D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when the animation is finished (when it plays the last frame). If the animation is looping, this signal is emitted every time the last frame is drawn.
 *
*/
animation_finished: Signal<() => void>

/**
 * Emitted when [member frame] changed.
 *
*/
frame_changed: Signal<() => void>

}


 
