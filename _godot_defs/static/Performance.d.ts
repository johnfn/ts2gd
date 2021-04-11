
/**
 * This class provides access to a number of different monitors related to performance, such as memory usage, draw calls, and FPS. These are the same as the values displayed in the **Monitor** tab in the editor's **Debugger** panel. By using the [method get_monitor] method of this class, you can access this data from your code.
 *
 * **Note:** A few of these monitors are only available in debug mode and will always return 0 when used in a release build.
 *
 * **Note:** Many of these monitors are not updated in real-time, so there may be a short delay between changes.
 *
*/
declare class PerformanceClass extends Object {

  
/**
 * This class provides access to a number of different monitors related to performance, such as memory usage, draw calls, and FPS. These are the same as the values displayed in the **Monitor** tab in the editor's **Debugger** panel. By using the [method get_monitor] method of this class, you can access this data from your code.
 *
 * **Note:** A few of these monitors are only available in debug mode and will always return 0 when used in a release build.
 *
 * **Note:** Many of these monitors are not updated in real-time, so there may be a short delay between changes.
 *
*/
  "new"(): PerformanceClass;
  static "new"(): PerformanceClass;




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

  connect<T extends SignalsOf<PerformanceClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Number of frames per second.
 *
*/
static TIME_FPS: 0;

/**
 * Time it took to complete one frame, in seconds.
 *
*/
static TIME_PROCESS: 1;

/**
 * Time it took to complete one physics frame, in seconds.
 *
*/
static TIME_PHYSICS_PROCESS: 2;

/**
 * Static memory currently used, in bytes. Not available in release builds.
 *
*/
static MEMORY_STATIC: 3;

/**
 * Dynamic memory currently used, in bytes. Not available in release builds.
 *
*/
static MEMORY_DYNAMIC: 4;

/**
 * Available static memory. Not available in release builds.
 *
*/
static MEMORY_STATIC_MAX: 5;

/**
 * Available dynamic memory. Not available in release builds.
 *
*/
static MEMORY_DYNAMIC_MAX: 6;

/**
 * Largest amount of memory the message queue buffer has used, in bytes. The message queue is used for deferred functions calls and notifications.
 *
*/
static MEMORY_MESSAGE_BUFFER_MAX: 7;

/**
 * Number of objects currently instanced (including nodes).
 *
*/
static OBJECT_COUNT: 8;

/**
 * Number of resources currently used.
 *
*/
static OBJECT_RESOURCE_COUNT: 9;

/**
 * Number of nodes currently instanced in the scene tree. This also includes the root node.
 *
*/
static OBJECT_NODE_COUNT: 10;

/**
 * Number of orphan nodes, i.e. nodes which are not parented to a node of the scene tree.
 *
*/
static OBJECT_ORPHAN_NODE_COUNT: 11;

/**
 * 3D objects drawn per frame.
 *
*/
static RENDER_OBJECTS_IN_FRAME: 12;

/**
 * Vertices drawn per frame. 3D only.
 *
*/
static RENDER_VERTICES_IN_FRAME: 13;

/**
 * Material changes per frame. 3D only.
 *
*/
static RENDER_MATERIAL_CHANGES_IN_FRAME: 14;

/**
 * Shader changes per frame. 3D only.
 *
*/
static RENDER_SHADER_CHANGES_IN_FRAME: 15;

/**
 * Render surface changes per frame. 3D only.
 *
*/
static RENDER_SURFACE_CHANGES_IN_FRAME: 16;

/**
 * Draw calls per frame. 3D only.
 *
*/
static RENDER_DRAW_CALLS_IN_FRAME: 17;

/**
 * Items or joined items drawn per frame.
 *
*/
static RENDER_2D_ITEMS_IN_FRAME: 18;

/**
 * Draw calls per frame.
 *
*/
static RENDER_2D_DRAW_CALLS_IN_FRAME: 19;

/**
 * The amount of video memory used, i.e. texture and vertex memory combined.
 *
*/
static RENDER_VIDEO_MEM_USED: 20;

/**
 * The amount of texture memory used.
 *
*/
static RENDER_TEXTURE_MEM_USED: 21;

/**
 * The amount of vertex memory used.
 *
*/
static RENDER_VERTEX_MEM_USED: 22;

/**
 * Unimplemented in the GLES2 and GLES3 rendering backends, always returns 0.
 *
*/
static RENDER_USAGE_VIDEO_MEM_TOTAL: 23;

/**
 * Number of active [RigidBody2D] nodes in the game.
 *
*/
static PHYSICS_2D_ACTIVE_OBJECTS: 24;

/**
 * Number of collision pairs in the 2D physics engine.
 *
*/
static PHYSICS_2D_COLLISION_PAIRS: 25;

/**
 * Number of islands in the 2D physics engine.
 *
*/
static PHYSICS_2D_ISLAND_COUNT: 26;

/**
 * Number of active [RigidBody] and [VehicleBody] nodes in the game.
 *
*/
static PHYSICS_3D_ACTIVE_OBJECTS: 27;

/**
 * Number of collision pairs in the 3D physics engine.
 *
*/
static PHYSICS_3D_COLLISION_PAIRS: 28;

/**
 * Number of islands in the 3D physics engine.
 *
*/
static PHYSICS_3D_ISLAND_COUNT: 29;

/**
 * Output latency of the [AudioServer].
 *
*/
static AUDIO_OUTPUT_LATENCY: 30;

/**
 * Represents the size of the [enum Monitor] enum.
 *
*/
static MONITOR_MAX: 31;


  
}
