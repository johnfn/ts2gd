
/**
 * [OccluderShape]s are resources used by [Occluder] nodes, allowing geometric occlusion culling.
 *
 * This shape can include multiple spheres. These can be created and deleted either in the Editor inspector or by calling `set_spheres`. The sphere positions can be set by dragging the handle in the Editor viewport. The radius can be set with the smaller handle.
 *
*/
declare class OccluderShapeSphere extends OccluderShape {

  
/**
 * [OccluderShape]s are resources used by [Occluder] nodes, allowing geometric occlusion culling.
 *
 * This shape can include multiple spheres. These can be created and deleted either in the Editor inspector or by calling `set_spheres`. The sphere positions can be set by dragging the handle in the Editor viewport. The radius can be set with the smaller handle.
 *
*/
  "new"(): OccluderShapeSphere;
  static "new"(): OccluderShapeSphere;



/** The sphere data can be accessed as an array of [Plane]s. The position of each sphere is stored in the [code]normal[/code], and the radius is stored in the [code]d[/code] value of the plane. */
spheres: any[];

/** Sets an individual sphere's position. */
set_sphere_position(index: int, position: Vector3): void;

/** Sets an individual sphere's radius. */
set_sphere_radius(index: int, radius: float): void;

  // connect<T extends SignalsOf<OccluderShapeSphere>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<OccluderShapeSphereSignals>>(signal: T, method: SignalFunction<OccluderShapeSphereSignals[T]>): number;




}

declare class OccluderShapeSphereSignals extends OccluderShapeSignals {
  
}
