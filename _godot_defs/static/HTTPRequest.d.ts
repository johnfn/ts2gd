
/**
 * A node with the ability to send HTTP requests. Uses [HTTPClient] internally.
 *
 * Can be used to make HTTP requests, i.e. download or upload files or web content via HTTP.
 *
 * **Warning:** See the notes and warnings on [HTTPClient] for limitations, especially regarding SSL security.
 *
 * **Example of contacting a REST API and printing one of its returned fields:**
 *
 * @example 
 * 
 * func _ready():
 *     # Create an HTTP request node and connect its completion signal.
 *     var http_request = HTTPRequest.new()
 *     add_child(http_request)
 *     http_request.connect("request_completed", self, "_http_request_completed")
 *     # Perform a GET request. The URL below returns JSON as of writing.
 *     var error = http_request.request("https://httpbin.org/get")
 *     if error != OK:
 *         push_error("An error occurred in the HTTP request.")
 *     # Perform a POST request. The URL below returns JSON as of writing.
 *     # Note: Don't make simultaneous requests using a single HTTPRequest node.
 *     # The snippet below is provided for reference only.
 *     var body = {"name": "Godette"}
 *     error = http_request.request("https://httpbin.org/post", [], true, HTTPClient.METHOD_POST, body)
 *     if error != OK:
 *         push_error("An error occurred in the HTTP request.")
 * # Called when the HTTP request is completed.
 * func _http_request_completed(result, response_code, headers, body):
 *     var response = parse_json(body.get_string_from_utf8())
 *     # Will print the user agent string used by the HTTPRequest node (as recognized by httpbin.org).
 *     print(response.headers["User-Agent"])
 * @summary 
 * 
 *
 * **Example of loading and displaying an image using HTTPRequest:**
 *
 * @example 
 * 
 * func _ready():
 *     # Create an HTTP request node and connect its completion signal.
 *     var http_request = HTTPRequest.new()
 *     add_child(http_request)
 *     http_request.connect("request_completed", self, "_http_request_completed")
 *     # Perform the HTTP request. The URL below returns a PNG image as of writing.
 *     var error = http_request.request("https://via.placeholder.com/512")
 *     if error != OK:
 *         push_error("An error occurred in the HTTP request.")
 * # Called when the HTTP request is completed.
 * func _http_request_completed(result, response_code, headers, body):
 *     var image = Image.new()
 *     var error = image.load_png_from_buffer(body)
 *     if error != OK:
 *         push_error("Couldn't load the image.")
 *     var texture = ImageTexture.new()
 *     texture.create_from_image(image)
 *     # Display the image in a TextureRect node.
 *     var texture_rect = TextureRect.new()
 *     add_child(texture_rect)
 *     texture_rect.texture = texture
 * @summary 
 * 
 *
*/
declare class HTTPRequest extends Node  {

  
/**
 * A node with the ability to send HTTP requests. Uses [HTTPClient] internally.
 *
 * Can be used to make HTTP requests, i.e. download or upload files or web content via HTTP.
 *
 * **Warning:** See the notes and warnings on [HTTPClient] for limitations, especially regarding SSL security.
 *
 * **Example of contacting a REST API and printing one of its returned fields:**
 *
 * @example 
 * 
 * func _ready():
 *     # Create an HTTP request node and connect its completion signal.
 *     var http_request = HTTPRequest.new()
 *     add_child(http_request)
 *     http_request.connect("request_completed", self, "_http_request_completed")
 *     # Perform a GET request. The URL below returns JSON as of writing.
 *     var error = http_request.request("https://httpbin.org/get")
 *     if error != OK:
 *         push_error("An error occurred in the HTTP request.")
 *     # Perform a POST request. The URL below returns JSON as of writing.
 *     # Note: Don't make simultaneous requests using a single HTTPRequest node.
 *     # The snippet below is provided for reference only.
 *     var body = {"name": "Godette"}
 *     error = http_request.request("https://httpbin.org/post", [], true, HTTPClient.METHOD_POST, body)
 *     if error != OK:
 *         push_error("An error occurred in the HTTP request.")
 * # Called when the HTTP request is completed.
 * func _http_request_completed(result, response_code, headers, body):
 *     var response = parse_json(body.get_string_from_utf8())
 *     # Will print the user agent string used by the HTTPRequest node (as recognized by httpbin.org).
 *     print(response.headers["User-Agent"])
 * @summary 
 * 
 *
 * **Example of loading and displaying an image using HTTPRequest:**
 *
 * @example 
 * 
 * func _ready():
 *     # Create an HTTP request node and connect its completion signal.
 *     var http_request = HTTPRequest.new()
 *     add_child(http_request)
 *     http_request.connect("request_completed", self, "_http_request_completed")
 *     # Perform the HTTP request. The URL below returns a PNG image as of writing.
 *     var error = http_request.request("https://via.placeholder.com/512")
 *     if error != OK:
 *         push_error("An error occurred in the HTTP request.")
 * # Called when the HTTP request is completed.
 * func _http_request_completed(result, response_code, headers, body):
 *     var image = Image.new()
 *     var error = image.load_png_from_buffer(body)
 *     if error != OK:
 *         push_error("Couldn't load the image.")
 *     var texture = ImageTexture.new()
 *     texture.create_from_image(image)
 *     # Display the image in a TextureRect node.
 *     var texture_rect = TextureRect.new()
 *     add_child(texture_rect)
 *     texture_rect.texture = texture
 * @summary 
 * 
 *
*/
  new(): HTTPRequest; 
  static "new"(): HTTPRequest 


/** Maximum allowed size for response bodies. */
body_size_limit: int;

/**
 * The size of the buffer used and maximum bytes to read per iteration. See [member HTTPClient.read_chunk_size].
 *
 * Set this to a lower value (e.g. 4096 for 4 KiB) when downloading small files to decrease memory usage at the cost of download speeds.
 *
*/
download_chunk_size: int;

/** The file to download into. Will output any received file into it. */
download_file: string;

/** Maximum number of allowed redirects. */
max_redirects: int;


/** If [code]true[/code], multithreading is used to improve performance. */
use_threads: boolean;

/** Cancels the current request. */
cancel_request(): void;

/**
 * Returns the response body length.
 *
 * **Note:** Some Web servers may not send a body length. In this case, the value returned will be `-1`. If using chunked transfer encoding, the body length will also be `-1`.
 *
*/
get_body_size(): int;

/** Returns the amount of bytes this HTTPRequest downloaded. */
get_downloaded_bytes(): int;

/** Returns the current status of the underlying [HTTPClient]. See [enum HTTPClient.Status]. */
get_http_client_status(): int;

/**
 * Creates request on the underlying [HTTPClient]. If there is no configuration errors, it tries to connect using [method HTTPClient.connect_to_host] and passes parameters onto [method HTTPClient.request].
 *
 * Returns [constant OK] if request is successfully created. (Does not imply that the server has responded), [constant ERR_UNCONFIGURED] if not in the tree, [constant ERR_BUSY] if still processing previous request, [constant ERR_INVALID_PARAMETER] if given string is not a valid URL format, or [constant ERR_CANT_CONNECT] if not using thread and the [HTTPClient] cannot connect to host.
 *
 * **Note:** When `method` is [constant HTTPClient.METHOD_GET], the payload sent via `request_data` might be ignored by the server or even cause the server to reject the request (check [url=https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.1]RFC 7231 section 4.3.1[/url] for more details). As a workaround, you can send data as a query string in the URL. See [method String.http_escape] for an example.
 *
*/
request(url: string, custom_headers?: PoolStringArray, ssl_validate_domain?: boolean, method?: int, request_data?: string): int;

/**
 * Creates request on the underlying [HTTPClient] using a raw array of bytes for the request body. If there is no configuration errors, it tries to connect using [method HTTPClient.connect_to_host] and passes parameters onto [method HTTPClient.request].
 *
 * Returns [constant OK] if request is successfully created. (Does not imply that the server has responded), [constant ERR_UNCONFIGURED] if not in the tree, [constant ERR_BUSY] if still processing previous request, [constant ERR_INVALID_PARAMETER] if given string is not a valid URL format, or [constant ERR_CANT_CONNECT] if not using thread and the [HTTPClient] cannot connect to host.
 *
*/
request_raw(url: string, custom_headers?: PoolStringArray, ssl_validate_domain?: boolean, method?: int, request_data_raw?: PoolByteArray): int;

