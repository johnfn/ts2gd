
/**
 * This class allows you to define a custom shader program that can be used for various materials to render objects.
 *
 * The visual shader editor creates the shader.
 *
*/
declare class VisualShader extends Shader  {

  
/**
 * This class allows you to define a custom shader program that can be used for various materials to render objects.
 *
 * The visual shader editor creates the shader.
 *
*/
  new(): VisualShader; 
  static "new"(): VisualShader 


/** The offset vector of the whole graph. */
graph_offset: Vector2;

/** Adds the specified node to the shader. */
add_node(type: int, node: VisualShaderNode, position: Vector2, id: int): void;

/** Returns [code]true[/code] if the specified nodes and ports can be connected together. */
can_connect_nodes(type: int, from_node: int, from_port: int, to_node: int, to_port: int): boolean;

/** Connects the specified nodes and ports. */
connect_nodes(type: int, from_node: int, from_port: int, to_node: int, to_port: int): int;

/** Connects the specified nodes and ports, even if they can't be connected. Such connection is invalid and will not function properly. */
connect_nodes_forced(type: int, from_node: int, from_port: int, to_node: int, to_port: int): void;

/** Connects the specified nodes and ports. */
disconnect_nodes(type: int, from_node: int, from_port: int, to_node: int, to_port: int): void;

/** Returns the shader node instance with specified [code]type[/code] and [code]id[/code]. */
get_node(path: NodePathType): Node;

/** Returns the shader node instance with specified [code]type[/code] and [code]id[/code]. */
get_node_unsafe<T extends Node>(path: NodePathType): T;


/** Returns the list of connected nodes with the specified type. */
get_node_connections(type: int): any[];

/** Returns the list of all nodes in the shader with the specified type. */
get_node_list(type: int): PoolIntArray;

/** Returns the position of the specified node within the shader graph. */
get_node_position(type: int, id: int): Vector2;

/** No documentation provided. */
get_valid_node_id(type: int): int;

/** Returns [code]true[/code] if the specified node and port connection exist. */
is_node_connection(type: int, from_node: int, from_port: int, to_node: int, to_port: int): boolean;

/** Removes the specified node from the shader. */
remove_node(type: int, id: int): void;

/** Sets the mode of this shader. */
set_mode(mode: int): void;

/** Sets the position of the specified node. */
set_node_position(type: int, id: int, position: Vector2): void;

  connect<T extends SignalsOf<VisualShader>>(signal: T, method: SignalFunction<VisualShader[T]>): number;



/**
 * A vertex shader, operating on vertices.
 *
*/
static TYPE_VERTEX: any;

/**
 * A fragment shader, operating on fragments (pixels).
 *
*/
static TYPE_FRAGMENT: any;

/**
 * A shader for light calculations.
 *
*/
static TYPE_LIGHT: any;

/**
 * Represents the size of the [enum Type] enum.
 *
*/
static TYPE_MAX: any;

/** No documentation provided. */
static NODE_ID_INVALID: any;

/** No documentation provided. */
static NODE_ID_OUTPUT: any;



}

