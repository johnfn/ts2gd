
/**
*/
declare class SkeletonIK3D extends Node {

  
/**
*/
  "new"(): this;
  static "new"(): this;













/** No documentation provided. */
get_parent_skeleton(): Skeleton3D;

/** No documentation provided. */
is_running(): boolean;

/** No documentation provided. */
start(one_time?: boolean): void;

/** No documentation provided. */
stop(): void;

  connect<T extends SignalsOf<SkeletonIK3D>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}


 
