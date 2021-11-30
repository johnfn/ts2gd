
/**
 * The Time singleton allows converting time between various formats and also getting time information from the system.
 *
 * This class conforms with as many of the ISO 8601 standards as possible. All dates follow the Proleptic Gregorian calendar. As such, the day before `1582-10-15` is `1582-10-14`, not `1582-10-04`. The year before 1 AD (aka 1 BC) is number `0`, with the year before that (2 BC) being `-1`, etc.
 *
 * Conversion methods assume "the same timezone", and do not handle timezone conversions or DST automatically. Leap seconds are also not handled, they must be done manually if desired. Suffixes such as "Z" are not handled, you need to strip them away manually.
 *
 * When getting time information from the system, the time can either be in the local timezone or UTC depending on the `utc` parameter. However, the [method get_unix_time_from_system] method always returns the time in UTC.
 *
 * **Important:** The `_from_system` methods use the system clock that the user can manually set. **Never use** this method for precise time calculation since its results are subject to automatic adjustments by the user or the operating system. **Always use** [method get_ticks_usec] or [method get_ticks_msec] for precise time calculation instead, since they are guaranteed to be monotonic (i.e. never decrease).
 *
*/
declare class TimeClass extends Object  {

  
/**
 * The Time singleton allows converting time between various formats and also getting time information from the system.
 *
 * This class conforms with as many of the ISO 8601 standards as possible. All dates follow the Proleptic Gregorian calendar. As such, the day before `1582-10-15` is `1582-10-14`, not `1582-10-04`. The year before 1 AD (aka 1 BC) is number `0`, with the year before that (2 BC) being `-1`, etc.
 *
 * Conversion methods assume "the same timezone", and do not handle timezone conversions or DST automatically. Leap seconds are also not handled, they must be done manually if desired. Suffixes such as "Z" are not handled, you need to strip them away manually.
 *
 * When getting time information from the system, the time can either be in the local timezone or UTC depending on the `utc` parameter. However, the [method get_unix_time_from_system] method always returns the time in UTC.
 *
 * **Important:** The `_from_system` methods use the system clock that the user can manually set. **Never use** this method for precise time calculation since its results are subject to automatic adjustments by the user or the operating system. **Always use** [method get_ticks_usec] or [method get_ticks_msec] for precise time calculation instead, since they are guaranteed to be monotonic (i.e. never decrease).
 *
*/
  new(): TimeClass; 
  static "new"(): TimeClass 



/**
 * Returns the current date as a dictionary of keys: `year`, `month`, `day`, `weekday`, and `dst` (Daylight Savings Time).
 *
 * The returned values are in the system's local time when `utc` is false, otherwise they are in UTC.
 *
*/
get_date_dict_from_system(utc?: boolean): Dictionary<any, any>;

/** Converts the given Unix timestamp to a dictionary of keys: [code]year[/code], [code]month[/code], [code]day[/code], and [code]weekday[/code]. */
get_date_dict_from_unix_time(unix_time_val: int): Dictionary<any, any>;

/**
 * Returns the current date as an ISO 8601 date string (YYYY-MM-DD).
 *
 * The returned values are in the system's local time when `utc` is false, otherwise they are in UTC.
 *
*/
get_date_string_from_system(utc?: boolean): string;

/** Converts the given Unix timestamp to an ISO 8601 date string (YYYY-MM-DD). */
get_date_string_from_unix_time(unix_time_val: int): string;

/**
 * Converts the given ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS) to a dictionary of keys: `year`, `month`, `day`, `weekday`, `hour`, `minute`, and `second`.
 *
 * If `weekday` is false, then the `weekday` entry is excluded (the calculation is relatively expensive).
 *
*/
get_datetime_dict_from_string(datetime: string, weekday: boolean): Dictionary<any, any>;

/** Returns the current date as a dictionary of keys: [code]year[/code], [code]month[/code], [code]day[/code], [code]weekday[/code], [code]hour[/code], [code]minute[/code], and [code]second[/code]. */
get_datetime_dict_from_system(utc?: boolean): Dictionary<any, any>;

/**
 * Converts the given Unix timestamp to a dictionary of keys: `year`, `month`, `day`, and `weekday`.
 *
 * The returned Dictionary's values will be the same as the [method get_datetime_dict_from_system] if the Unix timestamp is the current time, with the exception of Daylight Savings Time as it cannot be determined from the epoch.
 *
*/
get_datetime_dict_from_unix_time(unix_time_val: int): Dictionary<any, any>;

/**
 * Converts the given dictionary of keys to an ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS).
 *
 * The given dictionary can be populated with the following keys: `year`, `month`, `day`, `hour`, `minute`, and `second`. Any other entries (including `dst`) are ignored.
 *
 * If the dictionary is empty, `0` is returned. If some keys are omitted, they default to the equivalent values for the Unix epoch timestamp 0 (1970-01-01 at 00:00:00).
 *
 * If `use_space` is true, use a space instead of the letter T in the middle.
 *
*/
get_datetime_string_from_dict(datetime: Dictionary<any, any>, use_space: boolean): string;

/**
 * Returns the current date and time as an ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS).
 *
 * The returned values are in the system's local time when `utc` is false, otherwise they are in UTC.
 *
 * If `use_space` is true, use a space instead of the letter T in the middle.
 *
*/
get_datetime_string_from_system(utc?: boolean, use_space?: boolean): string;

/**
 * Converts the given Unix timestamp to an ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS).
 *
 * If `use_space` is true, use a space instead of the letter T in the middle.
 *
*/
get_datetime_string_from_unix_time(unix_time_val: int, use_space?: boolean): string;

/**
 * Returns the amount of time passed in milliseconds since the engine started.
 *
 * Will always be positive or 0 and uses a 64-bit value (it will wrap after roughly 500 million years).
 *
*/
get_ticks_msec(): int;

/**
 * Returns the amount of time passed in microseconds since the engine started.
 *
 * Will always be positive or 0 and uses a 64-bit value (it will wrap after roughly half a million years).
 *
*/
get_ticks_usec(): int;

/**
 * Returns the current time as a dictionary of keys: `hour`, `minute`, and `second`.
 *
 * The returned values are in the system's local time when `utc` is false, otherwise they are in UTC.
 *
*/
get_time_dict_from_system(utc?: boolean): Dictionary<any, any>;

/** Converts the given time to a dictionary of keys: [code]hour[/code], [code]minute[/code], and [code]second[/code]. */
get_time_dict_from_unix_time(unix_time_val: int): Dictionary<any, any>;

/**
 * Returns the current time as an ISO 8601 time string (HH:MM:SS).
 *
 * The returned values are in the system's local time when `utc` is false, otherwise they are in UTC.
 *
*/
get_time_string_from_system(utc?: boolean): string;

/** Converts the given Unix timestamp to an ISO 8601 time string (HH:MM:SS). */
get_time_string_from_unix_time(unix_time_val: int): string;

/** Returns the current time zone as a dictionary of keys: [code]bias[/code] and [code]name[/code]. The [code]bias[/code] value is the offset from UTC in minutes, since not all time zones are multiples of an hour from UTC. */
get_time_zone_from_system(): Dictionary<any, any>;

/**
 * Converts a dictionary of time values to a Unix timestamp.
 *
 * The given dictionary can be populated with the following keys: `year`, `month`, `day`, `hour`, `minute`, and `second`. Any other entries (including `dst`) are ignored.
 *
 * If the dictionary is empty, `0` is returned. If some keys are omitted, they default to the equivalent values for the Unix epoch timestamp 0 (1970-01-01 at 00:00:00).
 *
 * You can pass the output from [method get_datetime_dict_from_unix_time] directly into this function and get the same as what was put in.
 *
 * **Note:** Unix timestamps are often in UTC. This method does not do any timezone conversion, so the timestamp will be in the same timezone as the given datetime dictionary.
 *
*/
get_unix_time_from_datetime_dict(datetime: Dictionary<any, any>): int;

/**
 * Converts the given ISO 8601 date and/or time string to a Unix timestamp. The string can contain a date only, a time only, or both.
 *
 * **Note:** Unix timestamps are often in UTC. This method does not do any timezone conversion, so the timestamp will be in the same timezone as the given datetime string.
 *
*/
get_unix_time_from_datetime_string(datetime: string): int;

/** Returns the current Unix timestamp in seconds based on the system time in UTC. This method is implemented by the operating system and always returns the time in UTC. */
get_unix_time_from_system(): float;

