
/**
 * This node allows you to create a cylinder (or cone) for use with the CSG system.
 *
*/
declare class CSGCylinder3D extends CSGPrimitive3D {

  
/**
 * This node allows you to create a cylinder (or cone) for use with the CSG system.
 *
*/
  "new"(): this;
  static "new"(): this;



/** If [code]true[/code] a cone is created, the [member radius] will only apply to one side. */
cone: boolean;

/** The height of the cylinder. */
height: float;

/** The material used to render the cylinder. */
material: Material;

/** The radius of the cylinder. */
radius: float;

/** The number of sides of the cylinder, the higher this number the more detail there will be in the cylinder. */
sides: int;

/** If [code]true[/code] the normals of the cylinder are set to give a smooth effect making the cylinder seem rounded. If [code]false[/code] the cylinder will have a flat shaded look. */
smooth_faces: boolean;



  connect<T extends SignalsOf<CSGCylinder3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
