
/**
 * The Crypto class allows you to access some more advanced cryptographic functionalities in Godot.
 *
 * For now, this includes generating cryptographically secure random bytes, and RSA keys and self-signed X509 certificates generation. More functionalities are planned for future releases.
 *
 * @example 
 * 
 * extends Node
 * var crypto = Crypto.new()
 * var key = CryptoKey.new()
 * var cert = X509Certificate.new()
 * func _ready():
 *     # Generate new RSA key.
 *     key = crypto.generate_rsa(4096)
 *     # Generate new self-signed certificate with the given key.
 *     cert = crypto.generate_self_signed_certificate(key, "CN=mydomain.com,O=My Game Company,C=IT")
 *     # Save key and certificate in the user folder.
 *     key.save("user://generated.key")
 *     cert.save("user://generated.crt")
 * @summary 
 * 
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class Crypto extends Reference {

  
/**
 * The Crypto class allows you to access some more advanced cryptographic functionalities in Godot.
 *
 * For now, this includes generating cryptographically secure random bytes, and RSA keys and self-signed X509 certificates generation. More functionalities are planned for future releases.
 *
 * @example 
 * 
 * extends Node
 * var crypto = Crypto.new()
 * var key = CryptoKey.new()
 * var cert = X509Certificate.new()
 * func _ready():
 *     # Generate new RSA key.
 *     key = crypto.generate_rsa(4096)
 *     # Generate new self-signed certificate with the given key.
 *     cert = crypto.generate_self_signed_certificate(key, "CN=mydomain.com,O=My Game Company,C=IT")
 *     # Save key and certificate in the user folder.
 *     key.save("user://generated.key")
 *     cert.save("user://generated.crt")
 * @summary 
 * 
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  "new"(): Crypto;
  static "new"(): Crypto;




/** Generates a [PoolByteArray] of cryptographically secure random bytes with given [code]size[/code]. */
generate_random_bytes(size: int): PoolByteArray;

/** Generates an RSA [CryptoKey] that can be used for creating self-signed certificates and passed to [method StreamPeerSSL.accept_stream]. */
generate_rsa(size: int): CryptoKey;

/**
 * Generates a self-signed [X509Certificate] from the given [CryptoKey] and `issuer_name`. The certificate validity will be defined by `not_before` and `not_after` (first valid date and last valid date). The `issuer_name` must contain at least "CN=" (common name, i.e. the domain name), "O=" (organization, i.e. your company name), "C=" (country, i.e. 2 lettered ISO-3166 code of the country the organization is based in).
 *
 * A small example to generate an RSA key and a X509 self-signed certificate.
 *
 * @example 
 * 
 * var crypto = Crypto.new()
 * # Generate 4096 bits RSA key.
 * var key = crypto.generate_rsa(4096)
 * # Generate self-signed certificate using the given key.
 * var cert = crypto.generate_self_signed_certificate(key, "CN=example.com,O=A Game Company,C=IT")
 * @summary 
 * 
 *
*/
generate_self_signed_certificate(key: CryptoKey, issuer_name?: string, not_before?: string, not_after?: string): X509Certificate;

  connect<T extends SignalsOf<Crypto>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
