
/**
 * This class provides access to a number of different monitors related to performance, such as memory usage, draw calls, and FPS. These are the same as the values displayed in the **Monitor** tab in the editor's **Debugger** panel. By using the [method get_monitor] method of this class, you can access this data from your code.
 *
 * **Note:** A few of these monitors are only available in debug mode and will always return 0 when used in a release build.
 *
 * **Note:** Many of these monitors are not updated in real-time, so there may be a short delay between changes.
 *
*/
declare class PerformanceClass extends Object  {

  
/**
 * This class provides access to a number of different monitors related to performance, such as memory usage, draw calls, and FPS. These are the same as the values displayed in the **Monitor** tab in the editor's **Debugger** panel. By using the [method get_monitor] method of this class, you can access this data from your code.
 *
 * **Note:** A few of these monitors are only available in debug mode and will always return 0 when used in a release build.
 *
 * **Note:** Many of these monitors are not updated in real-time, so there may be a short delay between changes.
 *
*/
  new(): PerformanceClass; 
  static "new"(): PerformanceClass 



/**
 * Returns the value of one of the available monitors. You should provide one of the [enum Monitor] constants as the argument, like this:
 *
 * @example 
 * 
 * print(Performance.get_monitor(Performance.TIME_FPS)) # Prints the FPS to the console
 * @summary 
 * 
 *
*/
get_monitor(monitor: int): float;

  connect<T extends SignalsOf<PerformanceClass>>(signal: T, method: SignalFunction<PerformanceClass[T]>): number;



/**
 * Number of frames per second.
 *
*/
static TIME_FPS: any;

/**
 * Time it took to complete one frame, in seconds.
 *
*/
static TIME_PROCESS: any;

/**
 * Time it took to complete one physics frame, in seconds.
 *
*/
static TIME_PHYSICS_PROCESS: any;

/**
 * Static memory currently used, in bytes. Not available in release builds.
 *
*/
static MEMORY_STATIC: any;

/**
 * Dynamic memory currently used, in bytes. Not available in release builds.
 *
*/
static MEMORY_DYNAMIC: any;

/**
 * Available static memory. Not available in release builds.
 *
*/
static MEMORY_STATIC_MAX: any;

/**
 * Available dynamic memory. Not available in release builds.
 *
*/
static MEMORY_DYNAMIC_MAX: any;

/**
 * Largest amount of memory the message queue buffer has used, in bytes. The message queue is used for deferred functions calls and notifications.
 *
*/
static MEMORY_MESSAGE_BUFFER_MAX: any;

/**
 * Number of objects currently instanced (including nodes).
 *
*/
static OBJECT_COUNT: any;

/**
 * Number of resources currently used.
 *
*/
static OBJECT_RESOURCE_COUNT: any;

/**
 * Number of nodes currently instanced in the scene tree. This also includes the root node.
 *
*/
static OBJECT_NODE_COUNT: any;

/**
 * Number of orphan nodes, i.e. nodes which are not parented to a node of the scene tree.
 *
*/
static OBJECT_ORPHAN_NODE_COUNT: any;

/**
 * 3D objects drawn per frame.
 *
*/
static RENDER_OBJECTS_IN_FRAME: any;

/**
 * Vertices drawn per frame. 3D only.
 *
*/
static RENDER_VERTICES_IN_FRAME: any;

/**
 * Material changes per frame. 3D only.
 *
*/
static RENDER_MATERIAL_CHANGES_IN_FRAME: any;

/**
 * Shader changes per frame. 3D only.
 *
*/
static RENDER_SHADER_CHANGES_IN_FRAME: any;

/**
 * Render surface changes per frame. 3D only.
 *
*/
static RENDER_SURFACE_CHANGES_IN_FRAME: any;

/**
 * Draw calls per frame. 3D only.
 *
*/
static RENDER_DRAW_CALLS_IN_FRAME: any;

/**
 * Items or joined items drawn per frame.
 *
*/
static RENDER_2D_ITEMS_IN_FRAME: any;

/**
 * Draw calls per frame.
 *
*/
static RENDER_2D_DRAW_CALLS_IN_FRAME: any;

/**
 * The amount of video memory used, i.e. texture and vertex memory combined.
 *
*/
static RENDER_VIDEO_MEM_USED: any;

/**
 * The amount of texture memory used.
 *
*/
static RENDER_TEXTURE_MEM_USED: any;

/**
 * The amount of vertex memory used.
 *
*/
static RENDER_VERTEX_MEM_USED: any;

/**
 * Unimplemented in the GLES2 and GLES3 rendering backends, always returns 0.
 *
*/
static RENDER_USAGE_VIDEO_MEM_TOTAL: any;

/**
 * Number of active [RigidBody2D] nodes in the game.
 *
*/
static PHYSICS_2D_ACTIVE_OBJECTS: any;

/**
 * Number of collision pairs in the 2D physics engine.
 *
*/
static PHYSICS_2D_COLLISION_PAIRS: any;

/**
 * Number of islands in the 2D physics engine.
 *
*/
static PHYSICS_2D_ISLAND_COUNT: any;

/**
 * Number of active [RigidBody] and [VehicleBody] nodes in the game.
 *
*/
static PHYSICS_3D_ACTIVE_OBJECTS: any;

/**
 * Number of collision pairs in the 3D physics engine.
 *
*/
static PHYSICS_3D_COLLISION_PAIRS: any;

/**
 * Number of islands in the 3D physics engine.
 *
*/
static PHYSICS_3D_ISLAND_COUNT: any;

/**
 * Output latency of the [AudioServer].
 *
*/
static AUDIO_OUTPUT_LATENCY: any;

/**
 * Represents the size of the [enum Monitor] enum.
 *
*/
static MONITOR_MAX: any;



}

