
/**
*/
declare class RenderingDevice extends Object {

  
/**
*/
  "new"(): this;
  static "new"(): this;




/** No documentation provided. */
buffer_get_data(buffer: RID): PackedByteArray;

/** No documentation provided. */
buffer_update(buffer: RID, offset: int, size_bytes: int, data: PackedByteArray, sync_with_draw?: boolean): int;

/** No documentation provided. */
capture_timestamp(name: String, sync_to_draw: boolean): void;

/** No documentation provided. */
compute_list_add_barrier(compute_list: int): void;

/** No documentation provided. */
compute_list_begin(): int;

/** No documentation provided. */
compute_list_bind_compute_pipeline(compute_list: int, compute_pipeline: RID): void;

/** No documentation provided. */
compute_list_bind_uniform_set(compute_list: int, uniform_set: RID, set_index: int): void;

/** No documentation provided. */
compute_list_dispatch(compute_list: int, x_groups: int, y_groups: int, z_groups: int): void;

/** No documentation provided. */
compute_list_end(): void;

/** No documentation provided. */
compute_list_set_push_constant(compute_list: int, buffer: PackedByteArray, size_bytes: int): void;

/** No documentation provided. */
compute_pipeline_create(shader: RID): RID;

/** No documentation provided. */
compute_pipeline_is_valid(compute_pieline: RID): boolean;

/** No documentation provided. */
create_local_device(): RenderingDevice;

/** No documentation provided. */
draw_list_begin(framebuffer: RID, initial_color_action: int, final_color_action: int, initial_depth_action: int, final_depth_action: int, clear_color_values?: PackedColorArray, clear_depth?: float, clear_stencil?: int, region?: Rect2, storage_textures?: any[]): int;

/** No documentation provided. */
draw_list_begin_for_screen(screen?: int, clear_color?: Color): int;

/** No documentation provided. */
draw_list_begin_split(framebuffer: RID, splits: int, initial_color_action: int, final_color_action: int, initial_depth_action: int, final_depth_action: int, clear_color_values?: PackedColorArray, clear_depth?: float, clear_stencil?: int, region?: Rect2, storage_textures?: RID[]): PackedInt64Array;

/** No documentation provided. */
draw_list_bind_index_array(draw_list: int, index_array: RID): void;

/** No documentation provided. */
draw_list_bind_render_pipeline(draw_list: int, render_pipeline: RID): void;

/** No documentation provided. */
draw_list_bind_uniform_set(draw_list: int, uniform_set: RID, set_index: int): void;

/** No documentation provided. */
draw_list_bind_vertex_array(draw_list: int, vertex_array: RID): void;

/** No documentation provided. */
draw_list_disable_scissor(draw_list: int): void;

/** No documentation provided. */
draw_list_draw(draw_list: int, use_indices: boolean, instances: int, procedural_vertex_count?: int): void;

/** No documentation provided. */
draw_list_enable_scissor(draw_list: int, rect?: Rect2): void;

/** No documentation provided. */
draw_list_end(): void;

/** No documentation provided. */
draw_list_set_push_constant(draw_list: int, buffer: PackedByteArray, size_bytes: int): void;

/** No documentation provided. */
framebuffer_create(textures: any[], validate_with_format?: int): RID;

/** No documentation provided. */
framebuffer_create_empty(size: Vector2i, validate_with_format?: int): RID;

/** No documentation provided. */
framebuffer_format_create(attachments: RDAttachmentFormat[]): int;

/** No documentation provided. */
framebuffer_format_create_empty(size: Vector2i): int;

/** No documentation provided. */
framebuffer_format_get_texture_samples(format: int): int;

/** No documentation provided. */
framebuffer_get_format(framebuffer: RID): int;

/** No documentation provided. */
free(rid: RID): void;

/** No documentation provided. */
get_captured_timestamp_cpu_time(index: int): int;

/** No documentation provided. */
get_captured_timestamp_gpu_time(index: int): int;

/** No documentation provided. */
get_captured_timestamp_name(index: int): String;

/** No documentation provided. */
get_captured_timestamps_count(): int;

/** No documentation provided. */
get_captured_timestamps_frame(): int;

/** No documentation provided. */
get_frame_delay(): int;

/** No documentation provided. */
index_array_create(index_buffer: RID, index_offset: int, index_count: int): RID;

/** No documentation provided. */
index_buffer_create(size_indices: int, format: int, data?: PackedByteArray, arg3?: boolean): RID;

/** No documentation provided. */
limit_get(limit: int): int;

/** No documentation provided. */
render_pipeline_create(shader: RID, framebuffer_format: int, vertex_format: int, primitive: int, rasterization_state: RDPipelineRasterizationState, multisample_state: RDPipelineMultisampleState, stencil_state: RDPipelineDepthStencilState, color_blend_state: RDPipelineColorBlendState, dynamic_state_flags?: int): RID;

/** No documentation provided. */
render_pipeline_is_valid(render_pipeline: RID): boolean;

/** No documentation provided. */
sampler_create(state: RDSamplerState): RID;

/** No documentation provided. */
screen_get_framebuffer_format(): int;

/** No documentation provided. */
screen_get_height(screen?: int): int;

/** No documentation provided. */
screen_get_width(screen?: int): int;

/** No documentation provided. */
shader_compile_from_source(shader_source: RDShaderSource, allow_cache?: boolean): RDShaderBytecode;

/** No documentation provided. */
shader_create(shader_data: RDShaderBytecode): RID;

/** No documentation provided. */
shader_get_vertex_input_attribute_mask(shader: RID): int;

/** No documentation provided. */
storage_buffer_create(size_bytes: int, data?: PackedByteArray, usage?: int): RID;

/** No documentation provided. */
submit(): void;

/** No documentation provided. */
sync(): void;

/** No documentation provided. */
texture_buffer_create(size_bytes: int, format: int, data?: PackedByteArray): RID;

/** No documentation provided. */
texture_clear(texture: RID, color: Color, base_mipmap: int, mipmap_count: int, base_layer: int, layer_count: int, sync_with_draw?: boolean): int;

/** No documentation provided. */
texture_copy(from_texture: RID, to_texture: RID, from_pos: Vector3, to_pos: Vector3, size: Vector3, src_mipmap: int, dst_mipmap: int, src_layer: int, dst_layer: int, sync_with_draw?: boolean): int;

/** No documentation provided. */
texture_create(format: RDTextureFormat, view: RDTextureView, data?: PackedByteArray[]): RID;

/** No documentation provided. */
texture_create_shared(view: RDTextureView, with_texture: RID): RID;

/** No documentation provided. */
texture_create_shared_from_slice(view: RDTextureView, with_texture: RID, layer: int, mipmap: int, slice_type?: int): RID;

/** No documentation provided. */
texture_get_data(texture: RID, layer: int): PackedByteArray;

/** No documentation provided. */
texture_is_format_supported_for_usage(format: int, usage_flags: int): boolean;

/** No documentation provided. */
texture_is_shared(texture: RID): boolean;

/** No documentation provided. */
texture_is_valid(texture: RID): boolean;

/** No documentation provided. */
texture_resolve_multisample(from_texture: RID, to_texture: RID, sync_with_draw?: boolean): int;

/** No documentation provided. */
texture_update(texture: RID, layer: int, data: PackedByteArray, sync_with_draw?: boolean): int;

/** No documentation provided. */
uniform_buffer_create(size_bytes: int, data?: PackedByteArray): RID;

/** No documentation provided. */
uniform_set_create(uniforms: any[], shader: RID, shader_set: int): RID;

/** No documentation provided. */
uniform_set_is_valid(uniform_set: RID): boolean;

/** No documentation provided. */
vertex_buffer_create(size_bytes: int, data?: PackedByteArray): RID;

/** No documentation provided. */
vertex_format_create(vertex_descriptions: RDVertexAttribute[]): int;

