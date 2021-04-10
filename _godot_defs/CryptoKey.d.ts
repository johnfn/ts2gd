
/**
 * The CryptoKey class represents a cryptographic key. Keys can be loaded and saved like any other [Resource].
 *
 * They can be used to generate a self-signed [X509Certificate] via [method Crypto.generate_self_signed_certificate] and as private key in [method StreamPeerSSL.accept_stream] along with the appropriate certificate.
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class CryptoKey extends Resource {

  
/**
 * The CryptoKey class represents a cryptographic key. Keys can be loaded and saved like any other [Resource].
 *
 * They can be used to generate a self-signed [X509Certificate] via [method Crypto.generate_self_signed_certificate] and as private key in [method StreamPeerSSL.accept_stream] along with the appropriate certificate.
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  "new"(): CryptoKey;
  static "new"(): CryptoKey;




/** Loads a key from [code]path[/code] ("*.key" file). */
load(path: string): int;

/** Saves a key to the given [code]path[/code] (should be a "*.key" file). */
save(path: string): int;

  connect<T extends SignalsOf<CryptoKey>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
