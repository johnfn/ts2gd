
/**
 * Base class for all UI-related nodes. [Control] features a bounding rectangle that defines its extents, an anchor position relative to its parent control or the current viewport, and margins that represent an offset to the anchor. The margins update automatically when the node, any of its parents, or the screen size change.
 *
 * For more information on Godot's UI system, anchors, margins, and containers, see the related tutorials in the manual. To build flexible UIs, you'll need a mix of UI elements that inherit from [Control] and [Container] nodes.
 *
 * **User Interface nodes and input**
 *
 * Godot sends input events to the scene's root node first, by calling [method Node._input]. [method Node._input] forwards the event down the node tree to the nodes under the mouse cursor, or on keyboard focus. To do so, it calls [method MainLoop._input_event]. Call [method accept_event] so no other node receives the event. Once you accepted an input, it becomes handled so [method Node._unhandled_input] will not process it.
 *
 * Only one [Control] node can be in keyboard focus. Only the node in focus will receive keyboard events. To get the focus, call [method grab_focus]. [Control] nodes lose focus when another node grabs it, or if you hide the node in focus.
 *
 * Sets [member mouse_filter] to [constant MOUSE_FILTER_IGNORE] to tell a [Control] node to ignore mouse or touch events. You'll need it if you place an icon on top of a button.
 *
 * [Theme] resources change the Control's appearance. If you change the [Theme] on a [Control] node, it affects all of its children. To override some of the theme's parameters, call one of the `add_*_override` methods, like [method add_font_override]. You can override the theme with the inspector.
 *
 * **Note:** Theme items are **not** [Object] properties. This means you can't access their values using [method Object.get] and [method Object.set]. Instead, use [method get_color], [method get_constant], [method get_font], [method get_icon], [method get_stylebox], and the `add_*_override` methods provided by this class.
 *
*/
declare class Control extends CanvasItem {

  
/**
 * Base class for all UI-related nodes. [Control] features a bounding rectangle that defines its extents, an anchor position relative to its parent control or the current viewport, and margins that represent an offset to the anchor. The margins update automatically when the node, any of its parents, or the screen size change.
 *
 * For more information on Godot's UI system, anchors, margins, and containers, see the related tutorials in the manual. To build flexible UIs, you'll need a mix of UI elements that inherit from [Control] and [Container] nodes.
 *
 * **User Interface nodes and input**
 *
 * Godot sends input events to the scene's root node first, by calling [method Node._input]. [method Node._input] forwards the event down the node tree to the nodes under the mouse cursor, or on keyboard focus. To do so, it calls [method MainLoop._input_event]. Call [method accept_event] so no other node receives the event. Once you accepted an input, it becomes handled so [method Node._unhandled_input] will not process it.
 *
 * Only one [Control] node can be in keyboard focus. Only the node in focus will receive keyboard events. To get the focus, call [method grab_focus]. [Control] nodes lose focus when another node grabs it, or if you hide the node in focus.
 *
 * Sets [member mouse_filter] to [constant MOUSE_FILTER_IGNORE] to tell a [Control] node to ignore mouse or touch events. You'll need it if you place an icon on top of a button.
 *
 * [Theme] resources change the Control's appearance. If you change the [Theme] on a [Control] node, it affects all of its children. To override some of the theme's parameters, call one of the `add_*_override` methods, like [method add_font_override]. You can override the theme with the inspector.
 *
 * **Note:** Theme items are **not** [Object] properties. This means you can't access their values using [method Object.get] and [method Object.set]. Instead, use [method get_color], [method get_constant], [method get_font], [method get_icon], [method get_stylebox], and the `add_*_override` methods provided by this class.
 *
*/
  "new"(): Control;
  static "new"(): Control;



/** Anchors the bottom edge of the node to the origin, the center, or the end of its parent control. It changes how the bottom margin updates when the node moves or changes size. You can use one of the [enum Anchor] constants for convenience. */
anchor_bottom: float;

/** Anchors the left edge of the node to the origin, the center or the end of its parent control. It changes how the left margin updates when the node moves or changes size. You can use one of the [enum Anchor] constants for convenience. */
anchor_left: float;

/** Anchors the right edge of the node to the origin, the center or the end of its parent control. It changes how the right margin updates when the node moves or changes size. You can use one of the [enum Anchor] constants for convenience. */
anchor_right: float;

/** Anchors the top edge of the node to the origin, the center or the end of its parent control. It changes how the top margin updates when the node moves or changes size. You can use  one of the [enum Anchor] constants for convenience. */
anchor_top: float;

/** The focus access mode for the control (None, Click or All). Only one Control can be focused at the same time, and it will receive keyboard signals. */
focus_mode: int;

/** Tells Godot which node it should give keyboard focus to if the user presses the down arrow on the keyboard or down on a gamepad by default. You can change the key by editing the [code]ui_down[/code] input action. The node must be a [Control]. If this property is not set, Godot will give focus to the closest [Control] to the bottom of this one. */
focus_neighbour_bottom: NodePathType;

/** Tells Godot which node it should give keyboard focus to if the user presses the left arrow on the keyboard or left on a gamepad by default. You can change the key by editing the [code]ui_left[/code] input action. The node must be a [Control]. If this property is not set, Godot will give focus to the closest [Control] to the left of this one. */
focus_neighbour_left: NodePathType;

/** Tells Godot which node it should give keyboard focus to if the user presses the right arrow on the keyboard or right on a gamepad  by default. You can change the key by editing the [code]ui_right[/code] input action. The node must be a [Control]. If this property is not set, Godot will give focus to the closest [Control] to the bottom of this one. */
focus_neighbour_right: NodePathType;

/** Tells Godot which node it should give keyboard focus to if the user presses the top arrow on the keyboard or top on a gamepad by default. You can change the key by editing the [code]ui_top[/code] input action. The node must be a [Control]. If this property is not set, Godot will give focus to the closest [Control] to the bottom of this one. */
focus_neighbour_top: NodePathType;

/**
 * Tells Godot which node it should give keyboard focus to if the user presses Tab on a keyboard by default. You can change the key by editing the `ui_focus_next` input action.
 *
 * If this property is not set, Godot will select a "best guess" based on surrounding nodes in the scene tree.
 *
*/
focus_next: NodePathType;

/**
 * Tells Godot which node it should give keyboard focus to if the user presses Shift+Tab on a keyboard by default. You can change the key by editing the `ui_focus_prev` input action.
 *
 * If this property is not set, Godot will select a "best guess" based on surrounding nodes in the scene tree.
 *
*/
focus_previous: NodePathType;

/** Controls the direction on the horizontal axis in which the control should grow if its horizontal minimum size is changed to be greater than its current size, as the control always has to be at least the minimum size. */
grow_horizontal: int;

/** Controls the direction on the vertical axis in which the control should grow if its vertical minimum size is changed to be greater than its current size, as the control always has to be at least the minimum size. */
grow_vertical: int;

/** Changes the tooltip text. The tooltip appears when the user's mouse cursor stays idle over this control for a few moments, provided that the [member mouse_filter] property is not [constant MOUSE_FILTER_IGNORE]. You can change the time required for the tooltip to appear with [code]gui/timers/tooltip_delay_sec[/code] option in Project Settings. */
hint_tooltip: string;

/**
 * Distance between the node's bottom edge and its parent control, based on [member anchor_bottom].
 *
 * Margins are often controlled by one or multiple parent [Container] nodes, so you should not modify them manually if your node is a direct child of a [Container]. Margins update automatically when you move or resize the node.
 *
*/
margin_bottom: float;

/**
 * Distance between the node's left edge and its parent control, based on [member anchor_left].
 *
 * Margins are often controlled by one or multiple parent [Container] nodes, so you should not modify them manually if your node is a direct child of a [Container]. Margins update automatically when you move or resize the node.
 *
*/
margin_left: float;

/**
 * Distance between the node's right edge and its parent control, based on [member anchor_right].
 *
 * Margins are often controlled by one or multiple parent [Container] nodes, so you should not modify them manually if your node is a direct child of a [Container]. Margins update automatically when you move or resize the node.
 *
*/
margin_right: float;

/**
 * Distance between the node's top edge and its parent control, based on [member anchor_top].
 *
 * Margins are often controlled by one or multiple parent [Container] nodes, so you should not modify them manually if your node is a direct child of a [Container]. Margins update automatically when you move or resize the node.
 *
*/
margin_top: float;

/**
 * The default cursor shape for this control. Useful for Godot plugins and applications or games that use the system's mouse cursors.
 *
 * **Note:** On Linux, shapes may vary depending on the cursor theme of the system.
 *
*/
mouse_default_cursor_shape: int;

/** Controls whether the control will be able to receive mouse button input events through [method _gui_input] and how these events should be handled. Also controls whether the control can receive the [signal mouse_entered], and [signal mouse_exited] signals. See the constants to learn what each does. */
mouse_filter: int;

/** Enables whether rendering of [CanvasItem] based children should be clipped to this control's rectangle. If [code]true[/code], parts of a child which would be visibly outside of this control's rectangle will not be rendered. */
rect_clip_content: boolean;

/** The node's global position, relative to the world (usually to the top-left corner of the window). */
rect_global_position: Vector2;

/** The minimum size of the node's bounding rectangle. If you set it to a value greater than (0, 0), the node's bounding rectangle will always have at least this size, even if its content is smaller. If it's set to (0, 0), the node sizes automatically to fit its content, be it a texture or child nodes. */
rect_min_size: Vector2;

/** By default, the node's pivot is its top-left corner. When you change its [member rect_scale], it will scale around this pivot. Set this property to [member rect_size] / 2 to center the pivot in the node's rectangle. */
rect_pivot_offset: Vector2;

/** The node's position, relative to its parent. It corresponds to the rectangle's top-left corner. The property is not affected by [member rect_pivot_offset]. */
rect_position: Vector2;

/** The node's rotation around its pivot, in degrees. See [member rect_pivot_offset] to change the pivot's position. */
rect_rotation: float;

/**
 * The node's scale, relative to its [member rect_size]. Change this property to scale the node around its [member rect_pivot_offset]. The Control's [member hint_tooltip] will also scale according to this value.
 *
 * **Note:** This property is mainly intended to be used for animation purposes. Text inside the Control will look pixelated or blurry when the Control is scaled. To support multiple resolutions in your project, use an appropriate viewport stretch mode as described in the [url=https://docs.godotengine.org/en/latest/tutorials/viewports/multiple_resolutions.html]documentation[/url] instead of scaling Controls individually.
 *
 * **Note:** If the Control node is a child of a [Container] node, the scale will be reset to `Vector2(1, 1)` when the scene is instanced. To set the Control's scale when it's instanced, wait for one frame using `yield(get_tree(), "idle_frame")` then set its [member rect_scale] property.
 *
*/
rect_scale: Vector2;

/** The size of the node's bounding rectangle, in pixels. [Container] nodes update this property automatically. */
rect_size: Vector2;

/** Tells the parent [Container] nodes how they should resize and place the node on the X axis. Use one of the [enum SizeFlags] constants to change the flags. See the constants to learn what each does. */
size_flags_horizontal: int;

/** If the node and at least one of its neighbours uses the [constant SIZE_EXPAND] size flag, the parent [Container] will let it take more or less space depending on this property. If this node has a stretch ratio of 2 and its neighbour a ratio of 1, this node will take two thirds of the available space. */
size_flags_stretch_ratio: float;

/** Tells the parent [Container] nodes how they should resize and place the node on the Y axis. Use one of the [enum SizeFlags] constants to change the flags. See the constants to learn what each does. */
size_flags_vertical: int;

/** Changing this property replaces the current [Theme] resource this node and all its [Control] children use. */
theme: Theme;

/**
 * Virtual method to be implemented by the user. Returns whether [method _gui_input] should not be called for children controls outside this control's rectangle. Input will be clipped to the Rect of this [Control]. Similar to [member rect_clip_content], but doesn't affect visibility.
 *
 * If not overridden, defaults to `false`.
 *
*/
protected _clips_input(): boolean;

/**
 * Virtual method to be implemented by the user. Returns the minimum size for this control. Alternative to [member rect_min_size] for controlling minimum size via code. The actual minimum size will be the max value of these two (in each axis separately).
 *
 * If not overridden, defaults to [constant Vector2.ZERO].
 *
*/
protected _get_minimum_size(): Vector2;

/**
 * Virtual method to be implemented by the user. Use this method to process and accept inputs on UI elements. See [method accept_event].
 *
 * Example: clicking a control.
 *
 * @example 
 * 
 * func _gui_input(event):
 *     if event is InputEventMouseButton:
 *         if event.button_index == BUTTON_LEFT and event.pressed:
 *             print("I've been clicked D:")
 * @summary 
 * 
 *
 * The event won't trigger if:
 *
 * * clicking outside the control (see [method has_point]);
 *
 * * control has [member mouse_filter] set to [constant MOUSE_FILTER_IGNORE];
 *
 * * control is obstructed by another [Control] on top of it, which doesn't have [member mouse_filter] set to [constant MOUSE_FILTER_IGNORE];
 *
 * * control's parent has [member mouse_filter] set to [constant MOUSE_FILTER_STOP] or has accepted the event;
 *
 * * it happens outside parent's rectangle and the parent has either [member rect_clip_content] or [method _clips_input] enabled.
 *
*/
protected _gui_input(event: InputEvent): void;

/**
 * Virtual method to be implemented by the user. Returns a [Control] node that should be used as a tooltip instead of the default one. Use `for_text` parameter to determine what text the tooltip should contain (likely the contents of [member hint_tooltip]).
 *
 * The returned node must be of type [Control] or Control-derieved. It can have child nodes of any type. It is freed when the tooltip disappears, so make sure you always provide a new instance, not e.g. a node from scene. When `null` or non-Control node is returned, the default tooltip will be used instead.
 *
 * **Note:** The tooltip is shrunk to minimal size. If you want to ensure it's fully visible, you might want to set its [member rect_min_size] to some non-zero value.
 *
 * Example of usage with custom-constructed node:
 *
 * @example 
 * 
 * func _make_custom_tooltip(for_text):
 *     var label = Label.new()
 *     label.text = for_text
 *     return label
 * @summary 
 * 
 *
 * Example of usage with custom scene instance:
 *
 * @example 
 * 
 * func _make_custom_tooltip(for_text):
 *     var tooltip = preload("SomeTooltipScene.tscn").instance()
 *     tooltip.get_node("Label").text = for_text
 *     return tooltip
 * @summary 
 * 
 *
*/
protected _make_custom_tooltip(for_text: string): Object;

/** Marks an input event as handled. Once you accept an input event, it stops propagating, even to nodes listening to [method Node._unhandled_input] or [method Node._unhandled_key_input]. */
accept_event(): void;

/**
 * Overrides the [Color] with given `name` in the [member theme] resource the control uses.
 *
 * **Note:** Unlike other theme overrides, there is no way to undo a color override without manually assigning the previous color.
 *
 * **Example of overriding a label's color and resetting it later:**
 *
 * @example 
 * 
 * # Override the child node "MyLabel"'s font color to orange.
 * $MyLabel.add_color_override("font_color", Color(1, 0.5, 0))
 * # Reset the color by creating a new node to get the default value:
 * var default_label_color = Label.new().get_color("font_color")
 * $MyLabel.add_color_override("font_color", default_label_color)
 * @summary 
 * 
 *
*/
add_color_override(name: string, color: Color): void;

/** Overrides an integer constant with given [code]name[/code] in the [member theme] resource the control uses. If the [code]constant[/code] is [code]0[/code], the override is cleared and the constant from assigned [Theme] is used. */
add_constant_override(name: string, constant: int): void;

/** Overrides the font with given [code]name[/code] in the [member theme] resource the control uses. If [code]font[/code] is [code]null[/code] or invalid, the override is cleared and the font from assigned [Theme] is used. */
add_font_override(name: string, font: Font): void;

/** Overrides the icon with given [code]name[/code] in the [member theme] resource the control uses. If [code]icon[/code] is [code]null[/code] or invalid, the override is cleared and the icon from assigned [Theme] is used. */
add_icon_override(name: string, texture: Texture): void;

/** Overrides the [Shader] with given [code]name[/code] in the [member theme] resource the control uses. If [code]shader[/code] is [code]null[/code] or invalid, the override is cleared and the shader from assigned [Theme] is used. */
add_shader_override(name: string, shader: Shader): void;

/**
 * Overrides the [StyleBox] with given `name` in the [member theme] resource the control uses. If `stylebox` is empty or invalid, the override is cleared and the [StyleBox] from assigned [Theme] is used.
 *
 * **Example of modifying a property in a StyleBox by duplicating it:**
 *
 * @example 
 * 
 * # The snippet below assumes the child node MyButton has a StyleBoxFlat assigned.
 * # Resources are shared across instances, so we need to duplicate it
 * # to avoid modifying the appearance of all other buttons.
 * var new_stylebox_normal = $MyButton.get_stylebox("normal").duplicate()
 * new_stylebox_normal.border_width_top = 3
 * new_stylebox_normal.border_color = Color(0, 1, 0.5)
 * $MyButton.add_stylebox_override("normal", new_stylebox_normal)
 * # Remove the stylebox override:
 * $MyButton.add_stylebox_override("normal", null)
 * @summary 
 * 
 *
*/
add_stylebox_override(name: string, stylebox: StyleBox): void;

/**
 * Godot calls this method to test if `data` from a control's [method get_drag_data] can be dropped at `position`. `position` is local to this control.
 *
 * This method should only be used to test the data. Process the data in [method drop_data].
 *
 * @example 
 * 
 * func can_drop_data(position, data):
 *     # Check position if it is relevant to you
 *     # Otherwise, just check data
 *     return typeof(data) == TYPE_DICTIONARY and data.has("expected")
 * @summary 
 * 
 *
*/
can_drop_data(position: Vector2, data: any): boolean;

/**
 * Godot calls this method to pass you the `data` from a control's [method get_drag_data] result. Godot first calls [method can_drop_data] to test if `data` is allowed to drop at `position` where `position` is local to this control.
 *
 * @example 
 * 
 * func can_drop_data(position, data):
 *     return typeof(data) == TYPE_DICTIONARY and data.has("color")
 * func drop_data(position, data):
 *     color = data["color"]
 * @summary 
 * 
 *
*/
drop_data(position: Vector2, data: any): void;

/**
 * Forces drag and bypasses [method get_drag_data] and [method set_drag_preview] by passing `data` and `preview`. Drag will start even if the mouse is neither over nor pressed on this control.
 *
 * The methods [method can_drop_data] and [method drop_data] must be implemented on controls that want to receive drop data.
 *
*/
force_drag(data: any, preview: Control): void;

/** Returns the anchor identified by [code]margin[/code] constant from [enum Margin] enum. A getter method for [member anchor_bottom], [member anchor_left], [member anchor_right] and [member anchor_top]. */
get_anchor(margin: int): float;

/** Returns [member margin_left] and [member margin_top]. See also [member rect_position]. */
get_begin(): Vector2;

/**
 * Returns a color from assigned [Theme] with given `name` and associated with [Control] of given `type`.
 *
 * @example 
 * 
 * func _ready():
 *     modulate = get_color("font_color", "Button") #get the color defined for button fonts
 * @summary 
 * 
 *
*/
get_color(name: string, type?: string): Color;

/** Returns combined minimum size from [member rect_min_size] and [method get_minimum_size]. */
get_combined_minimum_size(): Vector2;

/** Returns a constant from assigned [Theme] with given [code]name[/code] and associated with [Control] of given [code]type[/code]. */
get_constant(name: string, type?: string): int;

/** Returns the mouse cursor shape the control displays on mouse hover. See [enum CursorShape]. */
get_cursor_shape(position?: Vector2): int;

/**
 * Godot calls this method to get data that can be dragged and dropped onto controls that expect drop data. Returns `null` if there is no data to drag. Controls that want to receive drop data should implement [method can_drop_data] and [method drop_data]. `position` is local to this control. Drag may be forced with [method force_drag].
 *
 * A preview that will follow the mouse that should represent the data can be set with [method set_drag_preview]. A good time to set the preview is in this method.
 *
 * @example 
 * 
 * func get_drag_data(position):
 *     var mydata = make_data()
 *     set_drag_preview(make_preview(mydata))
 *     return mydata
 * @summary 
 * 
 *
*/
get_drag_data(position: Vector2): any;

/** Returns [member margin_right] and [member margin_bottom]. */
get_end(): Vector2;

/** Returns the focus neighbour identified by [code]margin[/code] constant from [enum Margin] enum. A getter method for [member focus_neighbour_bottom], [member focus_neighbour_left], [member focus_neighbour_right] and [member focus_neighbour_top]. */
get_focus_neighbour(margin: int): NodePathType;

/** Returns the control that has the keyboard focus or [code]null[/code] if none. */
get_focus_owner(): Control;

/** Returns a font from assigned [Theme] with given [code]name[/code] and associated with [Control] of given [code]type[/code]. */
get_font(name: string, type?: string): Font;

/** Returns the position and size of the control relative to the top-left corner of the screen. See [member rect_position] and [member rect_size]. */
get_global_rect(): Rect2;

/** Returns an icon from assigned [Theme] with given [code]name[/code] and associated with [Control] of given [code]type[/code]. */
get_icon(name: string, type?: string): Texture;

/** Returns the anchor identified by [code]margin[/code] constant from [enum Margin] enum. A getter method for [member margin_bottom], [member margin_left], [member margin_right] and [member margin_top]. */
get_margin(margin: int): float;

/** Returns the minimum size for this control. See [member rect_min_size]. */
get_minimum_size(): Vector2;

/** Returns the width/height occupied in the parent control. */
get_parent_area_size(): Vector2;

/** Returns the parent control node. */
get_parent_control(): Control;

/** Returns the position and size of the control relative to the top-left corner of the parent Control. See [member rect_position] and [member rect_size]. */
get_rect(): Rect2;

/** Returns the rotation (in radians). */
get_rotation(): float;

/** Returns a [StyleBox] from assigned [Theme] with given [code]name[/code] and associated with [Control] of given [code]type[/code]. */
get_stylebox(name: string, type?: string): StyleBox;

/** Returns the tooltip, which will appear when the cursor is resting over this control. See [member hint_tooltip]. */
get_tooltip(at_position?: Vector2): string;

/**
 * Creates an [InputEventMouseButton] that attempts to click the control. If the event is received, the control acquires focus.
 *
 * @example 
 * 
 * func _process(delta):
 *     grab_click_focus() #when clicking another Control node, this node will be clicked instead
 * @summary 
 * 
 *
*/
grab_click_focus(): void;

/** Steal the focus from another control and become the focused control (see [member focus_mode]). */
grab_focus(): void;

/** Returns [code]true[/code] if [Color] with given [code]name[/code] and associated with [Control] of given [code]type[/code] exists in assigned [Theme]. */
has_color(name: string, type?: string): boolean;

/** Returns [code]true[/code] if [Color] with given [code]name[/code] has a valid override in this [Control] node. */
has_color_override(name: string): boolean;

/** Returns [code]true[/code] if constant with given [code]name[/code] and associated with [Control] of given [code]type[/code] exists in assigned [Theme]. */
has_constant(name: string, type?: string): boolean;

/** Returns [code]true[/code] if constant with given [code]name[/code] has a valid override in this [Control] node. */
has_constant_override(name: string): boolean;

/** Returns [code]true[/code] if this is the current focused control. See [member focus_mode]. */
has_focus(): boolean;

/** Returns [code]true[/code] if font with given [code]name[/code] and associated with [Control] of given [code]type[/code] exists in assigned [Theme]. */
has_font(name: string, type?: string): boolean;

/** Returns [code]true[/code] if font with given [code]name[/code] has a valid override in this [Control] node. */
has_font_override(name: string): boolean;

/** Returns [code]true[/code] if icon with given [code]name[/code] and associated with [Control] of given [code]type[/code] exists in assigned [Theme]. */
has_icon(name: string, type?: string): boolean;

/** Returns [code]true[/code] if icon with given [code]name[/code] has a valid override in this [Control] node. */
has_icon_override(name: string): boolean;

/**
 * Virtual method to be implemented by the user. Returns whether the given `point` is inside this control.
 *
 * If not overridden, default behavior is checking if the point is within control's Rect.
 *
 * **Note:** If you want to check if a point is inside the control, you can use `get_rect().has_point(point)`.
 *
*/
has_point(point: Vector2): boolean;

/** Returns [code]true[/code] if [Shader] with given [code]name[/code] has a valid override in this [Control] node. */
has_shader_override(name: string): boolean;

/** Returns [code]true[/code] if [StyleBox] with given [code]name[/code] and associated with [Control] of given [code]type[/code] exists in assigned [Theme]. */
has_stylebox(name: string, type?: string): boolean;

/** Returns [code]true[/code] if [StyleBox] with given [code]name[/code] has a valid override in this [Control] node. */
has_stylebox_override(name: string): boolean;

/** Invalidates the size cache in this node and in parent nodes up to toplevel. Intended to be used with [method get_minimum_size] when the return value is changed. Setting [member rect_min_size] directly calls this method automatically. */
minimum_size_changed(): void;

/** Give up the focus. No other control will be able to receive keyboard input. */
release_focus(): void;

/**
 * Sets the anchor identified by `margin` constant from [enum Margin] enum to value `anchor`. A setter method for [member anchor_bottom], [member anchor_left], [member anchor_right] and [member anchor_top].
 *
 * If `keep_margin` is `true`, margins aren't updated after this operation.
 *
 * If `push_opposite_anchor` is `true` and the opposite anchor overlaps this anchor, the opposite one will have its value overridden. For example, when setting left anchor to 1 and the right anchor has value of 0.5, the right anchor will also get value of 1. If `push_opposite_anchor` was `false`, the left anchor would get value 0.5.
 *
*/
set_anchor(margin: int, anchor: float, keep_margin?: boolean, push_opposite_anchor?: boolean): void;

/** Works the same as [method set_anchor], but instead of [code]keep_margin[/code] argument and automatic update of margin, it allows to set the margin offset yourself (see [method set_margin]). */
set_anchor_and_margin(margin: int, anchor: float, offset: float, push_opposite_anchor?: boolean): void;

/** Sets both anchor preset and margin preset. See [method set_anchors_preset] and [method set_margins_preset]. */
set_anchors_and_margins_preset(preset: int, resize_mode?: int, margin?: int): void;

/**
 * Sets the anchors to a `preset` from [enum Control.LayoutPreset] enum. This is code equivalent of using the Layout menu in 2D editor.
 *
 * If `keep_margins` is `true`, control's position will also be updated.
 *
*/
set_anchors_preset(preset: int, keep_margins?: boolean): void;

/** Sets [member margin_left] and [member margin_top] at the same time. Equivalent of changing [member rect_position]. */
set_begin(position: Vector2): void;

/**
 * Forwards the handling of this control's drag and drop to `target` control.
 *
 * Forwarding can be implemented in the target control similar to the methods [method get_drag_data], [method can_drop_data], and [method drop_data] but with two differences:
 *
 * 1. The function name must be suffixed with **_fw**
 *
 * 2. The function must take an extra argument that is the control doing the forwarding
 *
 * @example 
 * 
 * # ThisControl.gd
 * extends Control
 * func _ready():
 *     set_drag_forwarding(target_control)
 * # TargetControl.gd
 * extends Control
 * func can_drop_data_fw(position, data, from_control):
 *     return true
 * func drop_data_fw(position, data, from_control):
 *     my_handle_data(data)
 * func get_drag_data_fw(position, from_control):
 *     set_drag_preview(my_preview)
 *     return my_data()
 * @summary 
 * 
 *
*/
set_drag_forwarding(target: Control): void;

/**
 * Shows the given control at the mouse pointer. A good time to call this method is in [method get_drag_data]. The control must not be in the scene tree.
 *
 * @example 
 * 
 * export (Color, RGBA) var color = Color(1, 0, 0, 1)
 * func get_drag_data(position):
 *     # Use a control that is not in the tree
 *     var cpb = ColorPickerButton.new()
 *     cpb.color = color
 *     cpb.rect_size = Vector2(50, 50)
 *     set_drag_preview(cpb)
 *     return color
 * @summary 
 * 
 *
*/
set_drag_preview(control: Control): void;

/** Sets [member margin_right] and [member margin_bottom] at the same time. */
set_end(position: Vector2): void;

/** Sets the anchor identified by [code]margin[/code] constant from [enum Margin] enum to [Control] at [code]neighbor[/code] node path. A setter method for [member focus_neighbour_bottom], [member focus_neighbour_left], [member focus_neighbour_right] and [member focus_neighbour_top]. */
set_focus_neighbour(margin: int, neighbour: NodePathType): void;

/**
 * Sets the [member rect_global_position] to given `position`.
 *
 * If `keep_margins` is `true`, control's anchors will be updated instead of margins.
 *
*/
set_global_position(position: Vector2, keep_margins?: boolean): void;

/** Sets the margin identified by [code]margin[/code] constant from [enum Margin] enum to given [code]offset[/code]. A setter method for [member margin_bottom], [member margin_left], [member margin_right] and [member margin_top]. */
set_margin(margin: int, offset: float): void;

/**
 * Sets the margins to a `preset` from [enum Control.LayoutPreset] enum. This is code equivalent of using the Layout menu in 2D editor.
 *
 * Use parameter `resize_mode` with constants from [enum Control.LayoutPresetMode] to better determine the resulting size of the [Control]. Constant size will be ignored if used with presets that change size, e.g. `PRESET_LEFT_WIDE`.
 *
 * Use parameter `margin` to determine the gap between the [Control] and the edges.
 *
*/
set_margins_preset(preset: int, resize_mode?: int, margin?: int): void;

/**
 * Sets the [member rect_position] to given `position`.
 *
 * If `keep_margins` is `true`, control's anchors will be updated instead of margins.
 *
*/
set_position(position: Vector2, keep_margins?: boolean): void;

/** Sets the rotation (in radians). */
set_rotation(radians: float): void;

/**
 * Sets the size (see [member rect_size]).
 *
 * If `keep_margins` is `true`, control's anchors will be updated instead of margins.
 *
*/
set_size(size: Vector2, keep_margins?: boolean): void;

/**
 * Displays a control as modal. Control must be a subwindow. Modal controls capture the input signals until closed or the area outside them is accessed. When a modal control loses focus, or the ESC key is pressed, they automatically hide. Modal controls are used extensively for popup dialogs and menus.
 *
 * If `exclusive` is `true`, other controls will not receive input and clicking outside this control will not close it.
 *
*/
show_modal(exclusive?: boolean): void;

/** Moves the mouse cursor to [code]to_position[/code], relative to [member rect_position] of this [Control]. */
warp_mouse(to_position: Vector2): void;

