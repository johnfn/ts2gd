
/**
 * The CryptoKey class represents a cryptographic key. Keys can be loaded and saved like any other [Resource].
 *
 * They can be used to generate a self-signed [X509Certificate] via [method Crypto.generate_self_signed_certificate] and as private key in [method StreamPeerSSL.accept_stream] along with the appropriate certificate.
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class CryptoKey extends Resource  {

  
/**
 * The CryptoKey class represents a cryptographic key. Keys can be loaded and saved like any other [Resource].
 *
 * They can be used to generate a self-signed [X509Certificate] via [method Crypto.generate_self_signed_certificate] and as private key in [method StreamPeerSSL.accept_stream] along with the appropriate certificate.
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  new(): CryptoKey; 
  static "new"(): CryptoKey 



/** Return [code]true[/code] if this CryptoKey only has the public part, and not the private one. */
is_public_only(): boolean;

/**
 * Loads a key from `path`. If `public_only` is `true`, only the public key will be loaded.
 *
 * **Note:** `path` should be a "*.pub" file if `public_only` is `true`, a "*.key" file otherwise.
 *
*/
load(path: string, public_only?: boolean): int;

/** Loads a key from the given [code]string[/code]. If [code]public_only[/code] is [code]true[/code], only the public key will be loaded. */
load_from_string(string_key: string, public_only?: boolean): int;

/**
 * Saves a key to the given `path`. If `public_only` is `true`, only the public key will be saved.
 *
 * **Note:** `path` should be a "*.pub" file if `public_only` is `true`, a "*.key" file otherwise.
 *
*/
save(path: string, public_only?: boolean): int;

/** Returns a string containing the key in PEM format. If [code]public_only[/code] is [code]true[/code], only the public key will be included. */
save_to_string(public_only?: boolean): string;

  connect<T extends SignalsOf<CryptoKey>>(signal: T, method: SignalFunction<CryptoKey[T]>): number;






}

