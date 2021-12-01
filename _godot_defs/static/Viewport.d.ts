
/**
 * A Viewport creates a different view into the screen, or a sub-view inside another viewport. Children 2D Nodes will display on it, and children Camera 3D nodes will render on it too.
 *
 * Optionally, a viewport can have its own 2D or 3D world, so they don't share what they draw with other viewports.
 *
 * If a viewport is a child of a [ViewportContainer], it will automatically take up its size, otherwise it must be set manually.
 *
 * Viewports can also choose to be audio listeners, so they generate positional audio depending on a 2D or 3D camera child of it.
 *
 * Also, viewports can be assigned to different screens in case the devices have multiple screens.
 *
 * Finally, viewports can also behave as render targets, in which case they will not be visible unless the associated texture is used to draw.
 *
*/
declare class Viewport extends Node  {

  
/**
 * A Viewport creates a different view into the screen, or a sub-view inside another viewport. Children 2D Nodes will display on it, and children Camera 3D nodes will render on it too.
 *
 * Optionally, a viewport can have its own 2D or 3D world, so they don't share what they draw with other viewports.
 *
 * If a viewport is a child of a [ViewportContainer], it will automatically take up its size, otherwise it must be set manually.
 *
 * Viewports can also choose to be audio listeners, so they generate positional audio depending on a 2D or 3D camera child of it.
 *
 * Also, viewports can be assigned to different screens in case the devices have multiple screens.
 *
 * Finally, viewports can also behave as render targets, in which case they will not be visible unless the associated texture is used to draw.
 *
*/
  new(): Viewport; 
  static "new"(): Viewport 


/** If [code]true[/code], the viewport will be used in AR/VR process. */
arvr: boolean;

/** If [code]true[/code], the viewport will process 2D audio streams. */
audio_listener_enable_2d: boolean;

/** If [code]true[/code], the viewport will process 3D audio streams. */
audio_listener_enable_3d: boolean;

/** The canvas transform of the viewport, useful for changing the on-screen positions of all child [CanvasItem]s. This is relative to the global canvas transform of the viewport. */
canvas_transform: Transform2D;

/**
 * If `true`, uses a fast post-processing filter to make banding significantly less visible. In some cases, debanding may introduce a slightly noticeable dithering pattern. It's recommended to enable debanding only when actually needed since the dithering pattern will make lossless-compressed screenshots larger.
 *
 * **Note:** Only available on the GLES3 backend. [member hdr] must also be `true` for debanding to be effective.
 *
*/
debanding: boolean;

/** The overlay mode for test rendered geometry in debug purposes. */
debug_draw: int;

/** If [code]true[/code], the viewport will disable 3D rendering. For actual disabling use [code]usage[/code]. */
disable_3d: boolean;

/** Enables fast approximate antialiasing. FXAA is a popular screen-space antialiasing method, which is fast but will make the image look blurry, especially at lower resolutions. It can still work relatively well at large resolutions such as 1440p and 4K. Some of the lost sharpness can be recovered by enabling contrast-adaptive sharpening (see [member sharpen_intensity]). */
fxaa: boolean;

/** The global canvas transform of the viewport. The canvas transform is relative to this. */
global_canvas_transform: Transform2D;

/** If [code]true[/code], the viewport will not receive input events. */
gui_disable_input: boolean;

/** If [code]true[/code], the GUI controls on the viewport will lay pixel perfectly. */
gui_snap_controls_to_pixels: boolean;


/**
 * If `true`, the viewport rendering will receive benefits from High Dynamic Range algorithm. High Dynamic Range allows the viewport to receive values that are outside the 0-1 range. In Godot HDR uses 16 bits, meaning it does not store the full range of a floating point number.
 *
 * **Note:** Requires [member usage] to be set to [constant USAGE_3D] or [constant USAGE_3D_NO_EFFECTS], since HDR is not supported for 2D.
 *
*/
hdr: boolean;

/** If [code]true[/code], the result after 3D rendering will not have a linear to sRGB color conversion applied. This is important when the viewport is used as a render target where the result is used as a texture on a 3D object rendered in another viewport. It is also important if the viewport is used to create data that is not color based (noise, heightmaps, pickmaps, etc.). Do not enable this when the viewport is used as a texture on a 2D object or if the viewport is your final output. For the GLES2 driver this will convert the sRGB output to linear, this should only be used for VR plugins that require input in linear color space! */
keep_3d_linear: boolean;

/** The multisample anti-aliasing mode. A higher number results in smoother edges at the cost of significantly worse performance. A value of 4 is best unless targeting very high-end systems. */
msaa: int;

/** If [code]true[/code], the viewport will use [World] defined in [code]world[/code] property. */
own_world: boolean;

/** If [code]true[/code], the objects rendered by viewport become subjects of mouse picking process. */
physics_object_picking: boolean;

/** If [code]true[/code], renders the Viewport directly to the screen instead of to the root viewport. Only available in GLES2. This is a low-level optimization and should not be used in most cases. If used, reading from the Viewport or from [code]SCREEN_TEXTURE[/code] becomes unavailable. For more information see [method VisualServer.viewport_set_render_direct_to_screen]. */
render_direct_to_screen: boolean;

/**
 * The clear mode when viewport used as a render target.
 *
 * **Note:** This property is intended for 2D usage.
 *
*/
render_target_clear_mode: int;

/** The update mode when viewport used as a render target. */
render_target_update_mode: int;

/** If [code]true[/code], the result of rendering will be flipped vertically. */
render_target_v_flip: boolean;

/** The subdivision amount of the first quadrant on the shadow atlas. */
shadow_atlas_quad_0: int;

/** The subdivision amount of the second quadrant on the shadow atlas. */
shadow_atlas_quad_1: int;

/** The subdivision amount of the third quadrant on the shadow atlas. */
shadow_atlas_quad_2: int;

/** The subdivision amount of the fourth quadrant on the shadow atlas. */
shadow_atlas_quad_3: int;

/**
 * The shadow atlas' resolution (used for omni and spot lights). The value will be rounded up to the nearest power of 2.
 *
 * **Note:** If this is set to 0, shadows won't be visible. Since user-created viewports default to a value of 0, this value must be set above 0 manually.
 *
*/
shadow_atlas_size: int;

/** If set to a value greater than [code]0.0[/code], contrast-adaptive sharpening will be applied to the 3D viewport. This has a low performance cost and can be used to recover some of the sharpness lost from using FXAA. Values around [code]0.5[/code] generally give the best results. See also [member fxaa]. */
sharpen_intensity: float;

/** The width and height of viewport. Must be set to a value greater than or equal to 2 pixels on both dimensions. Otherwise, nothing will be displayed. */
size: Vector2;

/** If [code]true[/code], the size override affects stretch as well. */
size_override_stretch: boolean;

/** If [code]true[/code], the viewport should render its background as transparent. */
transparent_bg: boolean;

/** The rendering mode of viewport. */
usage: int;

/** The custom [World] which can be used as 3D environment source. */
world: World;

/** The custom [World2D] which can be used as 2D environment source. */
world_2d: World2D;

/** Returns the first valid [World] for this viewport, searching the [member world] property of itself and any Viewport ancestor. */
find_world(): World;

/** Returns the first valid [World2D] for this viewport, searching the [member world_2d] property of itself and any Viewport ancestor. */
find_world_2d(): World2D;

/** Returns the active 3D camera. */
get_camera(): Camera;

/** Returns the total transform of the viewport. */
get_final_transform(): Transform2D;

/** Returns the topmost modal in the stack. */
get_modal_stack_top(): Control;

/** Returns the mouse position relative to the viewport. */
get_mouse_position(): Vector2;

/** Returns information about the viewport from the rendering pipeline. */
get_render_info(info: int): int;

/** Returns the [enum ShadowAtlasQuadrantSubdiv] of the specified quadrant. */
get_shadow_atlas_quadrant_subdiv(quadrant: int): int;

/** Returns the size override set with [method set_size_override]. */
get_size_override(): Vector2;

/**
 * Returns the viewport's texture.
 *
 * **Note:** Due to the way OpenGL works, the resulting [ViewportTexture] is flipped vertically. You can use [method Image.flip_y] on the result of [method Texture.get_data] to flip it back, for example:
 *
 * @example 
 * 
 * var img = get_viewport().get_texture().get_data()
 * img.flip_y()
 * @summary 
 * 
 *
*/
get_texture(): ViewportTexture;

/** Returns the viewport's RID from the [VisualServer]. */
get_viewport_rid(): RID;

/** Returns the visible rectangle in global screen coordinates. */
get_visible_rect(): Rect2;

/** Returns the drag data from the GUI, that was previously returned by [method Control.get_drag_data]. */
gui_get_drag_data(): any;

/** Returns [code]true[/code] if there are visible modals on-screen. */
gui_has_modal_stack(): boolean;

/** Returns [code]true[/code] if the viewport is currently performing a drag operation. */
gui_is_dragging(): boolean;

/** No documentation provided. */
input(local_event: InputEvent): void;

/** No documentation provided. */
is_input_handled(): boolean;

/** Returns [code]true[/code] if the size override is enabled. See [method set_size_override]. */
is_size_override_enabled(): boolean;

/** Attaches this [Viewport] to the root [Viewport] with the specified rectangle. This bypasses the need for another node to display this [Viewport] but makes you responsible for updating the position of this [Viewport] manually. */
set_attach_to_screen_rect(rect: Rect2): void;

/** Stops the input from propagating further down the [SceneTree]. */
set_input_as_handled(): void;

/** Sets the number of subdivisions to use in the specified quadrant. A higher number of subdivisions allows you to have more shadows in the scene at once, but reduces the quality of the shadows. A good practice is to have quadrants with a varying number of subdivisions and to have as few subdivisions as possible. */
set_shadow_atlas_quadrant_subdiv(quadrant: int, subdiv: int): void;

/** Sets the size override of the viewport. If the [code]enable[/code] parameter is [code]true[/code] the override is used, otherwise it uses the default size. If the size parameter is [code](-1, -1)[/code], it won't update the size. */
set_size_override(enable: boolean, size?: Vector2, margin?: Vector2): void;

/** No documentation provided. */
unhandled_input(local_event: InputEvent): void;

/** Forces update of the 2D and 3D worlds. */
update_worlds(): void;

/** Warps the mouse to a position relative to the viewport. */
warp_mouse(to_position: Vector2): void;

