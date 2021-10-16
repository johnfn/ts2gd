
/**
*/
declare class ProxyTexture extends Texture {

  
/**
*/
  "new"(): ProxyTexture;
  static "new"(): ProxyTexture;







  // connect<T extends SignalsOf<ProxyTexture>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<ProxyTextureSignals>>(signal: T, method: SignalFunction<ProxyTextureSignals[T]>): number;




}

declare class ProxyTextureSignals extends TextureSignals {
  
}
