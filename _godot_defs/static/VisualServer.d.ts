
/**
 * Server for anything visible. The visual server is the API backend for everything visible. The whole scene system mounts on it to display.
 *
 * The visual server is completely opaque, the internals are entirely implementation specific and cannot be accessed.
 *
 * The visual server can be used to bypass the scene system entirely.
 *
 * Resources are created using the `*_create` functions.
 *
 * All objects are drawn to a viewport. You can use the [Viewport] attached to the [SceneTree] or you can create one yourself with [method viewport_create]. When using a custom scenario or canvas, the scenario or canvas needs to be attached to the viewport using [method viewport_set_scenario] or [method viewport_attach_canvas].
 *
 * In 3D, all visual objects must be associated with a scenario. The scenario is a visual representation of the world. If accessing the visual server from a running game, the scenario can be accessed from the scene tree from any [Spatial] node with [method Spatial.get_world]. Otherwise, a scenario can be created with [method scenario_create].
 *
 * Similarly in 2D, a canvas is needed to draw all canvas items.
 *
 * In 3D, all visible objects are comprised of a resource and an instance. A resource can be a mesh, a particle system, a light, or any other 3D object. In order to be visible resources must be attached to an instance using [method instance_set_base]. The instance must also be attached to the scenario using [method instance_set_scenario] in order to be visible.
 *
 * In 2D, all visible objects are some form of canvas item. In order to be visible, a canvas item needs to be the child of a canvas attached to a viewport, or it needs to be the child of another canvas item that is eventually attached to the canvas.
 *
*/
declare class VisualServerClass extends Object {

  
/**
 * Server for anything visible. The visual server is the API backend for everything visible. The whole scene system mounts on it to display.
 *
 * The visual server is completely opaque, the internals are entirely implementation specific and cannot be accessed.
 *
 * The visual server can be used to bypass the scene system entirely.
 *
 * Resources are created using the `*_create` functions.
 *
 * All objects are drawn to a viewport. You can use the [Viewport] attached to the [SceneTree] or you can create one yourself with [method viewport_create]. When using a custom scenario or canvas, the scenario or canvas needs to be attached to the viewport using [method viewport_set_scenario] or [method viewport_attach_canvas].
 *
 * In 3D, all visual objects must be associated with a scenario. The scenario is a visual representation of the world. If accessing the visual server from a running game, the scenario can be accessed from the scene tree from any [Spatial] node with [method Spatial.get_world]. Otherwise, a scenario can be created with [method scenario_create].
 *
 * Similarly in 2D, a canvas is needed to draw all canvas items.
 *
 * In 3D, all visible objects are comprised of a resource and an instance. A resource can be a mesh, a particle system, a light, or any other 3D object. In order to be visible resources must be attached to an instance using [method instance_set_base]. The instance must also be attached to the scenario using [method instance_set_scenario] in order to be visible.
 *
 * In 2D, all visible objects are some form of canvas item. In order to be visible, a canvas item needs to be the child of a canvas attached to a viewport, or it needs to be the child of another canvas item that is eventually attached to the canvas.
 *
*/
  "new"(): VisualServerClass;
  static "new"(): VisualServerClass;



/** If [code]false[/code], disables rendering completely, but the engine logic is still being processed. You can call [method force_draw] to draw a frame even with rendering disabled. */
render_loop_enabled: boolean;

/** Sets images to be rendered in the window margin. */
black_bars_set_images(left: RID, top: RID, right: RID, bottom: RID): void;

/** Sets margin size, where black bars (or images, if [method black_bars_set_images] was used) are rendered. */
black_bars_set_margins(left: int, top: int, right: int, bottom: int): void;

/**
 * Creates a camera and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `camera_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
camera_create(): RID;

/** Sets the cull mask associated with this camera. The cull mask describes which 3D layers are rendered by this camera. Equivalent to [member Camera.cull_mask]. */
camera_set_cull_mask(camera: RID, layers: int): void;

/** Sets the environment used by this camera. Equivalent to [member Camera.environment]. */
camera_set_environment(camera: RID, env: RID): void;

/** Sets camera to use frustum projection. This mode allows adjusting the [code]offset[/code] argument to create "tilted frustum" effects. */
camera_set_frustum(camera: RID, size: float, offset: Vector2, z_near: float, z_far: float): void;

/** Sets camera to use orthogonal projection, also known as orthographic projection. Objects remain the same size on the screen no matter how far away they are. */
camera_set_orthogonal(camera: RID, size: float, z_near: float, z_far: float): void;

/** Sets camera to use perspective projection. Objects on the screen becomes smaller when they are far away. */
camera_set_perspective(camera: RID, fovy_degrees: float, z_near: float, z_far: float): void;

/** Sets [Transform] of camera. */
camera_set_transform(camera: RID, transform: Transform): void;

/** If [code]true[/code], preserves the horizontal aspect ratio which is equivalent to [constant Camera.KEEP_WIDTH]. If [code]false[/code], preserves the vertical aspect ratio which is equivalent to [constant Camera.KEEP_HEIGHT]. */
camera_set_use_vertical_aspect(camera: RID, enable: boolean): void;

/**
 * Creates a canvas and returns the assigned [RID]. It can be accessed with the RID that is returned. This RID will be used in all `canvas_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
canvas_create(): RID;

/** Adds a circle command to the [CanvasItem]'s draw commands. */
canvas_item_add_circle(item: RID, pos: Vector2, radius: float, color: Color): void;

/** If ignore is [code]true[/code], the VisualServer does not perform clipping. */
canvas_item_add_clip_ignore(item: RID, ignore: boolean): void;

/** Adds a line command to the [CanvasItem]'s draw commands. */
canvas_item_add_line(item: RID, from: Vector2, to: Vector2, color: Color, width?: float, antialiased?: boolean): void;

/** Adds a mesh command to the [CanvasItem]'s draw commands. */
canvas_item_add_mesh(item: RID, mesh: RID, transform?: Transform2D, modulate?: Color, texture: RID, normal_map: RID): void;

/** Adds a [MultiMesh] to the [CanvasItem]'s draw commands. Only affects its aabb at the moment. */
canvas_item_add_multimesh(item: RID, mesh: RID, texture: RID, normal_map: RID): void;

/**
 * Adds a nine patch image to the [CanvasItem]'s draw commands.
 *
 * See [NinePatchRect] for more explanation.
 *
*/
canvas_item_add_nine_patch(item: RID, rect: Rect2, source: Rect2, texture: RID, topleft: Vector2, bottomright: Vector2, x_axis_mode?: int, y_axis_mode?: int, draw_center?: boolean, modulate?: Color, normal_map: RID): void;

/** Adds a particle system to the [CanvasItem]'s draw commands. */
canvas_item_add_particles(item: RID, particles: RID, texture: RID, normal_map: RID): void;

/** Adds a polygon to the [CanvasItem]'s draw commands. */
canvas_item_add_polygon(item: RID, points: PoolVector2Array, colors: PoolColorArray, uvs?: PoolVector2Array, texture: RID, normal_map: RID, antialiased?: boolean): void;

/** Adds a polyline, which is a line from multiple points with a width, to the [CanvasItem]'s draw commands. */
canvas_item_add_polyline(item: RID, points: PoolVector2Array, colors: PoolColorArray, width?: float, antialiased?: boolean): void;

/** Adds a primitive to the [CanvasItem]'s draw commands. */
canvas_item_add_primitive(item: RID, points: PoolVector2Array, colors: PoolColorArray, uvs: PoolVector2Array, texture: RID, width?: float, normal_map: RID): void;

/** Adds a rectangle to the [CanvasItem]'s draw commands. */
canvas_item_add_rect(item: RID, rect: Rect2, color: Color): void;

/**
 * Adds a [Transform2D] command to the [CanvasItem]'s draw commands.
 *
 * This sets the extra_matrix uniform when executed. This affects the later commands of the canvas item.
 *
*/
canvas_item_add_set_transform(item: RID, transform: Transform2D): void;

/** Adds a textured rect to the [CanvasItem]'s draw commands. */
canvas_item_add_texture_rect(item: RID, rect: Rect2, texture: RID, tile?: boolean, modulate?: Color, transpose?: boolean, normal_map: RID): void;

/** Adds a texture rect with region setting to the [CanvasItem]'s draw commands. */
canvas_item_add_texture_rect_region(item: RID, rect: Rect2, texture: RID, src_rect: Rect2, modulate?: Color, transpose?: boolean, normal_map: RID, clip_uv?: boolean): void;

/** Adds a triangle array to the [CanvasItem]'s draw commands. */
canvas_item_add_triangle_array(item: RID, indices: PoolIntArray, points: PoolVector2Array, colors: PoolColorArray, uvs?: PoolVector2Array, bones?: PoolIntArray, weights?: PoolRealArray, texture: RID, count?: int, normal_map: RID, antialiased?: boolean, antialiasing_use_indices?: boolean): void;

/** Clears the [CanvasItem] and removes all commands in it. */
canvas_item_clear(item: RID): void;

/**
 * Creates a new [CanvasItem] and returns its [RID]. It can be accessed with the RID that is returned. This RID will be used in all `canvas_item_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
canvas_item_create(): RID;

/** Sets clipping for the [CanvasItem]. */
canvas_item_set_clip(item: RID, clip: boolean): void;

/** Sets the [CanvasItem] to copy a rect to the backbuffer. */
canvas_item_set_copy_to_backbuffer(item: RID, enabled: boolean, rect: Rect2): void;

/** Defines a custom drawing rectangle for the [CanvasItem]. */
canvas_item_set_custom_rect(item: RID, use_custom_rect: boolean, rect?: Rect2): void;

/** Enables the use of distance fields for GUI elements that are rendering distance field based fonts. */
canvas_item_set_distance_field_mode(item: RID, enabled: boolean): void;

/** Sets [CanvasItem] to be drawn behind its parent. */
canvas_item_set_draw_behind_parent(item: RID, enabled: boolean): void;

/** Sets the index for the [CanvasItem]. */
canvas_item_set_draw_index(item: RID, index: int): void;

/** The light mask. See [LightOccluder2D] for more information on light masks. */
canvas_item_set_light_mask(item: RID, mask: int): void;

/** Sets a new material to the [CanvasItem]. */
canvas_item_set_material(item: RID, material: RID): void;

/** Sets the color that modulates the [CanvasItem] and its children. */
canvas_item_set_modulate(item: RID, color: Color): void;

/** Sets the parent for the [CanvasItem]. The parent can be another canvas item, or it can be the root canvas that is attached to the viewport. */
canvas_item_set_parent(item: RID, parent: RID): void;

/** Sets the color that modulates the [CanvasItem] without children. */
canvas_item_set_self_modulate(item: RID, color: Color): void;

/** Sets if [CanvasItem]'s children should be sorted by y-position. */
canvas_item_set_sort_children_by_y(item: RID, enabled: boolean): void;

/** Sets the [CanvasItem]'s [Transform2D]. */
canvas_item_set_transform(item: RID, transform: Transform2D): void;

/** Sets if the [CanvasItem] uses its parent's material. */
canvas_item_set_use_parent_material(item: RID, enabled: boolean): void;

/** Sets if the canvas item (including its children) is visible. */
canvas_item_set_visible(item: RID, visible: boolean): void;

/** If this is enabled, the Z index of the parent will be added to the children's Z index. */
canvas_item_set_z_as_relative_to_parent(item: RID, enabled: boolean): void;

/** Sets the [CanvasItem]'s Z index, i.e. its draw order (lower indexes are drawn first). */
canvas_item_set_z_index(item: RID, z_index: int): void;

/** Attaches the canvas light to the canvas. Removes it from its previous canvas. */
canvas_light_attach_to_canvas(light: RID, canvas: RID): void;

/**
 * Creates a canvas light and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_light_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
canvas_light_create(): RID;

/** Attaches a light occluder to the canvas. Removes it from its previous canvas. */
canvas_light_occluder_attach_to_canvas(occluder: RID, canvas: RID): void;

/**
 * Creates a light occluder and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_light_ocluder_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
canvas_light_occluder_create(): RID;

/** Enables or disables light occluder. */
canvas_light_occluder_set_enabled(occluder: RID, enabled: boolean): void;

/** The light mask. See [LightOccluder2D] for more information on light masks. */
canvas_light_occluder_set_light_mask(occluder: RID, mask: int): void;

/** Sets a light occluder's polygon. */
canvas_light_occluder_set_polygon(occluder: RID, polygon: RID): void;

/** Sets a light occluder's [Transform2D]. */
canvas_light_occluder_set_transform(occluder: RID, transform: Transform2D): void;

/** Sets the color for a light. */
canvas_light_set_color(light: RID, color: Color): void;

/** Enables or disables a canvas light. */
canvas_light_set_enabled(light: RID, enabled: boolean): void;

/** Sets a canvas light's energy. */
canvas_light_set_energy(light: RID, energy: float): void;

/** Sets a canvas light's height. */
canvas_light_set_height(light: RID, height: float): void;

/** The light mask. See [LightOccluder2D] for more information on light masks. */
canvas_light_set_item_cull_mask(light: RID, mask: int): void;

/** The binary mask used to determine which layers this canvas light's shadows affects. See [LightOccluder2D] for more information on light masks. */
canvas_light_set_item_shadow_cull_mask(light: RID, mask: int): void;

/** The layer range that gets rendered with this light. */
canvas_light_set_layer_range(light: RID, min_layer: int, max_layer: int): void;

/** The mode of the light, see [enum CanvasLightMode] constants. */
canvas_light_set_mode(light: RID, mode: int): void;

/** Sets the texture's scale factor of the light. Equivalent to [member Light2D.texture_scale]. */
canvas_light_set_scale(light: RID, scale: float): void;

/** Sets the width of the shadow buffer, size gets scaled to the next power of two for this. */
canvas_light_set_shadow_buffer_size(light: RID, size: int): void;

/** Sets the color of the canvas light's shadow. */
canvas_light_set_shadow_color(light: RID, color: Color): void;

/** Enables or disables the canvas light's shadow. */
canvas_light_set_shadow_enabled(light: RID, enabled: boolean): void;

/** Sets the canvas light's shadow's filter, see [enum CanvasLightShadowFilter] constants. */
canvas_light_set_shadow_filter(light: RID, filter: int): void;

/** Sets the length of the shadow's gradient. */
canvas_light_set_shadow_gradient_length(light: RID, length: float): void;

/** Smoothens the shadow. The lower, the smoother. */
canvas_light_set_shadow_smooth(light: RID, smooth: float): void;

/** Sets texture to be used by light. Equivalent to [member Light2D.texture]. */
canvas_light_set_texture(light: RID, texture: RID): void;

/** Sets the offset of the light's texture. Equivalent to [member Light2D.offset]. */
canvas_light_set_texture_offset(light: RID, offset: Vector2): void;

/** Sets the canvas light's [Transform2D]. */
canvas_light_set_transform(light: RID, transform: Transform2D): void;

/** Sets the Z range of objects that will be affected by this light. Equivalent to [member Light2D.range_z_min] and [member Light2D.range_z_max]. */
canvas_light_set_z_range(light: RID, min_z: int, max_z: int): void;

/**
 * Creates a new light occluder polygon and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_occluder_polygon_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
canvas_occluder_polygon_create(): RID;

/** Sets an occluder polygons cull mode. See [enum CanvasOccluderPolygonCullMode] constants. */
canvas_occluder_polygon_set_cull_mode(occluder_polygon: RID, mode: int): void;

/** Sets the shape of the occluder polygon. */
canvas_occluder_polygon_set_shape(occluder_polygon: RID, shape: PoolVector2Array, closed: boolean): void;

/** Sets the shape of the occluder polygon as lines. */
canvas_occluder_polygon_set_shape_as_lines(occluder_polygon: RID, shape: PoolVector2Array): void;

/** A copy of the canvas item will be drawn with a local offset of the mirroring [Vector2]. */
canvas_set_item_mirroring(canvas: RID, item: RID, mirroring: Vector2): void;

/** Modulates all colors in the given canvas. */
canvas_set_modulate(canvas: RID, color: Color): void;

/**
 * Creates a directional light and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this directional light to an instance using [method instance_set_base] using the returned RID.
 *
*/
directional_light_create(): RID;

/** Draws a frame. [i]This method is deprecated[/i], please use [method force_draw] instead. */
draw(swap_buffers?: boolean, frame_step?: float): void;

/**
 * Creates an environment and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `environment_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
environment_create(): RID;

/** Sets the values to be used with the "Adjustment" post-process effect. See [Environment] for more details. */
environment_set_adjustment(env: RID, enable: boolean, brightness: float, contrast: float, saturation: float, ramp: RID): void;

/** Sets the ambient light parameters. See [Environment] for more details. */
environment_set_ambient_light(env: RID, color: Color, energy?: float, sky_contibution?: float): void;

/** Sets the [i]BGMode[/i] of the environment. Equivalent to [member Environment.background_mode]. */
environment_set_background(env: RID, bg: int): void;

/** Color displayed for clear areas of the scene (if using Custom color or Color+Sky background modes). */
environment_set_bg_color(env: RID, color: Color): void;

/** Sets the intensity of the background color. */
environment_set_bg_energy(env: RID, energy: float): void;

/** Sets the maximum layer to use if using Canvas background mode. */
environment_set_canvas_max_layer(env: RID, max_layer: int): void;

/** Sets the values to be used with the "DoF Far Blur" post-process effect. See [Environment] for more details. */
environment_set_dof_blur_far(env: RID, enable: boolean, distance: float, transition: float, far_amount: float, quality: int): void;

/** Sets the values to be used with the "DoF Near Blur" post-process effect. See [Environment] for more details. */
environment_set_dof_blur_near(env: RID, enable: boolean, distance: float, transition: float, far_amount: float, quality: int): void;

/** Sets the variables to be used with the scene fog. See [Environment] for more details. */
environment_set_fog(env: RID, enable: boolean, color: Color, sun_color: Color, sun_amount: float): void;

/** Sets the variables to be used with the fog depth effect. See [Environment] for more details. */
environment_set_fog_depth(env: RID, enable: boolean, depth_begin: float, depth_end: float, depth_curve: float, transmit: boolean, transmit_curve: float): void;

/** Sets the variables to be used with the fog height effect. See [Environment] for more details. */
environment_set_fog_height(env: RID, enable: boolean, min_height: float, max_height: float, height_curve: float): void;

/** Sets the variables to be used with the "glow" post-process effect. See [Environment] for more details. */
environment_set_glow(env: RID, enable: boolean, level_flags: int, intensity: float, strength: float, bloom_threshold: float, blend_mode: int, hdr_bleed_threshold: float, hdr_bleed_scale: float, hdr_luminance_cap: float, bicubic_upscale: boolean): void;

/** Sets the [Sky] to be used as the environment's background when using [i]BGMode[/i] sky. Equivalent to [member Environment.background_sky]. */
environment_set_sky(env: RID, sky: RID): void;

/** Sets a custom field of view for the background [Sky]. Equivalent to [member Environment.background_sky_custom_fov]. */
environment_set_sky_custom_fov(env: RID, scale: float): void;

/** Sets the rotation of the background [Sky] expressed as a [Basis]. Equivalent to [member Environment.background_sky_orientation]. */
environment_set_sky_orientation(env: RID, orientation: Basis): void;

/** Sets the variables to be used with the "Screen Space Ambient Occlusion (SSAO)" post-process effect. See [Environment] for more details. */
environment_set_ssao(env: RID, enable: boolean, radius: float, intensity: float, radius2: float, intensity2: float, bias: float, light_affect: float, ao_channel_affect: float, color: Color, quality: int, blur: int, bilateral_sharpness: float): void;

/** Sets the variables to be used with the "screen space reflections" post-process effect. See [Environment] for more details. */
environment_set_ssr(env: RID, enable: boolean, max_steps: int, fade_in: float, fade_out: float, depth_tolerance: float, roughness: boolean): void;

/** Sets the variables to be used with the "tonemap" post-process effect. See [Environment] for more details. */
environment_set_tonemap(env: RID, tone_mapper: int, exposure: float, white: float, auto_exposure: boolean, min_luminance: float, max_luminance: float, auto_exp_speed: float, auto_exp_grey: float): void;

/** Removes buffers and clears testcubes. */
finish(): void;

/** Forces a frame to be drawn when the function is called. Drawing a frame updates all [Viewport]s that are set to update. Use with extreme caution. */
force_draw(swap_buffers?: boolean, frame_step?: float): void;

/** Synchronizes threads. */
force_sync(): void;

/** Tries to free an object in the VisualServer. */
free_rid(rid: RID): void;

/** Returns a certain information, see [enum RenderInfo] for options. */
get_render_info(info: int): int;

/** Returns the id of the test cube. Creates one if none exists. */
get_test_cube(): RID;

/** Returns the id of the test texture. Creates one if none exists. */
get_test_texture(): RID;

/**
 * Returns the name of the video adapter (e.g. "GeForce GTX 1080/PCIe/SSE2").
 *
 * **Note:** When running a headless or server binary, this function returns an empty string.
 *
*/
get_video_adapter_name(): string;

/**
 * Returns the vendor of the video adapter (e.g. "NVIDIA Corporation").
 *
 * **Note:** When running a headless or server binary, this function returns an empty string.
 *
*/
get_video_adapter_vendor(): string;

/** Returns the id of a white texture. Creates one if none exists. */
get_white_texture(): RID;

/**
 * Creates a GI probe and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `gi_probe_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this GI probe to an instance using [method instance_set_base] using the returned RID.
 *
*/
gi_probe_create(): RID;

/** Returns the bias value for the GI probe. Bias is used to avoid self occlusion. Equivalent to [member GIProbeData.bias]. */
gi_probe_get_bias(probe: RID): float;

/** Returns the axis-aligned bounding box that covers the full extent of the GI probe. */
gi_probe_get_bounds(probe: RID): AABB;

/** Returns the cell size set by [method gi_probe_set_cell_size]. */
gi_probe_get_cell_size(probe: RID): float;

/** Returns the data used by the GI probe. */
gi_probe_get_dynamic_data(probe: RID): PoolIntArray;

/** Returns the dynamic range set for this GI probe. Equivalent to [member GIProbe.dynamic_range]. */
gi_probe_get_dynamic_range(probe: RID): int;

/** Returns the energy multiplier for this GI probe. Equivalent to [member GIProbe.energy]. */
gi_probe_get_energy(probe: RID): float;

/** Returns the normal bias for this GI probe. Equivalent to [member GIProbe.normal_bias]. */
gi_probe_get_normal_bias(probe: RID): float;

/** Returns the propagation value for this GI probe. Equivalent to [member GIProbe.propagation]. */
gi_probe_get_propagation(probe: RID): float;

/** Returns the Transform set by [method gi_probe_set_to_cell_xform]. */
gi_probe_get_to_cell_xform(probe: RID): Transform;

/** Returns [code]true[/code] if the GI probe data associated with this GI probe is compressed. Equivalent to [member GIProbe.compress]. */
gi_probe_is_compressed(probe: RID): boolean;

/** Returns [code]true[/code] if the GI probe is set to interior, meaning it does not account for sky light. Equivalent to [member GIProbe.interior]. */
gi_probe_is_interior(probe: RID): boolean;

/** Sets the bias value to avoid self-occlusion. Equivalent to [member GIProbe.bias]. */
gi_probe_set_bias(probe: RID, bias: float): void;

/** Sets the axis-aligned bounding box that covers the extent of the GI probe. */
gi_probe_set_bounds(probe: RID, bounds: AABB): void;

/** Sets the size of individual cells within the GI probe. */
gi_probe_set_cell_size(probe: RID, range: float): void;

/** Sets the compression setting for the GI probe data. Compressed data will take up less space but may look worse. Equivalent to [member GIProbe.compress]. */
gi_probe_set_compress(probe: RID, enable: boolean): void;

/** Sets the data to be used in the GI probe for lighting calculations. Normally this is created and called internally within the [GIProbe] node. You should not try to set this yourself. */
gi_probe_set_dynamic_data(probe: RID, data: PoolIntArray): void;

/** Sets the dynamic range of the GI probe. Dynamic range sets the limit for how bright lights can be. A smaller range captures greater detail but limits how bright lights can be. Equivalent to [member GIProbe.dynamic_range]. */
gi_probe_set_dynamic_range(probe: RID, range: int): void;

/** Sets the energy multiplier for this GI probe. A higher energy makes the indirect light from the GI probe brighter. Equivalent to [member GIProbe.energy]. */
gi_probe_set_energy(probe: RID, energy: float): void;

/** Sets the interior value of this GI probe. A GI probe set to interior does not include the sky when calculating lighting. Equivalent to [member GIProbe.interior]. */
gi_probe_set_interior(probe: RID, enable: boolean): void;

/** Sets the normal bias for this GI probe. Normal bias behaves similar to the other form of bias and may help reduce self-occlusion. Equivalent to [member GIProbe.normal_bias]. */
gi_probe_set_normal_bias(probe: RID, bias: float): void;

/** Sets the propagation of light within this GI probe. Equivalent to [member GIProbe.propagation]. */
gi_probe_set_propagation(probe: RID, propagation: float): void;

/** Sets the to cell [Transform] for this GI probe. */
gi_probe_set_to_cell_xform(probe: RID, xform: Transform): void;

/** Returns [code]true[/code] if changes have been made to the VisualServer's data. [method draw] is usually called if this happens. */
has_changed(): boolean;

/** Not yet implemented. Always returns [code]false[/code]. */
has_feature(feature: int): boolean;

/** Returns [code]true[/code] if the OS supports a certain feature. Features might be [code]s3tc[/code], [code]etc[/code], [code]etc2[/code] and [code]pvrtc[/code]. */
has_os_feature(feature: string): boolean;

/** Sets up [ImmediateGeometry] internals to prepare for drawing. Equivalent to [method ImmediateGeometry.begin]. */
immediate_begin(immediate: RID, primitive: int, texture: RID): void;

/** Clears everything that was set up between [method immediate_begin] and [method immediate_end]. Equivalent to [method ImmediateGeometry.clear]. */
immediate_clear(immediate: RID): void;

/** Sets the color to be used with next vertex. Equivalent to [method ImmediateGeometry.set_color]. */
immediate_color(immediate: RID, color: Color): void;

/**
 * Creates an immediate geometry and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `immediate_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this immediate geometry to an instance using [method instance_set_base] using the returned RID.
 *
*/
immediate_create(): RID;

/** Ends drawing the [ImmediateGeometry] and displays it. Equivalent to [method ImmediateGeometry.end]. */
immediate_end(immediate: RID): void;

/** Returns the material assigned to the [ImmediateGeometry]. */
immediate_get_material(immediate: RID): RID;

/** Sets the normal to be used with next vertex. Equivalent to [method ImmediateGeometry.set_normal]. */
immediate_normal(immediate: RID, normal: Vector3): void;

/** Sets the material to be used to draw the [ImmediateGeometry]. */
immediate_set_material(immediate: RID, material: RID): void;

/** Sets the tangent to be used with next vertex. Equivalent to [method ImmediateGeometry.set_tangent]. */
immediate_tangent(immediate: RID, tangent: Plane): void;

/** Sets the UV to be used with next vertex. Equivalent to [method ImmediateGeometry.set_uv]. */
immediate_uv(immediate: RID, tex_uv: Vector2): void;

/** Sets the UV2 to be used with next vertex. Equivalent to [method ImmediateGeometry.set_uv2]. */
immediate_uv2(immediate: RID, tex_uv: Vector2): void;

/** Adds the next vertex using the information provided in advance. Equivalent to [method ImmediateGeometry.add_vertex]. */
immediate_vertex(immediate: RID, vertex: Vector3): void;

/** Adds the next vertex using the information provided in advance. This is a helper class that calls [method immediate_vertex] under the hood. Equivalent to [method ImmediateGeometry.add_vertex]. */
immediate_vertex_2d(immediate: RID, vertex: Vector2): void;

/** Initializes the visual server. This function is called internally by platform-dependent code during engine initialization. If called from a running game, it will not do anything. */
init(): void;

/** Attaches a unique Object ID to instance. Object ID must be attached to instance for proper culling with [method instances_cull_aabb], [method instances_cull_convex], and [method instances_cull_ray]. */
instance_attach_object_instance_id(instance: RID, id: int): void;

/** Attaches a skeleton to an instance. Removes the previous skeleton from the instance. */
instance_attach_skeleton(instance: RID, skeleton: RID): void;

/**
 * Creates a visual instance and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `instance_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * An instance is a way of placing a 3D object in the scenario. Objects like particles, meshes, and reflection probes need to be associated with an instance to be visible in the scenario using [method instance_set_base].
 *
*/
instance_create(): RID;

/**
 * Creates a visual instance, adds it to the VisualServer, and sets both base and scenario. It can be accessed with the RID that is returned. This RID will be used in all `instance_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
instance_create2(base: RID, scenario: RID): RID;

/** Not implemented in Godot 3.x. */
instance_geometry_set_as_instance_lod(instance: RID, as_lod_of_instance: RID): void;

/** Sets the shadow casting setting to one of [enum ShadowCastingSetting]. Equivalent to [member GeometryInstance.cast_shadow]. */
instance_geometry_set_cast_shadows_setting(instance: RID, shadow_casting_setting: int): void;

/** Not implemented in Godot 3.x. */
instance_geometry_set_draw_range(instance: RID, min: float, max: float, min_margin: float, max_margin: float): void;

/** Sets the flag for a given [enum InstanceFlags]. See [enum InstanceFlags] for more details. */
instance_geometry_set_flag(instance: RID, flag: int, enabled: boolean): void;

/** Sets a material that will override the material for all surfaces on the mesh associated with this instance. Equivalent to [member GeometryInstance.material_override]. */
instance_geometry_set_material_override(instance: RID, material: RID): void;

/** Sets the base of the instance. A base can be any of the 3D objects that are created in the VisualServer that can be displayed. For example, any of the light types, mesh, multimesh, immediate geometry, particle system, reflection probe, lightmap capture, and the GI probe are all types that can be set as the base of an instance in order to be displayed in the scenario. */
instance_set_base(instance: RID, base: RID): void;

/** Sets the weight for a given blend shape associated with this instance. */
instance_set_blend_shape_weight(instance: RID, shape: int, weight: float): void;

/** Sets a custom AABB to use when culling objects from the view frustum. Equivalent to [method GeometryInstance.set_custom_aabb]. */
instance_set_custom_aabb(instance: RID, aabb: AABB): void;

/** Function not implemented in Godot 3.x. */
instance_set_exterior(instance: RID, enabled: boolean): void;

/** Sets a margin to increase the size of the AABB when culling objects from the view frustum. This allows you avoid culling objects that fall outside the view frustum. Equivalent to [member GeometryInstance.extra_cull_margin]. */
instance_set_extra_visibility_margin(instance: RID, margin: float): void;

/** Sets the render layers that this instance will be drawn to. Equivalent to [member VisualInstance.layers]. */
instance_set_layer_mask(instance: RID, mask: int): void;

/** Sets the scenario that the instance is in. The scenario is the 3D world that the objects will be displayed in. */
instance_set_scenario(instance: RID, scenario: RID): void;

/** Sets the material of a specific surface. Equivalent to [method MeshInstance.set_surface_material]. */
instance_set_surface_material(instance: RID, surface: int, material: RID): void;

/** Sets the world space transform of the instance. Equivalent to [member Spatial.transform]. */
instance_set_transform(instance: RID, transform: Transform): void;

/** Sets the lightmap to use with this instance. */
instance_set_use_lightmap(instance: RID, lightmap_instance: RID, lightmap: RID): void;

/** Sets whether an instance is drawn or not. Equivalent to [member Spatial.visible]. */
instance_set_visible(instance: RID, visible: boolean): void;

/**
 * Returns an array of object IDs intersecting with the provided AABB. Only visual 3D nodes are considered, such as [MeshInstance] or [DirectionalLight]. Use [method @GDScript.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World] you want to query. This forces an update for all resources queued to update.
 *
 * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
 *
*/
instances_cull_aabb(aabb: AABB, scenario: RID): any[];

/**
 * Returns an array of object IDs intersecting with the provided convex shape. Only visual 3D nodes are considered, such as [MeshInstance] or [DirectionalLight]. Use [method @GDScript.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World] you want to query. This forces an update for all resources queued to update.
 *
 * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
 *
*/
instances_cull_convex(convex: any[], scenario: RID): any[];

/**
 * Returns an array of object IDs intersecting with the provided 3D ray. Only visual 3D nodes are considered, such as [MeshInstance] or [DirectionalLight]. Use [method @GDScript.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World] you want to query. This forces an update for all resources queued to update.
 *
 * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
 *
*/
instances_cull_ray(from: Vector3, to: Vector3, scenario: RID): any[];

/** If [code]true[/code], this directional light will blend between shadow map splits resulting in a smoother transition between them. Equivalent to [member DirectionalLight.directional_shadow_blend_splits]. */
light_directional_set_blend_splits(light: RID, enable: boolean): void;

/** Sets the shadow depth range mode for this directional light. Equivalent to [member DirectionalLight.directional_shadow_depth_range]. See [enum LightDirectionalShadowDepthRangeMode] for options. */
light_directional_set_shadow_depth_range_mode(light: RID, range_mode: int): void;

/** Sets the shadow mode for this directional light. Equivalent to [member DirectionalLight.directional_shadow_mode]. See [enum LightDirectionalShadowMode] for options. */
light_directional_set_shadow_mode(light: RID, mode: int): void;

/** Sets whether to use vertical or horizontal detail for this omni light. This can be used to alleviate artifacts in the shadow map. Equivalent to [member OmniLight.omni_shadow_detail]. */
light_omni_set_shadow_detail(light: RID, detail: int): void;

/** Sets whether to use a dual paraboloid or a cubemap for the shadow map. Dual paraboloid is faster but may suffer from artifacts. Equivalent to [member OmniLight.omni_shadow_mode]. */
light_omni_set_shadow_mode(light: RID, mode: int): void;

/** Sets the color of the light. Equivalent to [member Light.light_color]. */
light_set_color(light: RID, color: Color): void;

/** Sets the cull mask for this Light. Lights only affect objects in the selected layers. Equivalent to [member Light.light_cull_mask]. */
light_set_cull_mask(light: RID, mask: int): void;

/** If [code]true[/code], light will subtract light instead of adding light. Equivalent to [member Light.light_negative]. */
light_set_negative(light: RID, enable: boolean): void;

/** Sets the specified light parameter. See [enum LightParam] for options. Equivalent to [method Light.set_param]. */
light_set_param(light: RID, param: int, value: float): void;

/** Not implemented in Godot 3.x. */
light_set_projector(light: RID, texture: RID): void;

/** If [code]true[/code], reverses the backface culling of the mesh. This can be useful when you have a flat mesh that has a light behind it. If you need to cast a shadow on both sides of the mesh, set the mesh to use double sided shadows with [method instance_geometry_set_cast_shadows_setting]. Equivalent to [member Light.shadow_reverse_cull_face]. */
light_set_reverse_cull_face_mode(light: RID, enabled: boolean): void;

/** If [code]true[/code], light will cast shadows. Equivalent to [member Light.shadow_enabled]. */
light_set_shadow(light: RID, enabled: boolean): void;

/** Sets the color of the shadow cast by the light. Equivalent to [member Light.shadow_color]. */
light_set_shadow_color(light: RID, color: Color): void;

/** Sets whether GI probes capture light information from this light. */
light_set_use_gi(light: RID, enabled: boolean): void;

/**
 * Creates a lightmap capture and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `lightmap_capture_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this lightmap capture to an instance using [method instance_set_base] using the returned RID.
 *
*/
lightmap_capture_create(): RID;

/** Returns the size of the lightmap capture area. */
lightmap_capture_get_bounds(capture: RID): AABB;

/** Returns the energy multiplier used by the lightmap capture. */
lightmap_capture_get_energy(capture: RID): float;

/** Returns the octree used by the lightmap capture. */
lightmap_capture_get_octree(capture: RID): PoolByteArray;

/** Returns the cell subdivision amount used by this lightmap capture's octree. */
lightmap_capture_get_octree_cell_subdiv(capture: RID): int;

/** Returns the cell transform for this lightmap capture's octree. */
lightmap_capture_get_octree_cell_transform(capture: RID): Transform;

/** Sets the size of the area covered by the lightmap capture. Equivalent to [member BakedLightmapData.bounds]. */
lightmap_capture_set_bounds(capture: RID, bounds: AABB): void;

/** Sets the energy multiplier for this lightmap capture. Equivalent to [member BakedLightmapData.energy]. */
lightmap_capture_set_energy(capture: RID, energy: float): void;

/** Sets the octree to be used by this lightmap capture. This function is normally used by the [BakedLightmap] node. Equivalent to [member BakedLightmapData.octree]. */
lightmap_capture_set_octree(capture: RID, octree: PoolByteArray): void;

/** Sets the subdivision level of this lightmap capture's octree. Equivalent to [member BakedLightmapData.cell_subdiv]. */
lightmap_capture_set_octree_cell_subdiv(capture: RID, subdiv: int): void;

/** Sets the octree cell transform for this lightmap capture's octree. Equivalent to [member BakedLightmapData.cell_space_transform]. */
lightmap_capture_set_octree_cell_transform(capture: RID, xform: Transform): void;

/** Returns a mesh of a sphere with the given amount of horizontal and vertical subdivisions. */
make_sphere_mesh(latitudes: int, longitudes: int, radius: float): RID;

/**
 * Creates an empty material and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `material_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
material_create(): RID;

/** Returns the value of a certain material's parameter. */
material_get_param(material: RID, parameter: string): any;

/** Returns the default value for the param if available. Otherwise returns an empty [Variant]. */
material_get_param_default(material: RID, parameter: string): any;

/** Returns the shader of a certain material's shader. Returns an empty RID if the material doesn't have a shader. */
material_get_shader(shader_material: RID): RID;

/** Sets a material's line width. */
material_set_line_width(material: RID, width: float): void;

/** Sets an object's next material. */
material_set_next_pass(material: RID, next_material: RID): void;

/** Sets a material's parameter. */
material_set_param(material: RID, parameter: string, value: any): void;

/** Sets a material's render priority. */
material_set_render_priority(material: RID, priority: int): void;

/** Sets a shader material's shader. */
material_set_shader(shader_material: RID, shader: RID): void;

/** Adds a surface generated from the Arrays to a mesh. See [enum PrimitiveType] constants for types. */
mesh_add_surface_from_arrays(mesh: RID, primitive: int, arrays: any[], blend_shapes?: any[], compress_format?: int): void;

/** Removes all surfaces from a mesh. */
mesh_clear(mesh: RID): void;

/**
 * Creates a new mesh and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `mesh_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this mesh to an instance using [method instance_set_base] using the returned RID.
 *
*/
mesh_create(): RID;

/** Returns a mesh's blend shape count. */
mesh_get_blend_shape_count(mesh: RID): int;

/** Returns a mesh's blend shape mode. */
mesh_get_blend_shape_mode(mesh: RID): int;

/** Returns a mesh's custom aabb. */
mesh_get_custom_aabb(mesh: RID): AABB;

/** Returns a mesh's number of surfaces. */
mesh_get_surface_count(mesh: RID): int;

/** Removes a mesh's surface. */
mesh_remove_surface(mesh: RID, index: int): void;

/** Sets a mesh's blend shape count. */
mesh_set_blend_shape_count(mesh: RID, amount: int): void;

/** Sets a mesh's blend shape mode. */
mesh_set_blend_shape_mode(mesh: RID, mode: int): void;

/** Sets a mesh's custom aabb. */
mesh_set_custom_aabb(mesh: RID, aabb: AABB): void;

/** Returns a mesh's surface's aabb. */
mesh_surface_get_aabb(mesh: RID, surface: int): AABB;

/** Returns a mesh's surface's vertex buffer. */
mesh_surface_get_array(mesh: RID, surface: int): PoolByteArray;

/** Returns a mesh's surface's amount of indices. */
mesh_surface_get_array_index_len(mesh: RID, surface: int): int;

/** Returns a mesh's surface's amount of vertices. */
mesh_surface_get_array_len(mesh: RID, surface: int): int;

/** Returns a mesh's surface's buffer arrays. */
mesh_surface_get_arrays(mesh: RID, surface: int): any[];

/** Returns a mesh's surface's arrays for blend shapes. */
mesh_surface_get_blend_shape_arrays(mesh: RID, surface: int): any[];

/** Returns the format of a mesh's surface. */
mesh_surface_get_format(mesh: RID, surface: int): int;

/** Function is unused in Godot 3.x. */
mesh_surface_get_format_offset(format: int, vertex_len: int, index_len: int, array_index: int): int;

/** Function is unused in Godot 3.x. */
mesh_surface_get_format_stride(format: int, vertex_len: int, index_len: int): int;

/** Returns a mesh's surface's index buffer. */
mesh_surface_get_index_array(mesh: RID, surface: int): PoolByteArray;

/** Returns a mesh's surface's material. */
mesh_surface_get_material(mesh: RID, surface: int): RID;

/** Returns the primitive type of a mesh's surface. */
mesh_surface_get_primitive_type(mesh: RID, surface: int): int;

/** Returns the aabb of a mesh's surface's skeleton. */
mesh_surface_get_skeleton_aabb(mesh: RID, surface: int): any[];

/** Sets a mesh's surface's material. */
mesh_surface_set_material(mesh: RID, surface: int, material: RID): void;

/** Updates a specific region of a vertex buffer for the specified surface. Warning: this function alters the vertex buffer directly with no safety mechanisms, you can easily corrupt your mesh. */
mesh_surface_update_region(mesh: RID, surface: int, offset: int, data: PoolByteArray): void;

/** Allocates space for the multimesh data. Format parameters determine how the data will be stored by OpenGL. See [enum MultimeshTransformFormat], [enum MultimeshColorFormat], and [enum MultimeshCustomDataFormat] for usage. Equivalent to [member MultiMesh.instance_count]. */
multimesh_allocate(multimesh: RID, instances: int, transform_format: int, color_format: int, custom_data_format?: int): void;

/**
 * Creates a new multimesh on the VisualServer and returns an [RID] handle. This RID will be used in all `multimesh_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this multimesh to an instance using [method instance_set_base] using the returned RID.
 *
*/
multimesh_create(): RID;

/** Calculates and returns the axis-aligned bounding box that encloses all instances within the multimesh. */
multimesh_get_aabb(multimesh: RID): AABB;

/** Returns the number of instances allocated for this multimesh. */
multimesh_get_instance_count(multimesh: RID): int;

/** Returns the RID of the mesh that will be used in drawing this multimesh. */
multimesh_get_mesh(multimesh: RID): RID;

/** Returns the number of visible instances for this multimesh. */
multimesh_get_visible_instances(multimesh: RID): int;

/** Returns the color by which the specified instance will be modulated. */
multimesh_instance_get_color(multimesh: RID, index: int): Color;

/** Returns the custom data associated with the specified instance. */
multimesh_instance_get_custom_data(multimesh: RID, index: int): Color;

/** Returns the [Transform] of the specified instance. */
multimesh_instance_get_transform(multimesh: RID, index: int): Transform;

/** Returns the [Transform2D] of the specified instance. For use when the multimesh is set to use 2D transforms. */
multimesh_instance_get_transform_2d(multimesh: RID, index: int): Transform2D;

/** Sets the color by which this instance will be modulated. Equivalent to [method MultiMesh.set_instance_color]. */
multimesh_instance_set_color(multimesh: RID, index: int, color: Color): void;

/** Sets the custom data for this instance. Custom data is passed as a [Color], but is interpreted as a [code]vec4[/code] in the shader. Equivalent to [method MultiMesh.set_instance_custom_data]. */
multimesh_instance_set_custom_data(multimesh: RID, index: int, custom_data: Color): void;

/** Sets the [Transform] for this instance. Equivalent to [method MultiMesh.set_instance_transform]. */
multimesh_instance_set_transform(multimesh: RID, index: int, transform: Transform): void;

/** Sets the [Transform2D] for this instance. For use when multimesh is used in 2D. Equivalent to [method MultiMesh.set_instance_transform_2d]. */
multimesh_instance_set_transform_2d(multimesh: RID, index: int, transform: Transform2D): void;

/**
 * Sets all data related to the instances in one go. This is especially useful when loading the data from disk or preparing the data from GDNative.
 *
 * 				All data is packed in one large float array. An array may look like this: Transform for instance 1, color data for instance 1, custom data for instance 1, transform for instance 2, color data for instance 2, etc.
 *
 * 				[Transform] is stored as 12 floats, [Transform2D] is stored as 8 floats, `COLOR_8BIT` / `CUSTOM_DATA_8BIT` is stored as 1 float (4 bytes as is) and `COLOR_FLOAT` / `CUSTOM_DATA_FLOAT` is stored as 4 floats.
 *
*/
multimesh_set_as_bulk_array(multimesh: RID, array: PoolRealArray): void;

/** Sets the mesh to be drawn by the multimesh. Equivalent to [member MultiMesh.mesh]. */
multimesh_set_mesh(multimesh: RID, mesh: RID): void;

/** Sets the number of instances visible at a given time. If -1, all instances that have been allocated are drawn. Equivalent to [member MultiMesh.visible_instance_count]. */
multimesh_set_visible_instances(multimesh: RID, visible: int): void;

/**
 * Creates a new omni light and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this omni light to an instance using [method instance_set_base] using the returned RID.
 *
*/
omni_light_create(): RID;

/**
 * Creates a particle system and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `particles_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach these particles to an instance using [method instance_set_base] using the returned RID.
 *
*/
particles_create(): RID;

/** Calculates and returns the axis-aligned bounding box that contains all the particles. Equivalent to [method Particles.capture_aabb]. */
particles_get_current_aabb(particles: RID): AABB;

/** Returns [code]true[/code] if particles are currently set to emitting. */
particles_get_emitting(particles: RID): boolean;

/** Returns [code]true[/code] if particles are not emitting and particles are set to inactive. */
particles_is_inactive(particles: RID): boolean;

/** Add particle system to list of particle systems that need to be updated. Update will take place on the next frame, or on the next call to [method instances_cull_aabb], [method instances_cull_convex], or [method instances_cull_ray]. */
particles_request_process(particles: RID): void;

/** Reset the particles on the next update. Equivalent to [method Particles.restart]. */
particles_restart(particles: RID): void;

/** Sets the number of particles to be drawn and allocates the memory for them. Equivalent to [member Particles.amount]. */
particles_set_amount(particles: RID, amount: int): void;

/** Sets a custom axis-aligned bounding box for the particle system. Equivalent to [member Particles.visibility_aabb]. */
particles_set_custom_aabb(particles: RID, aabb: AABB): void;

/** Sets the draw order of the particles to one of the named enums from [enum ParticlesDrawOrder]. See [enum ParticlesDrawOrder] for options. Equivalent to [member Particles.draw_order]. */
particles_set_draw_order(particles: RID, order: int): void;

/** Sets the mesh to be used for the specified draw pass. Equivalent to [member Particles.draw_pass_1], [member Particles.draw_pass_2], [member Particles.draw_pass_3], and [member Particles.draw_pass_4]. */
particles_set_draw_pass_mesh(particles: RID, pass: int, mesh: RID): void;

/** Sets the number of draw passes to use. Equivalent to [member Particles.draw_passes]. */
particles_set_draw_passes(particles: RID, count: int): void;

/** Sets the [Transform] that will be used by the particles when they first emit. */
particles_set_emission_transform(particles: RID, transform: Transform): void;

/** If [code]true[/code], particles will emit over time. Setting to false does not reset the particles, but only stops their emission. Equivalent to [member Particles.emitting]. */
particles_set_emitting(particles: RID, emitting: boolean): void;

/** Sets the explosiveness ratio. Equivalent to [member Particles.explosiveness]. */
particles_set_explosiveness_ratio(particles: RID, ratio: float): void;

/** Sets the frame rate that the particle system rendering will be fixed to. Equivalent to [member Particles.fixed_fps]. */
particles_set_fixed_fps(particles: RID, fps: int): void;

/** If [code]true[/code], uses fractional delta which smooths the movement of the particles. Equivalent to [member Particles.fract_delta]. */
particles_set_fractional_delta(particles: RID, enable: boolean): void;

/** Sets the lifetime of each particle in the system. Equivalent to [member Particles.lifetime]. */
particles_set_lifetime(particles: RID, lifetime: float): void;

/** If [code]true[/code], particles will emit once and then stop. Equivalent to [member Particles.one_shot]. */
particles_set_one_shot(particles: RID, one_shot: boolean): void;

/** Sets the preprocess time for the particles animation. This lets you delay starting an animation until after the particles have begun emitting. Equivalent to [member Particles.preprocess]. */
particles_set_pre_process_time(particles: RID, time: float): void;

/** Sets the material for processing the particles. Note: this is not the material used to draw the materials. Equivalent to [member Particles.process_material]. */
particles_set_process_material(particles: RID, material: RID): void;

/** Sets the emission randomness ratio. This randomizes the emission of particles within their phase. Equivalent to [member Particles.randomness]. */
particles_set_randomness_ratio(particles: RID, ratio: float): void;

/** Sets the speed scale of the particle system. Equivalent to [member Particles.speed_scale]. */
particles_set_speed_scale(particles: RID, scale: float): void;

/** If [code]true[/code], particles use local coordinates. If [code]false[/code] they use global coordinates. Equivalent to [member Particles.local_coords]. */
particles_set_use_local_coordinates(particles: RID, enable: boolean): void;

/**
 * Creates a reflection probe and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `reflection_probe_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this reflection probe to an instance using [method instance_set_base] using the returned RID.
 *
*/
reflection_probe_create(): RID;

/** If [code]true[/code], reflections will ignore sky contribution. Equivalent to [member ReflectionProbe.interior_enable]. */
reflection_probe_set_as_interior(probe: RID, enable: boolean): void;

/** Sets the render cull mask for this reflection probe. Only instances with a matching cull mask will be rendered by this probe. Equivalent to [member ReflectionProbe.cull_mask]. */
reflection_probe_set_cull_mask(probe: RID, layers: int): void;

/** If [code]true[/code], uses box projection. This can make reflections look more correct in certain situations. Equivalent to [member ReflectionProbe.box_projection]. */
reflection_probe_set_enable_box_projection(probe: RID, enable: boolean): void;

/** If [code]true[/code], computes shadows in the reflection probe. This makes the reflection much slower to compute. Equivalent to [member ReflectionProbe.enable_shadows]. */
reflection_probe_set_enable_shadows(probe: RID, enable: boolean): void;

/** Sets the size of the area that the reflection probe will capture. Equivalent to [member ReflectionProbe.extents]. */
reflection_probe_set_extents(probe: RID, extents: Vector3): void;

/** Sets the intensity of the reflection probe. Intensity modulates the strength of the reflection. Equivalent to [member ReflectionProbe.intensity]. */
reflection_probe_set_intensity(probe: RID, intensity: float): void;

/** Sets the ambient light color for this reflection probe when set to interior mode. Equivalent to [member ReflectionProbe.interior_ambient_color]. */
reflection_probe_set_interior_ambient(probe: RID, color: Color): void;

/** Sets the energy multiplier for this reflection probes ambient light contribution when set to interior mode. Equivalent to [member ReflectionProbe.interior_ambient_energy]. */
reflection_probe_set_interior_ambient_energy(probe: RID, energy: float): void;

/** Sets the contribution value for how much the reflection affects the ambient light for this reflection probe when set to interior mode. Useful so that ambient light matches the color of the room. Equivalent to [member ReflectionProbe.interior_ambient_contrib]. */
reflection_probe_set_interior_ambient_probe_contribution(probe: RID, contrib: float): void;

/** Sets the max distance away from the probe an object can be before it is culled. Equivalent to [member ReflectionProbe.max_distance]. */
reflection_probe_set_max_distance(probe: RID, distance: float): void;

/** Sets the origin offset to be used when this reflection probe is in box project mode. Equivalent to [member ReflectionProbe.origin_offset]. */
reflection_probe_set_origin_offset(probe: RID, offset: Vector3): void;

/** Sets how often the reflection probe updates. Can either be once or every frame. See [enum ReflectionProbeUpdateMode] for options. */
reflection_probe_set_update_mode(probe: RID, mode: int): void;

/**
 * Schedules a callback to the corresponding named `method` on `where` after a frame has been drawn.
 *
 * The callback method must use only 1 argument which will be called with `userdata`.
 *
*/
request_frame_drawn_callback(where: Object, method: string, userdata: any): void;

/**
 * Creates a scenario and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `scenario_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * The scenario is the 3D world that all the visual instances exist in.
 *
*/
scenario_create(): RID;

/** Sets the [enum ScenarioDebugMode] for this scenario. See [enum ScenarioDebugMode] for options. */
scenario_set_debug(scenario: RID, debug_mode: int): void;

/** Sets the environment that will be used with this scenario. */
scenario_set_environment(scenario: RID, environment: RID): void;

/** Sets the fallback environment to be used by this scenario. The fallback environment is used if no environment is set. Internally, this is used by the editor to provide a default environment. */
scenario_set_fallback_environment(scenario: RID, environment: RID): void;

/** Sets the size of the reflection atlas shared by all reflection probes in this scenario. */
scenario_set_reflection_atlas_size(scenario: RID, size: int, subdiv: int): void;

/** Sets a boot image. The color defines the background color. If [code]scale[/code] is [code]true[/code], the image will be scaled to fit the screen size. If [code]use_filter[/code] is [code]true[/code], the image will be scaled with linear interpolation. If [code]use_filter[/code] is [code]false[/code], the image will be scaled with nearest-neighbor interpolation. */
set_boot_image(image: Image, color: Color, scale: boolean, use_filter?: boolean): void;

/** If [code]true[/code], the engine will generate wireframes for use with the wireframe debug mode. */
set_debug_generate_wireframes(generate: boolean): void;

/** Sets the default clear color which is used when a specific clear color has not been selected. */
set_default_clear_color(color: Color): void;

/**
 * Sets the scale to apply to the passage of time for the shaders' `TIME` builtin.
 *
 * The default value is `1.0`, which means `TIME` will count the real time as it goes by, without narrowing or stretching it.
 *
*/
set_shader_time_scale(scale: float): void;

/**
 * Creates an empty shader and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `shader_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
shader_create(): RID;

/** Returns a shader's code. */
shader_get_code(shader: RID): string;

/** Returns a default texture from a shader searched by name. */
shader_get_default_texture_param(shader: RID, name: string): RID;

/** Returns the parameters of a shader. */
shader_get_param_list(shader: RID): any[];

/** Sets a shader's code. */
shader_set_code(shader: RID, code: string): void;

/** Sets a shader's default texture. Overwrites the texture given by name. */
shader_set_default_texture_param(shader: RID, name: string, texture: RID): void;

/** Allocates the GPU buffers for this skeleton. */
skeleton_allocate(skeleton: RID, bones: int, is_2d_skeleton?: boolean): void;

/** Returns the [Transform] set for a specific bone of this skeleton. */
skeleton_bone_get_transform(skeleton: RID, bone: int): Transform;

/** Returns the [Transform2D] set for a specific bone of this skeleton. */
skeleton_bone_get_transform_2d(skeleton: RID, bone: int): Transform2D;

/** Sets the [Transform] for a specific bone of this skeleton. */
skeleton_bone_set_transform(skeleton: RID, bone: int, transform: Transform): void;

/** Sets the [Transform2D] for a specific bone of this skeleton. */
skeleton_bone_set_transform_2d(skeleton: RID, bone: int, transform: Transform2D): void;

/**
 * Creates a skeleton and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `skeleton_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
skeleton_create(): RID;

/** Returns the number of bones allocated for this skeleton. */
skeleton_get_bone_count(skeleton: RID): int;

/**
 * Creates an empty sky and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `sky_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
sky_create(): RID;

/** Sets a sky's texture. */
sky_set_texture(sky: RID, cube_map: RID, radiance_size: int): void;

/**
 * Creates a spot light and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
 * To place in a scene, attach this spot light to an instance using [method instance_set_base] using the returned RID.
 *
*/
spot_light_create(): RID;

/** Not implemented in Godot 3.x. */
sync(): void;

/** Allocates the GPU memory for the texture. */
texture_allocate(texture: RID, width: int, height: int, depth_3d: int, format: int, type: int, flags?: int): void;

/** Binds the texture to a texture slot. */
texture_bind(texture: RID, number: int): void;

/**
 * Creates an empty texture and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `texture_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
texture_create(): RID;

/** Creates a texture, allocates the space for an image, and fills in the image. */
texture_create_from_image(image: Image, flags?: int): RID;

/** Returns a list of all the textures and their information. */
texture_debug_usage(): any[];

/** Returns a copy of a texture's image unless it's a CubeMap, in which case it returns the [RID] of the image at one of the cubes sides. */
texture_get_data(texture: RID, cube_side?: int): Image;

/** Returns the depth of the texture. */
texture_get_depth(texture: RID): int;

/** Returns the flags of a texture. */
texture_get_flags(texture: RID): int;

/** Returns the format of the texture's image. */
texture_get_format(texture: RID): int;

/** Returns the texture's height. */
texture_get_height(texture: RID): int;

/** Returns the texture's path. */
texture_get_path(texture: RID): string;

/** Returns the opengl id of the texture's image. */
texture_get_texid(texture: RID): int;

/** Returns the type of the texture, can be any of the [enum TextureType]. */
texture_get_type(texture: RID): int;

/** Returns the texture's width. */
texture_get_width(texture: RID): int;

/** Sets the texture's image data. If it's a CubeMap, it sets the image data at a cube side. */
texture_set_data(texture: RID, image: Image, layer?: int): void;

/** Sets a part of the data for a texture. Warning: this function calls the underlying graphics API directly and may corrupt your texture if used improperly. */
texture_set_data_partial(texture: RID, image: Image, src_x: int, src_y: int, src_w: int, src_h: int, dst_x: int, dst_y: int, dst_mip: int, layer?: int): void;

/** Sets the texture's flags. See [enum TextureFlags] for options. */
texture_set_flags(texture: RID, flags: int): void;

/** Sets the texture's path. */
texture_set_path(texture: RID, path: string): void;

/** If [code]true[/code], sets internal processes to shrink all image data to half the size. */
texture_set_shrink_all_x2_on_set_data(shrink: boolean): void;

/** Resizes the texture to the specified dimensions. */
texture_set_size_override(texture: RID, width: int, height: int, depth: int): void;

/** If [code]true[/code], the image will be stored in the texture's images array if overwritten. */
textures_keep_original(enable: boolean): void;

/** Sets a viewport's camera. */
viewport_attach_camera(viewport: RID, camera: RID): void;

/** Sets a viewport's canvas. */
viewport_attach_canvas(viewport: RID, canvas: RID): void;

/**
 * Copies viewport to a region of the screen specified by `rect`. If [member Viewport.render_direct_to_screen] is `true`, then viewport does not use a framebuffer and the contents of the viewport are rendered directly to screen. However, note that the root viewport is drawn last, therefore it will draw over the screen. Accordingly, you must set the root viewport to an area that does not cover the area that you have attached this viewport to.
 *
 * For example, you can set the root viewport to not render at all with the following code:
 *
 * @example 
 * 
 * func _ready():
 *     get_viewport().set_attach_to_screen_rect(Rect2())
 *     $Viewport.set_attach_to_screen_rect(Rect2(0, 0, 600, 600))
 * @summary 
 * 
 *
 * Using this can result in significant optimization, especially on lower-end devices. However, it comes at the cost of having to manage your viewports manually. For a further optimization see, [method viewport_set_render_direct_to_screen].
 *
*/
viewport_attach_to_screen(viewport: RID, rect?: Rect2, screen?: int): void;

/**
 * Creates an empty viewport and adds it to the VisualServer. It can be accessed with the RID that is returned. This RID will be used in all `viewport_*` VisualServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the VisualServer's [method free_rid] static method.
 *
*/
viewport_create(): RID;

/** Detaches the viewport from the screen. */
viewport_detach(viewport: RID): void;

/** Returns a viewport's render information. For options, see the [enum ViewportRenderInfo] constants. */
viewport_get_render_info(viewport: RID, info: int): int;

/** Returns the viewport's last rendered frame. */
viewport_get_texture(viewport: RID): RID;

/** Detaches a viewport from a canvas and vice versa. */
viewport_remove_canvas(viewport: RID, canvas: RID): void;

/** If [code]true[/code], sets the viewport active, else sets it inactive. */
viewport_set_active(viewport: RID, active: boolean): void;

/**
 * Sets the stacking order for a viewport's canvas.
 *
 * `layer` is the actual canvas layer, while `sublayer` specifies the stacking order of the canvas among those in the same layer.
 *
*/
viewport_set_canvas_stacking(viewport: RID, canvas: RID, layer: int, sublayer: int): void;

/** Sets the transformation of a viewport's canvas. */
viewport_set_canvas_transform(viewport: RID, canvas: RID, offset: Transform2D): void;

/** Sets the clear mode of a viewport. See [enum ViewportClearMode] for options. */
viewport_set_clear_mode(viewport: RID, clear_mode: int): void;

/** Sets the debug draw mode of a viewport. See [enum ViewportDebugDraw] for options. */
viewport_set_debug_draw(viewport: RID, draw: int): void;

/** If [code]true[/code], a viewport's 3D rendering is disabled. */
viewport_set_disable_3d(viewport: RID, disabled: boolean): void;

/** If [code]true[/code], rendering of a viewport's environment is disabled. */
viewport_set_disable_environment(viewport: RID, disabled: boolean): void;

/** Sets the viewport's global transformation matrix. */
viewport_set_global_canvas_transform(viewport: RID, transform: Transform2D): void;

/** If [code]true[/code], the viewport renders to hdr. */
viewport_set_hdr(viewport: RID, enabled: boolean): void;

/** If [code]true[/code], the viewport's canvas is not rendered. */
viewport_set_hide_canvas(viewport: RID, hidden: boolean): void;

/** Currently unimplemented in Godot 3.x. */
viewport_set_hide_scenario(viewport: RID, hidden: boolean): void;

/** Sets the anti-aliasing mode. See [enum ViewportMSAA] for options. */
viewport_set_msaa(viewport: RID, msaa: int): void;

/** Sets the viewport's parent to another viewport. */
viewport_set_parent_viewport(viewport: RID, parent_viewport: RID): void;

/** If [code]true[/code], render the contents of the viewport directly to screen. This allows a low-level optimization where you can skip drawing a viewport to the root viewport. While this optimization can result in a significant increase in speed (especially on older devices), it comes at a cost of usability. When this is enabled, you cannot read from the viewport or from the [code]SCREEN_TEXTURE[/code]. You also lose the benefit of certain window settings, such as the various stretch modes. Another consequence to be aware of is that in 2D the rendering happens in window coordinates, so if you have a viewport that is double the size of the window, and you set this, then only the portion that fits within the window will be drawn, no automatic scaling is possible, even if your game scene is significantly larger than the window size. */
viewport_set_render_direct_to_screen(viewport: RID, enabled: boolean): void;

/**
 * Sets a viewport's scenario.
 *
 * The scenario contains information about the [enum ScenarioDebugMode], environment information, reflection atlas etc.
 *
*/
viewport_set_scenario(viewport: RID, scenario: RID): void;

/** Sets the shadow atlas quadrant's subdivision. */
viewport_set_shadow_atlas_quadrant_subdivision(viewport: RID, quadrant: int, subdivision: int): void;

/** Sets the size of the shadow atlas's images (used for omni and spot lights). The value will be rounded up to the nearest power of 2. */
viewport_set_shadow_atlas_size(viewport: RID, size: int): void;

/** Sets the viewport's width and height. */
viewport_set_size(viewport: RID, width: int, height: int): void;

/** If [code]true[/code], the viewport renders its background as transparent. */
viewport_set_transparent_background(viewport: RID, enabled: boolean): void;

/** Sets when the viewport should be updated. See [enum ViewportUpdateMode] constants for options. */
viewport_set_update_mode(viewport: RID, update_mode: int): void;

/** Sets the viewport's 2D/3D mode. See [enum ViewportUsage] constants for options. */
viewport_set_usage(viewport: RID, usage: int): void;

/** If [code]true[/code], the viewport uses augmented or virtual reality technologies. See [ARVRInterface]. */
viewport_set_use_arvr(viewport: RID, use_arvr: boolean): void;

/** If [code]true[/code], the viewport's rendering is flipped vertically. */
viewport_set_vflip(viewport: RID, enabled: boolean): void;

