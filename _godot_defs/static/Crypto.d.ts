
/**
 * The Crypto class allows you to access some more advanced cryptographic functionalities in Godot.
 *
 * For now, this includes generating cryptographically secure random bytes, RSA keys and self-signed X509 certificates generation, asymmetric key encryption/decryption, and signing/verification.
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
 *     # Encryption
 *     var data = "Some data"
 *     var encrypted = crypto.encrypt(key, data.to_utf8())
 *     # Decryption
 *     var decrypted = crypto.decrypt(key, encrypted)
 *     # Signing
 *     var signature = crypto.sign(HashingContext.HASH_SHA256, data.sha256_buffer(), key)
 *     # Verifying
 *     var verified = crypto.verify(HashingContext.HASH_SHA256, data.sha256_buffer(), signature, key)
 *     # Checks
 *     assert(verified)
 *     assert(data.to_utf8() == decrypted)
 * @summary 
 * 
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class Crypto extends Reference  {

  
/**
 * The Crypto class allows you to access some more advanced cryptographic functionalities in Godot.
 *
 * For now, this includes generating cryptographically secure random bytes, RSA keys and self-signed X509 certificates generation, asymmetric key encryption/decryption, and signing/verification.
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
 *     # Encryption
 *     var data = "Some data"
 *     var encrypted = crypto.encrypt(key, data.to_utf8())
 *     # Decryption
 *     var decrypted = crypto.decrypt(key, encrypted)
 *     # Signing
 *     var signature = crypto.sign(HashingContext.HASH_SHA256, data.sha256_buffer(), key)
 *     # Verifying
 *     var verified = crypto.verify(HashingContext.HASH_SHA256, data.sha256_buffer(), signature, key)
 *     # Checks
 *     assert(verified)
 *     assert(data.to_utf8() == decrypted)
 * @summary 
 * 
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  new(): Crypto; 
  static "new"(): Crypto 



/**
 * Compares two [PoolByteArray]s for equality without leaking timing information in order to prevent timing attacks.
 *
 * See [url=https://paragonie.com/blog/2015/11/preventing-timing-attacks-on-string-comparison-with-double-hmac-strategy]this blog post[/url] for more information.
 *
*/
constant_time_compare(trusted: PoolByteArray, received: PoolByteArray): boolean;

/**
 * Decrypt the given `ciphertext` with the provided private `key`.
 *
 * **Note:** The maximum size of accepted ciphertext is limited by the key size.
 *
*/
decrypt(key: CryptoKey, ciphertext: PoolByteArray): PoolByteArray;

/**
 * Encrypt the given `plaintext` with the provided public `key`.
 *
 * **Note:** The maximum size of accepted plaintext is limited by the key size.
 *
*/
encrypt(key: CryptoKey, plaintext: PoolByteArray): PoolByteArray;

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

/**
 * Generates an [url=https://en.wikipedia.org/wiki/HMAC]HMAC[/url] digest of `msg` using `key`. The `hash_type` parameter is the hashing algorithm that is used for the inner and outer hashes.
 *
 * Currently, only [constant HashingContext.HASH_SHA256] and [constant HashingContext.HASH_SHA1] are supported.
 *
*/
hmac_digest(hash_type: int, key: PoolByteArray, msg: PoolByteArray): PoolByteArray;

/** Sign a given [code]hash[/code] of type [code]hash_type[/code] with the provided private [code]key[/code]. */
sign(hash_type: int, hash: PoolByteArray, key: CryptoKey): PoolByteArray;

/** Verify that a given [code]signature[/code] for [code]hash[/code] of type [code]hash_type[/code] against the provided public [code]key[/code]. */
verify(hash_type: int, hash: PoolByteArray, signature: PoolByteArray, key: CryptoKey): boolean;

  connect<T extends SignalsOf<Crypto>>(signal: T, method: SignalFunction<Crypto[T]>): number;






}

