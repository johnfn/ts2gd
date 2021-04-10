
/**
 * Server for anything visible. The rendering server is the API backend for everything visible. The whole scene system mounts on it to display.
 *
 * The rendering server is completely opaque, the internals are entirely implementation specific and cannot be accessed.
 *
 * The rendering server can be used to bypass the scene system entirely.
 *
 * Resources are created using the `*_create` functions.
 *
 * All objects are drawn to a viewport. You can use the [Viewport] attached to the [SceneTree] or you can create one yourself with [method viewport_create]. When using a custom scenario or canvas, the scenario or canvas needs to be attached to the viewport using [method viewport_set_scenario] or [method viewport_attach_canvas].
 *
 * In 3D, all visual objects must be associated with a scenario. The scenario is a visual representation of the world. If accessing the rendering server from a running game, the scenario can be accessed from the scene tree from any [Node3D] node with [method Node3D.get_world_3d]. Otherwise, a scenario can be created with [method scenario_create].
 *
 * Similarly in 2D, a canvas is needed to draw all canvas items.
 *
 * In 3D, all visible objects are comprised of a resource and an instance. A resource can be a mesh, a particle system, a light, or any other 3D object. In order to be visible resources must be attached to an instance using [method instance_set_base]. The instance must also be attached to the scenario using [method instance_set_scenario] in order to be visible.
 *
 * In 2D, all visible objects are some form of canvas item. In order to be visible, a canvas item needs to be the child of a canvas attached to a viewport, or it needs to be the child of another canvas item that is eventually attached to the canvas.
 *
*/
declare class RenderingServerClass extends Object {

  
/**
 * Server for anything visible. The rendering server is the API backend for everything visible. The whole scene system mounts on it to display.
 *
 * The rendering server is completely opaque, the internals are entirely implementation specific and cannot be accessed.
 *
 * The rendering server can be used to bypass the scene system entirely.
 *
 * Resources are created using the `*_create` functions.
 *
 * All objects are drawn to a viewport. You can use the [Viewport] attached to the [SceneTree] or you can create one yourself with [method viewport_create]. When using a custom scenario or canvas, the scenario or canvas needs to be attached to the viewport using [method viewport_set_scenario] or [method viewport_attach_canvas].
 *
 * In 3D, all visual objects must be associated with a scenario. The scenario is a visual representation of the world. If accessing the rendering server from a running game, the scenario can be accessed from the scene tree from any [Node3D] node with [method Node3D.get_world_3d]. Otherwise, a scenario can be created with [method scenario_create].
 *
 * Similarly in 2D, a canvas is needed to draw all canvas items.
 *
 * In 3D, all visible objects are comprised of a resource and an instance. A resource can be a mesh, a particle system, a light, or any other 3D object. In order to be visible resources must be attached to an instance using [method instance_set_base]. The instance must also be attached to the scenario using [method instance_set_scenario] in order to be visible.
 *
 * In 2D, all visible objects are some form of canvas item. In order to be visible, a canvas item needs to be the child of a canvas attached to a viewport, or it needs to be the child of another canvas item that is eventually attached to the canvas.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]false[/code], disables rendering completely, but the engine logic is still being processed. You can call [method force_draw] to draw a frame even with rendering disabled. */
render_loop_enabled: boolean;

/** Sets images to be rendered in the window margin. */
black_bars_set_images(left: RID, top: RID, right: RID, bottom: RID): void;

/** Sets margin size, where black bars (or images, if [method black_bars_set_images] was used) are rendered. */
black_bars_set_margins(left: int, top: int, right: int, bottom: int): void;

/**
 * Creates a camera and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `camera_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
camera_create(): RID;

/** Sets the cull mask associated with this camera. The cull mask describes which 3D layers are rendered by this camera. Equivalent to [member Camera3D.cull_mask]. */
camera_set_cull_mask(camera: RID, layers: int): void;

/** Sets the environment used by this camera. Equivalent to [member Camera3D.environment]. */
camera_set_environment(camera: RID, env: RID): void;

/** Sets camera to use frustum projection. This mode allows adjusting the [code]offset[/code] argument to create "tilted frustum" effects. */
camera_set_frustum(camera: RID, size: float, offset: Vector2, z_near: float, z_far: float): void;

/** Sets camera to use orthogonal projection, also known as orthographic projection. Objects remain the same size on the screen no matter how far away they are. */
camera_set_orthogonal(camera: RID, size: float, z_near: float, z_far: float): void;

/** Sets camera to use perspective projection. Objects on the screen becomes smaller when they are far away. */
camera_set_perspective(camera: RID, fovy_degrees: float, z_near: float, z_far: float): void;

/** Sets [Transform] of camera. */
camera_set_transform(camera: RID, transform: Transform): void;

/** If [code]true[/code], preserves the horizontal aspect ratio which is equivalent to [constant Camera3D.KEEP_WIDTH]. If [code]false[/code], preserves the vertical aspect ratio which is equivalent to [constant Camera3D.KEEP_HEIGHT]. */
camera_set_use_vertical_aspect(camera: RID, enable: boolean): void;

/**
 * Creates a canvas and returns the assigned [RID]. It can be accessed with the RID that is returned. This RID will be used in all `canvas_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
canvas_create(): RID;

/** Clears the [CanvasItem] and removes all commands in it. */
canvas_item_clear(item: RID): void;

/** Sets the [CanvasItem] to copy a rect to the backbuffer. */
canvas_item_set_copy_to_backbuffer(item: RID, enabled: boolean, rect: Rect2): void;

/** Sets the index for the [CanvasItem]. */
canvas_item_set_draw_index(item: RID, index: int): void;

/** Sets a new material to the [CanvasItem]. */
canvas_item_set_material(item: RID, material: RID): void;

/** Sets if the [CanvasItem] uses its parent's material. */
canvas_item_set_use_parent_material(item: RID, enabled: boolean): void;

/** If this is enabled, the Z index of the parent will be added to the children's Z index. */
canvas_item_set_z_as_relative_to_parent(item: RID, enabled: boolean): void;

/** Sets the [CanvasItem]'s Z index, i.e. its draw order (lower indexes are drawn first). */
canvas_item_set_z_index(item: RID, z_index: int): void;

/** Attaches the canvas light to the canvas. Removes it from its previous canvas. */
canvas_light_attach_to_canvas(light: RID, canvas: RID): void;

/**
 * Creates a canvas light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_light_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
canvas_light_create(): RID;

/** Attaches a light occluder to the canvas. Removes it from its previous canvas. */
canvas_light_occluder_attach_to_canvas(occluder: RID, canvas: RID): void;

/**
 * Creates a light occluder and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_light_ocluder_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
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
 * Creates a new light occluder polygon and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_occluder_polygon_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
canvas_occluder_polygon_create(): RID;

/** Sets an occluder polygons cull mode. See [enum CanvasOccluderPolygonCullMode] constants. */
canvas_occluder_polygon_set_cull_mode(occluder_polygon: RID, mode: int): void;

/** Sets the shape of the occluder polygon. */
canvas_occluder_polygon_set_shape(occluder_polygon: RID, shape: PackedVector2Array, closed: boolean): void;

/** Sets the shape of the occluder polygon as lines. */
canvas_occluder_polygon_set_shape_as_lines(occluder_polygon: RID, shape: PackedVector2Array): void;

/** A copy of the canvas item will be drawn with a local offset of the mirroring [Vector2]. */
canvas_set_item_mirroring(canvas: RID, item: RID, mirroring: Vector2): void;

/** Modulates all colors in the given canvas. */
canvas_set_modulate(canvas: RID, color: Color): void;

/** No documentation provided. */
create_local_rendering_device(): RenderingDevice;

/**
 * Creates a directional light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach this directional light to an instance using [method instance_set_base] using the returned RID.
 *
*/
directional_light_create(): RID;

/**
 * Creates an environment and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `environment_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
environment_create(): RID;

/** Sets the values to be used with the "Adjustment" post-process effect. See [Environment] for more details. */
environment_set_adjustment(env: RID, enable: boolean, brightness: float, contrast: float, saturation: float, ramp: RID): void;

/** No documentation provided. */
environment_set_ambient_light(env: RID, color: Color, ambient?: int, energy?: float, sky_contibution?: float, reflection_source?: int, ao_color?: Color): void;

/** Sets the [i]BGMode[/i] of the environment. Equivalent to [member Environment.background_mode]. */
environment_set_background(env: RID, bg: int): void;

/** Color displayed for clear areas of the scene (if using Custom color or Color+Sky background modes). */
environment_set_bg_color(env: RID, color: Color): void;

/** Sets the intensity of the background color. */
environment_set_bg_energy(env: RID, energy: float): void;

/** Sets the maximum layer to use if using Canvas background mode. */
environment_set_canvas_max_layer(env: RID, max_layer: int): void;

/** No documentation provided. */
environment_set_fog(env: RID, enable: boolean, light_color: Color, light_energy: float, sun_scatter: float, density: float, height: float, height_density: float): void;

/** No documentation provided. */
environment_set_glow(env: RID, enable: boolean, levels: PackedFloat32Array, intensity: float, strength: float, mix: float, bloom_threshold: float, blend_mode: int, hdr_bleed_threshold: float, hdr_bleed_scale: float, hdr_luminance_cap: float): void;

/** Sets the [Sky] to be used as the environment's background when using [i]BGMode[/i] sky. Equivalent to [member Environment.sky]. */
environment_set_sky(env: RID, sky: RID): void;

/** Sets a custom field of view for the background [Sky]. Equivalent to [member Environment.sky_custom_fov]. */
environment_set_sky_custom_fov(env: RID, scale: float): void;

/** Sets the rotation of the background [Sky] expressed as a [Basis]. Equivalent to [member Environment.sky_rotation], where the rotation vector is used to construct the [Basis]. */
environment_set_sky_orientation(env: RID, orientation: Basis): void;

/** No documentation provided. */
environment_set_ssao(env: RID, enable: boolean, radius: float, intensity: float, bias: float, light_affect: float, ao_channel_affect: float, blur: int, bilateral_sharpness: float): void;

/** Sets the variables to be used with the "screen space reflections" post-process effect. See [Environment] for more details. */
environment_set_ssr(env: RID, enable: boolean, max_steps: int, fade_in: float, fade_out: float, depth_tolerance: float): void;

/** Sets the variables to be used with the "tonemap" post-process effect. See [Environment] for more details. */
environment_set_tonemap(env: RID, tone_mapper: int, exposure: float, white: float, auto_exposure: boolean, min_luminance: float, max_luminance: float, auto_exp_speed: float, auto_exp_grey: float): void;

/** Removes buffers and clears testcubes. */
finish(): void;

/** Forces a frame to be drawn when the function is called. Drawing a frame updates all [Viewport]s that are set to update. Use with extreme caution. */
force_draw(swap_buffers?: boolean, frame_step?: float): void;

/** Synchronizes threads. */
force_sync(): void;

/** Tries to free an object in the RenderingServer. */
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
get_video_adapter_name(): String;

/**
 * Returns the vendor of the video adapter (e.g. "NVIDIA Corporation").
 *
 * **Note:** When running a headless or server binary, this function returns an empty string.
 *
*/
get_video_adapter_vendor(): String;

/** Returns the id of a white texture. Creates one if none exists. */
get_white_texture(): RID;

/** No documentation provided. */
global_variable_add(name: StringName, type: int, default_value: any): void;

/** No documentation provided. */
global_variable_get(name: StringName): any;

/** No documentation provided. */
global_variable_get_list(): PackedStringArray;

/** No documentation provided. */
global_variable_get_type(name: StringName): int;

/** No documentation provided. */
global_variable_remove(name: StringName): void;

/** No documentation provided. */
global_variable_set(name: StringName, value: any): void;

/** Returns [code]true[/code] if changes have been made to the RenderingServer's data. [method force_draw] is usually called if this happens. */
has_changed(): boolean;

/** Not yet implemented. Always returns [code]false[/code]. */
has_feature(feature: int): boolean;

/** Returns [code]true[/code] if the OS supports a certain feature. Features might be [code]s3tc[/code], [code]etc[/code], [code]etc2[/code] and [code]pvrtc[/code]. */
has_os_feature(feature: String): boolean;

/** Sets up [ImmediateGeometry3D] internals to prepare for drawing. Equivalent to [method ImmediateGeometry3D.begin]. */
immediate_begin(immediate: RID, primitive: int, texture: RID): void;

/** Clears everything that was set up between [method immediate_begin] and [method immediate_end]. Equivalent to [method ImmediateGeometry3D.clear]. */
immediate_clear(immediate: RID): void;

/** Sets the color to be used with next vertex. Equivalent to [method ImmediateGeometry3D.set_color]. */
immediate_color(immediate: RID, color: Color): void;

/**
 * Creates an immediate geometry and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `immediate_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach this immediate geometry to an instance using [method instance_set_base] using the returned RID.
 *
*/
immediate_create(): RID;

/** Ends drawing the [ImmediateGeometry3D] and displays it. Equivalent to [method ImmediateGeometry3D.end]. */
immediate_end(immediate: RID): void;

/** Returns the material assigned to the [ImmediateGeometry3D]. */
immediate_get_material(immediate: RID): RID;

/** Sets the normal to be used with next vertex. Equivalent to [method ImmediateGeometry3D.set_normal]. */
immediate_normal(immediate: RID, normal: Vector3): void;

/** Sets the material to be used to draw the [ImmediateGeometry3D]. */
immediate_set_material(immediate: RID, material: RID): void;

/** Sets the tangent to be used with next vertex. Equivalent to [method ImmediateGeometry3D.set_tangent]. */
immediate_tangent(immediate: RID, tangent: Plane): void;

/** Sets the UV to be used with next vertex. Equivalent to [method ImmediateGeometry3D.set_uv]. */
immediate_uv(immediate: RID, tex_uv: Vector2): void;

/** Sets the UV2 to be used with next vertex. Equivalent to [method ImmediateGeometry3D.set_uv2]. */
immediate_uv2(immediate: RID, tex_uv: Vector2): void;

/** Adds the next vertex using the information provided in advance. Equivalent to [method ImmediateGeometry3D.add_vertex]. */
immediate_vertex(immediate: RID, vertex: Vector3): void;

/** Adds the next vertex using the information provided in advance. This is a helper class that calls [method immediate_vertex] under the hood. Equivalent to [method ImmediateGeometry3D.add_vertex]. */
immediate_vertex_2d(immediate: RID, vertex: Vector2): void;

/** Initializes the rendering server. This function is called internally by platform-dependent code during engine initialization. If called from a running game, it will not do anything. */
init(): void;

/** Attaches a unique Object ID to instance. Object ID must be attached to instance for proper culling with [method instances_cull_aabb], [method instances_cull_convex], and [method instances_cull_ray]. */
instance_attach_object_instance_id(instance: RID, id: int): void;

/** Attaches a skeleton to an instance. Removes the previous skeleton from the instance. */
instance_attach_skeleton(instance: RID, skeleton: RID): void;

/**
 * Creates a visual instance and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `instance_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * An instance is a way of placing a 3D object in the scenario. Objects like particles, meshes, and reflection probes need to be associated with an instance to be visible in the scenario using [method instance_set_base].
 *
*/
instance_create(): RID;

/**
 * Creates a visual instance, adds it to the RenderingServer, and sets both base and scenario. It can be accessed with the RID that is returned. This RID will be used in all `instance_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
instance_create2(base: RID, scenario: RID): RID;

/** Not implemented in Godot 3.x. */
instance_geometry_set_as_instance_lod(instance: RID, as_lod_of_instance: RID): void;

/** Sets the shadow casting setting to one of [enum ShadowCastingSetting]. Equivalent to [member GeometryInstance3D.cast_shadow]. */
instance_geometry_set_cast_shadows_setting(instance: RID, shadow_casting_setting: int): void;

/** Not implemented in Godot 3.x. */
instance_geometry_set_draw_range(instance: RID, min: float, max: float, min_margin: float, max_margin: float): void;

/** Sets the flag for a given [enum InstanceFlags]. See [enum InstanceFlags] for more details. */
instance_geometry_set_flag(instance: RID, flag: int, enabled: boolean): void;

/** Sets a material that will override the material for all surfaces on the mesh associated with this instance. Equivalent to [member GeometryInstance3D.material_override]. */
instance_geometry_set_material_override(instance: RID, material: RID): void;

/** Sets the base of the instance. A base can be any of the 3D objects that are created in the RenderingServer that can be displayed. For example, any of the light types, mesh, multimesh, immediate geometry, particle system, reflection probe, lightmap, and the GI probe are all types that can be set as the base of an instance in order to be displayed in the scenario. */
instance_set_base(instance: RID, base: RID): void;

/** Sets the weight for a given blend shape associated with this instance. */
instance_set_blend_shape_weight(instance: RID, shape: int, weight: float): void;

/** Sets a custom AABB to use when culling objects from the view frustum. Equivalent to [method GeometryInstance3D.set_custom_aabb]. */
instance_set_custom_aabb(instance: RID, aabb: AABB): void;

/** Function not implemented in Godot 3.x. */
instance_set_exterior(instance: RID, enabled: boolean): void;

/** Sets a margin to increase the size of the AABB when culling objects from the view frustum. This allows you avoid culling objects that fall outside the view frustum. Equivalent to [member GeometryInstance3D.extra_cull_margin]. */
instance_set_extra_visibility_margin(instance: RID, margin: float): void;

/** Sets the render layers that this instance will be drawn to. Equivalent to [member VisualInstance3D.layers]. */
instance_set_layer_mask(instance: RID, mask: int): void;

/** Sets the scenario that the instance is in. The scenario is the 3D world that the objects will be displayed in. */
instance_set_scenario(instance: RID, scenario: RID): void;

/** Sets the material of a specific surface. Equivalent to [method MeshInstance3D.set_surface_material]. */
instance_set_surface_material(instance: RID, surface: int, material: RID): void;

/** Sets the world space transform of the instance. Equivalent to [member Node3D.transform]. */
instance_set_transform(instance: RID, transform: Transform): void;

/** Sets whether an instance is drawn or not. Equivalent to [member Node3D.visible]. */
instance_set_visible(instance: RID, visible: boolean): void;

/**
 * Returns an array of object IDs intersecting with the provided AABB. Only visual 3D nodes are considered, such as [MeshInstance3D] or [DirectionalLight3D]. Use [method @GDScript.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World3D] you want to query. This forces an update for all resources queued to update.
 *
 * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
 *
*/
instances_cull_aabb(aabb: AABB, scenario: RID): any[];

/**
 * Returns an array of object IDs intersecting with the provided convex shape. Only visual 3D nodes are considered, such as [MeshInstance3D] or [DirectionalLight3D]. Use [method @GDScript.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World3D] you want to query. This forces an update for all resources queued to update.
 *
 * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
 *
*/
instances_cull_convex(convex: any[], scenario: RID): any[];

/**
 * Returns an array of object IDs intersecting with the provided 3D ray. Only visual 3D nodes are considered, such as [MeshInstance3D] or [DirectionalLight3D]. Use [method @GDScript.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World3D] you want to query. This forces an update for all resources queued to update.
 *
 * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
 *
*/
instances_cull_ray(from: Vector3, to: Vector3, scenario: RID): any[];

/** If [code]true[/code], this directional light will blend between shadow map splits resulting in a smoother transition between them. Equivalent to [member DirectionalLight3D.directional_shadow_blend_splits]. */
light_directional_set_blend_splits(light: RID, enable: boolean): void;

/** Sets the shadow depth range mode for this directional light. Equivalent to [member DirectionalLight3D.directional_shadow_depth_range]. See [enum LightDirectionalShadowDepthRangeMode] for options. */
light_directional_set_shadow_depth_range_mode(light: RID, range_mode: int): void;

/** Sets the shadow mode for this directional light. Equivalent to [member DirectionalLight3D.directional_shadow_mode]. See [enum LightDirectionalShadowMode] for options. */
light_directional_set_shadow_mode(light: RID, mode: int): void;

/** Sets whether to use a dual paraboloid or a cubemap for the shadow map. Dual paraboloid is faster but may suffer from artifacts. Equivalent to [member OmniLight3D.omni_shadow_mode]. */
light_omni_set_shadow_mode(light: RID, mode: int): void;

/** No documentation provided. */
light_set_bake_mode(light: RID, bake_mode: int): void;

/** Sets the color of the light. Equivalent to [member Light3D.light_color]. */
light_set_color(light: RID, color: Color): void;

/** Sets the cull mask for this Light3D. Lights only affect objects in the selected layers. Equivalent to [member Light3D.light_cull_mask]. */
light_set_cull_mask(light: RID, mask: int): void;

/** If [code]true[/code], light will subtract light instead of adding light. Equivalent to [member Light3D.light_negative]. */
light_set_negative(light: RID, enable: boolean): void;

/** Sets the specified light parameter. See [enum LightParam] for options. Equivalent to [method Light3D.set_param]. */
light_set_param(light: RID, param: int, value: float): void;

/** Not implemented in Godot 3.x. */
light_set_projector(light: RID, texture: RID): void;

/** If [code]true[/code], reverses the backface culling of the mesh. This can be useful when you have a flat mesh that has a light behind it. If you need to cast a shadow on both sides of the mesh, set the mesh to use double sided shadows with [method instance_geometry_set_cast_shadows_setting]. Equivalent to [member Light3D.shadow_reverse_cull_face]. */
light_set_reverse_cull_face_mode(light: RID, enabled: boolean): void;

/** If [code]true[/code], light will cast shadows. Equivalent to [member Light3D.shadow_enabled]. */
light_set_shadow(light: RID, enabled: boolean): void;

/** Sets the color of the shadow cast by the light. Equivalent to [member Light3D.shadow_color]. */
light_set_shadow_color(light: RID, color: Color): void;

/** Returns a mesh of a sphere with the given amount of horizontal and vertical subdivisions. */
make_sphere_mesh(latitudes: int, longitudes: int, radius: float): RID;

/**
 * Creates an empty material and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `material_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
material_create(): RID;

/** Returns the value of a certain material's parameter. */
material_get_param(material: RID, parameter: StringName): any;

/** Sets an object's next material. */
material_set_next_pass(material: RID, next_material: RID): void;

/** Sets a material's parameter. */
material_set_param(material: RID, parameter: StringName, value: any): void;

/** Sets a material's render priority. */
material_set_render_priority(material: RID, priority: int): void;

/** Sets a shader material's shader. */
material_set_shader(shader_material: RID, shader: RID): void;

/** No documentation provided. */
mesh_add_surface_from_arrays(mesh: RID, primitive: int, arrays: any[], blend_shapes?: any[], lods?: Dictionary, compress_format?: int): void;

/** Removes all surfaces from a mesh. */
mesh_clear(mesh: RID): void;

/**
 * Creates a new mesh and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `mesh_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
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

/** Sets a mesh's blend shape mode. */
mesh_set_blend_shape_mode(mesh: RID, mode: int): void;

/** Sets a mesh's custom aabb. */
mesh_set_custom_aabb(mesh: RID, aabb: AABB): void;

/** Returns a mesh's surface's buffer arrays. */
mesh_surface_get_arrays(mesh: RID, surface: int): any[];

/** Returns a mesh's surface's arrays for blend shapes. */
mesh_surface_get_blend_shape_arrays(mesh: RID, surface: int): any[];

/** Function is unused in Godot 3.x. */
mesh_surface_get_format_offset(format: int, vertex_len: int, index_len: int, array_index: int): int;

/** Function is unused in Godot 3.x. */
mesh_surface_get_format_stride(format: int, vertex_len: int, index_len: int): int;

/** Returns a mesh's surface's material. */
mesh_surface_get_material(mesh: RID, surface: int): RID;

/** Sets a mesh's surface's material. */
mesh_surface_set_material(mesh: RID, surface: int, material: RID): void;

/** Updates a specific region of a vertex buffer for the specified surface. Warning: this function alters the vertex buffer directly with no safety mechanisms, you can easily corrupt your mesh. */
mesh_surface_update_region(mesh: RID, surface: int, offset: int, data: PackedByteArray): void;

/** No documentation provided. */
multimesh_allocate(multimesh: RID, instances: int, transform_format: int, color_format?: boolean, custom_data_format?: boolean): void;

/**
 * Creates a new multimesh on the RenderingServer and returns an [RID] handle. This RID will be used in all `multimesh_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach this multimesh to an instance using [method instance_set_base] using the returned RID.
 *
*/
multimesh_create(): RID;

/** Calculates and returns the axis-aligned bounding box that encloses all instances within the multimesh. */
multimesh_get_aabb(multimesh: RID): AABB;

/** No documentation provided. */
multimesh_get_buffer(multimesh: RID): PackedFloat32Array;

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

/** No documentation provided. */
multimesh_set_buffer(multimesh: RID, buffer: PackedFloat32Array): void;

/** Sets the mesh to be drawn by the multimesh. Equivalent to [member MultiMesh.mesh]. */
multimesh_set_mesh(multimesh: RID, mesh: RID): void;

/** Sets the number of instances visible at a given time. If -1, all instances that have been allocated are drawn. Equivalent to [member MultiMesh.visible_instance_count]. */
multimesh_set_visible_instances(multimesh: RID, visible: int): void;

/**
 * Creates a new omni light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach this omni light to an instance using [method instance_set_base] using the returned RID.
 *
*/
omni_light_create(): RID;

/**
 * Creates a particle system and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `particles_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach these particles to an instance using [method instance_set_base] using the returned RID.
 *
*/
particles_create(): RID;

/** Calculates and returns the axis-aligned bounding box that contains all the particles. Equivalent to [method GPUParticles3D.capture_aabb]. */
particles_get_current_aabb(particles: RID): AABB;

/** Returns [code]true[/code] if particles are currently set to emitting. */
particles_get_emitting(particles: RID): boolean;

/** Returns [code]true[/code] if particles are not emitting and particles are set to inactive. */
particles_is_inactive(particles: RID): boolean;

/** Add particle system to list of particle systems that need to be updated. Update will take place on the next frame, or on the next call to [method instances_cull_aabb], [method instances_cull_convex], or [method instances_cull_ray]. */
particles_request_process(particles: RID): void;

/** Reset the particles on the next update. Equivalent to [method GPUParticles3D.restart]. */
particles_restart(particles: RID): void;

/** Sets the number of particles to be drawn and allocates the memory for them. Equivalent to [member GPUParticles3D.amount]. */
particles_set_amount(particles: RID, amount: int): void;

/** Sets a custom axis-aligned bounding box for the particle system. Equivalent to [member GPUParticles3D.visibility_aabb]. */
particles_set_custom_aabb(particles: RID, aabb: AABB): void;

/** Sets the draw order of the particles to one of the named enums from [enum ParticlesDrawOrder]. See [enum ParticlesDrawOrder] for options. Equivalent to [member GPUParticles3D.draw_order]. */
particles_set_draw_order(particles: RID, order: int): void;

/** Sets the mesh to be used for the specified draw pass. Equivalent to [member GPUParticles3D.draw_pass_1], [member GPUParticles3D.draw_pass_2], [member GPUParticles3D.draw_pass_3], and [member GPUParticles3D.draw_pass_4]. */
particles_set_draw_pass_mesh(particles: RID, pass: int, mesh: RID): void;

/** Sets the number of draw passes to use. Equivalent to [member GPUParticles3D.draw_passes]. */
particles_set_draw_passes(particles: RID, count: int): void;

/** Sets the [Transform] that will be used by the particles when they first emit. */
particles_set_emission_transform(particles: RID, transform: Transform): void;

/** If [code]true[/code], particles will emit over time. Setting to false does not reset the particles, but only stops their emission. Equivalent to [member GPUParticles3D.emitting]. */
particles_set_emitting(particles: RID, emitting: boolean): void;

/** Sets the explosiveness ratio. Equivalent to [member GPUParticles3D.explosiveness]. */
particles_set_explosiveness_ratio(particles: RID, ratio: float): void;

/** Sets the frame rate that the particle system rendering will be fixed to. Equivalent to [member GPUParticles3D.fixed_fps]. */
particles_set_fixed_fps(particles: RID, fps: int): void;

/** If [code]true[/code], uses fractional delta which smooths the movement of the particles. Equivalent to [member GPUParticles3D.fract_delta]. */
particles_set_fractional_delta(particles: RID, enable: boolean): void;

/** Sets the lifetime of each particle in the system. Equivalent to [member GPUParticles3D.lifetime]. */
particles_set_lifetime(particles: RID, lifetime: float): void;

/** If [code]true[/code], particles will emit once and then stop. Equivalent to [member GPUParticles3D.one_shot]. */
particles_set_one_shot(particles: RID, one_shot: boolean): void;

/** Sets the preprocess time for the particles animation. This lets you delay starting an animation until after the particles have begun emitting. Equivalent to [member GPUParticles3D.preprocess]. */
particles_set_pre_process_time(particles: RID, time: float): void;

/** Sets the material for processing the particles. Note: this is not the material used to draw the materials. Equivalent to [member GPUParticles3D.process_material]. */
particles_set_process_material(particles: RID, material: RID): void;

/** Sets the emission randomness ratio. This randomizes the emission of particles within their phase. Equivalent to [member GPUParticles3D.randomness]. */
particles_set_randomness_ratio(particles: RID, ratio: float): void;

/** Sets the speed scale of the particle system. Equivalent to [member GPUParticles3D.speed_scale]. */
particles_set_speed_scale(particles: RID, scale: float): void;

/** If [code]true[/code], particles use local coordinates. If [code]false[/code] they use global coordinates. Equivalent to [member GPUParticles3D.local_coords]. */
particles_set_use_local_coordinates(particles: RID, enable: boolean): void;

/**
 * Creates a reflection probe and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `reflection_probe_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach this reflection probe to an instance using [method instance_set_base] using the returned RID.
 *
*/
reflection_probe_create(): RID;

/** No documentation provided. */
reflection_probe_set_ambient_color(probe: RID, color: Color): void;

/** No documentation provided. */
reflection_probe_set_ambient_energy(probe: RID, energy: float): void;

/** No documentation provided. */
reflection_probe_set_ambient_mode(probe: RID, mode: int): void;

/** If [code]true[/code], reflections will ignore sky contribution. Equivalent to [member ReflectionProbe.interior]. */
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
request_frame_drawn_callback(where: Object, method: StringName, userdata: any): void;

/**
 * Creates a scenario and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `scenario_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
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

/** Sets a boot image. The color defines the background color. If [code]scale[/code] is [code]true[/code], the image will be scaled to fit the screen size. If [code]use_filter[/code] is [code]true[/code], the image will be scaled with linear interpolation. If [code]use_filter[/code] is [code]false[/code], the image will be scaled with nearest-neighbor interpolation. */
set_boot_image(image: Image, color: Color, scale: boolean, use_filter?: boolean): void;

/** If [code]true[/code], the engine will generate wireframes for use with the wireframe debug mode. */
set_debug_generate_wireframes(generate: boolean): void;

/** Sets the default clear color which is used when a specific clear color has not been selected. */
set_default_clear_color(color: Color): void;

/**
 * Creates an empty shader and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `shader_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
shader_create(): RID;

/** Returns a shader's code. */
shader_get_code(shader: RID): String;

/** Returns a default texture from a shader searched by name. */
shader_get_default_texture_param(shader: RID, name: StringName): RID;

/** No documentation provided. */
shader_get_param_default(material: RID, parameter: StringName): any;

/** Returns the parameters of a shader. */
shader_get_param_list(shader: RID): any[];

/** Sets a shader's code. */
shader_set_code(shader: RID, code: String): void;

/** Sets a shader's default texture. Overwrites the texture given by name. */
shader_set_default_texture_param(shader: RID, name: StringName, texture: RID): void;

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
 * Creates a skeleton and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `skeleton_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
skeleton_create(): RID;

/** Returns the number of bones allocated for this skeleton. */
skeleton_get_bone_count(skeleton: RID): int;

/**
 * Creates an empty sky and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `sky_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
sky_create(): RID;

/** Sets the material that the sky uses to render the background and reflection maps. */
sky_set_material(sky: RID, material: RID): void;

/**
 * Creates a spot light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
 * To place in a scene, attach this spot light to an instance using [method instance_set_base] using the returned RID.
 *
*/
spot_light_create(): RID;

/** No documentation provided. */
texture_2d_create(image: Image): RID;

/** No documentation provided. */
texture_2d_get(texture: RID): Image;

/** Sets a viewport's camera. */
viewport_attach_camera(viewport: RID, camera: RID): void;

/** Sets a viewport's canvas. */
viewport_attach_canvas(viewport: RID, canvas: RID): void;

/**
 * Copies the viewport to a region of the screen specified by `rect`. If [method viewport_set_render_direct_to_screen] is `true`, then the viewport does not use a framebuffer and the contents of the viewport are rendered directly to screen. However, note that the root viewport is drawn last, therefore it will draw over the screen. Accordingly, you must set the root viewport to an area that does not cover the area that you have attached this viewport to.
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
 * Creates an empty viewport and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `viewport_*` RenderingServer functions.
 *
 * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] static method.
 *
*/
viewport_create(): RID;

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

/** If [code]true[/code], rendering of a viewport's environment is disabled. */
viewport_set_disable_environment(viewport: RID, disabled: boolean): void;

/** Sets the viewport's global transformation matrix. */
viewport_set_global_canvas_transform(viewport: RID, transform: Transform2D): void;

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

/** If [code]true[/code], the viewport uses augmented or virtual reality technologies. See [XRInterface]. */
viewport_set_use_xr(viewport: RID, use_xr: boolean): void;

