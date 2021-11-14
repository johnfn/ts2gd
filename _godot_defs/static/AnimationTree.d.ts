
/**
 * A node to be used for advanced animation transitions in an [AnimationPlayer].
 *
 * **Note:** When linked with an [AnimationPlayer], several properties and methods of the corresponding [AnimationPlayer] will not function as expected. Playback and transitions should be handled using only the [AnimationTree] and its constituent [AnimationNode](s). The [AnimationPlayer] node should be used solely for adding, deleting, and editing animations.
 *
*/
declare class AnimationTree extends Node  {

  
/**
 * A node to be used for advanced animation transitions in an [AnimationPlayer].
 *
 * **Note:** When linked with an [AnimationPlayer], several properties and methods of the corresponding [AnimationPlayer] will not function as expected. Playback and transitions should be handled using only the [AnimationTree] and its constituent [AnimationNode](s). The [AnimationPlayer] node should be used solely for adding, deleting, and editing animations.
 *
*/
  new(): AnimationTree; 
  static "new"(): AnimationTree 


/** If [code]true[/code], the [AnimationTree] will be processing. */
active: boolean;

/** The path to the [AnimationPlayer] used for animating. */
anim_player: NodePathType;

/** The process mode of this [AnimationTree]. See [enum AnimationProcessMode] for available modes. */
process_mode: int;

/**
 * The path to the Animation track used for root motion. Paths must be valid scene-tree paths to a node, and must be specified starting from the parent node of the node that will reproduce the animation. To specify a track that controls properties or bones, append its name after the path, separated by `":"`. For example, `"character/skeleton:ankle"` or `"character/mesh:transform/local"`.
 *
 * If the track has type [constant Animation.TYPE_TRANSFORM], the transformation will be cancelled visually, and the animation will appear to stay in place. See also [method get_root_motion_transform] and [RootMotionView].
 *
*/
root_motion_track: NodePathType;

/** The root animation node of this [AnimationTree]. See [AnimationNode]. */
tree_root: AnimationNode;

/** Manually advance the animations by the specified time (in seconds). */
advance(delta: float): void;

/** Retrieve the motion of the [member root_motion_track] as a [Transform] that can be used elsewhere. If [member root_motion_track] is not a path to a track of type [constant Animation.TYPE_TRANSFORM], returns an identity transformation. See also [member root_motion_track] and [RootMotionView]. */
get_root_motion_transform(): Transform;

/** No documentation provided. */
rename_parameter(old_name: string, new_name: string): void;

  connect<T extends SignalsOf<AnimationTree>>(signal: T, method: SignalFunction<AnimationTree[T]>): number;



/**
 * The animations will progress during the physics frame (i.e. [method Node._physics_process]).
 *
*/
static ANIMATION_PROCESS_PHYSICS: any;

/**
 * The animations will progress during the idle frame (i.e. [method Node._process]).
 *
*/
static ANIMATION_PROCESS_IDLE: any;

/**
 * The animations will only progress manually (see [method advance]).
 *
*/
static ANIMATION_PROCESS_MANUAL: any;



}

