
/**
 * The X509Certificate class represents an X509 certificate. Certificates can be loaded and saved like any other [Resource].
 *
 * They can be used as the server certificate in [method StreamPeerSSL.accept_stream] (along with the proper [CryptoKey]), and to specify the only certificate that should be accepted when connecting to an SSL server via [method StreamPeerSSL.connect_to_stream].
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
declare class X509Certificate extends Resource {

  
/**
 * The X509Certificate class represents an X509 certificate. Certificates can be loaded and saved like any other [Resource].
 *
 * They can be used as the server certificate in [method StreamPeerSSL.accept_stream] (along with the proper [CryptoKey]), and to specify the only certificate that should be accepted when connecting to an SSL server via [method StreamPeerSSL.connect_to_stream].
 *
 * **Note:** Not available in HTML5 exports.
 *
*/
  "new"(): X509Certificate;
  static "new"(): X509Certificate;




/** Loads a certificate from [code]path[/code] ("*.crt" file). */
load(path: string): int;

/** Saves a certificate to the given [code]path[/code] (should be a "*.crt" file). */
save(path: string): int;

  // connect<T extends SignalsOf<X509Certificate>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<X509CertificateSignals>>(signal: T, method: SignalFunction<X509CertificateSignals[T]>): number;




}

declare class X509CertificateSignals extends ResourceSignals {
  
}