  connect<T extends SignalsOf<HTTPRequest>>(signal: T, method: SignalFunction<HTTPRequest[T]>): number;



/**
 * Request successful.
 *
*/
static RESULT_SUCCESS: any;

/** No documentation provided. */
static RESULT_CHUNKED_BODY_SIZE_MISMATCH: any;

/**
 * Request failed while connecting.
 *
*/
static RESULT_CANT_CONNECT: any;

/**
 * Request failed while resolving.
 *
*/
static RESULT_CANT_RESOLVE: any;

/**
 * Request failed due to connection (read/write) error.
 *
*/
static RESULT_CONNECTION_ERROR: any;

/**
 * Request failed on SSL handshake.
 *
*/
static RESULT_SSL_HANDSHAKE_ERROR: any;

/**
 * Request does not have a response (yet).
 *
*/
static RESULT_NO_RESPONSE: any;

/**
 * Request exceeded its maximum size limit, see [member body_size_limit].
 *
*/
static RESULT_BODY_SIZE_LIMIT_EXCEEDED: any;

/**
 * Request failed (currently unused).
 *
*/
static RESULT_REQUEST_FAILED: any;

/**
 * HTTPRequest couldn't open the download file.
 *
*/
static RESULT_DOWNLOAD_FILE_CANT_OPEN: any;

/**
 * HTTPRequest couldn't write to the download file.
 *
*/
static RESULT_DOWNLOAD_FILE_WRITE_ERROR: any;

/**
 * Request reached its maximum redirect limit, see [member max_redirects].
 *
*/
static RESULT_REDIRECT_LIMIT_REACHED: any;

/** No documentation provided. */
static RESULT_TIMEOUT: any;


/**
 * Emitted when a request is completed.
 *
*/
$request_completed: Signal<(result: int, response_code: int, headers: PoolStringArray, body: PoolByteArray) => void>

}