  connect<T extends SignalsOf<RenderingServerClass>, U extends Node>(signal: T, node: U, method: keyof U): number;



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

/** No documentation provided. */
static TEXTURE_LAYERED_2D_ARRAY: 0;

/** No documentation provided. */
static TEXTURE_LAYERED_CUBEMAP: 1;

/** No documentation provided. */
static TEXTURE_LAYERED_CUBEMAP_ARRAY: 2;

/** No documentation provided. */
static CUBEMAP_LAYER_LEFT: 0;

/** No documentation provided. */
static CUBEMAP_LAYER_RIGHT: 1;

/** No documentation provided. */
static CUBEMAP_LAYER_BOTTOM: 2;

/** No documentation provided. */
static CUBEMAP_LAYER_TOP: 3;

/** No documentation provided. */
static CUBEMAP_LAYER_FRONT: 4;

/** No documentation provided. */
static CUBEMAP_LAYER_BACK: 5;

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
 * Shader is a sky shader.
 *
*/
static SHADER_SKY: 3;

/**
 * Represents the size of the [enum ShaderMode] enum.
 *
*/
static SHADER_MAX: 4;

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
 * Flag used to mark a compressed index array.
 *
*/
static ARRAY_COMPRESS_INDEX: 131072;

/**
 * Used to set flags [constant ARRAY_COMPRESS_NORMAL], [constant ARRAY_COMPRESS_TANGENT], [constant ARRAY_COMPRESS_COLOR], [constant ARRAY_COMPRESS_TEX_UV] and [constant ARRAY_COMPRESS_TEX_UV2] quickly.
 *
*/
static ARRAY_COMPRESS_DEFAULT: 31744;

/**
 * Flag used to mark that the array contains 2D vertices.
 *
*/
static ARRAY_FLAG_USE_2D_VERTICES: 262144;

/** No documentation provided. */
static ARRAY_FLAG_USE_DYNAMIC_UPDATE: 1048576;

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
 * Primitive to draw consists of triangles.
 *
*/
static PRIMITIVE_TRIANGLES: 3;

/**
 * Primitive to draw consists of a triangle strip (the last 3 vertices are always combined to make a triangle).
 *
*/
static PRIMITIVE_TRIANGLE_STRIP: 4;

/**
 * Represents the size of the [enum PrimitiveType] enum.
 *
*/
static PRIMITIVE_MAX: 5;

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

/** No documentation provided. */
static LIGHT_PARAM_INDIRECT_ENERGY: 1;

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
 * The size of the light when using spot light or omni light. The angular size of the light when using directional light.
 *
*/
static LIGHT_PARAM_SIZE: 4;

/**
 * The light's attenuation.
 *
*/
static LIGHT_PARAM_ATTENUATION: 5;

/**
 * The spotlight's angle.
 *
*/
static LIGHT_PARAM_SPOT_ANGLE: 6;

/**
 * The spotlight's attenuation.
 *
*/
static LIGHT_PARAM_SPOT_ATTENUATION: 7;

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
 * Proportion of shadow max distance where the shadow will start to fade out.
 *
*/
static LIGHT_PARAM_SHADOW_FADE_START: 12;

/**
 * Normal bias used to offset shadow lookup by object normal. Can be used to fix self-shadowing artifacts.
 *
*/
static LIGHT_PARAM_SHADOW_NORMAL_BIAS: 13;

/**
 * Bias the shadow lookup to fix self-shadowing artifacts.
 *
*/
static LIGHT_PARAM_SHADOW_BIAS: 14;

/**
 * Sets the size of the directional shadow pancake. The pancake offsets the start of the shadow's camera frustum to provide a higher effective depth resolution for the shadow. However, a high pancake size can cause artifacts in the shadows of large objects that are close to the edge of the frustum. Reducing the pancake size can help. Setting the size to `0` turns off the pancaking effect.
 *
*/
static LIGHT_PARAM_SHADOW_PANCAKE_SIZE: 15;

/**
 * Blurs the edges of the shadow. Can be used to hide pixel artifacts in low resolution shadow maps. A high value can make shadows appear grainy and can cause other unwanted artifacts. Try to keep as near default as possible.
 *
*/
static LIGHT_PARAM_SHADOW_BLUR: 16;

/** No documentation provided. */
static LIGHT_PARAM_TRANSMITTANCE_BIAS: 18;

/**
 * Represents the size of the [enum LightParam] enum.
 *
*/
static LIGHT_PARAM_MAX: 19;

/** No documentation provided. */
static LIGHT_BAKE_DISABLED: 0;

/** No documentation provided. */
static LIGHT_BAKE_DYNAMIC: 1;

/** No documentation provided. */
static LIGHT_BAKE_STATIC: 2;

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
 * Reflection probe will update reflections once and then stop.
 *
*/
static REFLECTION_PROBE_UPDATE_ONCE: 0;

/**
 * Reflection probe will update each frame. This mode is necessary to capture moving objects.
 *
*/
static REFLECTION_PROBE_UPDATE_ALWAYS: 1;

/** No documentation provided. */
static REFLECTION_PROBE_AMBIENT_DISABLED: 0;

/** No documentation provided. */
static REFLECTION_PROBE_AMBIENT_ENVIRONMENT: 1;

/** No documentation provided. */
static REFLECTION_PROBE_AMBIENT_COLOR: 2;

/** No documentation provided. */
static DECAL_TEXTURE_ALBEDO: 0;

/** No documentation provided. */
static DECAL_TEXTURE_NORMAL: 1;

/** No documentation provided. */
static DECAL_TEXTURE_ORM: 2;

/** No documentation provided. */
static DECAL_TEXTURE_EMISSION: 3;

/** No documentation provided. */
static DECAL_TEXTURE_MAX: 4;

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

/** No documentation provided. */
static VIEWPORT_UPDATE_WHEN_PARENT_VISIBLE: 3;

/**
 * Always update the viewport.
 *
*/
static VIEWPORT_UPDATE_ALWAYS: 4;

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
 * Multisample antialiasing uses 2 samples per pixel.
 *
*/
static VIEWPORT_MSAA_2X: 1;

/**
 * Multisample antialiasing uses 4 samples per pixel.
 *
*/
static VIEWPORT_MSAA_4X: 2;

/**
 * Multisample antialiasing uses 8 samples per pixel.
 *
*/
static VIEWPORT_MSAA_8X: 3;

/**
 * Multisample antialiasing uses 16 samples per pixel.
 *
*/
static VIEWPORT_MSAA_16X: 4;

/** No documentation provided. */
static VIEWPORT_MSAA_MAX: 5;

/** No documentation provided. */
static VIEWPORT_SCREEN_SPACE_AA_DISABLED: 0;

/** No documentation provided. */
static VIEWPORT_SCREEN_SPACE_AA_FXAA: 1;

/** No documentation provided. */
static VIEWPORT_SCREEN_SPACE_AA_MAX: 2;

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
 * Represents the size of the [enum ViewportRenderInfo] enum.
 *
*/
static VIEWPORT_RENDER_INFO_MAX: 6;

/**
 * Debug draw is disabled. Default setting.
 *
*/
static VIEWPORT_DEBUG_DRAW_DISABLED: 0;

/**
 * Objects are displayed without light information.
 *
*/
static VIEWPORT_DEBUG_DRAW_UNSHADED: 1;

/**
 * Objects are displayed with only light information.
 *
*/
static VIEWPORT_DEBUG_DRAW_LIGHTING: 2;

/**
 * Objects are displayed semi-transparent with additive blending so you can see where they are drawing over top of one another. A higher overdraw means you are wasting performance on drawing pixels that are being hidden behind others.
 *
*/
static VIEWPORT_DEBUG_DRAW_OVERDRAW: 3;

/**
 * Debug draw draws objects in wireframe.
 *
*/
static VIEWPORT_DEBUG_DRAW_WIREFRAME: 4;

/**
 * Normal buffer is drawn instead of regular scene so you can see the per-pixel normals that will be used by post-processing effects.
 *
*/
static VIEWPORT_DEBUG_DRAW_NORMAL_BUFFER: 5;

/**
 * Objects are displayed with only the albedo value from [GIProbe]s.
 *
*/
static VIEWPORT_DEBUG_DRAW_GI_PROBE_ALBEDO: 6;

/**
 * Objects are displayed with only the lighting value from [GIProbe]s.
 *
*/
static VIEWPORT_DEBUG_DRAW_GI_PROBE_LIGHTING: 7;

/**
 * Objects are displayed with only the emission color from [GIProbe]s.
 *
*/
static VIEWPORT_DEBUG_DRAW_GI_PROBE_EMISSION: 8;

/**
 * Draws the shadow atlas that stores shadows from [OmniLight3D]s and [SpotLight3D]s in the upper left quadrant of the [Viewport].
 *
*/
static VIEWPORT_DEBUG_DRAW_SHADOW_ATLAS: 9;

/**
 * Draws the shadow atlas that stores shadows from [DirectionalLight3D]s in the upper left quadrant of the [Viewport].
 *
*/
static VIEWPORT_DEBUG_DRAW_DIRECTIONAL_SHADOW_ATLAS: 10;

/** No documentation provided. */
static VIEWPORT_DEBUG_DRAW_SCENE_LUMINANCE: 11;

/**
 * Draws the screen space ambient occlusion texture instead of the scene so that you can clearly see how it is affecting objects. In order for this display mode to work, you must have [member Environment.ssao_enabled] set in your [WorldEnvironment].
 *
*/
static VIEWPORT_DEBUG_DRAW_SSAO: 12;

/**
 * Colors each PSSM split for the [DirectionalLight3D]s in the scene a different color so you can see where the splits are. In order they will be colored red, green, blue, yellow.
 *
*/
static VIEWPORT_DEBUG_DRAW_PSSM_SPLITS: 13;

/** No documentation provided. */
static VIEWPORT_DEBUG_DRAW_DECAL_ATLAS: 14;

/** No documentation provided. */
static VIEWPORT_DEBUG_DRAW_SDFGI: 15;

/** No documentation provided. */
static VIEWPORT_DEBUG_DRAW_SDFGI_PROBES: 16;

/** No documentation provided. */
static VIEWPORT_DEBUG_DRAW_GI_BUFFER: 17;

/**
 * Uses high quality importance sampling to process the radiance map. In general, this results in much higher quality than [constant Sky.PROCESS_MODE_REALTIME] but takes much longer to generate. This should not be used if you plan on changing the sky at runtime. If you are finding that the reflection is not blurry enough and is showing sparkles or fireflies, try increasing [member ProjectSettings.rendering/quality/reflections/ggx_samples].
 *
*/
static SKY_MODE_QUALITY: 1;

/**
 * Uses the fast filtering algorithm to process the radiance map. In general this results in lower quality, but substantially faster run times.
 *
 * **Note:** The fast filtering algorithm is limited to 256x256 cubemaps, so [member Sky.radiance_size] must be set to [constant Sky.RADIANCE_SIZE_256].
 *
*/
static SKY_MODE_REALTIME: 3;

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
 * Use a specified canvas layer as the background. This can be useful for instantiating a 2D scene in a 3D world.
 *
*/
static ENV_BG_CANVAS: 3;

/**
 * Do not clear the background, use whatever was rendered last frame as the background.
 *
*/
static ENV_BG_KEEP: 4;

/**
 * Displays a camera feed in the background.
 *
*/
static ENV_BG_CAMERA_FEED: 5;

/**
 * Represents the size of the [enum EnvironmentBG] enum.
 *
*/
static ENV_BG_MAX: 6;

/**
 * Gather ambient light from whichever source is specified as the background.
 *
*/
static ENV_AMBIENT_SOURCE_BG: 0;

/**
 * Disable ambient light.
 *
*/
static ENV_AMBIENT_SOURCE_DISABLED: 1;

/**
 * Specify a specific [Color] for ambient light.
 *
*/
static ENV_AMBIENT_SOURCE_COLOR: 2;

/**
 * Gather ambient light from the [Sky] regardless of what the background is.
 *
*/
static ENV_AMBIENT_SOURCE_SKY: 3;

/**
 * Use the background for reflections.
 *
*/
static ENV_REFLECTION_SOURCE_BG: 0;

/**
 * Disable reflections.
 *
*/
static ENV_REFLECTION_SOURCE_DISABLED: 1;

/**
 * Use the [Sky] for reflections regardless of what the background is.
 *
*/
static ENV_REFLECTION_SOURCE_SKY: 2;

/**
 * Additive glow blending mode. Mostly used for particles, glows (bloom), lens flare, bright sources.
 *
*/
static ENV_GLOW_BLEND_MODE_ADDITIVE: 0;

/**
 * Screen glow blending mode. Increases brightness, used frequently with bloom.
 *
*/
static ENV_GLOW_BLEND_MODE_SCREEN: 1;

/**
 * Soft light glow blending mode. Modifies contrast, exposes shadows and highlights (vivid bloom).
 *
*/
static ENV_GLOW_BLEND_MODE_SOFTLIGHT: 2;

/**
 * Replace glow blending mode. Replaces all pixels' color by the glow value. This can be used to simulate a full-screen blur effect by tweaking the glow parameters to match the original image's brightness.
 *
*/
static ENV_GLOW_BLEND_MODE_REPLACE: 3;

/**
 * Mixes the glow with the underlying color to avoid increasing brightness as much while still maintaining a glow effect.
 *
*/
static ENV_GLOW_BLEND_MODE_MIX: 4;

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

/** No documentation provided. */
static ENV_SSR_ROUGNESS_QUALITY_DISABLED: 0;

/** No documentation provided. */
static ENV_SSR_ROUGNESS_QUALITY_LOW: 1;

/** No documentation provided. */
static ENV_SSR_ROUGNESS_QUALITY_MEDIUM: 2;

/** No documentation provided. */
static ENV_SSR_ROUGNESS_QUALITY_HIGH: 3;

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
 * High quality screen space ambient occlusion.
 *
*/
static ENV_SSAO_QUALITY_HIGH: 2;

/**
 * Highest quality screen space ambient occlusion.
 *
*/
static ENV_SSAO_QUALITY_ULTRA: 3;

/** No documentation provided. */
static SUB_SURFACE_SCATTERING_QUALITY_DISABLED: 0;

/** No documentation provided. */
static SUB_SURFACE_SCATTERING_QUALITY_LOW: 1;

/** No documentation provided. */
static SUB_SURFACE_SCATTERING_QUALITY_MEDIUM: 2;

/** No documentation provided. */
static SUB_SURFACE_SCATTERING_QUALITY_HIGH: 3;

/**
 * Lowest quality DOF blur. This is the fastest setting, but you may be able to see filtering artifacts.
 *
*/
static DOF_BLUR_QUALITY_VERY_LOW: 0;

/**
 * Low quality DOF blur.
 *
*/
static DOF_BLUR_QUALITY_LOW: 1;

/**
 * Medium quality DOF blur.
 *
*/
static DOF_BLUR_QUALITY_MEDIUM: 2;

/**
 * Highest quality DOF blur. Results in the smoothest looking blur by taking the most samples, but is also significantly slower.
 *
*/
static DOF_BLUR_QUALITY_HIGH: 3;

/**
 * Calculate the DOF blur using a box filter. The fastest option, but results in obvious lines in blur pattern.
 *
*/
static DOF_BOKEH_BOX: 0;

/**
 * Calculates DOF blur using a hexagon shaped filter.
 *
*/
static DOF_BOKEH_HEXAGON: 1;

/**
 * Calculates DOF blur using a circle shaped filter. Best quality and most realistic, but slowest. Use only for areas where a lot of performance can be dedicated to post-processing (e.g. cutscenes).
 *
*/
static DOF_BOKEH_CIRCLE: 2;

/** No documentation provided. */
static SHADOW_QUALITY_HARD: 0;

/** No documentation provided. */
static SHADOW_QUALITY_SOFT_LOW: 1;

/** No documentation provided. */
static SHADOW_QUALITY_SOFT_MEDIUM: 2;

/** No documentation provided. */
static SHADOW_QUALITY_SOFT_HIGH: 3;

/** No documentation provided. */
static SHADOW_QUALITY_SOFT_ULTRA: 4;

/** No documentation provided. */
static SHADOW_QUALITY_MAX: 5;

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

/** No documentation provided. */
static INSTANCE_PARTICLES_COLLISION: 5;

/**
 * The instance is a light.
 *
*/
static INSTANCE_LIGHT: 6;

/**
 * The instance is a reflection probe.
 *
*/
static INSTANCE_REFLECTION_PROBE: 7;

/**
 * The instance is a decal.
 *
*/
static INSTANCE_DECAL: 8;

/**
 * The instance is a GI probe.
 *
*/
static INSTANCE_GI_PROBE: 9;

/**
 * The instance is a lightmap.
 *
*/
static INSTANCE_LIGHTMAP: 10;

/**
 * Represents the size of the [enum InstanceType] enum.
 *
*/
static INSTANCE_MAX: 11;

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
 * Allows the instance to be used with dynamic global illumination.
 *
*/
static INSTANCE_FLAG_USE_DYNAMIC_GI: 1;

/**
 * When set, manually requests to draw geometry on next frame.
 *
*/
static INSTANCE_FLAG_DRAW_NEXT_FRAME_IF_VISIBLE: 2;

/**
 * Represents the size of the [enum InstanceFlags] enum.
 *
*/
static INSTANCE_FLAG_MAX: 3;

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
 * Uses the default filter mode for this [Viewport].
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_DEFAULT: 0;

/**
 * The texture filter reads from the nearest pixel only. The simplest and fastest method of filtering, but the texture will look pixelized.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_NEAREST: 1;

/**
 * The texture filter blends between the nearest 4 pixels. Use this when you want to avoid a pixelated style, but do not want mipmaps.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_LINEAR: 2;

/**
 * The texture filter reads from the nearest pixel in the nearest mipmap. The fastest way to read from textures with mipmaps.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS: 3;

/**
 * The texture filter blends between the nearest 4 pixels and between the nearest 2 mipmaps.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS: 4;

/**
 * The texture filter reads from the nearest pixel, but selects a mipmap based on the angle between the surface and the camera view. This reduces artifacts on surfaces that are almost in line with the camera.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC: 5;

/**
 * The texture filter blends between the nearest 4 pixels and selects a mipmap based on the angle between the surface and the camera view. This reduces artifacts on surfaces that are almost in line with the camera. This is the slowest of the filtering options, but results in the highest quality texturing.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC: 6;

/**
 * Max value for [enum CanvasItemTextureFilter] enum.
 *
*/
static CANVAS_ITEM_TEXTURE_FILTER_MAX: 7;

/**
 * Uses the default repeat mode for this [Viewport].
 *
*/
static CANVAS_ITEM_TEXTURE_REPEAT_DEFAULT: 0;

/**
 * Disables textures repeating. Instead, when reading UVs outside the 0-1 range, the value will be clamped to the edge of the texture, resulting in a stretched out look at the borders of the texture.
 *
*/
static CANVAS_ITEM_TEXTURE_REPEAT_DISABLED: 1;

/**
 * Enables the texture to repeat when UV coordinates are outside the 0-1 range. If using one of the linear filtering modes, this can result in artifacts at the edges of a texture when the sampler filters across the edges of the texture.
 *
*/
static CANVAS_ITEM_TEXTURE_REPEAT_ENABLED: 2;

/**
 * Flip the texture when repeating so that the edge lines up instead of abruptly changing.
 *
*/
static CANVAS_ITEM_TEXTURE_REPEAT_MIRROR: 3;

/**
 * Max value for [enum CanvasItemTextureRepeat] enum.
 *
*/
static CANVAS_ITEM_TEXTURE_REPEAT_MAX: 4;

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
 * Use PCF5 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF5: 1;

/**
 * Use PCF13 filtering to filter canvas light shadows.
 *
*/
static CANVAS_LIGHT_FILTER_PCF13: 2;

/**
 * Max value of the [enum CanvasLightShadowFilter] enum.
 *
*/
static CANVAS_LIGHT_FILTER_MAX: 3;

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

/** No documentation provided. */
static GLOBAL_VAR_TYPE_BOOL: 0;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_BVEC2: 1;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_BVEC3: 2;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_BVEC4: 3;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_INT: 4;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_IVEC2: 5;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_IVEC3: 6;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_IVEC4: 7;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_RECT2I: 8;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_UINT: 9;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_UVEC2: 10;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_UVEC3: 11;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_UVEC4: 12;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_FLOAT: 13;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_VEC2: 14;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_VEC3: 15;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_VEC4: 16;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_COLOR: 17;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_RECT2: 18;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_MAT2: 19;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_MAT3: 20;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_MAT4: 21;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_TRANSFORM_2D: 22;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_TRANSFORM: 23;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_SAMPLER2D: 24;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_SAMPLER2DARRAY: 25;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_SAMPLER3D: 26;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_SAMPLERCUBE: 27;

/** No documentation provided. */
static GLOBAL_VAR_TYPE_MAX: 28;

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
 * Unimplemented in the GLES2 rendering backend, always returns 0.
 *
*/
static INFO_USAGE_VIDEO_MEM_TOTAL: 6;

/**
 * The amount of video memory used, i.e. texture and vertex memory combined.
 *
*/
static INFO_VIDEO_MEM_USED: 7;

/**
 * The amount of texture memory used.
 *
*/
static INFO_TEXTURE_MEM_USED: 8;

/**
 * The amount of vertex memory used.
 *
*/
static INFO_VERTEX_MEM_USED: 9;

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
 * Emitted at the end of the frame, after the RenderingServer has finished updating all the Viewports.
 *
*/
frame_post_draw: Signal<() => void>

/**
 * Emitted at the beginning of the frame, before the RenderingServer updates all the Viewports.
 *
*/
frame_pre_draw: Signal<() => void>

}


 
