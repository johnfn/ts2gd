
/**
 * Returns a color constructed from integer red, green, blue, and alpha channels. Each channel should have 8 bits of information ranging from 0 to 255.
 *
 * `r8` red channel
 *
 * `g8` green channel
 *
 * `b8` blue channel
 *
 * `a8` alpha channel
 *
 * @example 
 * 
 * red = Color8(255, 0, 0)
 * @summary 
 * 
 *
*/
declare const Color8: (r8: int, g8: int, b8: int, a8?: int) => Color
    
    
/**
 * Returns a color according to the standardized `name` with `alpha` ranging from 0 to 1.
 *
 * @example 
 * 
 * red = ColorN("red", 1)
 * @summary 
 * 
 *
 * Supported color names are the same as the constants defined in [Color].
 *
*/
declare const ColorN: (name: string, alpha?: float) => Color
    
    
/**
 * Returns the absolute value of parameter `s` (i.e. positive value).
 *
 * @example 
 * 
 * a = abs(-1) # a is 1
 * @summary 
 * 
 *
*/
declare const abs: (s: float) => float
    
    
/**
 * Returns the arc cosine of `s` in radians. Use to get the angle of cosine `s`. `s` must be between `-1.0` and `1.0` (inclusive), otherwise, [method acos] will return [constant NAN].
 *
 * @example 
 * 
 * # c is 0.523599 or 30 degrees if converted with rad2deg(s)
 * c = acos(0.866025)
 * @summary 
 * 
 *
*/
declare const acos: (s: float) => float
    
    
/**
 * Returns the arc sine of `s` in radians. Use to get the angle of sine `s`. `s` must be between `-1.0` and `1.0` (inclusive), otherwise, [method asin] will return [constant NAN].
 *
 * @example 
 * 
 * # s is 0.523599 or 30 degrees if converted with rad2deg(s)
 * s = asin(0.5)
 * @summary 
 * 
 *
*/
declare const asin: (s: float) => float
    
    
/**
 * Asserts that the `condition` is `true`. If the `condition` is `false`, an error is generated. When running from the editor, the running project will also be paused until you resume it. This can be used as a stronger form of [method push_error] for reporting errors to project developers or add-on users.
 *
 * **Note:** For performance reasons, the code inside [method assert] is only executed in debug builds or when running the project from the editor. Don't include code that has side effects in an [method assert] call. Otherwise, the project will behave differently when exported in release mode.
 *
 * The optional `message` argument, if given, is shown in addition to the generic "Assertion failed" message. You can use this to provide additional details about why the assertion failed.
 *
 * @example 
 * 
 * # Imagine we always want speed to be between 0 and 20.
 * var speed = -10
 * assert(speed < 20) # True, the program will continue
 * assert(speed >= 0) # False, the program will stop
 * assert(speed >= 0 and speed < 20) # You can also combine the two conditional statements in one check
 * assert(speed < 20, "speed = %f, but the speed limit is 20" % speed) # Show a message with clarifying details
 * @summary 
 * 
 *
*/
declare const assert: (condition: boolean, message?: string) => void
    
    
/**
 * Returns the arc tangent of `s` in radians. Use it to get the angle from an angle's tangent in trigonometry: `atan(tan(angle)) == angle`.
 *
 * The method cannot know in which quadrant the angle should fall. See [method atan2] if you have both `y` and `x`.
 *
 * @example 
 * 
 * a = atan(0.5) # a is 0.463648
 * @summary 
 * 
 *
*/
declare const atan: (s: float) => float
    
    
/**
 * Returns the arc tangent of `y/x` in radians. Use to get the angle of tangent `y/x`. To compute the value, the method takes into account the sign of both arguments in order to determine the quadrant.
 *
 * Important note: The Y coordinate comes first, by convention.
 *
 * @example 
 * 
 * a = atan2(0, -1) # a is 3.141593
 * @summary 
 * 
 *
*/
declare const atan2: (y: float, x: float) => float
    
    
/**
 * Decodes a byte array back to a value. When `allow_objects` is `true` decoding objects is allowed.
 *
 * **WARNING:** Deserialized object can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats (remote code execution).
 *
*/
declare const bytes2var: (bytes: PoolByteArray, allow_objects?: boolean) => any
    
    
/** Converts a 2D point expressed in the cartesian coordinate system (X and Y axis) to the polar coordinate system (a distance from the origin and an angle). */
declare const cartesian2polar: (x: float, y: float) => Vector2
    
    
/**
 * Rounds `s` upward (towards positive infinity), returning the smallest whole number that is not less than `s`.
 *
 * @example 
 * 
 * a = ceil(1.45)  # a is 2.0
 * a = ceil(1.001) # a is 2.0
 * @summary 
 * 
 *
 * See also [method floor], [method round], [method stepify], and [int].
 *
*/
declare const ceil: (s: float) => float
    
    
/**
 * Returns a character as a String of the given Unicode code point (which is compatible with ASCII code).
 *
 * @example 
 * 
 * a = char(65)      # a is "A"
 * a = char(65 + 32) # a is "a"
 * a = char(8364)    # a is "€"
 * @summary 
 * 
 *
 * This is the inverse of [method ord].
 *
*/
declare const char: (code: int) => string
    
    
/**
 * Clamps `value` and returns a value not less than `min` and not more than `max`.
 *
 * @example 
 * 
 * a = clamp(1000, 1, 20) # a is 20
 * a = clamp(-10, 1, 20)  # a is 1
 * a = clamp(15, 1, 20)   # a is 15
 * @summary 
 * 
 *
*/
declare const clamp: (value: float, min: float, max: float) => float
    
    
/**
 * Converts from a type to another in the best way possible. The `type` parameter uses the [enum Variant.Type] values.
 *
 * @example 
 * 
 * a = Vector2(1, 0)
 * # Prints 1
 * print(a.length())
 * a = convert(a, TYPE_STRING)
 * # Prints 6 as "(1, 0)" is 6 characters
 * print(a.length())
 * @summary 
 * 
 *
*/
declare const convert: (what: any, type: int) => any
    
    
/**
 * Returns the cosine of angle `s` in radians.
 *
 * @example 
 * 
 * a = cos(TAU) # a is 1.0
 * a = cos(PI)  # a is -1.0
 * @summary 
 * 
 *
*/
declare const cos: (s: float) => float
    
    
/**
 * Returns the hyperbolic cosine of `s` in radians.
 *
 * @example 
 * 
 * print(cosh(1)) # Prints 1.543081
 * @summary 
 * 
 *
*/
declare const cosh: (s: float) => float
    
    
/** Converts from decibels to linear energy (audio). */
declare const db2linear: (db: float) => float
    
    
/** Deprecated alias for [method step_decimals]. */
declare const decimals: (step: float) => int
    
    
/**
 * **Note:** `dectime` has been deprecated and will be removed in Godot 4.0, please use [method move_toward] instead.
 *
 * Returns the result of `value` decreased by `step` * `amount`.
 *
 * @example 
 * 
 * a = dectime(60, 10, 0.1)) # a is 59.0
 * @summary 
 * 
 *
*/
declare const dectime: (value: float, amount: float, step: float) => float
    
    
/**
 * Converts an angle expressed in degrees to radians.
 *
 * @example 
 * 
 * r = deg2rad(180) # r is 3.141593
 * @summary 
 * 
 *
*/
declare const deg2rad: (deg: float) => float
    
    
/** Converts a dictionary (previously created with [method inst2dict]) back to an instance. Useful for deserializing. */
declare const dict2inst: (dict: Dictionary<any, any>) => Object
    
    
/**
 * Returns an "eased" value of `x` based on an easing function defined with `curve`. This easing function is based on an exponent. The `curve` can be any floating-point number, with specific values leading to the following behaviors:
 *
 * @example 
 * 
 * - Lower than -1.0 (exclusive): Ease in-out
 * - 1.0: Linear
 * - Between -1.0 and 0.0 (exclusive): Ease out-in
 * - 0.0: Constant
 * - Between 0.0 to 1.0 (exclusive): Ease in
 * - 1.0: Linear
 * - Greater than 1.0 (exclusive): Ease out
 * @summary 
 * 
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/3.4/img/ease_cheatsheet.png]ease() curve values cheatsheet[/url]
 *
 * See also [method smoothstep]. If you need to perform more advanced transitions, use [Tween] or [AnimationPlayer].
 *
*/
declare const ease: (s: float, curve: float) => float
    
    
/**
 * The natural exponential function. It raises the mathematical constant **e** to the power of `s` and returns it.
 *
 * **e** has an approximate value of 2.71828, and can be obtained with `exp(1)`.
 *
 * For exponents to other bases use the method [method pow].
 *
 * @example 
 * 
 * a = exp(2) # Approximately 7.39
 * @summary 
 * 
 *
*/
declare const exp: (s: float) => float
    
    
/**
 * Rounds `s` downward (towards negative infinity), returning the largest whole number that is not more than `s`.
 *
 * @example 
 * 
 * a = floor(2.45)  # a is 2.0
 * a = floor(2.99)  # a is 2.0
 * a = floor(-2.99) # a is -3.0
 * @summary 
 * 
 *
 * See also [method ceil], [method round], [method stepify], and [int].
 *
 * **Note:** This method returns a float. If you need an integer and `s` is a non-negative number, you can use `int(s)` directly.
 *
*/
declare const floor: (s: float) => float
    
    
/**
 * Returns the floating-point remainder of `a/b`, keeping the sign of `a`.
 *
 * @example 
 * 
 * r = fmod(7, 5.5) # r is 1.5
 * @summary 
 * 
 *
 * For the integer remainder operation, use the % operator.
 *
*/
declare const fmod: (a: float, b: float) => float
    
    
/**
 * Returns the floating-point modulus of `a/b` that wraps equally in positive and negative.
 *
 * @example 
 * 
 * for i in 7:
 *     var x = 0.5 * i - 1.5
 *     print("%4.1f %4.1f %4.1f" % [x, fmod(x, 1.5), fposmod(x, 1.5)])
 * @summary 
 * 
 *
 * Produces:
 *
 * @example 
 * 
 * -1.5 -0.0  0.0
 * -1.0 -1.0  0.5
 * -0.5 -0.5  1.0
 *  0.0  0.0  0.0
 *  0.5  0.5  0.5
 *  1.0  1.0  1.0
 *  1.5  0.0  0.0
 * @summary 
 * 
 *
*/
declare const fposmod: (a: float, b: float) => float
    
    
/**
 * Returns a reference to the specified function `funcname` in the `instance` node. As functions aren't first-class objects in GDscript, use `funcref` to store a [FuncRef] in a variable and call it later.
 *
 * @example 
 * 
 * func foo():
 *     return("bar")
 * a = funcref(self, "foo")
 * print(a.call_func()) # Prints bar
 * @summary 
 * 
 *
*/
declare const funcref: (instance: Object, funcname: string) => FuncRef
    
    
/**
 * Returns an array of dictionaries representing the current call stack.
 *
 * @example 
 * 
 * func _ready():
 *     foo()
 * func foo():
 *     bar()
 * func bar():
 *     print(get_stack())
 * @summary 
 * 
 *
 * would print
 *
 * @example 
 * 
 * [{function:bar, line:12, source:res://script.gd}, {function:foo, line:9, source:res://script.gd}, {function:_ready, line:6, source:res://script.gd}]
 * @summary 
 * 
 *
*/
declare const get_stack: () => any[]
    
    
/**
 * Returns the integer hash of the variable passed.
 *
 * @example 
 * 
 * print(hash("a")) # Prints 177670
 * @summary 
 * 
 *
*/
declare const hash: (_var: any) => int
    
    
/**
 * Returns the passed instance converted to a dictionary (useful for serializing).
 *
 * @example 
 * 
 * var foo = "bar"
 * func _ready():
 *     var d = inst2dict(self)
 *     print(d.keys())
 *     print(d.values())
 * @summary 
 * 
 *
 * Prints out:
 *
 * @example 
 * 
 * [@subpath, @path, foo]
 * [, res://test.gd, bar]
 * @summary 
 * 
 *
*/
declare const inst2dict: (inst: Object) => Dictionary<any, any>
    
    
/**
 * Returns the Object that corresponds to `instance_id`. All Objects have a unique instance ID.
 *
 * @example 
 * 
 * var foo = "bar"
 * func _ready():
 *     var id = get_instance_id()
 *     var inst = instance_from_id(id)
 *     print(inst.foo) # Prints bar
 * @summary 
 * 
 *
*/
declare const instance_from_id: (instance_id: int) => Object
    
    
/**
 * Returns a normalized value considering the given range. This is the opposite of [method lerp].
 *
 * @example 
 * 
 * var middle = lerp(20, 30, 0.75)
 * # `middle` is now 27.5.
 * # Now, we pretend to have forgotten the original ratio and want to get it back.
 * var ratio = inverse_lerp(20, 30, 27.5)
 * # `ratio` is now 0.75.
 * @summary 
 * 
 *
*/
declare const inverse_lerp: (from: float, to: float, weight: float) => float
    
    
/**
 * Returns `true` if `a` and `b` are approximately equal to each other.
 *
 * Here, approximately equal means that `a` and `b` are within a small internal epsilon of each other, which scales with the magnitude of the numbers.
 *
 * Infinity values of the same sign are considered equal.
 *
*/
declare const is_equal_approx: (a: float, b: float) => boolean
    
    
/** Returns whether [code]s[/code] is an infinity value (either positive infinity or negative infinity). */
declare const is_inf: (s: float) => boolean
    
    
/** Returns whether [code]instance[/code] is a valid object (e.g. has not been deleted from memory). */
declare const is_instance_valid: (instance: Object) => boolean
    
    
/** Returns whether [code]s[/code] is a NaN ("Not a Number" or invalid) value. */
declare const is_nan: (s: float) => boolean
    
    
/**
 * Returns `true` if `s` is zero or almost zero.
 *
 * This method is faster than using [method is_equal_approx] with one value as zero.
 *
*/
declare const is_zero_approx: (s: float) => boolean
    
    
/**
 * Returns length of Variant `var`. Length is the character count of String, element count of Array, size of Dictionary, etc.
 *
 * **Note:** Generates a fatal error if Variant can not provide a length.
 *
 * @example 
 * 
 * a = [1, 2, 3, 4]
 * len(a) # Returns 4
 * @summary 
 * 
 *
*/
declare const len: (_var: any) => int
    
    
/**
 * Linearly interpolates between two values by a normalized value. This is the opposite of [method inverse_lerp].
 *
 * If the `from` and `to` arguments are of type [int] or [float], the return value is a [float].
 *
 * If both are of the same vector type ([Vector2], [Vector3] or [Color]), the return value will be of the same type (`lerp` then calls the vector type's `linear_interpolate` method).
 *
 * @example 
 * 
 * lerp(0, 4, 0.75) # Returns 3.0
 * lerp(Vector2(1, 5), Vector2(3, 2), 0.5) # Returns Vector2(2, 3.5)
 * @summary 
 * 
 *
*/
declare const lerp: (from: any, to: any, weight: float) => any
    
    
/**
 * Linearly interpolates between two angles (in radians) by a normalized value.
 *
 * Similar to [method lerp], but interpolates correctly when the angles wrap around [constant @GDScript.TAU].
 *
 * @example 
 * 
 * extends Sprite
 * var elapsed = 0.0
 * func _process(delta):
 *     var min_angle = deg2rad(0.0)
 *     var max_angle = deg2rad(90.0)
 *     rotation = lerp_angle(min_angle, max_angle, elapsed)
 *     elapsed += delta
 * @summary 
 * 
 *
*/
declare const lerp_angle: (from: float, to: float, weight: float) => float
    
    
/**
 * Converts from linear energy to decibels (audio). This can be used to implement volume sliders that behave as expected (since volume isn't linear). Example:
 *
 * @example 
 * 
 * # "Slider" refers to a node that inherits Range such as HSlider or VSlider.
 * # Its range must be configured to go from 0 to 1.
 * # Change the bus name if you'd like to change the volume of a specific bus only.
 * AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Master"), linear2db($Slider.value))
 * @summary 
 * 
 *
*/
declare const linear2db: (nrg: float) => float
    
    
/**
 * Natural logarithm. The amount of time needed to reach a certain level of continuous growth.
 *
 * **Note:** This is not the same as the "log" function on most calculators, which uses a base 10 logarithm.
 *
 * @example 
 * 
 * log(10) # Returns 2.302585
 * @summary 
 * 
 *
 * **Note:** The logarithm of `0` returns `-inf`, while negative values return `-nan`.
 *
*/
declare const log: (s: float) => float
    
    
/**
 * Returns the maximum of two values.
 *
 * @example 
 * 
 * max(1, 2) # Returns 2
 * max(-3.99, -4) # Returns -3.99
 * @summary 
 * 
 *
*/
declare const max: (a: float, b: float) => float
    
    
/**
 * Returns the minimum of two values.
 *
 * @example 
 * 
 * min(1, 2) # Returns 1
 * min(-3.99, -4) # Returns -4
 * @summary 
 * 
 *
*/
declare const min: (a: float, b: float) => float
    
    
/**
 * Moves `from` toward `to` by the `delta` value.
 *
 * Use a negative `delta` value to move away.
 *
 * @example 
 * 
 * move_toward(5, 10, 4) # Returns 9
 * move_toward(10, 5, 4) # Returns 6
 * move_toward(10, 5, -1.5) # Returns 11.5
 * @summary 
 * 
 *
*/
declare const move_toward: (from: float, to: float, delta: float) => float
    
    
/**
 * Returns the nearest equal or larger power of 2 for integer `value`.
 *
 * In other words, returns the smallest value `a` where `a = pow(2, n)` such that `value <= a` for some non-negative integer `n`.
 *
 * @example 
 * 
 * nearest_po2(3) # Returns 4
 * nearest_po2(4) # Returns 4
 * nearest_po2(5) # Returns 8
 * nearest_po2(0) # Returns 0 (this may not be what you expect)
 * nearest_po2(-1) # Returns 0 (this may not be what you expect)
 * @summary 
 * 
 *
 * **WARNING:** Due to the way it is implemented, this function returns `0` rather than `1` for non-positive values of `value` (in reality, 1 is the smallest integer power of 2).
 *
*/
declare const nearest_po2: (value: int) => int
    
    
/**
 * Returns an integer representing the Unicode code point of the given Unicode character `char`.
 *
 * @example 
 * 
 * a = ord("A") # a is 65
 * a = ord("a") # a is 97
 * a = ord("€") # a is 8364
 * @summary 
 * 
 *
 * This is the inverse of [method char].
 *
*/
declare const ord: (char: string) => int
    
    
/**
 * Parse JSON text to a Variant. (Use [method typeof] to check if the Variant's type is what you expect.)
 *
 * **Note:** The JSON specification does not define integer or float types, but only a **number** type. Therefore, parsing a JSON text will convert all numerical values to [float] types.
 *
 * **Note:** JSON objects do not preserve key order like Godot dictionaries, thus, you should not rely on keys being in a certain order if a dictionary is constructed from JSON. In contrast, JSON arrays retain the order of their elements:
 *
 * @example 
 * 
 * var p = JSON.parse('["hello", "world", "!"]')
 * if typeof(p.result) == TYPE_ARRAY:
 *     print(p.result[0]) # Prints "hello"
 * else:
 *     push_error("Unexpected results.")
 * @summary 
 * 
 *
 * See also [JSON] for an alternative way to parse JSON text.
 *
*/
declare const parse_json: (json: string) => any
    
    
/** Converts a 2D point expressed in the polar coordinate system (a distance from the origin [code]r[/code] and an angle [code]th[/code]) to the cartesian coordinate system (X and Y axis). */
declare const polar2cartesian: (r: float, th: float) => Vector2
    
    
/**
 * Returns the integer modulus of `a/b` that wraps equally in positive and negative.
 *
 * @example 
 * 
 * for i in range(-3, 4):
 *     print("%2d %2d %2d" % [i, i % 3, posmod(i, 3)])
 * @summary 
 * 
 *
 * Produces:
 *
 * @example 
 * 
 * -3  0  0
 * -2 -2  1
 * -1 -1  2
 *  0  0  0
 *  1  1  1
 *  2  2  2
 *  3  0  0
 * @summary 
 * 
 *
*/
declare const posmod: (a: int, b: int) => int
    
    
/**
 * Returns the result of `base` raised to the power of `exp`.
 *
 * @example 
 * 
 * pow(2, 5) # Returns 32.0
 * @summary 
 * 
 *
*/
declare const pow: (base: float, exp: float) => float
    
    

    
/** Like [method print], but prints only when used in debug mode. */
declare const print_debug: (...args: any[]) => void
    
    
/**
 * Prints a stack track at code location, only works when running with debugger turned on.
 *
 * Output in the console would look something like this:
 *
 * @example 
 * 
 * Frame 0 - res://test.gd:16 in function '_process'
 * @summary 
 * 
 *
*/
declare const print_stack: () => void
    
    
/**
 * Prints one or more arguments to strings in the best way possible to standard error line.
 *
 * @example 
 * 
 * printerr("prints to stderr")
 * @summary 
 * 
 *
*/
declare const printerr: (...args: any[]) => void
    
    
/**
 * Prints one or more arguments to strings in the best way possible to console. No newline is added at the end.
 *
 * @example 
 * 
 * printraw("A")
 * printraw("B")
 * # Prints AB
 * @summary 
 * 
 *
 * **Note:** Due to limitations with Godot's built-in console, this only prints to the terminal. If you need to print in the editor, use another method, such as [method print].
 *
*/
declare const printraw: (...args: any[]) => void
    
    
/**
 * Prints one or more arguments to the console with a space between each argument.
 *
 * @example 
 * 
 * prints("A", "B", "C") # Prints A B C
 * @summary 
 * 
 *
*/
declare const prints: (...args: any[]) => void
    
    
/**
 * Prints one or more arguments to the console with a tab between each argument.
 *
 * @example 
 * 
 * printt("A", "B", "C") # Prints A       B       C
 * @summary 
 * 
 *
*/
declare const printt: (...args: any[]) => void
    
    
/**
 * Pushes an error message to Godot's built-in debugger and to the OS terminal.
 *
 * @example 
 * 
 * push_error("test error") # Prints "test error" to debugger and terminal as error call
 * @summary 
 * 
 *
 * **Note:** Errors printed this way will not pause project execution. To print an error message and pause project execution in debug builds, use `assert(false, "test error")` instead.
 *
*/
declare const push_error: (message: string) => void
    
    
/**
 * Pushes a warning message to Godot's built-in debugger and to the OS terminal.
 *
 * @example 
 * 
 * push_warning("test warning") # Prints "test warning" to debugger and terminal as warning call
 * @summary 
 * 
 *
*/
declare const push_warning: (message: string) => void
    
    
/**
 * Converts an angle expressed in radians to degrees.
 *
 * @example 
 * 
 * rad2deg(0.523599) # Returns 30.0
 * @summary 
 * 
 *
*/
declare const rad2deg: (rad: float) => float
    
    
/**
 * Random range, any floating point value between `from` and `to`.
 *
 * @example 
 * 
 * prints(rand_range(0, 1), rand_range(0, 1)) # Prints e.g. 0.135591 0.405263
 * @summary 
 * 
 *
*/
declare const rand_range: (from: float, to: float) => float
    
    
/** Random from seed: pass a [code]seed[/code], and an array with both number and new seed is returned. "Seed" here refers to the internal state of the pseudo random number generator. The internal state of the current implementation is 64 bits. */
declare const rand_seed: (seed: int) => any[]
    
    
/**
 * Returns a random floating point value on the interval `[0, 1]`.
 *
 * @example 
 * 
 * randf() # Returns e.g. 0.375671
 * @summary 
 * 
 *
*/
declare const randf: () => float
    
    
/**
 * Returns a random unsigned 32-bit integer. Use remainder to obtain a random value in the interval `[0, N - 1]` (where N is smaller than 2^32).
 *
 * @example 
 * 
 * randi()           # Returns random integer between 0 and 2^32 - 1
 * randi() % 20      # Returns random integer between 0 and 19
 * randi() % 100     # Returns random integer between 0 and 99
 * randi() % 100 + 1 # Returns random integer between 1 and 100
 * @summary 
 * 
 *
*/
declare const randi: () => int
    
    
/**
 * Randomizes the seed (or the internal state) of the random number generator. Current implementation reseeds using a number based on time.
 *
 * @example 
 * 
 * func _ready():
 *     randomize()
 * @summary 
 * 
 *
*/
declare const randomize: () => void
    
    
/**
 * Returns an array with the given range. Range can be 1 argument `N` (0 to `N` - 1), two arguments (`initial`, `final - 1`) or three arguments (`initial`, `final - 1`, `increment`). Returns an empty array if the range isn't valid (e.g. `range(2, 5, -1)` or `range(5, 5, 1)`).
 *
 * Returns an array with the given range. `range()` can have 1 argument N (`0` to `N - 1`), two arguments (`initial`, `final - 1`) or three arguments (`initial`, `final - 1`, `increment`). `increment` can be negative. If `increment` is negative, `final - 1` will become `final + 1`. Also, the initial value must be greater than the final value for the loop to run.
 *
 * @example 
 * 
 * print(range(4))
 * print(range(2, 5))
 * print(range(0, 6, 2))
 * @summary 
 * 
 *
 * Output:
 *
 * @example 
 * 
 * [0, 1, 2, 3]
 * [2, 3, 4]
 * [0, 2, 4]
 * @summary 
 * 
 *
 * To iterate over an [Array] backwards, use:
 *
 * @example 
 * 
 * var array = [3, 6, 9]
 * var i := array.size() - 1
 * while i >= 0:
 *     print(array**)
 *     i -= 1
 * @summary 
 * 
 *
 * Output:
 *
 * @example 
 * 
 * 9
 * 6
 * 3
 * @summary 
 * 
 *
*/
declare const range: (...args: any[]) => any[]
    
    
/**
 * Maps a `value` from range `[istart, istop]` to `[ostart, ostop]`.
 *
 * @example 
 * 
 * range_lerp(75, 0, 100, -1, 1) # Returns 0.5
 * @summary 
 * 
 *
*/
declare const range_lerp: (value: float, istart: float, istop: float, ostart: float, ostop: float) => float
    
    
/**
 * Rounds `s` to the nearest whole number, with halfway cases rounded away from zero.
 *
 * @example 
 * 
 * a = round(2.49) # a is 2.0
 * a = round(2.5)  # a is 3.0
 * a = round(2.51) # a is 3.0
 * @summary 
 * 
 *
 * See also [method floor], [method ceil], [method stepify], and [int].
 *
*/
declare const round: (s: float) => float
    
    
/**
 * Sets seed for the random number generator.
 *
 * @example 
 * 
 * my_seed = "Godot Rocks"
 * seed(my_seed.hash())
 * @summary 
 * 
 *
*/
declare const seed: (seed: int) => void
    
    
/**
 * Returns the sign of `s`: -1 or 1. Returns 0 if `s` is 0.
 *
 * @example 
 * 
 * sign(-6) # Returns -1
 * sign(0)  # Returns 0
 * sign(6)  # Returns 1
 * @summary 
 * 
 *
*/
declare const sign: (s: float) => float
    
    
/**
 * Returns the sine of angle `s` in radians.
 *
 * @example 
 * 
 * sin(0.523599) # Returns 0.5
 * @summary 
 * 
 *
*/
declare const sin: (s: float) => float
    
    
/**
 * Returns the hyperbolic sine of `s`.
 *
 * @example 
 * 
 * a = log(2.0) # Returns 0.693147
 * sinh(a) # Returns 0.75
 * @summary 
 * 
 *
*/
declare const sinh: (s: float) => float
    
    
/**
 * Returns the result of smoothly interpolating the value of `s` between `0` and `1`, based on the where `s` lies with respect to the edges `from` and `to`.
 *
 * The return value is `0` if `s <= from`, and `1` if `s >= to`. If `s` lies between `from` and `to`, the returned value follows an S-shaped curve that maps `s` between `0` and `1`.
 *
 * This S-shaped curve is the cubic Hermite interpolator, given by `f(y) = 3*y^2 - 2*y^3` where `y = (x-from) / (to-from)`.
 *
 * @example 
 * 
 * smoothstep(0, 2, -5.0) # Returns 0.0
 * smoothstep(0, 2, 0.5) # Returns 0.15625
 * smoothstep(0, 2, 1.0) # Returns 0.5
 * smoothstep(0, 2, 2.0) # Returns 1.0
 * @summary 
 * 
 *
 * Compared to [method ease] with a curve value of `-1.6521`, [method smoothstep] returns the smoothest possible curve with no sudden changes in the derivative. If you need to perform more advanced transitions, use [Tween] or [AnimationPlayer].
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/3.4/img/smoothstep_ease_comparison.png]Comparison between smoothstep() and ease(x, -1.6521) return values[/url]
 *
*/
declare const smoothstep: (from: float, to: float, s: float) => float
    
    
/**
 * Returns the square root of `s`, where `s` is a non-negative number.
 *
 * @example 
 * 
 * sqrt(9) # Returns 3
 * @summary 
 * 
 *
 * **Note:** Negative values of `s` return NaN. If you need negative inputs, use `System.Numerics.Complex` in C#.
 *
*/
declare const sqrt: (s: float) => float
    
    
/**
 * Returns the position of the first non-zero digit, after the decimal point. Note that the maximum return value is 10, which is a design decision in the implementation.
 *
 * @example 
 * 
 * n = step_decimals(5)           # n is 0
 * n = step_decimals(1.0005)      # n is 4
 * n = step_decimals(0.000000005) # n is 9
 * @summary 
 * 
 *
*/
declare const step_decimals: (step: float) => int
    
    
/**
 * Snaps float value `s` to a given `step`. This can also be used to round a floating point number to an arbitrary number of decimals.
 *
 * @example 
 * 
 * stepify(100, 32) # Returns 96.0
 * stepify(3.14159, 0.01) # Returns 3.14
 * @summary 
 * 
 *
 * See also [method ceil], [method floor], [method round], and [int].
 *
*/
declare const stepify: (s: float, step: float) => float
    
    
/**
 * Converts one or more arguments of any type to string in the best way possible.
 *
 * @example 
 * 
 * var a = [10, 20, 30]
 * var b = str(a);
 * len(a) # Returns 3
 * len(b) # Returns 12
 * @summary 
 * 
 *
*/
declare const str: (...args: any[]) => string
    
    
/**
 * Converts a formatted string that was returned by [method var2str] to the original value.
 *
 * @example 
 * 
 * a = '{ "a": 1, "b": 2 }'
 * b = str2var(a)
 * print(b["a"]) # Prints 1
 * @summary 
 * 
 *
*/
declare const str2var: (string: string) => any
    
    
/**
 * Returns the tangent of angle `s` in radians.
 *
 * @example 
 * 
 * tan(deg2rad(45)) # Returns 1
 * @summary 
 * 
 *
*/
declare const tan: (s: float) => float
    
    
/**
 * Returns the hyperbolic tangent of `s`.
 *
 * @example 
 * 
 * a = log(2.0) # a is 0.693147
 * b = tanh(a)  # b is 0.6
 * @summary 
 * 
 *
*/
declare const tanh: (s: float) => float
    
    
/**
 * Converts a [Variant] `var` to JSON text and return the result. Useful for serializing data to store or send over the network.
 *
 * @example 
 * 
 * # Both numbers below are integers.
 * a = { "a": 1, "b": 2 }
 * b = to_json(a)
 * print(b) # {"a":1, "b":2}
 * # Both numbers above are floats, even if they display without any decimal places.
 * @summary 
 * 
 *
 * **Note:** The JSON specification does not define integer or float types, but only a **number** type. Therefore, converting a [Variant] to JSON text will convert all numerical values to [float] types.
 *
 * See also [JSON] for an alternative way to convert a [Variant] to JSON text.
 *
*/
declare const to_json: (_var: any) => string
    
    
/**
 * Returns whether the given class exists in [ClassDB].
 *
 * @example 
 * 
 * type_exists("Sprite") # Returns true
 * type_exists("Variant") # Returns false
 * @summary 
 * 
 *
*/
declare const type_exists: (type: string) => boolean
    
    

    
/**
 * Checks that `json` is valid JSON data. Returns an empty string if valid, or an error message otherwise.
 *
 * @example 
 * 
 * j = to_json([1, 2, 3])
 * v = validate_json(j)
 * if not v:
 *     print("Valid JSON.")
 * else:
 *     push_error("Invalid JSON: " + v)
 * @summary 
 * 
 *
*/
declare const validate_json: (json: string) => string
    
    
/** Encodes a variable value to a byte array. When [code]full_objects[/code] is [code]true[/code] encoding objects is allowed (and can potentially include code). */
declare const var2bytes: (_var: any, full_objects?: boolean) => PoolByteArray
    
    
/**
 * Converts a Variant `var` to a formatted string that can later be parsed using [method str2var].
 *
 * @example 
 * 
 * a = { "a": 1, "b": 2 }
 * print(var2str(a))
 * @summary 
 * 
 *
 * prints
 *
 * @example 
 * 
 * {
 * "a": 1,
 * "b": 2
 * }
 * @summary 
 * 
 *
*/
declare const var2str: (_var: any) => string
    
    
/**
 * Returns a weak reference to an object.
 *
 * A weak reference to an object is not enough to keep the object alive: when the only remaining references to a referent are weak references, garbage collection is free to destroy the referent and reuse its memory for something else. However, until the object is actually destroyed the weak reference may return the object even if there are no strong references to it.
 *
*/
declare const weakref: (obj: Object) => WeakRef
    
    
/**
 * Wraps float `value` between `min` and `max`.
 *
 * Usable for creating loop-alike behavior or infinite surfaces.
 *
 * @example 
 * 
 * # Infinite loop between 5.0 and 9.9
 * value = wrapf(value + 0.1, 5.0, 10.0)
 * @summary 
 * 
 *
 * @example 
 * 
 * # Infinite rotation (in radians)
 * angle = wrapf(angle + 0.1, 0.0, TAU)
 * @summary 
 * 
 *
 * @example 
 * 
 * # Infinite rotation (in radians)
 * angle = wrapf(angle + 0.1, -PI, PI)
 * @summary 
 * 
 *
 * **Note:** If `min` is `0`, this is equivalent to [method fposmod], so prefer using that instead.
 *
 * `wrapf` is more flexible than using the [method fposmod] approach by giving the user control over the minimum value.
 *
*/
declare const wrapf: (value: float, min: float, max: float) => float
    
    
/**
 * Wraps integer `value` between `min` and `max`.
 *
 * Usable for creating loop-alike behavior or infinite surfaces.
 *
 * @example 
 * 
 * # Infinite loop between 5 and 9
 * frame = wrapi(frame + 1, 5, 10)
 * @summary 
 * 
 *
 * @example 
 * 
 * # result is -2
 * var result = wrapi(-6, -5, -1)
 * @summary 
 * 
 *
 * **Note:** If `min` is `0`, this is equivalent to [method posmod], so prefer using that instead.
 *
 * `wrapi` is more flexible than using the [method posmod] approach by giving the user control over the minimum value.
 *
*/
declare const wrapi: (value: int, min: int, max: int) => int
    
    

    