  connect<T extends SignalsOf<VisualServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * Marks an error that shows that the index array is empty.
 *
*/
 static NO_INDEX_ARRAY: null;

/**
 * Number of weights/bones per vertex.
 *
*/
static ARRAY_WEIGHTS_SIZE: 4;

/**
 * The minimum Z-layer for canvas items.
 *
*/
 static CANVAS_ITEM_Z_MIN: null;

/**
 * The maximum Z-layer for canvas items.
 *
*/
static CANVAS_ITEM_Z_MAX: 4096;

/**
 * Max number of glow levels that can be used with glow post-process effect.
 *
*/
static MAX_GLOW_LEVELS: 7;

/**
 * Unused enum in Godot 3.x.
 *
*/
static MAX_CURSORS: 8;

/**
 * The minimum renderpriority of all materials.
 *
*/
 static MATERIAL_RENDER_PRIORITY_MIN: null;

/**
 * The maximum renderpriority of all materials.
 *
*/
static MATERIAL_RENDER_PRIORITY_MAX: 127;

/**
 * Marks the left side of a cubemap.
 *
*/
static CUBEMAP_LEFT: 0;

/**
 * Marks the right side of a cubemap.
 *
*/
static CUBEMAP_RIGHT: 1;

/**
 * Marks the bottom side of a cubemap.
 *
*/
static CUBEMAP_BOTTOM: 2;

/**
 * Marks the top side of a cubemap.
 *
*/
static CUBEMAP_TOP: 3;

/**
 * Marks the front side of a cubemap.
 *
*/
static CUBEMAP_FRONT: 4;

/**
 * Marks the back side of a cubemap.
 *
*/
static CUBEMAP_BACK: 5;

/**
 * Normal texture with 2 dimensions, width and height.
 *
*/
static TEXTURE_TYPE_2D: 0;

/**
 * Texture made up of six faces, can be looked up with a `vec3` in shader.
 *
*/
static TEXTURE_TYPE_CUBEMAP: 2;

/**
 * An array of 2-dimensional textures.
 *
*/
static TEXTURE_TYPE_2D_ARRAY: 3;

/**
 * A 3-dimensional texture with width, height, and depth.
 *
*/
static TEXTURE_TYPE_3D: 4;

/**
 * Generates mipmaps, which are smaller versions of the same texture to use when zoomed out, keeping the aspect ratio.
 *
*/
static TEXTURE_FLAG_MIPMAPS: 1;

/**
 * Repeats the texture (instead of clamp to edge).
 *
*/
static TEXTURE_FLAG_REPEAT: 2;

/**
 * Uses a magnifying filter, to enable smooth zooming in of the texture.
 *
*/
static TEXTURE_FLAG_FILTER: 4;

/**
 * Uses anisotropic mipmap filtering. Generates smaller versions of the same texture with different aspect ratios.
 *
 * This results in better-looking textures when viewed from oblique angles.
 *
*/
static TEXTURE_FLAG_ANISOTROPIC_FILTER: 8;

/**
 * Converts the texture to the sRGB color space.
 *
*/
static TEXTURE_FLAG_CONVERT_TO_LINEAR: 16;

/**
 * Repeats the texture with alternate sections mirrored.
 *
*/
static TEXTURE_FLAG_MIRRORED_REPEAT: 32;

/**
 * Texture is a video surface.
 *
*/
static TEXTURE_FLAG_USED_FOR_STREAMING: 2048;

/**
 * Default flags. [constant TEXTURE_FLAG_MIPMAPS], [constant TEXTURE_FLAG_REPEAT] and [constant TEXTURE_FLAG_FILTER] are enabled.
 *
*/
static TEXTURE_FLAGS_DEFAULT: 7;

/**
 * Shader is a 3D shader.
 *
*/
static SHADER_SPATIAL: 0;

/**
 * Shader is a 2D shader.
 *
*/
static SHADER_CANVAS_ITEM: 1;

/**
 * Shader is a particle shader.
 *
*/
static SHADER_PARTICLES: 2;

/**
 * Represents the size of the [enum ShaderMode] enum.
 *
*/
static SHADER_MAX: 3;

/**
 * Array is a vertex array.
 *
*/
static ARRAY_VERTEX: 0;

/**
 * Array is a normal array.
 *
*/
static ARRAY_NORMAL: 1;

/**
 * Array is a tangent array.
 *
*/
static ARRAY_TANGENT: 2;

/**
 * Array is a color array.
 *
*/
static ARRAY_COLOR: 3;

/**
 * Array is an UV coordinates array.
 *
*/
static ARRAY_TEX_UV: 4;

/**
 * Array is an UV coordinates array for the second UV coordinates.
 *
*/
static ARRAY_TEX_UV2: 5;

/**
 * Array contains bone information.
 *
*/
static ARRAY_BONES: 6;

/**
 * Array is weight information.
 *
*/
static ARRAY_WEIGHTS: 7;

/**
 * Array is index array.
 *
*/
static ARRAY_INDEX: 8;

/**
 * Represents the size of the [enum ArrayType] enum.
 *
*/
static ARRAY_MAX: 9;

/**
 * Flag used to mark a vertex array.
 *
*/
static ARRAY_FORMAT_VERTEX: 1;

/**
 * Flag used to mark a normal array.
 *
*/
static ARRAY_FORMAT_NORMAL: 2;

/**
 * Flag used to mark a tangent array.
 *
*/
static ARRAY_FORMAT_TANGENT: 4;

/**
 * Flag used to mark a color array.
 *
*/
static ARRAY_FORMAT_COLOR: 8;

/**
 * Flag used to mark an UV coordinates array.
 *
*/
static ARRAY_FORMAT_TEX_UV: 16;

/**
 * Flag used to mark an UV coordinates array for the second UV coordinates.
 *
*/
static ARRAY_FORMAT_TEX_UV2: 32;

/**
 * Flag used to mark a bone information array.
 *
*/
static ARRAY_FORMAT_BONES: 64;

/**
 * Flag used to mark a weights array.
 *
*/
static ARRAY_FORMAT_WEIGHTS: 128;

/**
 * Flag used to mark an index array.
 *
*/
static ARRAY_FORMAT_INDEX: 256;

/**
 * Flag used to mark a compressed (half float) vertex array.
 *
*/
static ARRAY_COMPRESS_VERTEX: 512;

/**
 * Flag used to mark a compressed (half float) normal array.
 *
*/
static ARRAY_COMPRESS_NORMAL: 1024;

/**
 * Flag used to mark a compressed (half float) tangent array.
 *
*/
static ARRAY_COMPRESS_TANGENT: 2048;

/**
 * Flag used to mark a compressed (half float) color array.
 *
*/
static ARRAY_COMPRESS_COLOR: 4096;

/**
 * Flag used to mark a compressed (half float) UV coordinates array.
 *
*/
static ARRAY_COMPRESS_TEX_UV: 8192;

/**
 * Flag used to mark a compressed (half float) UV coordinates array for the second UV coordinates.
 *
*/
static ARRAY_COMPRESS_TEX_UV2: 16384;

/**
 * Flag used to mark a compressed bone array.
 *
*/
static ARRAY_COMPRESS_BONES: 32768;

/**
 * Flag used to mark a compressed (half float) weight array.
 *
*/
static ARRAY_COMPRESS_WEIGHTS: 65536;

/**
 * Flag used to mark a compressed index array.
 *
*/
static ARRAY_COMPRESS_INDEX: 131072;

/**
 * Flag used to mark that the array contains 2D vertices.
 *
*/
static ARRAY_FLAG_USE_2D_VERTICES: 262144;

/**
 * Flag used to mark that the array uses 16-bit bones instead of 8-bit.
 *
*/
static ARRAY_FLAG_USE_16_BIT_BONES: 524288;

/**
 * Used to set flags [constant ARRAY_COMPRESS_NORMAL], [constant ARRAY_COMPRESS_TANGENT], [constant ARRAY_COMPRESS_COLOR], [constant ARRAY_COMPRESS_TEX_UV], [constant ARRAY_COMPRESS_TEX_UV2] and [constant ARRAY_COMPRESS_WEIGHTS] quickly.
 *
*/
static ARRAY_COMPRESS_DEFAULT: 97280;

/**
 * Primitive to draw consists of points.
 *
*/
static PRIMITIVE_POINTS: 0;

/**
 * Primitive to draw consists of lines.
 *
*/
static PRIMITIVE_LINES: 1;

/**
 * Primitive to draw consists of a line strip from start to end.
 *
*/
static PRIMITIVE_LINE_STRIP: 2;

/**
 * Primitive to draw consists of a line loop (a line strip with a line between the last and the first vertex).
 *
*/
static PRIMITIVE_LINE_LOOP: 3;

/**
 * Primitive to draw consists of triangles.
 *
*/
static PRIMITIVE_TRIANGLES: 4;

/**
 * Primitive to draw consists of a triangle strip (the last 3 vertices are always combined to make a triangle).
 *
*/
static PRIMITIVE_TRIANGLE_STRIP: 5;

/**
 * Primitive to draw consists of a triangle strip (the last 2 vertices are always combined with the first to make a triangle).
 *
*/
static PRIMITIVE_TRIANGLE_FAN: 6;

/**
 * Represents the size of the [enum PrimitiveType] enum.
 *
*/
static PRIMITIVE_MAX: 7;

/**
 * Blend shapes are normalized.
 *
*/
static BLEND_SHAPE_MODE_NORMALIZED: 0;

/**
 * Blend shapes are relative to base weight.
 *
*/
static BLEND_SHAPE_MODE_RELATIVE: 1;

/**
 * Is a directional (sun) light.
 *
*/
static LIGHT_DIRECTIONAL: 0;

/**
 * Is an omni light.
 *
*/
static LIGHT_OMNI: 1;

/**
 * Is a spot light.
 *
*/
static LIGHT_SPOT: 2;

/**
 * The light's energy.
 *
*/
static LIGHT_PARAM_ENERGY: 0;

/**
 * The light's influence on specularity.
 *
*/
static LIGHT_PARAM_SPECULAR: 2;

/**
 * The light's range.
 *
*/
static LIGHT_PARAM_RANGE: 3;

/**
 * The light's attenuation.
 *
*/
static LIGHT_PARAM_ATTENUATION: 4;

/**
 * The spotlight's angle.
 *
*/
static LIGHT_PARAM_SPOT_ANGLE: 5;

/**
 * The spotlight's attenuation.
 *
*/
static LIGHT_PARAM_SPOT_ATTENUATION: 6;

/**
 * Scales the shadow color.
 *
*/
static LIGHT_PARAM_CONTACT_SHADOW_SIZE: 7;

/**
 * Max distance that shadows will be rendered.
 *
*/
static LIGHT_PARAM_SHADOW_MAX_DISTANCE: 8;

/**
 * Proportion of shadow atlas occupied by the first split.
 *
*/
static LIGHT_PARAM_SHADOW_SPLIT_1_OFFSET: 9;

/**
 * Proportion of shadow atlas occupied by the second split.
 *
*/
static LIGHT_PARAM_SHADOW_SPLIT_2_OFFSET: 10;

/**
 * Proportion of shadow atlas occupied by the third split. The fourth split occupies the rest.
 *
*/
static LIGHT_PARAM_SHADOW_SPLIT_3_OFFSET: 11;

/**
 * Normal bias used to offset shadow lookup by object normal. Can be used to fix self-shadowing artifacts.
 *
*/
static LIGHT_PARAM_SHADOW_NORMAL_BIAS: 12;

/**
 * Bias the shadow lookup to fix self-shadowing artifacts.
 *
*/
static LIGHT_PARAM_SHADOW_BIAS: 13;

/**
 * Increases bias on further splits to fix self-shadowing that only occurs far away from the camera.
 *
*/
static LIGHT_PARAM_SHADOW_BIAS_SPLIT_SCALE: 14;

/**
 * Represents the size of the [enum LightParam] enum.
 *
*/
static LIGHT_PARAM_MAX: 15;

/**
 * Use a dual paraboloid shadow map for omni lights.
 *
*/
static LIGHT_OMNI_SHADOW_DUAL_PARABOLOID: 0;

/**
 * Use a cubemap shadow map for omni lights. Slower but better quality than dual paraboloid.
 *
*/
static LIGHT_OMNI_SHADOW_CUBE: 1;

/**
 * Use more detail vertically when computing shadow map.
 *
*/
static LIGHT_OMNI_SHADOW_DETAIL_VERTICAL: 0;

/**
 * Use more detail horizontally when computing shadow map.
 *
*/
static LIGHT_OMNI_SHADOW_DETAIL_HORIZONTAL: 1;

/**
 * Use orthogonal shadow projection for directional light.
 *
*/
static LIGHT_DIRECTIONAL_SHADOW_ORTHOGONAL: 0;

/**
 * Use 2 splits for shadow projection when using directional light.
 *
*/
static LIGHT_DIRECTIONAL_SHADOW_PARALLEL_2_SPLITS: 1;

/**
 * Use 4 splits for shadow projection when using directional light.
 *
*/
static LIGHT_DIRECTIONAL_SHADOW_PARALLEL_4_SPLITS: 2;

/**
 * Keeps shadows stable as camera moves but has lower effective resolution.
 *
*/
static LIGHT_DIRECTIONAL_SHADOW_DEPTH_RANGE_STABLE: 0;

/**
 * Optimize use of shadow maps, increasing the effective resolution. But may result in shadows moving or flickering slightly.
 *
*/
static LIGHT_DIRECTIONAL_SHADOW_DEPTH_RANGE_OPTIMIZED: 1;

/**
 * Do not update the viewport.
 *
*/
static VIEWPORT_UPDATE_DISABLED: 0;

/**
 * Update the viewport once then set to disabled.
 *
*/
static VIEWPORT_UPDATE_ONCE: 1;

/**
 * Update the viewport whenever it is visible.
 *
*/
static VIEWPORT_UPDATE_WHEN_VISIBLE: 2;

/**
 * Always update the viewport.
 *
*/
static VIEWPORT_UPDATE_ALWAYS: 3;

/**
 * The viewport is always cleared before drawing.
 *
*/
static VIEWPORT_CLEAR_ALWAYS: 0;

/**
 * The viewport is never cleared before drawing.
 *
*/
static VIEWPORT_CLEAR_NEVER: 1;

/**
 * The viewport is cleared once, then the clear mode is set to [constant VIEWPORT_CLEAR_NEVER].
 *
*/
static VIEWPORT_CLEAR_ONLY_NEXT_FRAME: 2;

/**
 * Multisample antialiasing is disabled.
 *
*/
static VIEWPORT_MSAA_DISABLED: 0;

/**
 * Multisample antialiasing is set to 2×.
 *
*/
static VIEWPORT_MSAA_2X: 1;

/**
 * Multisample antialiasing is set to 4×.
 *
*/
static VIEWPORT_MSAA_4X: 2;

/**
 * Multisample antialiasing is set to 8×.
 *
*/
static VIEWPORT_MSAA_8X: 3;

/**
 * Multisample antialiasing is set to 16×.
 *
*/
static VIEWPORT_MSAA_16X: 4;

/**
 * Multisample antialiasing is set to 2× on external texture. Special mode for GLES2 Android VR (Oculus Quest and Go).
 *
*/
static VIEWPORT_MSAA_EXT_2X: 5;

/**
 * Multisample antialiasing is set to 4× on external texture. Special mode for GLES2 Android VR (Oculus Quest and Go).
 *
*/
static VIEWPORT_MSAA_EXT_4X: 6;

/**
 * The Viewport does not render 3D but samples.
 *
*/
static VIEWPORT_USAGE_2D: 0;

/**
 * The Viewport does not render 3D and does not sample.
 *
*/
static VIEWPORT_USAGE_2D_NO_SAMPLING: 1;

/**
 * The Viewport renders 3D with effects.
 *
*/
static VIEWPORT_USAGE_3D: 2;

/**
 * The Viewport renders 3D but without effects.
 *
*/
static VIEWPORT_USAGE_3D_NO_EFFECTS: 3;

/**
 * Number of objects drawn in a single frame.
 *
*/
static VIEWPORT_RENDER_INFO_OBJECTS_IN_FRAME: 0;

/**
 * Number of vertices drawn in a single frame.
 *
*/
static VIEWPORT_RENDER_INFO_VERTICES_IN_FRAME: 1;

/**
 * Number of material changes during this frame.
 *
*/
static VIEWPORT_RENDER_INFO_MATERIAL_CHANGES_IN_FRAME: 2;

/**
 * Number of shader changes during this frame.
 *
*/
static VIEWPORT_RENDER_INFO_SHADER_CHANGES_IN_FRAME: 3;

/**
 * Number of surface changes during this frame.
 *
*/
static VIEWPORT_RENDER_INFO_SURFACE_CHANGES_IN_FRAME: 4;

/**
 * Number of draw calls during this frame.
 *
*/
static VIEWPORT_RENDER_INFO_DRAW_CALLS_IN_FRAME: 5;

/**
 * Number of 2d items drawn this frame.
 *
*/
static VIEWPORT_RENDER_INFO_2D_ITEMS_IN_FRAME: 6;

/**
 * Number of 2d draw calls during this frame.
 *
*/
static VIEWPORT_RENDER_INFO_2D_DRAW_CALLS_IN_FRAME: 7;

/**
 * Represents the size of the [enum ViewportRenderInfo] enum.
 *
*/
static VIEWPORT_RENDER_INFO_MAX: 8;

/**
 * Debug draw is disabled. Default setting.
 *
*/
static VIEWPORT_DEBUG_DRAW_DISABLED: 0;

/**
 * Debug draw sets objects to unshaded.
 *
*/
static VIEWPORT_DEBUG_DRAW_UNSHADED: 1;

/**
 * Overwrites clear color to `(0,0,0,0)`.
 *
*/
static VIEWPORT_DEBUG_DRAW_OVERDRAW: 2;

/**
 * Debug draw draws objects in wireframe.
 *
*/
static VIEWPORT_DEBUG_DRAW_WIREFRAME: 3;

/**
 * Do not use a debug mode.
 *
*/
static SCENARIO_DEBUG_DISABLED: 0;

/**
 * Draw all objects as wireframe models.
 *
*/
static SCENARIO_DEBUG_WIREFRAME: 1;

/**
 * Draw all objects in a way that displays how much overdraw is occurring. Overdraw occurs when a section of pixels is drawn and shaded and then another object covers it up. To optimize a scene, you should reduce overdraw.
 *
*/
static SCENARIO_DEBUG_OVERDRAW: 2;

/**
 * Draw all objects without shading. Equivalent to setting all objects shaders to `unshaded`.
 *
*/
static SCENARIO_DEBUG_SHADELESS: 3;

/**
 * The instance does not have a type.
 *
*/
static INSTANCE_NONE: 0;

/**
 * The instance is a mesh.
 *
*/
static INSTANCE_MESH: 1;

/**
 * The instance is a multimesh.
 *
*/
static INSTANCE_MULTIMESH: 2;

/**
 * The instance is an immediate geometry.
 *
*/
static INSTANCE_IMMEDIATE: 3;

/**
 * The instance is a particle emitter.
 *
*/
static INSTANCE_PARTICLES: 4;

/**
 * The instance is a light.
 *
*/
static INSTANCE_LIGHT: 5;

/**
 * The instance is a reflection probe.
 *
*/
static INSTANCE_REFLECTION_PROBE: 6;

/**
 * The instance is a GI probe.
 *
*/
static INSTANCE_GI_PROBE: 7;

/**
 * The instance is a lightmap capture.
 *
*/
static INSTANCE_LIGHTMAP_CAPTURE: 8;

/**
 * Represents the size of the [enum InstanceType] enum.
 *
*/
static INSTANCE_MAX: 9;

/**
 * A combination of the flags of geometry instances (mesh, multimesh, immediate and particles).
 *
*/
static INSTANCE_GEOMETRY_MASK: 30;

/**
 * Allows the instance to be used in baked lighting.
 *
*/
static INSTANCE_FLAG_USE_BAKED_LIGHT: 0;

/**
 * When set, manually requests to draw geometry on next frame.
 *
*/
static INSTANCE_FLAG_DRAW_NEXT_FRAME_IF_VISIBLE: 1;

/**
 * Represents the size of the [enum InstanceFlags] enum.
 *
*/
static INSTANCE_FLAG_MAX: 2;

/**
 * Disable shadows from this instance.
 *
*/
static SHADOW_CASTING_SETTING_OFF: 0;

/**
 * Cast shadows from this instance.
 *
*/
static SHADOW_CASTING_SETTING_ON: 1;

/**
 * Disable backface culling when rendering the shadow of the object. This is slightly slower but may result in more correct shadows.
 *
*/
static SHADOW_CASTING_SETTING_DOUBLE_SIDED: 2;

/**
 * Only render the shadows from the object. The object itself will not be drawn.
 *
*/
static SHADOW_CASTING_SETTING_SHADOWS_ONLY: 3;

/**
 * The nine patch gets stretched where needed.
 *
*/
static NINE_PATCH_STRETCH: 0;

/**
 * The nine patch gets filled with tiles where needed.
 *
*/
static NINE_PATCH_TILE: 1;

/**
 * The nine patch gets filled with tiles where needed and stretches them a bit if needed.
 *
*/
static NINE_PATCH_TILE_FIT: 2;

/**
 * Adds light color additive to the canvas.
 *
*/
static CANVAS_LIGHT_MODE_ADD: 0;

/**
 * Adds light color subtractive to the canvas.
 *
*/
static CANVAS_LIGHT_MODE_SUB: 1;

/**
 * The light adds color depending on transparency.
 *
*/
static CANVAS_LIGHT_MODE_MIX: 2;

/**
 * The light adds color depending on mask.
 *
*/
static CANVAS_LIGHT_MODE_MASK: 3;

/**
 * Do not apply a filter to canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_NONE: 0;

/**
 * Use PCF3 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF3: 1;

/**
 * Use PCF5 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF5: 2;

/**
 * Use PCF7 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF7: 3;

/**
 * Use PCF9 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF9: 4;

/**
 * Use PCF13 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF13: 5;

/**
 * Culling of the canvas occluder is disabled.
 *
*/
static CANVAS_OCCLUDER_POLYGON_CULL_DISABLED: 0;

/**
 * Culling of the canvas occluder is clockwise.
 *
*/
static CANVAS_OCCLUDER_POLYGON_CULL_CLOCKWISE: 1;

/**
 * Culling of the canvas occluder is counterclockwise.
 *
*/
static CANVAS_OCCLUDER_POLYGON_CULL_COUNTER_CLOCKWISE: 2;

/**
 * The amount of objects in the frame.
 *
*/
static INFO_OBJECTS_IN_FRAME: 0;

/**
 * The amount of vertices in the frame.
 *
*/
static INFO_VERTICES_IN_FRAME: 1;

/**
 * The amount of modified materials in the frame.
 *
*/
static INFO_MATERIAL_CHANGES_IN_FRAME: 2;

/**
 * The amount of shader rebinds in the frame.
 *
*/
static INFO_SHADER_CHANGES_IN_FRAME: 3;

/**
 * The amount of surface changes in the frame.
 *
*/
static INFO_SURFACE_CHANGES_IN_FRAME: 4;

/**
 * The amount of draw calls in frame.
 *
*/
static INFO_DRAW_CALLS_IN_FRAME: 5;

/**
 * The amount of 2d items in the frame.
 *
*/
static INFO_2D_ITEMS_IN_FRAME: 6;

/**
 * The amount of 2d draw calls in frame.
 *
*/
static INFO_2D_DRAW_CALLS_IN_FRAME: 7;

/**
 * Unimplemented in the GLES2 and GLES3 rendering backends, always returns 0.
 *
*/
static INFO_USAGE_VIDEO_MEM_TOTAL: 8;

/**
 * The amount of video memory used, i.e. texture and vertex memory combined.
 *
*/
static INFO_VIDEO_MEM_USED: 9;

/**
 * The amount of texture memory used.
 *
*/
static INFO_TEXTURE_MEM_USED: 10;

/**
 * The amount of vertex memory used.
 *
*/
static INFO_VERTEX_MEM_USED: 11;

/**
 * Hardware supports shaders. This enum is currently unused in Godot 3.x.
 *
*/
static FEATURE_SHADERS: 0;

/**
 * Hardware supports multithreading. This enum is currently unused in Godot 3.x.
 *
*/
static FEATURE_MULTITHREADED: 1;

/**
 * Use [Transform2D] to store MultiMesh transform.
 *
*/
static MULTIMESH_TRANSFORM_2D: 0;

/**
 * Use [Transform] to store MultiMesh transform.
 *
*/
static MULTIMESH_TRANSFORM_3D: 1;

/**
 * MultiMesh does not use per-instance color.
 *
*/
static MULTIMESH_COLOR_NONE: 0;

/**
 * MultiMesh color uses 8 bits per component. This packs the color into a single float.
 *
*/
static MULTIMESH_COLOR_8BIT: 1;

/**
 * MultiMesh color uses a float per channel.
 *
*/
static MULTIMESH_COLOR_FLOAT: 2;

/**
 * MultiMesh does not use custom data.
 *
*/
static MULTIMESH_CUSTOM_DATA_NONE: 0;

/**
 * MultiMesh custom data uses 8 bits per component. This packs the 4-component custom data into a single float.
 *
*/
static MULTIMESH_CUSTOM_DATA_8BIT: 1;

/**
 * MultiMesh custom data uses a float per component.
 *
*/
static MULTIMESH_CUSTOM_DATA_FLOAT: 2;

/**
 * Reflection probe will update reflections once and then stop.
 *
*/
static REFLECTION_PROBE_UPDATE_ONCE: 0;

/**
 * Reflection probe will update each frame. This mode is necessary to capture moving objects.
 *
*/
static REFLECTION_PROBE_UPDATE_ALWAYS: 1;

/**
 * Draw particles in the order that they appear in the particles array.
 *
*/
static PARTICLES_DRAW_ORDER_INDEX: 0;

/**
 * Sort particles based on their lifetime.
 *
*/
static PARTICLES_DRAW_ORDER_LIFETIME: 1;

/**
 * Sort particles based on their distance to the camera.
 *
*/
static PARTICLES_DRAW_ORDER_VIEW_DEPTH: 2;

/**
 * Use the clear color as background.
 *
*/
static ENV_BG_CLEAR_COLOR: 0;

/**
 * Use a specified color as the background.
 *
*/
static ENV_BG_COLOR: 1;

/**
 * Use a sky resource for the background.
 *
*/
static ENV_BG_SKY: 2;

/**
 * Use a custom color for background, but use a sky for shading and reflections.
 *
*/
static ENV_BG_COLOR_SKY: 3;

/**
 * Use a specified canvas layer as the background. This can be useful for instantiating a 2D scene in a 3D world.
 *
*/
static ENV_BG_CANVAS: 4;

/**
 * Do not clear the background, use whatever was rendered last frame as the background.
 *
*/
static ENV_BG_KEEP: 5;

/**
 * Represents the size of the [enum EnvironmentBG] enum.
 *
*/
static ENV_BG_MAX: 7;

/**
 * Use lowest blur quality. Fastest, but may look bad.
 *
*/
static ENV_DOF_BLUR_QUALITY_LOW: 0;

/**
 * Use medium blur quality.
 *
*/
static ENV_DOF_BLUR_QUALITY_MEDIUM: 1;

/**
 * Used highest blur quality. Looks the best, but is the slowest.
 *
*/
static ENV_DOF_BLUR_QUALITY_HIGH: 2;

/**
 * Add the effect of the glow on top of the scene.
 *
*/
static GLOW_BLEND_MODE_ADDITIVE: 0;

/**
 * Blends the glow effect with the screen. Does not get as bright as additive.
 *
*/
static GLOW_BLEND_MODE_SCREEN: 1;

/**
 * Produces a subtle color disturbance around objects.
 *
*/
static GLOW_BLEND_MODE_SOFTLIGHT: 2;

/**
 * Shows the glow effect by itself without the underlying scene.
 *
*/
static GLOW_BLEND_MODE_REPLACE: 3;

/**
 * Output color as they came in.
 *
*/
static ENV_TONE_MAPPER_LINEAR: 0;

/**
 * Use the Reinhard tonemapper.
 *
*/
static ENV_TONE_MAPPER_REINHARD: 1;

/**
 * Use the filmic tonemapper.
 *
*/
static ENV_TONE_MAPPER_FILMIC: 2;

/**
 * Use the ACES tonemapper.
 *
*/
static ENV_TONE_MAPPER_ACES: 3;

/**
 * Lowest quality of screen space ambient occlusion.
 *
*/
static ENV_SSAO_QUALITY_LOW: 0;

/**
 * Medium quality screen space ambient occlusion.
 *
*/
static ENV_SSAO_QUALITY_MEDIUM: 1;

/**
 * Highest quality screen space ambient occlusion.
 *
*/
static ENV_SSAO_QUALITY_HIGH: 2;

/**
 * Disables the blur set for SSAO. Will make SSAO look noisier.
 *
*/
static ENV_SSAO_BLUR_DISABLED: 0;

/**
 * Perform a 1x1 blur on the SSAO output.
 *
*/
static ENV_SSAO_BLUR_1x1: 1;

/**
 * Performs a 2x2 blur on the SSAO output.
 *
*/
static ENV_SSAO_BLUR_2x2: 2;

/**
 * Performs a 3x3 blur on the SSAO output. Use this for smoothest SSAO.
 *
*/
static ENV_SSAO_BLUR_3x3: 3;


  /**
 * Emitted at the end of the frame, after the VisualServer has finished updating all the Viewports.
 *
*/
frame_post_draw: Signal<() => void>

/**
 * Emitted at the beginning of the frame, before the VisualServer updates all the Viewports.
 *
*/
frame_pre_draw: Signal<() => void>

}