  connect<T extends SignalsOf<Viewport>>(signal: T, method: SignalFunction<Viewport[T]>): number;



/**
 * Do not update the render target.
 *
*/
static UPDATE_DISABLED: any;

/**
 * Update the render target once, then switch to [constant UPDATE_DISABLED].
 *
*/
static UPDATE_ONCE: any;

/**
 * Update the render target only when it is visible. This is the default value.
 *
*/
static UPDATE_WHEN_VISIBLE: any;

/**
 * Always update the render target.
 *
*/
static UPDATE_ALWAYS: any;

/**
 * This quadrant will not be used.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_DISABLED: any;

/**
 * This quadrant will only be used by one shadow map.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_1: any;

/**
 * This quadrant will be split in 4 and used by up to 4 shadow maps.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_4: any;

/**
 * This quadrant will be split 16 ways and used by up to 16 shadow maps.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_16: any;

/**
 * This quadrant will be split 64 ways and used by up to 64 shadow maps.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_64: any;

/**
 * This quadrant will be split 256 ways and used by up to 256 shadow maps. Unless the [member shadow_atlas_size] is very high, the shadows in this quadrant will be very low resolution.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_256: any;

/**
 * This quadrant will be split 1024 ways and used by up to 1024 shadow maps. Unless the [member shadow_atlas_size] is very high, the shadows in this quadrant will be very low resolution.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_1024: any;

/**
 * Represents the size of the [enum ShadowAtlasQuadrantSubdiv] enum.
 *
*/
static SHADOW_ATLAS_QUADRANT_SUBDIV_MAX: any;

/**
 * Amount of objects in frame.
 *
*/
static RENDER_INFO_OBJECTS_IN_FRAME: any;

/**
 * Amount of vertices in frame.
 *
*/
static RENDER_INFO_VERTICES_IN_FRAME: any;

/**
 * Amount of material changes in frame.
 *
*/
static RENDER_INFO_MATERIAL_CHANGES_IN_FRAME: any;

/**
 * Amount of shader changes in frame.
 *
*/
static RENDER_INFO_SHADER_CHANGES_IN_FRAME: any;

/**
 * Amount of surface changes in frame.
 *
*/
static RENDER_INFO_SURFACE_CHANGES_IN_FRAME: any;

/**
 * Amount of draw calls in frame.
 *
*/
static RENDER_INFO_DRAW_CALLS_IN_FRAME: any;

/**
 * Amount of items or joined items in frame.
 *
*/
static RENDER_INFO_2D_ITEMS_IN_FRAME: any;

/**
 * Amount of draw calls in frame.
 *
*/
static RENDER_INFO_2D_DRAW_CALLS_IN_FRAME: any;

/**
 * Represents the size of the [enum RenderInfo] enum.
 *
*/
static RENDER_INFO_MAX: any;

/**
 * Objects are displayed normally.
 *
*/
static DEBUG_DRAW_DISABLED: any;

/**
 * Objects are displayed without light information.
 *
*/
static DEBUG_DRAW_UNSHADED: any;

/**
 * Objected are displayed semi-transparent with additive blending so you can see where they intersect.
 *
*/
static DEBUG_DRAW_OVERDRAW: any;

/**
 * Objects are displayed in wireframe style.
 *
*/
static DEBUG_DRAW_WIREFRAME: any;

/**
 * Multisample anti-aliasing mode disabled. This is the default value.
 *
*/
static MSAA_DISABLED: any;

/**
 * Use 2x Multisample Antialiasing.
 *
*/
static MSAA_2X: any;

/**
 * Use 4x Multisample Antialiasing.
 *
*/
static MSAA_4X: any;

/**
 * Use 8x Multisample Antialiasing. Likely unsupported on low-end and older hardware.
 *
*/
static MSAA_8X: any;

/**
 * Use 16x Multisample Antialiasing. Likely unsupported on medium and low-end hardware.
 *
*/
static MSAA_16X: any;

/**
 * Allocates all buffers needed for drawing 2D scenes. This takes less VRAM than the 3D usage modes. Note that 3D rendering effects such as glow and HDR are not available when using this mode.
 *
*/
static USAGE_2D: any;

/**
 * Allocates buffers needed for 2D scenes without allocating a buffer for screen copy. Accordingly, you cannot read from the screen. Of the [enum Usage] types, this requires the least VRAM. Note that 3D rendering effects such as glow and HDR are not available when using this mode.
 *
*/
static USAGE_2D_NO_SAMPLING: any;

/**
 * Allocates full buffers for drawing 3D scenes and all 3D effects including buffers needed for 2D scenes and effects.
 *
*/
static USAGE_3D: any;

/**
 * Allocates buffers needed for drawing 3D scenes. But does not allocate buffers needed for reading from the screen and post-processing effects. Saves some VRAM.
 *
*/
static USAGE_3D_NO_EFFECTS: any;

/**
 * Always clear the render target before drawing.
 *
*/
static CLEAR_MODE_ALWAYS: any;

/**
 * Never clear the render target.
 *
*/
static CLEAR_MODE_NEVER: any;

/**
 * Clear the render target next frame, then switch to [constant CLEAR_MODE_NEVER].
 *
*/
static CLEAR_MODE_ONLY_NEXT_FRAME: any;


/**
 * Emitted when a Control node grabs keyboard focus.
 *
*/
$gui_focus_changed: Signal<(node: Control) => void>

/**
 * Emitted when the size of the viewport is changed, whether by [method set_size_override], resize of window, or some other means.
 *
*/
$size_changed: Signal<() => void>

}

