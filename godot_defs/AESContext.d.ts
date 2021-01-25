
/**
 * This class provides access to AES encryption/decryption of raw data. Both AES-ECB and AES-CBC mode are supported.
 *
 * @example 
 * 
 * 
 * extends Node
 * var aes = AESContext.new()
 * func _ready():
 *     var key = "My secret key!!!" # Key must be either 16 or 32 bytes.
 *     var data = "My secret text!!" # Data size must be multiple of 16 bytes, apply padding if needed.
 *     # Encrypt ECB
 *     aes.start(AESContext.MODE_ECB_ENCRYPT, key.to_utf8())
 *     var encrypted = aes.update(data.to_utf8())
 *     aes.finish()
 *     # Decrypt ECB
 *     aes.start(AESContext.MODE_ECB_DECRYPT, key.to_utf8())
 *     var decrypted = aes.update(encrypted)
 *     aes.finish()
 *     # Check ECB
 *     assert(decrypted == data.to_utf8())
 *     var iv = "My secret iv!!!!" # IV must be of exactly 16 bytes.
 *     # Encrypt CBC
 *     aes.start(AESContext.MODE_CBC_ENCRYPT, key.to_utf8(), iv.to_utf8())
 *     encrypted = aes.update(data.to_utf8())
 *     aes.finish()
 *     # Decrypt CBC
 *     aes.start(AESContext.MODE_CBC_DECRYPT, key.to_utf8(), iv.to_utf8())
 *     decrypted = aes.update(encrypted)
 *     aes.finish()
 *     # Check CBC
 *     assert(decrypted == data.to_utf8())
 * 
 * 
 * using Godot;
 * using System;
 * using System.Diagnostics;
 * public class Example : Node
 * {
 *     public AESContext Aes = new AESContext();
 *     public override void _Ready()
 *     {
 *         string key = "My secret key!!!"; // Key must be either 16 or 32 bytes.
 *         string data = "My secret text!!"; // Data size must be multiple of 16 bytes, apply padding if needed.
 *         // Encrypt ECB
 *         Aes.Start(AESContext.Mode.EcbEncrypt, key.ToUTF8());
 *         byte[] encrypted = Aes.Update(data.ToUTF8());
 *         Aes.Finish();
 *         // Decrypt ECB
 *         Aes.Start(AESContext.Mode.EcbDecrypt, key.ToUTF8());
 *         byte[] decrypted = Aes.Update(encrypted);
 *         Aes.Finish();
 *         // Check ECB
 *         Debug.Assert(decrypted == data.ToUTF8());
 *         string iv = "My secret iv!!!!"; // IV must be of exactly 16 bytes.
 *         // Encrypt CBC
 *         Aes.Start(AESContext.Mode.EcbEncrypt, key.ToUTF8(), iv.ToUTF8());
 *         encrypted = Aes.Update(data.ToUTF8());
 *         Aes.Finish();
 *         // Decrypt CBC
 *         Aes.Start(AESContext.Mode.EcbDecrypt, key.ToUTF8(), iv.ToUTF8());
 *         decrypted = Aes.Update(encrypted);
 *         Aes.Finish();
 *         // Check CBC
 *         Debug.Assert(decrypted == data.ToUTF8());
 *     }
 * }
 * 
 * @summary 
 * 
 *
*/
declare class AESContext extends Reference {

  
/**
 * This class provides access to AES encryption/decryption of raw data. Both AES-ECB and AES-CBC mode are supported.
 *
 * @example 
 * 
 * 
 * extends Node
 * var aes = AESContext.new()
 * func _ready():
 *     var key = "My secret key!!!" # Key must be either 16 or 32 bytes.
 *     var data = "My secret text!!" # Data size must be multiple of 16 bytes, apply padding if needed.
 *     # Encrypt ECB
 *     aes.start(AESContext.MODE_ECB_ENCRYPT, key.to_utf8())
 *     var encrypted = aes.update(data.to_utf8())
 *     aes.finish()
 *     # Decrypt ECB
 *     aes.start(AESContext.MODE_ECB_DECRYPT, key.to_utf8())
 *     var decrypted = aes.update(encrypted)
 *     aes.finish()
 *     # Check ECB
 *     assert(decrypted == data.to_utf8())
 *     var iv = "My secret iv!!!!" # IV must be of exactly 16 bytes.
 *     # Encrypt CBC
 *     aes.start(AESContext.MODE_CBC_ENCRYPT, key.to_utf8(), iv.to_utf8())
 *     encrypted = aes.update(data.to_utf8())
 *     aes.finish()
 *     # Decrypt CBC
 *     aes.start(AESContext.MODE_CBC_DECRYPT, key.to_utf8(), iv.to_utf8())
 *     decrypted = aes.update(encrypted)
 *     aes.finish()
 *     # Check CBC
 *     assert(decrypted == data.to_utf8())
 * 
 * 
 * using Godot;
 * using System;
 * using System.Diagnostics;
 * public class Example : Node
 * {
 *     public AESContext Aes = new AESContext();
 *     public override void _Ready()
 *     {
 *         string key = "My secret key!!!"; // Key must be either 16 or 32 bytes.
 *         string data = "My secret text!!"; // Data size must be multiple of 16 bytes, apply padding if needed.
 *         // Encrypt ECB
 *         Aes.Start(AESContext.Mode.EcbEncrypt, key.ToUTF8());
 *         byte[] encrypted = Aes.Update(data.ToUTF8());
 *         Aes.Finish();
 *         // Decrypt ECB
 *         Aes.Start(AESContext.Mode.EcbDecrypt, key.ToUTF8());
 *         byte[] decrypted = Aes.Update(encrypted);
 *         Aes.Finish();
 *         // Check ECB
 *         Debug.Assert(decrypted == data.ToUTF8());
 *         string iv = "My secret iv!!!!"; // IV must be of exactly 16 bytes.
 *         // Encrypt CBC
 *         Aes.Start(AESContext.Mode.EcbEncrypt, key.ToUTF8(), iv.ToUTF8());
 *         encrypted = Aes.Update(data.ToUTF8());
 *         Aes.Finish();
 *         // Decrypt CBC
 *         Aes.Start(AESContext.Mode.EcbDecrypt, key.ToUTF8(), iv.ToUTF8());
 *         decrypted = Aes.Update(encrypted);
 *         Aes.Finish();
 *         // Check CBC
 *         Debug.Assert(decrypted == data.ToUTF8());
 *     }
 * }
 * 
 * @summary 
 * 
 *
*/
  "new"(): this;
  static "new"(): this;




/** Close this AES context so it can be started again. See [method start]. */
finish(): void;

/**
 * Get the current IV state for this context (IV gets updated when calling [method update]). You normally don't need this function.
 *
 * Note: This function only makes sense when the context is started with [constant MODE_CBC_ENCRYPT] or [constant MODE_CBC_DECRYPT].
 *
*/
get_iv_state(): PackedByteArray;

/** Start the AES context in the given [code]mode[/code]. A [code]key[/code] of either 16 or 32 bytes must always be provided, while an [code]iv[/code] (initialization vector) of exactly 16 bytes, is only needed when [code]mode[/code] is either [constant MODE_CBC_ENCRYPT] or [constant MODE_CBC_DECRYPT]. */
start(mode: int, key: PackedByteArray, iv?: PackedByteArray): int;

/**
 * Run the desired operation for this AES context. Will return a [PackedByteArray] containing the result of encrypting (or decrypting) the given `src`. See [method start] for mode of operation.
 *
 * Note: The size of `src` must be a multiple of 16. Apply some padding if needed.
 *
*/
update(src: PackedByteArray): PackedByteArray;

  connect<T extends SignalsOf<AESContext>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * AES electronic codebook encryption mode.
 *
*/
static MODE_ECB_ENCRYPT: 0;

/**
 * AES electronic codebook decryption mode.
 *
*/
static MODE_ECB_DECRYPT: 1;

/**
 * AES cipher blocker chaining encryption mode.
 *
*/
static MODE_CBC_ENCRYPT: 2;

/**
 * AES cipher blocker chaining decryption mode.
 *
*/
static MODE_CBC_DECRYPT: 3;

/**
 * Maximum value for the mode enum.
 *
*/
static MODE_MAX: 4;


  
}


 
