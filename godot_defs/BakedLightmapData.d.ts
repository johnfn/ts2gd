
/**
*/
declare class BakedLightmapData extends Resource {

  
/**
*/
  "new"(): BakedLightmapData;
  static "new"(): BakedLightmapData;








/** No documentation provided. */
add_user(path: NodePathType, lightmap: Texture, instance: int): void;

/** No documentation provided. */
clear_users(): void;

/** No documentation provided. */
get_user_count(): int;

/** No documentation provided. */
get_user_lightmap(user_idx: int): Texture;

/** No documentation provided. */
get_user_path(user_idx: int): NodePathType;

  connect<T extends SignalsOf<BakedLightmapData>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
