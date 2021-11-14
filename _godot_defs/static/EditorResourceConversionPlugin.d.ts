
/**
*/
declare class EditorResourceConversionPlugin extends Reference  {

  
/**
*/
  new(): EditorResourceConversionPlugin; 
  static "new"(): EditorResourceConversionPlugin 



/** No documentation provided. */
protected _convert(resource: Resource): Resource;

/** No documentation provided. */
protected _converts_to(): string;

  connect<T extends SignalsOf<EditorResourceConversionPlugin>>(signal: T, method: SignalFunction<EditorResourceConversionPlugin[T]>): number;






}

