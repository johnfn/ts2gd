
/**
 * This class can serve as base to make custom XML parsers. Since XML is a very flexible standard, this interface is low-level so it can be applied to any possible schema.
 *
*/
declare class XMLParser extends Reference {

  
/**
 * This class can serve as base to make custom XML parsers. Since XML is a very flexible standard, this interface is low-level so it can be applied to any possible schema.
 *
*/
  "new"(): XMLParser;
  static "new"(): XMLParser;




/** Gets the amount of attributes in the current element. */
get_attribute_count(): int;

/** Gets the name of the attribute specified by the index in [code]idx[/code] argument. */
get_attribute_name(idx: int): string;

/** Gets the value of the attribute specified by the index in [code]idx[/code] argument. */
get_attribute_value(idx: int): string;

/** Gets the current line in the parsed file (currently not implemented). */
get_current_line(): int;

/** Gets the value of a certain attribute of the current element by name. This will raise an error if the element has no such attribute. */
get_named_attribute_value(name: string): string;

/** Gets the value of a certain attribute of the current element by name. This will return an empty [String] if the attribute is not found. */
get_named_attribute_value_safe(name: string): string;

/** Gets the contents of a text node. This will raise an error in any other type of node. */
get_node_data(): string;

/** Gets the name of the current element node. This will raise an error if the current node type is neither [constant NODE_ELEMENT] nor [constant NODE_ELEMENT_END]. */
get_node_name(): string;

/** Gets the byte offset of the current node since the beginning of the file or buffer. */
get_node_offset(): int;

/** Gets the type of the current node. Compare with [enum NodeType] constants. */
get_node_type(): int;

/** Check whether the current element has a certain attribute. */
has_attribute(name: string): boolean;

/** Check whether the current element is empty (this only works for completely empty tags, e.g. [code]<element \>[/code]). */
is_empty(): boolean;

/** Opens an XML file for parsing. This returns an error code. */
open(file: string): int;

/** Opens an XML raw buffer for parsing. This returns an error code. */
open_buffer(buffer: PoolByteArray): int;

/** Reads the next node of the file. This returns an error code. */
read(): int;

/** Moves the buffer cursor to a certain offset (since the beginning) and read the next node there. This returns an error code. */
seek(position: int): int;

/** Skips the current section. If the node contains other elements, they will be ignored and the cursor will go to the closing of the current element. */
skip_section(): void;

  // connect<T extends SignalsOf<XMLParser>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<XMLParserSignals>>(signal: T, method: SignalFunction<XMLParserSignals[T]>): number;



/**
 * There's no node (no file or buffer opened).
 *
*/
static NODE_NONE: any;

/**
 * Element (tag).
 *
*/
static NODE_ELEMENT: any;

/**
 * End of element.
 *
*/
static NODE_ELEMENT_END: any;

/**
 * Text node.
 *
*/
static NODE_TEXT: any;

/**
 * Comment node.
 *
*/
static NODE_COMMENT: any;

/**
 * CDATA content.
 *
*/
static NODE_CDATA: any;

/**
 * Unknown node.
 *
*/
static NODE_UNKNOWN: any;

}

declare class XMLParserSignals extends ReferenceSignals {
  
}
