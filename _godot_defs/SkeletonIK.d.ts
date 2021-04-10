
/**
*/
declare class SkeletonIK extends Node {

  
/**
*/
  "new"(): SkeletonIK;
  static "new"(): SkeletonIK;













/** No documentation provided. */
get_parent_skeleton(): Skeleton;

/** No documentation provided. */
is_running(): boolean;

/** No documentation provided. */
start(one_time?: boolean): void;

/** No documentation provided. */
stop(): void;

  connect<T extends SignalsOf<SkeletonIK>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
