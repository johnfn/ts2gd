
/**
 * [AnimatedTexture] is a resource format for frame-based animations, where multiple textures can be chained automatically with a predefined delay for each frame. Unlike [AnimationPlayer] or [AnimatedSprite], it isn't a [Node], but has the advantage of being usable anywhere a [Texture] resource can be used, e.g. in a [TileSet].
 *
 * The playback of the animation is controlled by the [member fps] property as well as each frame's optional delay (see [method set_frame_delay]). The animation loops, i.e. it will restart at frame 0 automatically after playing the last frame.
 *
 * [AnimatedTexture] currently requires all frame textures to have the same size, otherwise the bigger ones will be cropped to match the smallest one.
 *
 * **Note:** AnimatedTexture doesn't support using [AtlasTexture]s. Each frame needs to be a separate [Texture].
 *
*/
declare class AnimatedTexture extends Texture {

  
/**
 * [AnimatedTexture] is a resource format for frame-based animations, where multiple textures can be chained automatically with a predefined delay for each frame. Unlike [AnimationPlayer] or [AnimatedSprite], it isn't a [Node], but has the advantage of being usable anywhere a [Texture] resource can be used, e.g. in a [TileSet].
 *
 * The playback of the animation is controlled by the [member fps] property as well as each frame's optional delay (see [method set_frame_delay]). The animation loops, i.e. it will restart at frame 0 automatically after playing the last frame.
 *
 * [AnimatedTexture] currently requires all frame textures to have the same size, otherwise the bigger ones will be cropped to match the smallest one.
 *
 * **Note:** AnimatedTexture doesn't support using [AtlasTexture]s. Each frame needs to be a separate [Texture].
 *
*/
  "new"(): AnimatedTexture;
  static "new"(): AnimatedTexture;



/** Sets the currently visible frame of the texture. */
current_frame: int;


/**
 * Animation speed in frames per second. This value defines the default time interval between two frames of the animation, and thus the overall duration of the animation loop based on the [member frames] property. A value of 0 means no predefined number of frames per second, the animation will play according to each frame's frame delay (see [method set_frame_delay]).
 *
 * For example, an animation with 8 frames, no frame delay and a `fps` value of 2 will run for 4 seconds, with each frame lasting 0.5 seconds.
 *
*/
fps: float;

/** Number of frames to use in the animation. While you can create the frames independently with [method set_frame_texture], you need to set this value for the animation to take new frames into account. The maximum number of frames is [constant MAX_FRAMES]. */
frames: int;

/** If [code]true[/code], the animation will only play once and will not loop back to the first frame after reaching the end. Note that reaching the end will not set [member pause] to [code]true[/code]. */
oneshot: boolean;

/** If [code]true[/code], the animation will pause where it currently is (i.e. at [member current_frame]). The animation will continue from where it was paused when changing this property to [code]false[/code]. */
pause: boolean;

/** Returns the given frame's delay value. */
get_frame_delay(frame: int): float;

/** Returns the given frame's [Texture]. */
get_frame_texture(frame: int): Texture;

/**
 * Sets an additional delay (in seconds) between this frame and the next one, that will be added to the time interval defined by [member fps]. By default, frames have no delay defined. If a delay value is defined, the final time interval between this frame and the next will be `1.0 / fps + delay`.
 *
 * For example, for an animation with 3 frames, 2 FPS and a frame delay on the second frame of 1.2, the resulting playback will be:
 *
 * @example 
 * 
 * Frame 0: 0.5 s (1 / fps)
 * Frame 1: 1.7 s (1 / fps + 1.2)
 * Frame 2: 0.5 s (1 / fps)
 * Total duration: 2.7 s
 * @summary 
 * 
 *
*/
set_frame_delay(frame: int, delay: float): void;

/**
 * Assigns a [Texture] to the given frame. Frame IDs start at 0, so the first frame has ID 0, and the last frame of the animation has ID [member frames] - 1.
 *
 * You can define any number of textures up to [constant MAX_FRAMES], but keep in mind that only frames from 0 to [member frames] - 1 will be part of the animation.
 *
*/
set_frame_texture(frame: int, texture: Texture): void;

  // connect<T extends SignalsOf<AnimatedTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimatedTextureSignals>>(signal: T, method: SignalFunction<AnimatedTextureSignals[T]>): number;



/**
 * The maximum number of frames supported by [AnimatedTexture]. If you need more frames in your animation, use [AnimationPlayer] or [AnimatedSprite].
 *
*/
static MAX_FRAMES: any;

}

declare class AnimatedTextureSignals extends TextureSignals {
  
}
