
/**
*/
declare class SkinReference extends Reference  {

  
/**
*/
  new(): SkinReference; 
  static "new"(): SkinReference 



/** No documentation provided. */
get_skeleton(): RID;

/** No documentation provided. */
get_skin(): Skin;

  connect<T extends SignalsOf<SkinReference>>(signal: T, method: SignalFunction<SkinReference[T]>): number;






}

