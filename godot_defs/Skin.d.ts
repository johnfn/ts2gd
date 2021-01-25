
/**
*/
declare class Skin extends Resource {

  
/**
*/
  "new"(): Skin;
  static "new"(): Skin;




/** No documentation provided. */
add_bind(bone: int, pose: Transform): void;

/** No documentation provided. */
clear_binds(): void;

/** No documentation provided. */
get_bind_bone(bind_index: int): int;

/** No documentation provided. */
get_bind_count(): int;

/** No documentation provided. */
get_bind_name(bind_index: int): string;

/** No documentation provided. */
get_bind_pose(bind_index: int): Transform;

/** No documentation provided. */
set_bind_bone(bind_index: int, bone: int): void;

/** No documentation provided. */
set_bind_count(bind_count: int): void;

/** No documentation provided. */
set_bind_name(bind_index: int, name: string): void;

/** No documentation provided. */
set_bind_pose(bind_index: int, pose: Transform): void;

  connect<T extends SignalsOf<Skin>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
