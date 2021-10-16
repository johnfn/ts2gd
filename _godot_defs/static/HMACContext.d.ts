
/**
 * The HMACContext class is useful for advanced HMAC use cases, such as streaming the message as it supports creating the message over time rather than providing it all at once.
 *
 * codeblock]
 *
 * xtends Node
 *
 * ar ctx = HMACContext.new()
 *
 * unc _ready():
 *
 *    var key = "supersecret".to_utf8()
 *
 *    var err = ctx.start(HashingContext.HASH_SHA256, key)
 *
 *    assert(err == OK)
 *
 *    var msg1 = "this is ".to_utf8()
 *
 *    var msg2 = "vewy vewy secret".to_utf8()
 *
 *    err = ctx.update(msg1)
 *
 *    assert(err == OK)
 *
 *    err = ctx.update(msg2)
 *
 *    assert(err == OK)
 *
 *    var hmac = ctx.finish()
 *
 *    print(hmac.hex_encode())
 *
 * /codeblock]
 *
 * And in C# we can use the following.
 *
 * codeblock]
 *
 * sing Godot;
 *
 * sing System;
 *
 * sing System.Diagnostics;
 *
 * ublic class CryptoNode : Node
 *
 *    private HMACContext ctx = new HMACContext();
 *
 *    public override void _Ready()
 *
 *    {
 *
 *        PoolByteArray key = String("supersecret").to_utf8();
 *
 *        Error err = ctx.Start(HashingContext.HASH_SHA256, key);
 *
 *        GD.Assert(err == OK);
 *
 *        PoolByteArray msg1 = String("this is ").to_utf8();
 *
 *        PoolByteArray msg2 = String("vewy vew secret").to_utf8();
 *
 *        err = ctx.Update(msg1);
 *
 *        GD.Assert(err == OK);
 *
 *        err = ctx.Update(msg2);
 *
 *        GD.Assert(err == OK);
 *
 *        PoolByteArray hmac = ctx.Finish();
 *
 *        GD.Print(hmac.HexEncode());
 *
 *    }
 *
 * /codeblock]
 *
 * b]Note:** Not available in HTML5 exports.
 *
*/
declare class HMACContext extends Reference {

  
/**
 * The HMACContext class is useful for advanced HMAC use cases, such as streaming the message as it supports creating the message over time rather than providing it all at once.
 *
 * codeblock]
 *
 * xtends Node
 *
 * ar ctx = HMACContext.new()
 *
 * unc _ready():
 *
 *    var key = "supersecret".to_utf8()
 *
 *    var err = ctx.start(HashingContext.HASH_SHA256, key)
 *
 *    assert(err == OK)
 *
 *    var msg1 = "this is ".to_utf8()
 *
 *    var msg2 = "vewy vewy secret".to_utf8()
 *
 *    err = ctx.update(msg1)
 *
 *    assert(err == OK)
 *
 *    err = ctx.update(msg2)
 *
 *    assert(err == OK)
 *
 *    var hmac = ctx.finish()
 *
 *    print(hmac.hex_encode())
 *
 * /codeblock]
 *
 * And in C# we can use the following.
 *
 * codeblock]
 *
 * sing Godot;
 *
 * sing System;
 *
 * sing System.Diagnostics;
 *
 * ublic class CryptoNode : Node
 *
 *    private HMACContext ctx = new HMACContext();
 *
 *    public override void _Ready()
 *
 *    {
 *
 *        PoolByteArray key = String("supersecret").to_utf8();
 *
 *        Error err = ctx.Start(HashingContext.HASH_SHA256, key);
 *
 *        GD.Assert(err == OK);
 *
 *        PoolByteArray msg1 = String("this is ").to_utf8();
 *
 *        PoolByteArray msg2 = String("vewy vew secret").to_utf8();
 *
 *        err = ctx.Update(msg1);
 *
 *        GD.Assert(err == OK);
 *
 *        err = ctx.Update(msg2);
 *
 *        GD.Assert(err == OK);
 *
 *        PoolByteArray hmac = ctx.Finish();
 *
 *        GD.Print(hmac.HexEncode());
 *
 *    }
 *
 * /codeblock]
 *
 * b]Note:** Not available in HTML5 exports.
 *
*/
  "new"(): HMACContext;
  static "new"(): HMACContext;




/** Returns the resulting HMAC. If the HMAC failed, an empty [PoolByteArray] is returned. */
finish(): PoolByteArray;

/** Initializes the HMACContext. This method cannot be called again on the same HMACContext until [method finish] has been called. */
start(hash_type: int, key: PoolByteArray): int;

/** Updates the message to be HMACed. This can be called multiple times before [method finish] is called to append [code]data[/code] to the message, but cannot be called until [method start] has been called. */
update(data: PoolByteArray): int;

  // connect<T extends SignalsOf<HMACContext>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<HMACContextSignals>>(signal: T, method: SignalFunction<HMACContextSignals[T]>): number;




}

declare class HMACContextSignals extends ReferenceSignals {
  
}