  connect<T extends SignalsOf<TimeClass>>(signal: T, method: SignalFunction<TimeClass[T]>): number;



/**
 * The month of January, represented numerically as `01`.
 *
*/
static MONTH_JANUARY: any;

/**
 * The month of February, represented numerically as `02`.
 *
*/
static MONTH_FEBRUARY: any;

/**
 * The month of March, represented numerically as `03`.
 *
*/
static MONTH_MARCH: any;

/**
 * The month of April, represented numerically as `04`.
 *
*/
static MONTH_APRIL: any;

/**
 * The month of May, represented numerically as `05`.
 *
*/
static MONTH_MAY: any;

/**
 * The month of June, represented numerically as `06`.
 *
*/
static MONTH_JUNE: any;

/**
 * The month of July, represented numerically as `07`.
 *
*/
static MONTH_JULY: any;

/**
 * The month of August, represented numerically as `08`.
 *
*/
static MONTH_AUGUST: any;

/**
 * The month of September, represented numerically as `09`.
 *
*/
static MONTH_SEPTEMBER: any;

/**
 * The month of October, represented numerically as `10`.
 *
*/
static MONTH_OCTOBER: any;

/**
 * The month of November, represented numerically as `11`.
 *
*/
static MONTH_NOVEMBER: any;

/**
 * The month of December, represented numerically as `12`.
 *
*/
static MONTH_DECEMBER: any;

/**
 * The day of the week Sunday, represented numerically as `0`.
 *
*/
static WEEKDAY_SUNDAY: any;

/**
 * The day of the week Monday, represented numerically as `1`.
 *
*/
static WEEKDAY_MONDAY: any;

/**
 * The day of the week Tuesday, represented numerically as `2`.
 *
*/
static WEEKDAY_TUESDAY: any;

/**
 * The day of the week Wednesday, represented numerically as `3`.
 *
*/
static WEEKDAY_WEDNESDAY: any;

/**
 * The day of the week Thursday, represented numerically as `4`.
 *
*/
static WEEKDAY_THURSDAY: any;

/**
 * The day of the week Friday, represented numerically as `5`.
 *
*/
static WEEKDAY_FRIDAY: any;

/**
 * The day of the week Saturday, represented numerically as `6`.
 *
*/
static WEEKDAY_SATURDAY: any;



}

