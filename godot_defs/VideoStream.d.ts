
/**
 * Base resource type for all video streams. Classes that derive from [VideoStream] can all be used as resource types to play back videos in [VideoPlayer].
 *
*/
declare class VideoStream extends Resource {

  
/**
 * Base resource type for all video streams. Classes that derive from [VideoStream] can all be used as resource types to play back videos in [VideoPlayer].
 *
*/
  "new"(): VideoStream;
  static "new"(): VideoStream;






  connect<T extends SignalsOf<VideoStream>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