  connect<T extends SignalsOf<RenderingDevice>, U extends Node>(signal: T, node: U, method: keyof U): number;



/** No documentation provided. */
static DATA_FORMAT_R4G4_UNORM_PACK8: 0;

/** No documentation provided. */
static DATA_FORMAT_R4G4B4A4_UNORM_PACK16: 1;

/** No documentation provided. */
static DATA_FORMAT_B4G4R4A4_UNORM_PACK16: 2;

/** No documentation provided. */
static DATA_FORMAT_R5G6B5_UNORM_PACK16: 3;

/** No documentation provided. */
static DATA_FORMAT_B5G6R5_UNORM_PACK16: 4;

/** No documentation provided. */
static DATA_FORMAT_R5G5B5A1_UNORM_PACK16: 5;

/** No documentation provided. */
static DATA_FORMAT_B5G5R5A1_UNORM_PACK16: 6;

/** No documentation provided. */
static DATA_FORMAT_A1R5G5B5_UNORM_PACK16: 7;

/** No documentation provided. */
static DATA_FORMAT_R8_UNORM: 8;

/** No documentation provided. */
static DATA_FORMAT_R8_SNORM: 9;

/** No documentation provided. */
static DATA_FORMAT_R8_USCALED: 10;

/** No documentation provided. */
static DATA_FORMAT_R8_SSCALED: 11;

/** No documentation provided. */
static DATA_FORMAT_R8_UINT: 12;

/** No documentation provided. */
static DATA_FORMAT_R8_SINT: 13;

/** No documentation provided. */
static DATA_FORMAT_R8_SRGB: 14;

/** No documentation provided. */
static DATA_FORMAT_R8G8_UNORM: 15;

/** No documentation provided. */
static DATA_FORMAT_R8G8_SNORM: 16;

/** No documentation provided. */
static DATA_FORMAT_R8G8_USCALED: 17;

/** No documentation provided. */
static DATA_FORMAT_R8G8_SSCALED: 18;

/** No documentation provided. */
static DATA_FORMAT_R8G8_UINT: 19;

/** No documentation provided. */
static DATA_FORMAT_R8G8_SINT: 20;

/** No documentation provided. */
static DATA_FORMAT_R8G8_SRGB: 21;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_UNORM: 22;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_SNORM: 23;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_USCALED: 24;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_SSCALED: 25;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_UINT: 26;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_SINT: 27;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8_SRGB: 28;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_UNORM: 29;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_SNORM: 30;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_USCALED: 31;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_SSCALED: 32;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_UINT: 33;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_SINT: 34;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8_SRGB: 35;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_UNORM: 36;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_SNORM: 37;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_USCALED: 38;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_SSCALED: 39;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_UINT: 40;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_SINT: 41;

/** No documentation provided. */
static DATA_FORMAT_R8G8B8A8_SRGB: 42;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_UNORM: 43;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_SNORM: 44;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_USCALED: 45;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_SSCALED: 46;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_UINT: 47;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_SINT: 48;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8A8_SRGB: 49;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_UNORM_PACK32: 50;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_SNORM_PACK32: 51;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_USCALED_PACK32: 52;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_SSCALED_PACK32: 53;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_UINT_PACK32: 54;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_SINT_PACK32: 55;

/** No documentation provided. */
static DATA_FORMAT_A8B8G8R8_SRGB_PACK32: 56;

/** No documentation provided. */
static DATA_FORMAT_A2R10G10B10_UNORM_PACK32: 57;

/** No documentation provided. */
static DATA_FORMAT_A2R10G10B10_SNORM_PACK32: 58;

/** No documentation provided. */
static DATA_FORMAT_A2R10G10B10_USCALED_PACK32: 59;

/** No documentation provided. */
static DATA_FORMAT_A2R10G10B10_SSCALED_PACK32: 60;

/** No documentation provided. */
static DATA_FORMAT_A2R10G10B10_UINT_PACK32: 61;

/** No documentation provided. */
static DATA_FORMAT_A2R10G10B10_SINT_PACK32: 62;

/** No documentation provided. */
static DATA_FORMAT_A2B10G10R10_UNORM_PACK32: 63;

/** No documentation provided. */
static DATA_FORMAT_A2B10G10R10_SNORM_PACK32: 64;

/** No documentation provided. */
static DATA_FORMAT_A2B10G10R10_USCALED_PACK32: 65;

/** No documentation provided. */
static DATA_FORMAT_A2B10G10R10_SSCALED_PACK32: 66;

/** No documentation provided. */
static DATA_FORMAT_A2B10G10R10_UINT_PACK32: 67;

/** No documentation provided. */
static DATA_FORMAT_A2B10G10R10_SINT_PACK32: 68;

/** No documentation provided. */
static DATA_FORMAT_R16_UNORM: 69;

/** No documentation provided. */
static DATA_FORMAT_R16_SNORM: 70;

/** No documentation provided. */
static DATA_FORMAT_R16_USCALED: 71;

/** No documentation provided. */
static DATA_FORMAT_R16_SSCALED: 72;

/** No documentation provided. */
static DATA_FORMAT_R16_UINT: 73;

/** No documentation provided. */
static DATA_FORMAT_R16_SINT: 74;

/** No documentation provided. */
static DATA_FORMAT_R16_SFLOAT: 75;

/** No documentation provided. */
static DATA_FORMAT_R16G16_UNORM: 76;

/** No documentation provided. */
static DATA_FORMAT_R16G16_SNORM: 77;

/** No documentation provided. */
static DATA_FORMAT_R16G16_USCALED: 78;

/** No documentation provided. */
static DATA_FORMAT_R16G16_SSCALED: 79;

/** No documentation provided. */
static DATA_FORMAT_R16G16_UINT: 80;

/** No documentation provided. */
static DATA_FORMAT_R16G16_SINT: 81;

/** No documentation provided. */
static DATA_FORMAT_R16G16_SFLOAT: 82;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_UNORM: 83;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_SNORM: 84;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_USCALED: 85;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_SSCALED: 86;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_UINT: 87;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_SINT: 88;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16_SFLOAT: 89;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_UNORM: 90;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_SNORM: 91;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_USCALED: 92;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_SSCALED: 93;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_UINT: 94;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_SINT: 95;

/** No documentation provided. */
static DATA_FORMAT_R16G16B16A16_SFLOAT: 96;

/** No documentation provided. */
static DATA_FORMAT_R32_UINT: 97;

/** No documentation provided. */
static DATA_FORMAT_R32_SINT: 98;

/** No documentation provided. */
static DATA_FORMAT_R32_SFLOAT: 99;

/** No documentation provided. */
static DATA_FORMAT_R32G32_UINT: 100;

/** No documentation provided. */
static DATA_FORMAT_R32G32_SINT: 101;

/** No documentation provided. */
static DATA_FORMAT_R32G32_SFLOAT: 102;

/** No documentation provided. */
static DATA_FORMAT_R32G32B32_UINT: 103;

/** No documentation provided. */
static DATA_FORMAT_R32G32B32_SINT: 104;

/** No documentation provided. */
static DATA_FORMAT_R32G32B32_SFLOAT: 105;

/** No documentation provided. */
static DATA_FORMAT_R32G32B32A32_UINT: 106;

/** No documentation provided. */
static DATA_FORMAT_R32G32B32A32_SINT: 107;

/** No documentation provided. */
static DATA_FORMAT_R32G32B32A32_SFLOAT: 108;

/** No documentation provided. */
static DATA_FORMAT_R64_UINT: 109;

/** No documentation provided. */
static DATA_FORMAT_R64_SINT: 110;

/** No documentation provided. */
static DATA_FORMAT_R64_SFLOAT: 111;

/** No documentation provided. */
static DATA_FORMAT_R64G64_UINT: 112;

/** No documentation provided. */
static DATA_FORMAT_R64G64_SINT: 113;

/** No documentation provided. */
static DATA_FORMAT_R64G64_SFLOAT: 114;

/** No documentation provided. */
static DATA_FORMAT_R64G64B64_UINT: 115;

/** No documentation provided. */
static DATA_FORMAT_R64G64B64_SINT: 116;

/** No documentation provided. */
static DATA_FORMAT_R64G64B64_SFLOAT: 117;

/** No documentation provided. */
static DATA_FORMAT_R64G64B64A64_UINT: 118;

/** No documentation provided. */
static DATA_FORMAT_R64G64B64A64_SINT: 119;

/** No documentation provided. */
static DATA_FORMAT_R64G64B64A64_SFLOAT: 120;

/** No documentation provided. */
static DATA_FORMAT_B10G11R11_UFLOAT_PACK32: 121;

/** No documentation provided. */
static DATA_FORMAT_E5B9G9R9_UFLOAT_PACK32: 122;

/** No documentation provided. */
static DATA_FORMAT_D16_UNORM: 123;

/** No documentation provided. */
static DATA_FORMAT_X8_D24_UNORM_PACK32: 124;

/** No documentation provided. */
static DATA_FORMAT_D32_SFLOAT: 125;

/** No documentation provided. */
static DATA_FORMAT_S8_UINT: 126;

/** No documentation provided. */
static DATA_FORMAT_D16_UNORM_S8_UINT: 127;

/** No documentation provided. */
static DATA_FORMAT_D24_UNORM_S8_UINT: 128;

/** No documentation provided. */
static DATA_FORMAT_D32_SFLOAT_S8_UINT: 129;

/** No documentation provided. */
static DATA_FORMAT_BC1_RGB_UNORM_BLOCK: 130;

/** No documentation provided. */
static DATA_FORMAT_BC1_RGB_SRGB_BLOCK: 131;

/** No documentation provided. */
static DATA_FORMAT_BC1_RGBA_UNORM_BLOCK: 132;

/** No documentation provided. */
static DATA_FORMAT_BC1_RGBA_SRGB_BLOCK: 133;

/** No documentation provided. */
static DATA_FORMAT_BC2_UNORM_BLOCK: 134;

/** No documentation provided. */
static DATA_FORMAT_BC2_SRGB_BLOCK: 135;

/** No documentation provided. */
static DATA_FORMAT_BC3_UNORM_BLOCK: 136;

/** No documentation provided. */
static DATA_FORMAT_BC3_SRGB_BLOCK: 137;

/** No documentation provided. */
static DATA_FORMAT_BC4_UNORM_BLOCK: 138;

/** No documentation provided. */
static DATA_FORMAT_BC4_SNORM_BLOCK: 139;

/** No documentation provided. */
static DATA_FORMAT_BC5_UNORM_BLOCK: 140;

/** No documentation provided. */
static DATA_FORMAT_BC5_SNORM_BLOCK: 141;

/** No documentation provided. */
static DATA_FORMAT_BC6H_UFLOAT_BLOCK: 142;

/** No documentation provided. */
static DATA_FORMAT_BC6H_SFLOAT_BLOCK: 143;

/** No documentation provided. */
static DATA_FORMAT_BC7_UNORM_BLOCK: 144;

/** No documentation provided. */
static DATA_FORMAT_BC7_SRGB_BLOCK: 145;

/** No documentation provided. */
static DATA_FORMAT_ETC2_R8G8B8_UNORM_BLOCK: 146;

/** No documentation provided. */
static DATA_FORMAT_ETC2_R8G8B8_SRGB_BLOCK: 147;

/** No documentation provided. */
static DATA_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK: 148;

/** No documentation provided. */
static DATA_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK: 149;

/** No documentation provided. */
static DATA_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK: 150;

/** No documentation provided. */
static DATA_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK: 151;

/** No documentation provided. */
static DATA_FORMAT_EAC_R11_UNORM_BLOCK: 152;

/** No documentation provided. */
static DATA_FORMAT_EAC_R11_SNORM_BLOCK: 153;

/** No documentation provided. */
static DATA_FORMAT_EAC_R11G11_UNORM_BLOCK: 154;

/** No documentation provided. */
static DATA_FORMAT_EAC_R11G11_SNORM_BLOCK: 155;

/** No documentation provided. */
static DATA_FORMAT_ASTC_4x4_UNORM_BLOCK: 156;

/** No documentation provided. */
static DATA_FORMAT_ASTC_4x4_SRGB_BLOCK: 157;

/** No documentation provided. */
static DATA_FORMAT_ASTC_5x4_UNORM_BLOCK: 158;

/** No documentation provided. */
static DATA_FORMAT_ASTC_5x4_SRGB_BLOCK: 159;

/** No documentation provided. */
static DATA_FORMAT_ASTC_5x5_UNORM_BLOCK: 160;

/** No documentation provided. */
static DATA_FORMAT_ASTC_5x5_SRGB_BLOCK: 161;

/** No documentation provided. */
static DATA_FORMAT_ASTC_6x5_UNORM_BLOCK: 162;

/** No documentation provided. */
static DATA_FORMAT_ASTC_6x5_SRGB_BLOCK: 163;

/** No documentation provided. */
static DATA_FORMAT_ASTC_6x6_UNORM_BLOCK: 164;

/** No documentation provided. */
static DATA_FORMAT_ASTC_6x6_SRGB_BLOCK: 165;

/** No documentation provided. */
static DATA_FORMAT_ASTC_8x5_UNORM_BLOCK: 166;

/** No documentation provided. */
static DATA_FORMAT_ASTC_8x5_SRGB_BLOCK: 167;

/** No documentation provided. */
static DATA_FORMAT_ASTC_8x6_UNORM_BLOCK: 168;

/** No documentation provided. */
static DATA_FORMAT_ASTC_8x6_SRGB_BLOCK: 169;

/** No documentation provided. */
static DATA_FORMAT_ASTC_8x8_UNORM_BLOCK: 170;

/** No documentation provided. */
static DATA_FORMAT_ASTC_8x8_SRGB_BLOCK: 171;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x5_UNORM_BLOCK: 172;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x5_SRGB_BLOCK: 173;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x6_UNORM_BLOCK: 174;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x6_SRGB_BLOCK: 175;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x8_UNORM_BLOCK: 176;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x8_SRGB_BLOCK: 177;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x10_UNORM_BLOCK: 178;

/** No documentation provided. */
static DATA_FORMAT_ASTC_10x10_SRGB_BLOCK: 179;

/** No documentation provided. */
static DATA_FORMAT_ASTC_12x10_UNORM_BLOCK: 180;

/** No documentation provided. */
static DATA_FORMAT_ASTC_12x10_SRGB_BLOCK: 181;

/** No documentation provided. */
static DATA_FORMAT_ASTC_12x12_UNORM_BLOCK: 182;

/** No documentation provided. */
static DATA_FORMAT_ASTC_12x12_SRGB_BLOCK: 183;

/** No documentation provided. */
static DATA_FORMAT_G8B8G8R8_422_UNORM: 184;

/** No documentation provided. */
static DATA_FORMAT_B8G8R8G8_422_UNORM: 185;

/** No documentation provided. */
static DATA_FORMAT_G8_B8_R8_3PLANE_420_UNORM: 186;

/** No documentation provided. */
static DATA_FORMAT_G8_B8R8_2PLANE_420_UNORM: 187;

/** No documentation provided. */
static DATA_FORMAT_G8_B8_R8_3PLANE_422_UNORM: 188;

/** No documentation provided. */
static DATA_FORMAT_G8_B8R8_2PLANE_422_UNORM: 189;

/** No documentation provided. */
static DATA_FORMAT_G8_B8_R8_3PLANE_444_UNORM: 190;

/** No documentation provided. */
static DATA_FORMAT_R10X6_UNORM_PACK16: 191;

/** No documentation provided. */
static DATA_FORMAT_R10X6G10X6_UNORM_2PACK16: 192;

/** No documentation provided. */
static DATA_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16: 193;

/** No documentation provided. */
static DATA_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16: 194;

/** No documentation provided. */
static DATA_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16: 195;

/** No documentation provided. */
static DATA_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16: 196;

/** No documentation provided. */
static DATA_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16: 197;

/** No documentation provided. */
static DATA_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16: 198;

/** No documentation provided. */
static DATA_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16: 199;

/** No documentation provided. */
static DATA_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16: 200;

/** No documentation provided. */
static DATA_FORMAT_R12X4_UNORM_PACK16: 201;

/** No documentation provided. */
static DATA_FORMAT_R12X4G12X4_UNORM_2PACK16: 202;

/** No documentation provided. */
static DATA_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16: 203;

/** No documentation provided. */
static DATA_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16: 204;

/** No documentation provided. */
static DATA_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16: 205;

/** No documentation provided. */
static DATA_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16: 206;

/** No documentation provided. */
static DATA_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16: 207;

/** No documentation provided. */
static DATA_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16: 208;

/** No documentation provided. */
static DATA_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16: 209;

/** No documentation provided. */
static DATA_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16: 210;

/** No documentation provided. */
static DATA_FORMAT_G16B16G16R16_422_UNORM: 211;

/** No documentation provided. */
static DATA_FORMAT_B16G16R16G16_422_UNORM: 212;

/** No documentation provided. */
static DATA_FORMAT_G16_B16_R16_3PLANE_420_UNORM: 213;

/** No documentation provided. */
static DATA_FORMAT_G16_B16R16_2PLANE_420_UNORM: 214;

/** No documentation provided. */
static DATA_FORMAT_G16_B16_R16_3PLANE_422_UNORM: 215;

/** No documentation provided. */
static DATA_FORMAT_G16_B16R16_2PLANE_422_UNORM: 216;

/** No documentation provided. */
static DATA_FORMAT_G16_B16_R16_3PLANE_444_UNORM: 217;

/** No documentation provided. */
static DATA_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG: 218;

/** No documentation provided. */
static DATA_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG: 219;

/** No documentation provided. */
static DATA_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG: 220;

/** No documentation provided. */
static DATA_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG: 221;

/** No documentation provided. */
static DATA_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG: 222;

/** No documentation provided. */
static DATA_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG: 223;

/** No documentation provided. */
static DATA_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG: 224;

/** No documentation provided. */
static DATA_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG: 225;

/** No documentation provided. */
static DATA_FORMAT_MAX: 226;

/** No documentation provided. */
static TEXTURE_TYPE_1D: 0;

/** No documentation provided. */
static TEXTURE_TYPE_2D: 1;

/** No documentation provided. */
static TEXTURE_TYPE_3D: 2;

/** No documentation provided. */
static TEXTURE_TYPE_CUBE: 3;

/** No documentation provided. */
static TEXTURE_TYPE_1D_ARRAY: 4;

/** No documentation provided. */
static TEXTURE_TYPE_2D_ARRAY: 5;

/** No documentation provided. */
static TEXTURE_TYPE_CUBE_ARRAY: 6;

/** No documentation provided. */
static TEXTURE_TYPE_MAX: 7;

/** No documentation provided. */
static TEXTURE_SAMPLES_1: 0;

/** No documentation provided. */
static TEXTURE_SAMPLES_2: 1;

/** No documentation provided. */
static TEXTURE_SAMPLES_4: 2;

/** No documentation provided. */
static TEXTURE_SAMPLES_8: 3;

/** No documentation provided. */
static TEXTURE_SAMPLES_16: 4;

/** No documentation provided. */
static TEXTURE_SAMPLES_32: 5;

/** No documentation provided. */
static TEXTURE_SAMPLES_64: 6;

/** No documentation provided. */
static TEXTURE_SAMPLES_MAX: 7;

/** No documentation provided. */
static TEXTURE_USAGE_SAMPLING_BIT: 1;

/** No documentation provided. */
static TEXTURE_USAGE_COLOR_ATTACHMENT_BIT: 2;

/** No documentation provided. */
static TEXTURE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT: 4;

/** No documentation provided. */
static TEXTURE_USAGE_STORAGE_BIT: 8;

/** No documentation provided. */
static TEXTURE_USAGE_STORAGE_ATOMIC_BIT: 16;

/** No documentation provided. */
static TEXTURE_USAGE_CPU_READ_BIT: 32;

/** No documentation provided. */
static TEXTURE_USAGE_CAN_UPDATE_BIT: 64;

/** No documentation provided. */
static TEXTURE_USAGE_CAN_COPY_FROM_BIT: 128;

/** No documentation provided. */
static TEXTURE_USAGE_CAN_COPY_TO_BIT: 256;

/** No documentation provided. */
static TEXTURE_USAGE_RESOLVE_ATTACHMENT_BIT: 512;

/** No documentation provided. */
static TEXTURE_SWIZZLE_IDENTITY: 0;

/** No documentation provided. */
static TEXTURE_SWIZZLE_ZERO: 1;

/** No documentation provided. */
static TEXTURE_SWIZZLE_ONE: 2;

/** No documentation provided. */
static TEXTURE_SWIZZLE_R: 3;

/** No documentation provided. */
static TEXTURE_SWIZZLE_G: 4;

/** No documentation provided. */
static TEXTURE_SWIZZLE_B: 5;

/** No documentation provided. */
static TEXTURE_SWIZZLE_A: 6;

/** No documentation provided. */
static TEXTURE_SWIZZLE_MAX: 7;

/** No documentation provided. */
static TEXTURE_SLICE_2D: 0;

/** No documentation provided. */
static TEXTURE_SLICE_CUBEMAP: 1;

/** No documentation provided. */
static TEXTURE_SLICE_3D: 2;

/** No documentation provided. */
static SAMPLER_FILTER_NEAREST: 0;

/** No documentation provided. */
static SAMPLER_FILTER_LINEAR: 1;

/** No documentation provided. */
static SAMPLER_REPEAT_MODE_REPEAT: 0;

/** No documentation provided. */
static SAMPLER_REPEAT_MODE_MIRRORED_REPEAT: 1;

/** No documentation provided. */
static SAMPLER_REPEAT_MODE_CLAMP_TO_EDGE: 2;

/** No documentation provided. */
static SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER: 3;

/** No documentation provided. */
static SAMPLER_REPEAT_MODE_MIRROR_CLAMP_TO_EDGE: 4;

/** No documentation provided. */
static SAMPLER_REPEAT_MODE_MAX: 5;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK: 0;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_INT_TRANSPARENT_BLACK: 1;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_FLOAT_OPAQUE_BLACK: 2;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_INT_OPAQUE_BLACK: 3;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_FLOAT_OPAQUE_WHITE: 4;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_INT_OPAQUE_WHITE: 5;

/** No documentation provided. */
static SAMPLER_BORDER_COLOR_MAX: 6;

/** No documentation provided. */
static VERTEX_FREQUENCY_VERTEX: 0;

/** No documentation provided. */
static VERTEX_FREQUENCY_INSTANCE: 1;

/** No documentation provided. */
static INDEX_BUFFER_FORMAT_UINT16: 0;

/** No documentation provided. */
static INDEX_BUFFER_FORMAT_UINT32: 1;

/** No documentation provided. */
static STORAGE_BUFFER_USAGE_DISPATCH_INDIRECT: 1;

/** No documentation provided. */
static UNIFORM_TYPE_SAMPLER: 0;

/** No documentation provided. */
static UNIFORM_TYPE_SAMPLER_WITH_TEXTURE: 1;

/** No documentation provided. */
static UNIFORM_TYPE_TEXTURE: 2;

/** No documentation provided. */
static UNIFORM_TYPE_IMAGE: 3;

/** No documentation provided. */
static UNIFORM_TYPE_TEXTURE_BUFFER: 4;

/** No documentation provided. */
static UNIFORM_TYPE_SAMPLER_WITH_TEXTURE_BUFFER: 5;

/** No documentation provided. */
static UNIFORM_TYPE_IMAGE_BUFFER: 6;

/** No documentation provided. */
static UNIFORM_TYPE_UNIFORM_BUFFER: 7;

/** No documentation provided. */
static UNIFORM_TYPE_STORAGE_BUFFER: 8;

/** No documentation provided. */
static UNIFORM_TYPE_INPUT_ATTACHMENT: 9;

/** No documentation provided. */
static UNIFORM_TYPE_MAX: 10;

/** No documentation provided. */
static RENDER_PRIMITIVE_POINTS: 0;

/** No documentation provided. */
static RENDER_PRIMITIVE_LINES: 1;

/** No documentation provided. */
static RENDER_PRIMITIVE_LINES_WITH_ADJACENCY: 2;

/** No documentation provided. */
static RENDER_PRIMITIVE_LINESTRIPS: 3;

/** No documentation provided. */
static RENDER_PRIMITIVE_LINESTRIPS_WITH_ADJACENCY: 4;

/** No documentation provided. */
static RENDER_PRIMITIVE_TRIANGLES: 5;

/** No documentation provided. */
static RENDER_PRIMITIVE_TRIANGLES_WITH_ADJACENCY: 6;

/** No documentation provided. */
static RENDER_PRIMITIVE_TRIANGLE_STRIPS: 7;

/** No documentation provided. */
static RENDER_PRIMITIVE_TRIANGLE_STRIPS_WITH_AJACENCY: 8;

/** No documentation provided. */
static RENDER_PRIMITIVE_TRIANGLE_STRIPS_WITH_RESTART_INDEX: 9;

/** No documentation provided. */
static RENDER_PRIMITIVE_TESSELATION_PATCH: 10;

/** No documentation provided. */
static RENDER_PRIMITIVE_MAX: 11;

/** No documentation provided. */
static POLYGON_CULL_DISABLED: 0;

/** No documentation provided. */
static POLYGON_CULL_FRONT: 1;

/** No documentation provided. */
static POLYGON_CULL_BACK: 2;

/** No documentation provided. */
static POLYGON_FRONT_FACE_CLOCKWISE: 0;

/** No documentation provided. */
static POLYGON_FRONT_FACE_COUNTER_CLOCKWISE: 1;

/** No documentation provided. */
static STENCIL_OP_KEEP: 0;

/** No documentation provided. */
static STENCIL_OP_ZERO: 1;

/** No documentation provided. */
static STENCIL_OP_REPLACE: 2;

/** No documentation provided. */
static STENCIL_OP_INCREMENT_AND_CLAMP: 3;

/** No documentation provided. */
static STENCIL_OP_DECREMENT_AND_CLAMP: 4;

/** No documentation provided. */
static STENCIL_OP_INVERT: 5;

/** No documentation provided. */
static STENCIL_OP_INCREMENT_AND_WRAP: 6;

/** No documentation provided. */
static STENCIL_OP_DECREMENT_AND_WRAP: 7;

/** No documentation provided. */
static STENCIL_OP_MAX: 8;

/** No documentation provided. */
static COMPARE_OP_NEVER: 0;

/** No documentation provided. */
static COMPARE_OP_LESS: 1;

/** No documentation provided. */
static COMPARE_OP_EQUAL: 2;

/** No documentation provided. */
static COMPARE_OP_LESS_OR_EQUAL: 3;

/** No documentation provided. */
static COMPARE_OP_GREATER: 4;

/** No documentation provided. */
static COMPARE_OP_NOT_EQUAL: 5;

/** No documentation provided. */
static COMPARE_OP_GREATER_OR_EQUAL: 6;

/** No documentation provided. */
static COMPARE_OP_ALWAYS: 7;

/** No documentation provided. */
static COMPARE_OP_MAX: 8;

/** No documentation provided. */
static LOGIC_OP_CLEAR: 0;

/** No documentation provided. */
static LOGIC_OP_AND: 1;

/** No documentation provided. */
static LOGIC_OP_AND_REVERSE: 2;

/** No documentation provided. */
static LOGIC_OP_COPY: 3;

/** No documentation provided. */
static LOGIC_OP_AND_INVERTED: 4;

/** No documentation provided. */
static LOGIC_OP_NO_OP: 5;

/** No documentation provided. */
static LOGIC_OP_XOR: 6;

/** No documentation provided. */
static LOGIC_OP_OR: 7;

/** No documentation provided. */
static LOGIC_OP_NOR: 8;

/** No documentation provided. */
static LOGIC_OP_EQUIVALENT: 9;

/** No documentation provided. */
static LOGIC_OP_INVERT: 10;

/** No documentation provided. */
static LOGIC_OP_OR_REVERSE: 11;

/** No documentation provided. */
static LOGIC_OP_COPY_INVERTED: 12;

/** No documentation provided. */
static LOGIC_OP_OR_INVERTED: 13;

/** No documentation provided. */
static LOGIC_OP_NAND: 14;

/** No documentation provided. */
static LOGIC_OP_SET: 15;

/** No documentation provided. */
static LOGIC_OP_MAX: 16;

/** No documentation provided. */
static BLEND_FACTOR_ZERO: 0;

/** No documentation provided. */
static BLEND_FACTOR_ONE: 1;

/** No documentation provided. */
static BLEND_FACTOR_SRC_COLOR: 2;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_SRC_COLOR: 3;

/** No documentation provided. */
static BLEND_FACTOR_DST_COLOR: 4;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_DST_COLOR: 5;

/** No documentation provided. */
static BLEND_FACTOR_SRC_ALPHA: 6;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_SRC_ALPHA: 7;

/** No documentation provided. */
static BLEND_FACTOR_DST_ALPHA: 8;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_DST_ALPHA: 9;

/** No documentation provided. */
static BLEND_FACTOR_CONSTANT_COLOR: 10;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR: 11;

/** No documentation provided. */
static BLEND_FACTOR_CONSTANT_ALPHA: 12;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA: 13;

/** No documentation provided. */
static BLEND_FACTOR_SRC_ALPHA_SATURATE: 14;

/** No documentation provided. */
static BLEND_FACTOR_SRC1_COLOR: 15;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_SRC1_COLOR: 16;

/** No documentation provided. */
static BLEND_FACTOR_SRC1_ALPHA: 17;

/** No documentation provided. */
static BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA: 18;

/** No documentation provided. */
static BLEND_FACTOR_MAX: 19;

/** No documentation provided. */
static BLEND_OP_ADD: 0;

/** No documentation provided. */
static BLEND_OP_SUBTRACT: 1;

/** No documentation provided. */
static BLEND_OP_REVERSE_SUBTRACT: 2;

/** No documentation provided. */
static BLEND_OP_MINIMUM: 3;

/** No documentation provided. */
static BLEND_OP_MAXIMUM: 4;

/** No documentation provided. */
static BLEND_OP_MAX: 5;

/** No documentation provided. */
static DYNAMIC_STATE_LINE_WIDTH: 1;

/** No documentation provided. */
static DYNAMIC_STATE_DEPTH_BIAS: 2;

/** No documentation provided. */
static DYNAMIC_STATE_BLEND_CONSTANTS: 4;

/** No documentation provided. */
static DYNAMIC_STATE_DEPTH_BOUNDS: 8;

/** No documentation provided. */
static DYNAMIC_STATE_STENCIL_COMPARE_MASK: 16;

/** No documentation provided. */
static DYNAMIC_STATE_STENCIL_WRITE_MASK: 32;

/** No documentation provided. */
static DYNAMIC_STATE_STENCIL_REFERENCE: 64;

/** No documentation provided. */
static INITIAL_ACTION_CLEAR: 0;

/** No documentation provided. */
static INITIAL_ACTION_KEEP: 1;

/** No documentation provided. */
static INITIAL_ACTION_DROP: 2;

/** No documentation provided. */
static INITIAL_ACTION_CONTINUE: 3;

/** No documentation provided. */
static INITIAL_ACTION_MAX: 4;

/** No documentation provided. */
static FINAL_ACTION_READ: 0;

/** No documentation provided. */
static FINAL_ACTION_DISCARD: 1;

/** No documentation provided. */
static FINAL_ACTION_CONTINUE: 2;

/** No documentation provided. */
static FINAL_ACTION_MAX: 3;

/** No documentation provided. */
static SHADER_STAGE_VERTEX: 0;

/** No documentation provided. */
static SHADER_STAGE_FRAGMENT: 1;

/** No documentation provided. */
static SHADER_STAGE_TESSELATION_CONTROL: 2;

/** No documentation provided. */
static SHADER_STAGE_TESSELATION_EVALUATION: 3;

/** No documentation provided. */
static SHADER_STAGE_COMPUTE: 4;

/** No documentation provided. */
static SHADER_STAGE_MAX: 5;

/** No documentation provided. */
static SHADER_STAGE_VERTEX_BIT: 1;

/** No documentation provided. */
static SHADER_STAGE_FRAGMENT_BIT: 2;

/** No documentation provided. */
static SHADER_STAGE_TESSELATION_CONTROL_BIT: 4;

/** No documentation provided. */
static SHADER_STAGE_TESSELATION_EVALUATION_BIT: 8;

/** No documentation provided. */
static SHADER_STAGE_COMPUTE_BIT: 16;

/** No documentation provided. */
static SHADER_LANGUAGE_GLSL: 0;

/** No documentation provided. */
static SHADER_LANGUAGE_HLSL: 1;

/** No documentation provided. */
static LIMIT_MAX_BOUND_UNIFORM_SETS: 0;

/** No documentation provided. */
static LIMIT_MAX_FRAMEBUFFER_COLOR_ATTACHMENTS: 1;

/** No documentation provided. */
static LIMIT_MAX_TEXTURES_PER_UNIFORM_SET: 2;

/** No documentation provided. */
static LIMIT_MAX_SAMPLERS_PER_UNIFORM_SET: 3;

/** No documentation provided. */
static LIMIT_MAX_STORAGE_BUFFERS_PER_UNIFORM_SET: 4;

/** No documentation provided. */
static LIMIT_MAX_STORAGE_IMAGES_PER_UNIFORM_SET: 5;

/** No documentation provided. */
static LIMIT_MAX_UNIFORM_BUFFERS_PER_UNIFORM_SET: 6;

/** No documentation provided. */
static LIMIT_MAX_DRAW_INDEXED_INDEX: 7;

/** No documentation provided. */
static LIMIT_MAX_FRAMEBUFFER_HEIGHT: 8;

/** No documentation provided. */
static LIMIT_MAX_FRAMEBUFFER_WIDTH: 9;

/** No documentation provided. */
static LIMIT_MAX_TEXTURE_ARRAY_LAYERS: 10;

/** No documentation provided. */
static LIMIT_MAX_TEXTURE_SIZE_1D: 11;

/** No documentation provided. */
static LIMIT_MAX_TEXTURE_SIZE_2D: 12;

/** No documentation provided. */
static LIMIT_MAX_TEXTURE_SIZE_3D: 13;

/** No documentation provided. */
static LIMIT_MAX_TEXTURE_SIZE_CUBE: 14;

/** No documentation provided. */
static LIMIT_MAX_TEXTURES_PER_SHADER_STAGE: 15;

/** No documentation provided. */
static LIMIT_MAX_SAMPLERS_PER_SHADER_STAGE: 16;

/** No documentation provided. */
static LIMIT_MAX_STORAGE_BUFFERS_PER_SHADER_STAGE: 17;

/** No documentation provided. */
static LIMIT_MAX_STORAGE_IMAGES_PER_SHADER_STAGE: 18;

/** No documentation provided. */
static LIMIT_MAX_UNIFORM_BUFFERS_PER_SHADER_STAGE: 19;

/** No documentation provided. */
static LIMIT_MAX_PUSH_CONSTANT_SIZE: 20;

/** No documentation provided. */
static LIMIT_MAX_UNIFORM_BUFFER_SIZE: 21;

/** No documentation provided. */
static LIMIT_MAX_VERTEX_INPUT_ATTRIBUTE_OFFSET: 22;

/** No documentation provided. */
static LIMIT_MAX_VERTEX_INPUT_ATTRIBUTES: 23;

/** No documentation provided. */
static LIMIT_MAX_VERTEX_INPUT_BINDINGS: 24;

/** No documentation provided. */
static LIMIT_MAX_VERTEX_INPUT_BINDING_STRIDE: 25;

/** No documentation provided. */
static LIMIT_MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT: 26;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_SHARED_MEMORY_SIZE: 27;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_COUNT_X: 28;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_COUNT_Y: 29;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_COUNT_Z: 30;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_INVOCATIONS: 31;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_SIZE_X: 32;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_SIZE_Y: 33;

/** No documentation provided. */
static LIMIT_MAX_COMPUTE_WORKGROUP_SIZE_Z: 34;

/** No documentation provided. */
 static INVALID_ID: null;

/** No documentation provided. */
 static INVALID_FORMAT_ID: null;


  
}


 
