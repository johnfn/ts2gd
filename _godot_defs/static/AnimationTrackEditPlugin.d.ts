
/**
*/
declare class AnimationTrackEditPlugin extends Reference {

  
/**
*/
  "new"(): AnimationTrackEditPlugin;
  static "new"(): AnimationTrackEditPlugin;






  // connect<T extends SignalsOf<AnimationTrackEditPlugin>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<AnimationTrackEditPluginSignals>>(signal: T, method: SignalFunction<AnimationTrackEditPluginSignals[T]>): number;




}

declare class AnimationTrackEditPluginSignals extends ReferenceSignals {
  
}
