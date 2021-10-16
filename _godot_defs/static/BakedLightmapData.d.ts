
/**
*/
declare class BakedLightmapData extends Resource {

  
/**
*/
  "new"(): BakedLightmapData;
  static "new"(): BakedLightmapData;






/**
 * Global energy multiplier for baked and dynamic capture objects. This can be changed at run-time without having to bake lightmaps again.
 *
 * To adjust only the energy of indirect lighting (without affecting direct lighting or emissive materials), adjust [member BakedLightmap.bounce_indirect_energy] and bake lightmaps again.
 *
*/
energy: float;

/** Controls whether dynamic capture objects receive environment lighting or not. */
interior: boolean;


/** No documentation provided. */
add_user(path: NodePathType, lightmap: Resource, lightmap_slice: int, lightmap_uv_rect: Rect2, instance: int): void;

/** No documentation provided. */
clear_data(): void;

/** No documentation provided. */
clear_users(): void;

/** No documentation provided. */
get_user_count(): int;

/** No documentation provided. */
get_user_lightmap(user_idx: int): Resource;

/** No documentation provided. */
get_user_path(user_idx: int): NodePathType;

  // connect<T extends SignalsOf<BakedLightmapData>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<BakedLightmapDataSignals>>(signal: T, method: SignalFunction<BakedLightmapDataSignals[T]>): number;




}

declare class BakedLightmapDataSignals extends ResourceSignals {
  
}