  connect<T extends SignalsOf<Control>, U extends Node>(signal: T, node: U, method: keyof U): number;



/**
 * The node cannot grab focus. Use with [member focus_mode].
 *
*/
static FOCUS_NONE: 0;

/**
 * The node can only grab focus on mouse clicks. Use with [member focus_mode].
 *
*/
static FOCUS_CLICK: 1;

/**
 * The node can grab focus on mouse click or using the arrows and the Tab keys on the keyboard. Use with [member focus_mode].
 *
*/
static FOCUS_ALL: 2;

/**
 * Sent when the node changes size. Use [member rect_size] to get the new size.
 *
*/
static NOTIFICATION_RESIZED: 40;

/**
 * Sent when the mouse pointer enters the node.
 *
*/
static NOTIFICATION_MOUSE_ENTER: 41;

/**
 * Sent when the mouse pointer exits the node.
 *
*/
static NOTIFICATION_MOUSE_EXIT: 42;

/**
 * Sent when the node grabs focus.
 *
*/
static NOTIFICATION_FOCUS_ENTER: 43;

/**
 * Sent when the node loses focus.
 *
*/
static NOTIFICATION_FOCUS_EXIT: 44;

/**
 * Sent when the node's [member theme] changes, right before Godot redraws the control. Happens when you call one of the `add_*_override` methods.
 *
*/
static NOTIFICATION_THEME_CHANGED: 45;

/**
 * Sent when an open modal dialog closes. See [method show_modal].
 *
*/
static NOTIFICATION_MODAL_CLOSE: 46;

/**
 * Sent when this node is inside a [ScrollContainer] which has begun being scrolled.
 *
*/
static NOTIFICATION_SCROLL_BEGIN: 47;

/**
 * Sent when this node is inside a [ScrollContainer] which has stopped being scrolled.
 *
*/
static NOTIFICATION_SCROLL_END: 48;

/**
 * Show the system's arrow mouse cursor when the user hovers the node. Use with [member mouse_default_cursor_shape].
 *
*/
static CURSOR_ARROW: 0;

/**
 * Show the system's I-beam mouse cursor when the user hovers the node. The I-beam pointer has a shape similar to "I". It tells the user they can highlight or insert text.
 *
*/
static CURSOR_IBEAM: 1;

/**
 * Show the system's pointing hand mouse cursor when the user hovers the node.
 *
*/
static CURSOR_POINTING_HAND: 2;

/**
 * Show the system's cross mouse cursor when the user hovers the node.
 *
*/
static CURSOR_CROSS: 3;

/**
 * Show the system's wait mouse cursor, often an hourglass, when the user hovers the node.
 *
*/
static CURSOR_WAIT: 4;

/**
 * Show the system's busy mouse cursor when the user hovers the node. Often an hourglass.
 *
*/
static CURSOR_BUSY: 5;

/**
 * Show the system's drag mouse cursor, often a closed fist or a cross symbol, when the user hovers the node. It tells the user they're currently dragging an item, like a node in the Scene dock.
 *
*/
static CURSOR_DRAG: 6;

/**
 * Show the system's drop mouse cursor when the user hovers the node. It can be an open hand. It tells the user they can drop an item they're currently grabbing, like a node in the Scene dock.
 *
*/
static CURSOR_CAN_DROP: 7;

/**
 * Show the system's forbidden mouse cursor when the user hovers the node. Often a crossed circle.
 *
*/
static CURSOR_FORBIDDEN: 8;

/**
 * Show the system's vertical resize mouse cursor when the user hovers the node. A double-headed vertical arrow. It tells the user they can resize the window or the panel vertically.
 *
*/
static CURSOR_VSIZE: 9;

/**
 * Show the system's horizontal resize mouse cursor when the user hovers the node. A double-headed horizontal arrow. It tells the user they can resize the window or the panel horizontally.
 *
*/
static CURSOR_HSIZE: 10;

/**
 * Show the system's window resize mouse cursor when the user hovers the node. The cursor is a double-headed arrow that goes from the bottom left to the top right. It tells the user they can resize the window or the panel both horizontally and vertically.
 *
*/
static CURSOR_BDIAGSIZE: 11;

/**
 * Show the system's window resize mouse cursor when the user hovers the node. The cursor is a double-headed arrow that goes from the top left to the bottom right, the opposite of [constant CURSOR_BDIAGSIZE]. It tells the user they can resize the window or the panel both horizontally and vertically.
 *
*/
static CURSOR_FDIAGSIZE: 12;

/**
 * Show the system's move mouse cursor when the user hovers the node. It shows 2 double-headed arrows at a 90 degree angle. It tells the user they can move a UI element freely.
 *
*/
static CURSOR_MOVE: 13;

/**
 * Show the system's vertical split mouse cursor when the user hovers the node. On Windows, it's the same as [constant CURSOR_VSIZE].
 *
*/
static CURSOR_VSPLIT: 14;

/**
 * Show the system's horizontal split mouse cursor when the user hovers the node. On Windows, it's the same as [constant CURSOR_HSIZE].
 *
*/
static CURSOR_HSPLIT: 15;

/**
 * Show the system's help mouse cursor when the user hovers the node, a question mark.
 *
*/
static CURSOR_HELP: 16;

/**
 * Snap all 4 anchors to the top-left of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_TOP_LEFT: 0;

/**
 * Snap all 4 anchors to the top-right of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_TOP_RIGHT: 1;

/**
 * Snap all 4 anchors to the bottom-left of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_BOTTOM_LEFT: 2;

/**
 * Snap all 4 anchors to the bottom-right of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_BOTTOM_RIGHT: 3;

/**
 * Snap all 4 anchors to the center of the left edge of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_CENTER_LEFT: 4;

/**
 * Snap all 4 anchors to the center of the top edge of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_CENTER_TOP: 5;

/**
 * Snap all 4 anchors to the center of the right edge of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_CENTER_RIGHT: 6;

/**
 * Snap all 4 anchors to the center of the bottom edge of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_CENTER_BOTTOM: 7;

/**
 * Snap all 4 anchors to the center of the parent control's bounds. Use with [method set_anchors_preset].
 *
*/
static PRESET_CENTER: 8;

/**
 * Snap all 4 anchors to the left edge of the parent control. The left margin becomes relative to the left edge and the top margin relative to the top left corner of the node's parent. Use with [method set_anchors_preset].
 *
*/
static PRESET_LEFT_WIDE: 9;

/**
 * Snap all 4 anchors to the top edge of the parent control. The left margin becomes relative to the top left corner, the top margin relative to the top edge, and the right margin relative to the top right corner of the node's parent. Use with [method set_anchors_preset].
 *
*/
static PRESET_TOP_WIDE: 10;

/**
 * Snap all 4 anchors to the right edge of the parent control. The right margin becomes relative to the right edge and the top margin relative to the top right corner of the node's parent. Use with [method set_anchors_preset].
 *
*/
static PRESET_RIGHT_WIDE: 11;

/**
 * Snap all 4 anchors to the bottom edge of the parent control. The left margin becomes relative to the bottom left corner, the bottom margin relative to the bottom edge, and the right margin relative to the bottom right corner of the node's parent. Use with [method set_anchors_preset].
 *
*/
static PRESET_BOTTOM_WIDE: 12;

/**
 * Snap all 4 anchors to a vertical line that cuts the parent control in half. Use with [method set_anchors_preset].
 *
*/
static PRESET_VCENTER_WIDE: 13;

/**
 * Snap all 4 anchors to a horizontal line that cuts the parent control in half. Use with [method set_anchors_preset].
 *
*/
static PRESET_HCENTER_WIDE: 14;

/**
 * Snap all 4 anchors to the respective corners of the parent control. Set all 4 margins to 0 after you applied this preset and the [Control] will fit its parent control. This is equivalent to the "Full Rect" layout option in the editor. Use with [method set_anchors_preset].
 *
*/
static PRESET_WIDE: 15;

/**
 * The control will be resized to its minimum size.
 *
*/
static PRESET_MODE_MINSIZE: 0;

/**
 * The control's width will not change.
 *
*/
static PRESET_MODE_KEEP_WIDTH: 1;

/**
 * The control's height will not change.
 *
*/
static PRESET_MODE_KEEP_HEIGHT: 2;

/**
 * The control's size will not change.
 *
*/
static PRESET_MODE_KEEP_SIZE: 3;

/**
 * Tells the parent [Container] to expand the bounds of this node to fill all the available space without pushing any other node. Use with [member size_flags_horizontal] and [member size_flags_vertical].
 *
*/
static SIZE_FILL: 1;

/**
 * Tells the parent [Container] to let this node take all the available space on the axis you flag. If multiple neighboring nodes are set to expand, they'll share the space based on their stretch ratio. See [member size_flags_stretch_ratio]. Use with [member size_flags_horizontal] and [member size_flags_vertical].
 *
*/
static SIZE_EXPAND: 2;

/**
 * Sets the node's size flags to both fill and expand. See the 2 constants above for more information.
 *
*/
static SIZE_EXPAND_FILL: 3;

/**
 * Tells the parent [Container] to center the node in itself. It centers the control based on its bounding box, so it doesn't work with the fill or expand size flags. Use with [member size_flags_horizontal] and [member size_flags_vertical].
 *
*/
static SIZE_SHRINK_CENTER: 4;

/**
 * Tells the parent [Container] to align the node with its end, either the bottom or the right edge. It doesn't work with the fill or expand size flags. Use with [member size_flags_horizontal] and [member size_flags_vertical].
 *
*/
static SIZE_SHRINK_END: 8;

/**
 * The control will receive mouse button input events through [method _gui_input] if clicked on. And the control will receive the [signal mouse_entered] and [signal mouse_exited] signals. These events are automatically marked as handled, and they will not propagate further to other controls. This also results in blocking signals in other controls.
 *
*/
static MOUSE_FILTER_STOP: 0;

/**
 * The control will receive mouse button input events through [method _gui_input] if clicked on. And the control will receive the [signal mouse_entered] and [signal mouse_exited] signals. If this control does not handle the event, the parent control (if any) will be considered, and so on until there is no more parent control to potentially handle it. This also allows signals to fire in other controls. Even if no control handled it at all, the event will still be handled automatically, so unhandled input will not be fired.
 *
*/
static MOUSE_FILTER_PASS: 1;

/**
 * The control will not receive mouse button input events through [method _gui_input]. The control will also not receive the [signal mouse_entered] nor [signal mouse_exited] signals. This will not block other controls from receiving these events or firing the signals. Ignored events will not be handled automatically.
 *
*/
static MOUSE_FILTER_IGNORE: 2;

/**
 * The control will grow to the left or top to make up if its minimum size is changed to be greater than its current size on the respective axis.
 *
*/
static GROW_DIRECTION_BEGIN: 0;

/**
 * The control will grow to the right or bottom to make up if its minimum size is changed to be greater than its current size on the respective axis.
 *
*/
static GROW_DIRECTION_END: 1;

/**
 * The control will grow in both directions equally to make up if its minimum size is changed to be greater than its current size.
 *
*/
static GROW_DIRECTION_BOTH: 2;

/**
 * Snaps one of the 4 anchor's sides to the origin of the node's `Rect`, in the top left. Use it with one of the `anchor_*` member variables, like [member anchor_left]. To change all 4 anchors at once, use [method set_anchors_preset].
 *
*/
static ANCHOR_BEGIN: 0;

/**
 * Snaps one of the 4 anchor's sides to the end of the node's `Rect`, in the bottom right. Use it with one of the `anchor_*` member variables, like [member anchor_left]. To change all 4 anchors at once, use [method set_anchors_preset].
 *
*/
static ANCHOR_END: 1;


  /**
 * Emitted when the node gains keyboard focus.
 *
*/
focus_entered: Signal<() => void>

/**
 * Emitted when the node loses keyboard focus.
 *
*/
focus_exited: Signal<() => void>

/**
 * Emitted when the node receives an [InputEvent].
 *
*/
gui_input: Signal<(event: InputEvent) => void>

/**
 * Emitted when the node's minimum size changes.
 *
*/
minimum_size_changed: Signal<() => void>

/**
 * Emitted when a modal [Control] is closed. See [method show_modal].
 *
*/
modal_closed: Signal<() => void>

/**
 * Emitted when the mouse enters the control's `Rect` area, provided its [member mouse_filter] lets the event reach it.
 *
*/
mouse_entered: Signal<() => void>

/**
 * Emitted when the mouse leaves the control's `Rect` area, provided its [member mouse_filter] lets the event reach it.
 *
*/
mouse_exited: Signal<() => void>

/**
 * Emitted when the control changes size.
 *
*/
resized: Signal<() => void>

/**
 * Emitted when one of the size flags changes. See [member size_flags_horizontal] and [member size_flags_vertical].
 *
*/
size_flags_changed: Signal<() => void>

}
