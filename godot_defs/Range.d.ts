
/**
 * Range is a base class for [Control] nodes that change a floating-point **value** between a **minimum** and a **maximum**, using **step** and **page**, for example a [ScrollBar].
 *
*/
declare class Range extends Control {

  
/**
 * Range is a base class for [Control] nodes that change a floating-point **value** between a **minimum** and a **maximum**, using **step** and **page**, for example a [ScrollBar].
 *
*/
  "new"(): Range;
  static "new"(): Range;



/** If [code]true[/code], [member value] may be greater than [member max_value]. */
allow_greater: boolean;

/** If [code]true[/code], [member value] may be less than [member min_value]. */
allow_lesser: boolean;

/** If [code]true[/code], and [code]min_value[/code] is greater than 0, [code]value[/code] will be represented exponentially rather than linearly. */
exp_edit: boolean;

/** Maximum value. Range is clamped if [code]value[/code] is greater than [code]max_value[/code]. */
max_value: float;

/** Minimum value. Range is clamped if [code]value[/code] is less than [code]min_value[/code]. */
min_value: float;

/** Page size. Used mainly for [ScrollBar]. ScrollBar's length is its size multiplied by [code]page[/code] over the difference between [code]min_value[/code] and [code]max_value[/code]. */
page: float;

/** The value mapped between 0 and 1. */
ratio: float;

/** If [code]true[/code], [code]value[/code] will always be rounded to the nearest integer. */
rounded: boolean;

/** If greater than 0, [code]value[/code] will always be rounded to a multiple of [code]step[/code]. If [code]rounded[/code] is also [code]true[/code], [code]value[/code] will first be rounded to a multiple of [code]step[/code] then rounded to the nearest integer. */
step: float;

/** Range's current value. */
value: float;

/** Binds two ranges together along with any ranges previously grouped with either of them. When any of range's member variables change, it will share the new value with all other ranges in its group. */
share(_with: Node): void;

/** Stops range from sharing its member variables with any other. */
unshare(): void;

  connect<T extends SignalsOf<Range>, U extends Node>(signal: T, node: U, method: keyof U): number;





  /**
 * Emitted when [member min_value], [member max_value], [member page], or [member step] change.
 *
*/
changed: Signal<() => void>

/**
 * Emitted when [member value] changes.
 *
*/
value_changed: Signal<(value: float) => void>

}
