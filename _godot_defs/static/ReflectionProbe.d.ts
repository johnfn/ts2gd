
/**
 * Capture its surroundings as a dual paraboloid image, and stores versions of it with increasing levels of blur to simulate different material roughnesses.
 *
 * The [ReflectionProbe] is used to create high-quality reflections at the cost of performance. It can be combined with [GIProbe]s and Screen Space Reflections to achieve high quality reflections. [ReflectionProbe]s render all objects within their [member cull_mask], so updating them can be quite expensive. It is best to update them once with the important static objects and then leave them.
 *
 * **Note:** By default Godot will only render 16 reflection probes. If you need more, increase the number of atlas subdivisions. This setting can be found in [member ProjectSettings.rendering/quality/reflections/atlas_subdiv].
 *
 * **Note:** The GLES2 backend will only display two reflection probes at the same time for a single mesh. If possible, split up large meshes that span over multiple reflection probes into smaller ones.
 *
*/
declare class ReflectionProbe extends VisualInstance  {

  
/**
 * Capture its surroundings as a dual paraboloid image, and stores versions of it with increasing levels of blur to simulate different material roughnesses.
 *
 * The [ReflectionProbe] is used to create high-quality reflections at the cost of performance. It can be combined with [GIProbe]s and Screen Space Reflections to achieve high quality reflections. [ReflectionProbe]s render all objects within their [member cull_mask], so updating them can be quite expensive. It is best to update them once with the important static objects and then leave them.
 *
 * **Note:** By default Godot will only render 16 reflection probes. If you need more, increase the number of atlas subdivisions. This setting can be found in [member ProjectSettings.rendering/quality/reflections/atlas_subdiv].
 *
 * **Note:** The GLES2 backend will only display two reflection probes at the same time for a single mesh. If possible, split up large meshes that span over multiple reflection probes into smaller ones.
 *
*/
  new(): ReflectionProbe; 
  static "new"(): ReflectionProbe 


/** If [code]true[/code], enables box projection. This makes reflections look more correct in rectangle-shaped rooms by offsetting the reflection center depending on the camera's location. */
box_projection: boolean;

/** Sets the cull mask which determines what objects are drawn by this probe. Every [VisualInstance] with a layer included in this cull mask will be rendered by the probe. It is best to only include large objects which are likely to take up a lot of space in the reflection in order to save on rendering cost. */
cull_mask: int;

/** If [code]true[/code], computes shadows in the reflection probe. This makes the reflection probe slower to render; you may want to disable this if using the [constant UPDATE_ALWAYS] [member update_mode]. */
enable_shadows: boolean;

/** The size of the reflection probe. The larger the extents the more space covered by the probe which will lower the perceived resolution. It is best to keep the extents only as large as you need them. */
extents: Vector3;

/** Defines the reflection intensity. Intensity modulates the strength of the reflection. */
intensity: float;

/** Sets the ambient light color to be used when this probe is set to [member interior_enable]. */
interior_ambient_color: Color;

/** Sets the contribution value for how much the reflection affects the ambient light for this reflection probe when set to [member interior_enable]. Useful so that ambient light matches the color of the room. */
interior_ambient_contrib: float;

/** Sets the energy multiplier for this reflection probe's ambient light contribution when set to [member interior_enable]. */
interior_ambient_energy: float;

/** If [code]true[/code], reflections will ignore sky contribution. Ambient lighting is then controlled by the [code]interior_ambient_*[/code] properties. */
interior_enable: boolean;

/** Sets the max distance away from the probe an object can be before it is culled. */
max_distance: float;

/** Sets the origin offset to be used when this reflection probe is in box project mode. */
origin_offset: Vector3;

/** Sets how frequently the probe is updated. Can be [constant UPDATE_ONCE] or [constant UPDATE_ALWAYS]. */
update_mode: int;



  connect<T extends SignalsOf<ReflectionProbe>>(signal: T, method: SignalFunction<ReflectionProbe[T]>): number;



/**
 * Update the probe once on the next frame.
 *
*/
static UPDATE_ONCE: any;

/**
 * Update the probe every frame. This is needed when you want to capture dynamic objects. However, it results in an increased render time. Use [constant UPDATE_ONCE] whenever possible.
 *
*/
static UPDATE_ALWAYS: any;



}

