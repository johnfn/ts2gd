
/**
 * Boolean is a built-in type. There are two boolean values: `true` and `false`. You can think of it as an switch with on or off (1 or 0) setting. Booleans are used in programming for logic in condition statements, like `if` statements.
 *
 * Booleans can be directly used in `if` statements. The code below demonstrates this on the `if can_shoot:` line. You don't need to use `== true`, you only need `if can_shoot:`. Similarly, use `if not can_shoot:` rather than `== false`.
 *
 * @example 
 * 
 * var can_shoot = true
 * func shoot():
 *     if can_shoot:
 *         pass # Perform shooting actions here.
 * @summary 
 * 
 *
 * The following code will only create a bullet if both conditions are met: action "shoot" is pressed and if `can_shoot` is `true`.
 *
 * **Note:** `Input.is_action_pressed("shoot")` is also a boolean that is `true` when "shoot" is pressed and `false` when "shoot" isn't pressed.
 *
 * @example 
 * 
 * var can_shoot = true
 * func shoot():
 *     if can_shoot and Input.is_action_pressed("shoot"):
 *         create_bullet()
 * @summary 
 * 
 *
 * The following code will set `can_shoot` to `false` and start a timer. This will prevent player from shooting until the timer runs out. Next `can_shoot` will be set to `true` again allowing player to shoot once again.
 *
 * @example 
 * 
 * var can_shoot = true
 * onready var cool_down = $CoolDownTimer
 * func shoot():
 *     if can_shoot and Input.is_action_pressed("shoot"):
 *         create_bullet()
 *         can_shoot = false
 *         cool_down.start()
 * func _on_CoolDownTimer_timeout():
 *     can_shoot = true
 * @summary 
 * 
 *
*/
declare class bool {

  
/**
 * Boolean is a built-in type. There are two boolean values: `true` and `false`. You can think of it as an switch with on or off (1 or 0) setting. Booleans are used in programming for logic in condition statements, like `if` statements.
 *
 * Booleans can be directly used in `if` statements. The code below demonstrates this on the `if can_shoot:` line. You don't need to use `== true`, you only need `if can_shoot:`. Similarly, use `if not can_shoot:` rather than `== false`.
 *
 * @example 
 * 
 * var can_shoot = true
 * func shoot():
 *     if can_shoot:
 *         pass # Perform shooting actions here.
 * @summary 
 * 
 *
 * The following code will only create a bullet if both conditions are met: action "shoot" is pressed and if `can_shoot` is `true`.
 *
 * **Note:** `Input.is_action_pressed("shoot")` is also a boolean that is `true` when "shoot" is pressed and `false` when "shoot" isn't pressed.
 *
 * @example 
 * 
 * var can_shoot = true
 * func shoot():
 *     if can_shoot and Input.is_action_pressed("shoot"):
 *         create_bullet()
 * @summary 
 * 
 *
 * The following code will set `can_shoot` to `false` and start a timer. This will prevent player from shooting until the timer runs out. Next `can_shoot` will be set to `true` again allowing player to shoot once again.
 *
 * @example 
 * 
 * var can_shoot = true
 * onready var cool_down = $CoolDownTimer
 * func shoot():
 *     if can_shoot and Input.is_action_pressed("shoot"):
 *         create_bullet()
 *         can_shoot = false
 *         cool_down.start()
 * func _on_CoolDownTimer_timeout():
 *     can_shoot = true
 * @summary 
 * 
 *
*/

  constructor(from: int);
  constructor(from: float);
  constructor(from: string);
  static "new"(): bool;










  connect<T extends SignalsOf<bool>, U extends Node>(signal: T, node: U, method: keyof U): number;





  
}
