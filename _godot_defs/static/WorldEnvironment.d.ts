
/**
 * The [WorldEnvironment] node is used to configure the default [Environment] for the scene.
 *
 * The parameters defined in the [WorldEnvironment] can be overridden by an [Environment] node set on the current [Camera]. Additionally, only one [WorldEnvironment] may be instanced in a given scene at a time.
 *
 * The [WorldEnvironment] allows the user to specify default lighting parameters (e.g. ambient lighting), various post-processing effects (e.g. SSAO, DOF, Tonemapping), and how to draw the background (e.g. solid color, skybox). Usually, these are added in order to improve the realism/color balance of the scene.
 *
*/
declare class WorldEnvironment extends Node  {

  
/**
 * The [WorldEnvironment] node is used to configure the default [Environment] for the scene.
 *
 * The parameters defined in the [WorldEnvironment] can be overridden by an [Environment] node set on the current [Camera]. Additionally, only one [WorldEnvironment] may be instanced in a given scene at a time.
 *
 * The [WorldEnvironment] allows the user to specify default lighting parameters (e.g. ambient lighting), various post-processing effects (e.g. SSAO, DOF, Tonemapping), and how to draw the background (e.g. solid color, skybox). Usually, these are added in order to improve the realism/color balance of the scene.
 *
*/
  new(): WorldEnvironment; 
  static "new"(): WorldEnvironment 


/** The [Environment] resource used by this [WorldEnvironment], defining the default properties. */
environment: Environment;



  connect<T extends SignalsOf<WorldEnvironment>>(signal: T, method: SignalFunction<WorldEnvironment[T]>): number;






}

