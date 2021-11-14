
/**
 * Simple texture that uses a mesh to draw itself. It's limited because flags can't be changed and region drawing is not supported.
 *
*/
declare class MeshTexture extends Texture  {

  
/**
 * Simple texture that uses a mesh to draw itself. It's limited because flags can't be changed and region drawing is not supported.
 *
*/
  new(): MeshTexture; 
  static "new"(): MeshTexture 


/** Sets the base texture that the Mesh will use to draw. */
base_texture: Texture;


/** Sets the size of the image, needed for reference. */
image_size: Vector2;

/** Sets the mesh used to draw. It must be a mesh using 2D vertices. */
mesh: Mesh;



  connect<T extends SignalsOf<MeshTexture>>(signal: T, method: SignalFunction<MeshTexture[T]>): number;






}

