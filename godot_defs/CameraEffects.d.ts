
/**
 * Contains camera-specific effects such as depth of field and exposure override.
 *
 * See also [Environment] for general 3D environment settings.
 *
*/
declare class CameraEffects extends Resource {

  
/**
 * Contains camera-specific effects such as depth of field and exposure override.
 *
 * See also [Environment] for general 3D environment settings.
 *
*/
  "new"(): this;
  static "new"(): this;



/** The amount of blur for both near and far depth-of-field effects. The amount of blur increases the radius of the blur effect, making the affected area blurrier. However, If the amount is too high, you might start to see lines appearing, especially when using a low quality blur. */
dof_blur_amount: float;

/** The distance from the camera where the far blur effect affects the rendering. */
dof_blur_far_distance: float;

/** If [code]true[/code], enables the depth-of-field far blur effect. This has a significant performance cost. Consider disabling it in scenes where there are no far away objects. */
dof_blur_far_enabled: boolean;

/** The length of the transition between the no-blur area and far blur. */
dof_blur_far_transition: float;

/** Distance from the camera where the near blur effect affects the rendering. */
dof_blur_near_distance: float;

/** If [code]true[/code], enables the depth-of-field near blur effect. This has a significant performance cost. Consider disabling it in scenes where there are no nearby objects. */
dof_blur_near_enabled: boolean;

/** The length of the transition between the near blur and no-blur area. */
dof_blur_near_transition: float;

/** The exposure override value to use. Higher values will result in a brighter scene. Only effective if [member override_exposure_enabled] is [code]true[/code]. */
override_exposure: float;

/** If [code]true[/code], overrides the manual or automatic exposure defined in the [Environment] with the value in [member override_exposure]. */
override_exposure_enabled: boolean;



  connect<T extends SignalsOf<CameraEffects>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
