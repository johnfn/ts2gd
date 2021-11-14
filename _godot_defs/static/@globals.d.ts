
declare const load: <T extends AssetPath>(path: T) => AssetType[T];
declare const preload: <T extends AssetPath>(path: T) => AssetType[T];
declare function remotesync(target: any, key: string, descriptor: any): any
declare function remote(target: any, key: string, descriptor: any): any


/** The [ARVRServer] singleton. */
declare const ARVRServer: ARVRServerClass;

/** The [AudioServer] singleton. */
declare const AudioServer: AudioServerClass;

/** The [CameraServer] singleton. */
declare const CameraServer: CameraServerClass;

/** The [ClassDB] singleton. */
declare const ClassDB: ClassDBClass;

/** The [Engine] singleton. */
declare const Engine: EngineClass;

/** The [Geometry] singleton. */
declare const Geometry: GeometryClass;

/** The [IP] singleton. */
declare const IP: IPClass;

/** The [Input] singleton. */
declare const Input: InputClass;

/** The [InputMap] singleton. */
declare const InputMap: InputMapClass;

/** The [JSON] singleton. */
declare const JSON: JSONClass;

/**
 * The [JavaClassWrapper] singleton.
 *
 * **Note:** Only implemented on Android.
 *
*/
declare const JavaClassWrapper: JavaClassWrapperClass;

/**
 * The [JavaScript] singleton.
 *
 * **Note:** Only implemented on HTML5.
 *
*/
declare const JavaScript: JavaScriptClass;

/** The [Marshalls] singleton. */
declare const Marshalls: MarshallsClass;

/** The [EditorNavigationMeshGenerator] singleton. */
//declare const NavigationMeshGenerator: EditorNavigationMeshGeneratorClass;

/** The [OS] singleton. */
declare const OS: OSClass;

/** The [Performance] singleton. */
declare const Performance: PerformanceClass;

/** The [Physics2DServer] singleton. */
declare const Physics2DServer: Physics2DServerClass;

/** The [PhysicsServer] singleton. */
declare const PhysicsServer: PhysicsServerClass;

/** The [ProjectSettings] singleton. */
declare const ProjectSettings: ProjectSettingsClass;

/** The [ResourceLoader] singleton. */
declare const ResourceLoader: ResourceLoaderClass;

/** The [ResourceSaver] singleton. */
declare const ResourceSaver: ResourceSaverClass;

/** The [TranslationServer] singleton. */
declare const TranslationServer: TranslationServerClass;

/** The [VisualScriptEditor] singleton. */
//declare const VisualScriptEditor: VisualScriptEditorClass;

/** The [VisualServer] singleton. */
declare const VisualServer: VisualServerClass;


    declare enum Margin {
      /**
 * Left margin, usually used for [Control] or [StyleBox]-derived classes.
 *
*/
MARGIN_LEFT = 0,
/**
 * Top margin, usually used for [Control] or [StyleBox]-derived classes.
 *
*/
MARGIN_TOP = 1,
/**
 * Right margin, usually used for [Control] or [StyleBox]-derived classes.
 *
*/
MARGIN_RIGHT = 2,
/**
 * Bottom margin, usually used for [Control] or [StyleBox]-derived classes.
 *
*/
MARGIN_BOTTOM = 3
    }
    

    declare enum Corner {
      /**
 * Top-left corner.
 *
*/
CORNER_TOP_LEFT = 0,
/**
 * Top-right corner.
 *
*/
CORNER_TOP_RIGHT = 1,
/**
 * Bottom-right corner.
 *
*/
CORNER_BOTTOM_RIGHT = 2,
/**
 * Bottom-left corner.
 *
*/
CORNER_BOTTOM_LEFT = 3
    }
    

    declare enum Orientation {
      /**
 * General vertical alignment, usually used for [Separator], [ScrollBar], [Slider], etc.
 *
*/
VERTICAL = 1,
/**
 * General horizontal alignment, usually used for [Separator], [ScrollBar], [Slider], etc.
 *
*/
HORIZONTAL = 0
    }
    

    declare enum HAlign {
      /**
 * Horizontal left alignment, usually for text-derived classes.
 *
*/
HALIGN_LEFT = 0,
/**
 * Horizontal center alignment, usually for text-derived classes.
 *
*/
HALIGN_CENTER = 1,
/**
 * Horizontal right alignment, usually for text-derived classes.
 *
*/
HALIGN_RIGHT = 2
    }
    

    declare enum VAlign {
      /**
 * Vertical top alignment, usually for text-derived classes.
 *
*/
VALIGN_TOP = 0,
/**
 * Vertical center alignment, usually for text-derived classes.
 *
*/
VALIGN_CENTER = 1,
/**
 * Vertical bottom alignment, usually for text-derived classes.
 *
*/
VALIGN_BOTTOM = 2
    }
    

    declare enum KeyList {
      /**
 * Escape key.
 *
*/
KEY_ESCAPE = 16777217,
/**
 * Tab key.
 *
*/
KEY_TAB = 16777218,
/**
 * Shift+Tab key.
 *
*/
KEY_BACKTAB = 16777219,
/**
 * Backspace key.
 *
*/
KEY_BACKSPACE = 16777220,
/**
 * Return key (on the main keyboard).
 *
*/
KEY_ENTER = 16777221,
/**
 * Enter key on the numeric keypad.
 *
*/
KEY_KP_ENTER = 16777222,
/**
 * Insert key.
 *
*/
KEY_INSERT = 16777223,
/**
 * Delete key.
 *
*/
KEY_DELETE = 16777224,
/**
 * Pause key.
 *
*/
KEY_PAUSE = 16777225,
/**
 * Print Screen key.
 *
*/
KEY_PRINT = 16777226,
/**
 * System Request key.
 *
*/
KEY_SYSREQ = 16777227,
/**
 * Clear key.
 *
*/
KEY_CLEAR = 16777228,
/**
 * Home key.
 *
*/
KEY_HOME = 16777229,
/**
 * End key.
 *
*/
KEY_END = 16777230,
/**
 * Left arrow key.
 *
*/
KEY_LEFT = 16777231,
/**
 * Up arrow key.
 *
*/
KEY_UP = 16777232,
/**
 * Right arrow key.
 *
*/
KEY_RIGHT = 16777233,
/**
 * Down arrow key.
 *
*/
KEY_DOWN = 16777234,
/**
 * Page Up key.
 *
*/
KEY_PAGEUP = 16777235,
/**
 * Page Down key.
 *
*/
KEY_PAGEDOWN = 16777236,
/**
 * Shift key.
 *
*/
KEY_SHIFT = 16777237,
/**
 * Control key.
 *
*/
KEY_CONTROL = 16777238,
/**
 * Meta key.
 *
*/
KEY_META = 16777239,
/**
 * Alt key.
 *
*/
KEY_ALT = 16777240,
/**
 * Caps Lock key.
 *
*/
KEY_CAPSLOCK = 16777241,
/**
 * Num Lock key.
 *
*/
KEY_NUMLOCK = 16777242,
/**
 * Scroll Lock key.
 *
*/
KEY_SCROLLLOCK = 16777243,
/**
 * F1 key.
 *
*/
KEY_F1 = 16777244,
/**
 * F2 key.
 *
*/
KEY_F2 = 16777245,
/**
 * F3 key.
 *
*/
KEY_F3 = 16777246,
/**
 * F4 key.
 *
*/
KEY_F4 = 16777247,
/**
 * F5 key.
 *
*/
KEY_F5 = 16777248,
/**
 * F6 key.
 *
*/
KEY_F6 = 16777249,
/**
 * F7 key.
 *
*/
KEY_F7 = 16777250,
/**
 * F8 key.
 *
*/
KEY_F8 = 16777251,
/**
 * F9 key.
 *
*/
KEY_F9 = 16777252,
/**
 * F10 key.
 *
*/
KEY_F10 = 16777253,
/**
 * F11 key.
 *
*/
KEY_F11 = 16777254,
/**
 * F12 key.
 *
*/
KEY_F12 = 16777255,
/**
 * F13 key.
 *
*/
KEY_F13 = 16777256,
/**
 * F14 key.
 *
*/
KEY_F14 = 16777257,
/**
 * F15 key.
 *
*/
KEY_F15 = 16777258,
/**
 * F16 key.
 *
*/
KEY_F16 = 16777259,
/**
 * Multiply (*) key on the numeric keypad.
 *
*/
KEY_KP_MULTIPLY = 16777345,
/**
 * Divide (/) key on the numeric keypad.
 *
*/
KEY_KP_DIVIDE = 16777346,
/**
 * Subtract (-) key on the numeric keypad.
 *
*/
KEY_KP_SUBTRACT = 16777347,
/**
 * Period (.) key on the numeric keypad.
 *
*/
KEY_KP_PERIOD = 16777348,
/**
 * Add (+) key on the numeric keypad.
 *
*/
KEY_KP_ADD = 16777349,
/**
 * Number 0 on the numeric keypad.
 *
*/
KEY_KP_0 = 16777350,
/**
 * Number 1 on the numeric keypad.
 *
*/
KEY_KP_1 = 16777351,
/**
 * Number 2 on the numeric keypad.
 *
*/
KEY_KP_2 = 16777352,
/**
 * Number 3 on the numeric keypad.
 *
*/
KEY_KP_3 = 16777353,
/**
 * Number 4 on the numeric keypad.
 *
*/
KEY_KP_4 = 16777354,
/**
 * Number 5 on the numeric keypad.
 *
*/
KEY_KP_5 = 16777355,
/**
 * Number 6 on the numeric keypad.
 *
*/
KEY_KP_6 = 16777356,
/**
 * Number 7 on the numeric keypad.
 *
*/
KEY_KP_7 = 16777357,
/**
 * Number 8 on the numeric keypad.
 *
*/
KEY_KP_8 = 16777358,
/**
 * Number 9 on the numeric keypad.
 *
*/
KEY_KP_9 = 16777359,
/**
 * Left Super key (Windows key).
 *
*/
KEY_SUPER_L = 16777260,
/**
 * Right Super key (Windows key).
 *
*/
KEY_SUPER_R = 16777261,
/**
 * Context menu key.
 *
*/
KEY_MENU = 16777262,
/**
 * Left Hyper key.
 *
*/
KEY_HYPER_L = 16777263,
/**
 * Right Hyper key.
 *
*/
KEY_HYPER_R = 16777264,
/**
 * Help key.
 *
*/
KEY_HELP = 16777265,
/**
 * Left Direction key.
 *
*/
KEY_DIRECTION_L = 16777266,
/**
 * Right Direction key.
 *
*/
KEY_DIRECTION_R = 16777267,
/**
 * Media back key. Not to be confused with the Back button on an Android device.
 *
*/
KEY_BACK = 16777280,
/**
 * Media forward key.
 *
*/
KEY_FORWARD = 16777281,
/**
 * Media stop key.
 *
*/
KEY_STOP = 16777282,
/**
 * Media refresh key.
 *
*/
KEY_REFRESH = 16777283,
/**
 * Volume down key.
 *
*/
KEY_VOLUMEDOWN = 16777284,
/**
 * Mute volume key.
 *
*/
KEY_VOLUMEMUTE = 16777285,
/**
 * Volume up key.
 *
*/
KEY_VOLUMEUP = 16777286,
/**
 * Bass Boost key.
 *
*/
KEY_BASSBOOST = 16777287,
/**
 * Bass up key.
 *
*/
KEY_BASSUP = 16777288,
/**
 * Bass down key.
 *
*/
KEY_BASSDOWN = 16777289,
/**
 * Treble up key.
 *
*/
KEY_TREBLEUP = 16777290,
/**
 * Treble down key.
 *
*/
KEY_TREBLEDOWN = 16777291,
/**
 * Media play key.
 *
*/
KEY_MEDIAPLAY = 16777292,
/**
 * Media stop key.
 *
*/
KEY_MEDIASTOP = 16777293,
/**
 * Previous song key.
 *
*/
KEY_MEDIAPREVIOUS = 16777294,
/**
 * Next song key.
 *
*/
KEY_MEDIANEXT = 16777295,
/**
 * Media record key.
 *
*/
KEY_MEDIARECORD = 16777296,
/**
 * Home page key.
 *
*/
KEY_HOMEPAGE = 16777297,
/**
 * Favorites key.
 *
*/
KEY_FAVORITES = 16777298,
/**
 * Search key.
 *
*/
KEY_SEARCH = 16777299,
/**
 * Standby key.
 *
*/
KEY_STANDBY = 16777300,
/**
 * Open URL / Launch Browser key.
 *
*/
KEY_OPENURL = 16777301,
/**
 * Launch Mail key.
 *
*/
KEY_LAUNCHMAIL = 16777302,
/**
 * Launch Media key.
 *
*/
KEY_LAUNCHMEDIA = 16777303,
/**
 * Launch Shortcut 0 key.
 *
*/
KEY_LAUNCH0 = 16777304,
/**
 * Launch Shortcut 1 key.
 *
*/
KEY_LAUNCH1 = 16777305,
/**
 * Launch Shortcut 2 key.
 *
*/
KEY_LAUNCH2 = 16777306,
/**
 * Launch Shortcut 3 key.
 *
*/
KEY_LAUNCH3 = 16777307,
/**
 * Launch Shortcut 4 key.
 *
*/
KEY_LAUNCH4 = 16777308,
/**
 * Launch Shortcut 5 key.
 *
*/
KEY_LAUNCH5 = 16777309,
/**
 * Launch Shortcut 6 key.
 *
*/
KEY_LAUNCH6 = 16777310,
/**
 * Launch Shortcut 7 key.
 *
*/
KEY_LAUNCH7 = 16777311,
/**
 * Launch Shortcut 8 key.
 *
*/
KEY_LAUNCH8 = 16777312,
/**
 * Launch Shortcut 9 key.
 *
*/
KEY_LAUNCH9 = 16777313,
/**
 * Launch Shortcut A key.
 *
*/
KEY_LAUNCHA = 16777314,
/**
 * Launch Shortcut B key.
 *
*/
KEY_LAUNCHB = 16777315,
/**
 * Launch Shortcut C key.
 *
*/
KEY_LAUNCHC = 16777316,
/**
 * Launch Shortcut D key.
 *
*/
KEY_LAUNCHD = 16777317,
/**
 * Launch Shortcut E key.
 *
*/
KEY_LAUNCHE = 16777318,
/**
 * Launch Shortcut F key.
 *
*/
KEY_LAUNCHF = 16777319,
/**
 * Unknown key.
 *
*/
KEY_UNKNOWN = 33554431,
/**
 * Space key.
 *
*/
KEY_SPACE = 32,
/**
 * ! key.
 *
*/
KEY_EXCLAM = 33,
/**
 * " key.
 *
*/
KEY_QUOTEDBL = 34,
/**
 * # key.
 *
*/
KEY_NUMBERSIGN = 35,
/**
 * $ key.
 *
*/
KEY_DOLLAR = 36,
/**
 * % key.
 *
*/
KEY_PERCENT = 37,
/**
 * & key.
 *
*/
KEY_AMPERSAND = 38,
/**
 * ' key.
 *
*/
KEY_APOSTROPHE = 39,
/**
 * ( key.
 *
*/
KEY_PARENLEFT = 40,
/**
 * ) key.
 *
*/
KEY_PARENRIGHT = 41,
/**
 * * key.
 *
*/
KEY_ASTERISK = 42,
/**
 * + key.
 *
*/
KEY_PLUS = 43,
/**
 * , key.
 *
*/
KEY_COMMA = 44,
/**
 * - key.
 *
*/
KEY_MINUS = 45,
/**
 * . key.
 *
*/
KEY_PERIOD = 46,
/**
 * / key.
 *
*/
KEY_SLASH = 47,
/**
 * Number 0.
 *
*/
KEY_0 = 48,
/**
 * Number 1.
 *
*/
KEY_1 = 49,
/**
 * Number 2.
 *
*/
KEY_2 = 50,
/**
 * Number 3.
 *
*/
KEY_3 = 51,
/**
 * Number 4.
 *
*/
KEY_4 = 52,
/**
 * Number 5.
 *
*/
KEY_5 = 53,
/**
 * Number 6.
 *
*/
KEY_6 = 54,
/**
 * Number 7.
 *
*/
KEY_7 = 55,
/**
 * Number 8.
 *
*/
KEY_8 = 56,
/**
 * Number 9.
 *
*/
KEY_9 = 57,
/**
 * : key.
 *
*/
KEY_COLON = 58,
/**
 * ; key.
 *
*/
KEY_SEMICOLON = 59,
/**
 * < key.
 *
*/
KEY_LESS = 60,
/**
 * = key.
 *
*/
KEY_EQUAL = 61,
/**
 * > key.
 *
*/
KEY_GREATER = 62,
/**
 * ? key.
 *
*/
KEY_QUESTION = 63,
/**
 * @ key.
 *
*/
KEY_AT = 64,
/**
 * A key.
 *
*/
KEY_A = 65,
/**
 * B key.
 *
*/
KEY_B = 66,
/**
 * C key.
 *
*/
KEY_C = 67,
/**
 * D key.
 *
*/
KEY_D = 68,
/**
 * E key.
 *
*/
KEY_E = 69,
/**
 * F key.
 *
*/
KEY_F = 70,
/**
 * G key.
 *
*/
KEY_G = 71,
/**
 * H key.
 *
*/
KEY_H = 72,
/**
 * I key.
 *
*/
KEY_I = 73,
/**
 * J key.
 *
*/
KEY_J = 74,
/**
 * K key.
 *
*/
KEY_K = 75,
/**
 * L key.
 *
*/
KEY_L = 76,
/**
 * M key.
 *
*/
KEY_M = 77,
/**
 * N key.
 *
*/
KEY_N = 78,
/**
 * O key.
 *
*/
KEY_O = 79,
/**
 * P key.
 *
*/
KEY_P = 80,
/**
 * Q key.
 *
*/
KEY_Q = 81,
/**
 * R key.
 *
*/
KEY_R = 82,
/**
 * S key.
 *
*/
KEY_S = 83,
/**
 * T key.
 *
*/
KEY_T = 84,
/**
 * U key.
 *
*/
KEY_U = 85,
/**
 * V key.
 *
*/
KEY_V = 86,
/**
 * W key.
 *
*/
KEY_W = 87,
/**
 * X key.
 *
*/
KEY_X = 88,
/**
 * Y key.
 *
*/
KEY_Y = 89,
/**
 * Z key.
 *
*/
KEY_Z = 90,
/**
 * [ key.
 *
*/
KEY_BRACKETLEFT = 91,
/**
 * \ key.
 *
*/
KEY_BACKSLASH = 92,
/**
 * ] key.
 *
*/
KEY_BRACKETRIGHT = 93,
/**
 * ^ key.
 *
*/
KEY_ASCIICIRCUM = 94,
/**
 * _ key.
 *
*/
KEY_UNDERSCORE = 95,
/**
 * ` key.
 *
*/
KEY_QUOTELEFT = 96,
/**
 * { key.
 *
*/
KEY_BRACELEFT = 123,
/**
 * | key.
 *
*/
KEY_BAR = 124,
/**
 * } key.
 *
*/
KEY_BRACERIGHT = 125,
/**
 * ~ key.
 *
*/
KEY_ASCIITILDE = 126,
/**
 * Non-breakable space key.
 *
*/
KEY_NOBREAKSPACE = 160,
/**
 * ¡ key.
 *
*/
KEY_EXCLAMDOWN = 161,
/**
 * ¢ key.
 *
*/
KEY_CENT = 162,
/**
 * £ key.
 *
*/
KEY_STERLING = 163,
/**
 * ¤ key.
 *
*/
KEY_CURRENCY = 164,
/**
 * ¥ key.
 *
*/
KEY_YEN = 165,
/**
 * ¦ key.
 *
*/
KEY_BROKENBAR = 166,
/**
 * § key.
 *
*/
KEY_SECTION = 167,
/**
 * ¨ key.
 *
*/
KEY_DIAERESIS = 168,
/**
 * © key.
 *
*/
KEY_COPYRIGHT = 169,
/**
 * ª key.
 *
*/
KEY_ORDFEMININE = 170,
/**
 * « key.
 *
*/
KEY_GUILLEMOTLEFT = 171,
/**
 * ¬ key.
 *
*/
KEY_NOTSIGN = 172,
/**
 * Soft hyphen key.
 *
*/
KEY_HYPHEN = 173,
/**
 * ® key.
 *
*/
KEY_REGISTERED = 174,
/**
 * ¯ key.
 *
*/
KEY_MACRON = 175,
/**
 * ° key.
 *
*/
KEY_DEGREE = 176,
/**
 * ± key.
 *
*/
KEY_PLUSMINUS = 177,
/**
 * ² key.
 *
*/
KEY_TWOSUPERIOR = 178,
/**
 * ³ key.
 *
*/
KEY_THREESUPERIOR = 179,
/**
 * ´ key.
 *
*/
KEY_ACUTE = 180,
/**
 * µ key.
 *
*/
KEY_MU = 181,
/**
 * ¶ key.
 *
*/
KEY_PARAGRAPH = 182,
/**
 * · key.
 *
*/
KEY_PERIODCENTERED = 183,
/**
 * ¸ key.
 *
*/
KEY_CEDILLA = 184,
/**
 * ¹ key.
 *
*/
KEY_ONESUPERIOR = 185,
/**
 * º key.
 *
*/
KEY_MASCULINE = 186,
/**
 * » key.
 *
*/
KEY_GUILLEMOTRIGHT = 187,
/**
 * ¼ key.
 *
*/
KEY_ONEQUARTER = 188,
/**
 * ½ key.
 *
*/
KEY_ONEHALF = 189,
/**
 * ¾ key.
 *
*/
KEY_THREEQUARTERS = 190,
/**
 * ¿ key.
 *
*/
KEY_QUESTIONDOWN = 191,
/**
 * À key.
 *
*/
KEY_AGRAVE = 192,
/**
 * Á key.
 *
*/
KEY_AACUTE = 193,
/**
 * Â key.
 *
*/
KEY_ACIRCUMFLEX = 194,
/**
 * Ã key.
 *
*/
KEY_ATILDE = 195,
/**
 * Ä key.
 *
*/
KEY_ADIAERESIS = 196,
/**
 * Å key.
 *
*/
KEY_ARING = 197,
/**
 * Æ key.
 *
*/
KEY_AE = 198,
/**
 * Ç key.
 *
*/
KEY_CCEDILLA = 199,
/**
 * È key.
 *
*/
KEY_EGRAVE = 200,
/**
 * É key.
 *
*/
KEY_EACUTE = 201,
/**
 * Ê key.
 *
*/
KEY_ECIRCUMFLEX = 202,
/**
 * Ë key.
 *
*/
KEY_EDIAERESIS = 203,
/**
 * Ì key.
 *
*/
KEY_IGRAVE = 204,
/**
 * Í key.
 *
*/
KEY_IACUTE = 205,
/**
 * Î key.
 *
*/
KEY_ICIRCUMFLEX = 206,
/**
 * Ï key.
 *
*/
KEY_IDIAERESIS = 207,
/**
 * Ð key.
 *
*/
KEY_ETH = 208,
/**
 * Ñ key.
 *
*/
KEY_NTILDE = 209,
/**
 * Ò key.
 *
*/
KEY_OGRAVE = 210,
/**
 * Ó key.
 *
*/
KEY_OACUTE = 211,
/**
 * Ô key.
 *
*/
KEY_OCIRCUMFLEX = 212,
/**
 * Õ key.
 *
*/
KEY_OTILDE = 213,
/**
 * Ö key.
 *
*/
KEY_ODIAERESIS = 214,
/**
 * × key.
 *
*/
KEY_MULTIPLY = 215,
/**
 * Ø key.
 *
*/
KEY_OOBLIQUE = 216,
/**
 * Ù key.
 *
*/
KEY_UGRAVE = 217,
/**
 * Ú key.
 *
*/
KEY_UACUTE = 218,
/**
 * Û key.
 *
*/
KEY_UCIRCUMFLEX = 219,
/**
 * Ü key.
 *
*/
KEY_UDIAERESIS = 220,
/**
 * Ý key.
 *
*/
KEY_YACUTE = 221,
/**
 * Þ key.
 *
*/
KEY_THORN = 222,
/**
 * ß key.
 *
*/
KEY_SSHARP = 223,
/**
 * ÷ key.
 *
*/
KEY_DIVISION = 247,
/**
 * ÿ key.
 *
*/
KEY_YDIAERESIS = 255
    }
    

    declare enum KeyModifierMask {
      /**
 * Key Code mask.
 *
*/
KEY_CODE_MASK = 33554431,
/**
 * Modifier key mask.
 *
*/
KEY_MODIFIER_MASK = -16777216,
/**
 * Shift key mask.
 *
*/
KEY_MASK_SHIFT = 33554432,
/**
 * Alt key mask.
 *
*/
KEY_MASK_ALT = 67108864,
/**
 * Meta key mask.
 *
*/
KEY_MASK_META = 134217728,
/**
 * Ctrl key mask.
 *
*/
KEY_MASK_CTRL = 268435456,
/**
 * Command key mask. On macOS, this is equivalent to [constant KEY_MASK_META]. On other platforms, this is equivalent to [constant KEY_MASK_CTRL]. This mask should be preferred to [constant KEY_MASK_META] or [constant KEY_MASK_CTRL] for system shortcuts as it handles all platforms correctly.
 *
*/
KEY_MASK_CMD = "platform-dependent",
/**
 * Keypad key mask.
 *
*/
KEY_MASK_KPAD = 536870912,
/**
 * Group Switch key mask.
 *
*/
KEY_MASK_GROUP_SWITCH = 1073741824
    }
    

    declare enum ButtonList {
      /**
 * Left mouse button.
 *
*/
BUTTON_LEFT = 1,
/**
 * Right mouse button.
 *
*/
BUTTON_RIGHT = 2,
/**
 * Middle mouse button.
 *
*/
BUTTON_MIDDLE = 3,
/**
 * Extra mouse button 1 (only present on some mice).
 *
*/
BUTTON_XBUTTON1 = 8,
/**
 * Extra mouse button 2 (only present on some mice).
 *
*/
BUTTON_XBUTTON2 = 9,
/**
 * Mouse wheel up.
 *
*/
BUTTON_WHEEL_UP = 4,
/**
 * Mouse wheel down.
 *
*/
BUTTON_WHEEL_DOWN = 5,
/**
 * Mouse wheel left button (only present on some mice).
 *
*/
BUTTON_WHEEL_LEFT = 6,
/**
 * Mouse wheel right button (only present on some mice).
 *
*/
BUTTON_WHEEL_RIGHT = 7,
/**
 * Left mouse button mask.
 *
*/
BUTTON_MASK_LEFT = 1,
/**
 * Right mouse button mask.
 *
*/
BUTTON_MASK_RIGHT = 2,
/**
 * Middle mouse button mask.
 *
*/
BUTTON_MASK_MIDDLE = 4,
/**
 * Extra mouse button 1 mask.
 *
*/
BUTTON_MASK_XBUTTON1 = 128,
/**
 * Extra mouse button 2 mask.
 *
*/
BUTTON_MASK_XBUTTON2 = 256
    }
    

    declare enum JoystickList {
      /**
 * Invalid button or axis.
 *
*/
JOY_INVALID_OPTION = -1,
/**
 * Gamepad button 0.
 *
*/
JOY_BUTTON_0 = 0,
/**
 * Gamepad button 1.
 *
*/
JOY_BUTTON_1 = 1,
/**
 * Gamepad button 2.
 *
*/
JOY_BUTTON_2 = 2,
/**
 * Gamepad button 3.
 *
*/
JOY_BUTTON_3 = 3,
/**
 * Gamepad button 4.
 *
*/
JOY_BUTTON_4 = 4,
/**
 * Gamepad button 5.
 *
*/
JOY_BUTTON_5 = 5,
/**
 * Gamepad button 6.
 *
*/
JOY_BUTTON_6 = 6,
/**
 * Gamepad button 7.
 *
*/
JOY_BUTTON_7 = 7,
/**
 * Gamepad button 8.
 *
*/
JOY_BUTTON_8 = 8,
/**
 * Gamepad button 9.
 *
*/
JOY_BUTTON_9 = 9,
/**
 * Gamepad button 10.
 *
*/
JOY_BUTTON_10 = 10,
/**
 * Gamepad button 11.
 *
*/
JOY_BUTTON_11 = 11,
/**
 * Gamepad button 12.
 *
*/
JOY_BUTTON_12 = 12,
/**
 * Gamepad button 13.
 *
*/
JOY_BUTTON_13 = 13,
/**
 * Gamepad button 14.
 *
*/
JOY_BUTTON_14 = 14,
/**
 * Gamepad button 15.
 *
*/
JOY_BUTTON_15 = 15,
/**
 * Gamepad button 16.
 *
*/
JOY_BUTTON_16 = 16,
/**
 * Gamepad button 17.
 *
*/
JOY_BUTTON_17 = 17,
/**
 * Gamepad button 18.
 *
*/
JOY_BUTTON_18 = 18,
/**
 * Gamepad button 19.
 *
*/
JOY_BUTTON_19 = 19,
/**
 * Gamepad button 20.
 *
*/
JOY_BUTTON_20 = 20,
/**
 * Gamepad button 21.
 *
*/
JOY_BUTTON_21 = 21,
/**
 * Gamepad button 22.
 *
*/
JOY_BUTTON_22 = 22,
/**
 * Represents the maximum number of joystick buttons supported.
 *
*/
JOY_BUTTON_MAX = 23,
/**
 * DualShock circle button.
 *
*/
JOY_SONY_CIRCLE = 1,
/**
 * DualShock X button.
 *
*/
JOY_SONY_X = 0,
/**
 * DualShock square button.
 *
*/
JOY_SONY_SQUARE = 2,
/**
 * DualShock triangle button.
 *
*/
JOY_SONY_TRIANGLE = 3,
/**
 * Xbox controller B button.
 *
*/
JOY_XBOX_B = 1,
/**
 * Xbox controller A button.
 *
*/
JOY_XBOX_A = 0,
/**
 * Xbox controller X button.
 *
*/
JOY_XBOX_X = 2,
/**
 * Xbox controller Y button.
 *
*/
JOY_XBOX_Y = 3,
/**
 * Nintendo controller A button.
 *
*/
JOY_DS_A = 1,
/**
 * Nintendo controller B button.
 *
*/
JOY_DS_B = 0,
/**
 * Nintendo controller X button.
 *
*/
JOY_DS_X = 3,
/**
 * Nintendo controller Y button.
 *
*/
JOY_DS_Y = 2,
/**
 * Grip (side) buttons on a VR controller.
 *
*/
JOY_VR_GRIP = 2,
/**
 * Push down on the touchpad or main joystick on a VR controller.
 *
*/
JOY_VR_PAD = 14,
/**
 * Trigger on a VR controller.
 *
*/
JOY_VR_TRIGGER = 15,
/**
 * A button on the right Oculus Touch controller, X button on the left controller (also when used in OpenVR).
 *
*/
JOY_OCULUS_AX = 7,
/**
 * B button on the right Oculus Touch controller, Y button on the left controller (also when used in OpenVR).
 *
*/
JOY_OCULUS_BY = 1,
/**
 * Menu button on either Oculus Touch controller.
 *
*/
JOY_OCULUS_MENU = 3,
/**
 * Menu button in OpenVR (Except when Oculus Touch controllers are used).
 *
*/
JOY_OPENVR_MENU = 1,
/**
 * Gamepad button Select.
 *
*/
JOY_SELECT = 10,
/**
 * Gamepad button Start.
 *
*/
JOY_START = 11,
/**
 * Gamepad DPad up.
 *
*/
JOY_DPAD_UP = 12,
/**
 * Gamepad DPad down.
 *
*/
JOY_DPAD_DOWN = 13,
/**
 * Gamepad DPad left.
 *
*/
JOY_DPAD_LEFT = 14,
/**
 * Gamepad DPad right.
 *
*/
JOY_DPAD_RIGHT = 15,
/**
 * Gamepad SDL guide button.
 *
*/
JOY_GUIDE = 16,
/**
 * Gamepad SDL miscellaneous button.
 *
*/
JOY_MISC1 = 17,
/**
 * Gamepad SDL paddle 1 button.
 *
*/
JOY_PADDLE1 = 18,
/**
 * Gamepad SDL paddle 2 button.
 *
*/
JOY_PADDLE2 = 19,
/**
 * Gamepad SDL paddle 3 button.
 *
*/
JOY_PADDLE3 = 20,
/**
 * Gamepad SDL paddle 4 button.
 *
*/
JOY_PADDLE4 = 21,
/**
 * Gamepad SDL touchpad button.
 *
*/
JOY_TOUCHPAD = 22,
/**
 * Gamepad left Shoulder button.
 *
*/
JOY_L = 4,
/**
 * Gamepad left trigger.
 *
*/
JOY_L2 = 6,
/**
 * Gamepad left stick click.
 *
*/
JOY_L3 = 8,
/**
 * Gamepad right Shoulder button.
 *
*/
JOY_R = 5,
/**
 * Gamepad right trigger.
 *
*/
JOY_R2 = 7,
/**
 * Gamepad right stick click.
 *
*/
JOY_R3 = 9,
/**
 * Gamepad left stick horizontal axis.
 *
*/
JOY_AXIS_0 = 0,
/**
 * Gamepad left stick vertical axis.
 *
*/
JOY_AXIS_1 = 1,
/**
 * Gamepad right stick horizontal axis.
 *
*/
JOY_AXIS_2 = 2,
/**
 * Gamepad right stick vertical axis.
 *
*/
JOY_AXIS_3 = 3,
/**
 * Generic gamepad axis 4.
 *
*/
JOY_AXIS_4 = 4,
/**
 * Generic gamepad axis 5.
 *
*/
JOY_AXIS_5 = 5,
/**
 * Gamepad left trigger analog axis.
 *
*/
JOY_AXIS_6 = 6,
/**
 * Gamepad right trigger analog axis.
 *
*/
JOY_AXIS_7 = 7,
/**
 * Generic gamepad axis 8.
 *
*/
JOY_AXIS_8 = 8,
/**
 * Generic gamepad axis 9.
 *
*/
JOY_AXIS_9 = 9,
/**
 * Represents the maximum number of joystick axes supported.
 *
*/
JOY_AXIS_MAX = 10,
/**
 * Gamepad left stick horizontal axis.
 *
*/
JOY_ANALOG_LX = 0,
/**
 * Gamepad left stick vertical axis.
 *
*/
JOY_ANALOG_LY = 1,
/**
 * Gamepad right stick horizontal axis.
 *
*/
JOY_ANALOG_RX = 2,
/**
 * Gamepad right stick vertical axis.
 *
*/
JOY_ANALOG_RY = 3,
/**
 * Gamepad left analog trigger.
 *
*/
JOY_ANALOG_L2 = 6,
/**
 * Gamepad right analog trigger.
 *
*/
JOY_ANALOG_R2 = 7,
/**
 * VR Controller analog trigger.
 *
*/
JOY_VR_ANALOG_TRIGGER = 2,
/**
 * VR Controller analog grip (side buttons).
 *
*/
JOY_VR_ANALOG_GRIP = 4,
/**
 * OpenVR touchpad X axis (Joystick axis on Oculus Touch and Windows MR controllers).
 *
*/
JOY_OPENVR_TOUCHPADX = 0,
/**
 * OpenVR touchpad Y axis (Joystick axis on Oculus Touch and Windows MR controllers).
 *
*/
JOY_OPENVR_TOUCHPADY = 1
    }
    

    declare enum MidiMessageList {
      /**
 * MIDI note OFF message.
 *
*/
MIDI_MESSAGE_NOTE_OFF = 8,
/**
 * MIDI note ON message.
 *
*/
MIDI_MESSAGE_NOTE_ON = 9,
/**
 * MIDI aftertouch message.
 *
*/
MIDI_MESSAGE_AFTERTOUCH = 10,
/**
 * MIDI control change message.
 *
*/
MIDI_MESSAGE_CONTROL_CHANGE = 11,
/**
 * MIDI program change message.
 *
*/
MIDI_MESSAGE_PROGRAM_CHANGE = 12,
/**
 * MIDI channel pressure message.
 *
*/
MIDI_MESSAGE_CHANNEL_PRESSURE = 13,
/**
 * MIDI pitch bend message.
 *
*/
MIDI_MESSAGE_PITCH_BEND = 14
    }
    

    declare enum Error {
      /**
 * Methods that return [enum Error] return [constant OK] when no error occurred. Note that many functions don't return an error code but will print error messages to standard output.
 *
 * Since [constant OK] has value 0, and all other failure codes are positive integers, it can also be used in boolean checks, e.g.:
 *
 * @example 
 * 
 * var err = method_that_returns_error()
 * if err != OK:
 *     print("Failure!")
 * # Or, equivalent:
 * if err:
 *     print("Still failing!")
 * @summary 
 * 
 *
*/
OK = 0,
/**
 * Generic error.
 *
*/
FAILED = 1,
/**
 * Unavailable error.
 *
*/
ERR_UNAVAILABLE = 2,
/**
 * Unconfigured error.
 *
*/
ERR_UNCONFIGURED = 3,
/**
 * Unauthorized error.
 *
*/
ERR_UNAUTHORIZED = 4,
/**
 * Parameter range error.
 *
*/
ERR_PARAMETER_RANGE_ERROR = 5,
/**
 * Out of memory (OOM) error.
 *
*/
ERR_OUT_OF_MEMORY = 6,
/**
 * File: Not found error.
 *
*/
ERR_FILE_NOT_FOUND = 7,
/**
 * File: Bad drive error.
 *
*/
ERR_FILE_BAD_DRIVE = 8,
/**
 * File: Bad path error.
 *
*/
ERR_FILE_BAD_PATH = 9,
/**
 * File: No permission error.
 *
*/
ERR_FILE_NO_PERMISSION = 10,
/**
 * File: Already in use error.
 *
*/
ERR_FILE_ALREADY_IN_USE = 11,
/**
 * File: Can't open error.
 *
*/
ERR_FILE_CANT_OPEN = 12,
/**
 * File: Can't write error.
 *
*/
ERR_FILE_CANT_WRITE = 13,
/**
 * File: Can't read error.
 *
*/
ERR_FILE_CANT_READ = 14,
/**
 * File: Unrecognized error.
 *
*/
ERR_FILE_UNRECOGNIZED = 15,
/**
 * File: Corrupt error.
 *
*/
ERR_FILE_CORRUPT = 16,
/**
 * File: Missing dependencies error.
 *
*/
ERR_FILE_MISSING_DEPENDENCIES = 17,
/**
 * File: End of file (EOF) error.
 *
*/
ERR_FILE_EOF = 18,
/**
 * Can't open error.
 *
*/
ERR_CANT_OPEN = 19,
/**
 * Can't create error.
 *
*/
ERR_CANT_CREATE = 20,
/**
 * Query failed error.
 *
*/
ERR_QUERY_FAILED = 21,
/**
 * Already in use error.
 *
*/
ERR_ALREADY_IN_USE = 22,
/**
 * Locked error.
 *
*/
ERR_LOCKED = 23,
/**
 * Timeout error.
 *
*/
ERR_TIMEOUT = 24,
/**
 * Can't connect error.
 *
*/
ERR_CANT_CONNECT = 25,
/**
 * Can't resolve error.
 *
*/
ERR_CANT_RESOLVE = 26,
/**
 * Connection error.
 *
*/
ERR_CONNECTION_ERROR = 27,
/**
 * Can't acquire resource error.
 *
*/
ERR_CANT_ACQUIRE_RESOURCE = 28,
/**
 * Can't fork process error.
 *
*/
ERR_CANT_FORK = 29,
/**
 * Invalid data error.
 *
*/
ERR_INVALID_DATA = 30,
/**
 * Invalid parameter error.
 *
*/
ERR_INVALID_PARAMETER = 31,
/**
 * Already exists error.
 *
*/
ERR_ALREADY_EXISTS = 32,
/**
 * Does not exist error.
 *
*/
ERR_DOES_NOT_EXIST = 33,
/**
 * Database: Read error.
 *
*/
ERR_DATABASE_CANT_READ = 34,
/**
 * Database: Write error.
 *
*/
ERR_DATABASE_CANT_WRITE = 35,
/**
 * Compilation failed error.
 *
*/
ERR_COMPILATION_FAILED = 36,
/**
 * Method not found error.
 *
*/
ERR_METHOD_NOT_FOUND = 37,
/**
 * Linking failed error.
 *
*/
ERR_LINK_FAILED = 38,
/**
 * Script failed error.
 *
*/
ERR_SCRIPT_FAILED = 39,
/**
 * Cycling link (import cycle) error.
 *
*/
ERR_CYCLIC_LINK = 40,
/**
 * Invalid declaration error.
 *
*/
ERR_INVALID_DECLARATION = 41,
/**
 * Duplicate symbol error.
 *
*/
ERR_DUPLICATE_SYMBOL = 42,
/**
 * Parse error.
 *
*/
ERR_PARSE_ERROR = 43,
/**
 * Busy error.
 *
*/
ERR_BUSY = 44,
/**
 * Skip error.
 *
*/
ERR_SKIP = 45,
/**
 * Help error.
 *
*/
ERR_HELP = 46,
/**
 * Bug error.
 *
*/
ERR_BUG = 47,
/**
 * Printer on fire error. (This is an easter egg, no engine methods return this error code.)
 *
*/
ERR_PRINTER_ON_FIRE = 48
    }
    

    declare enum PropertyHint {
      /**
 * No hint for the edited property.
 *
*/
PROPERTY_HINT_NONE = 0,
/**
 * Hints that an integer or float property should be within a range specified via the hint string `"min,max"` or `"min,max,step"`. The hint string can optionally include `"or_greater"` and/or `"or_lesser"` to allow manual input going respectively above the max or below the min values. Example: `"-360,360,1,or_greater,or_lesser"`.
 *
*/
PROPERTY_HINT_RANGE = 1,
/**
 * Hints that a float property should be within an exponential range specified via the hint string `"min,max"` or `"min,max,step"`. The hint string can optionally include `"or_greater"` and/or `"or_lesser"` to allow manual input going respectively above the max or below the min values. Example: `"0.01,100,0.01,or_greater"`.
 *
*/
PROPERTY_HINT_EXP_RANGE = 2,
/**
 * Hints that an integer, float or string property is an enumerated value to pick in a list specified via a hint string such as `"Hello,Something,Else"`.
 *
*/
PROPERTY_HINT_ENUM = 3,
/**
 * Hints that a float property should be edited via an exponential easing function. The hint string can include `"attenuation"` to flip the curve horizontally and/or `"inout"` to also include in/out easing.
 *
*/
PROPERTY_HINT_EXP_EASING = 4,
/**
 * Deprecated hint, unused.
 *
*/
PROPERTY_HINT_LENGTH = 5,
/**
 * Deprecated hint, unused.
 *
*/
PROPERTY_HINT_KEY_ACCEL = 7,
/**
 * Hints that an integer property is a bitmask with named bit flags. For example, to allow toggling bits 0, 1, 2 and 4, the hint could be something like `"Bit0,Bit1,Bit2,,Bit4"`.
 *
*/
PROPERTY_HINT_FLAGS = 8,
/**
 * Hints that an integer property is a bitmask using the optionally named 2D render layers.
 *
*/
PROPERTY_HINT_LAYERS_2D_RENDER = 9,
/**
 * Hints that an integer property is a bitmask using the optionally named 2D physics layers.
 *
*/
PROPERTY_HINT_LAYERS_2D_PHYSICS = 10,
/**
 * Hints that an integer property is a bitmask using the optionally named 3D render layers.
 *
*/
PROPERTY_HINT_LAYERS_3D_RENDER = 11,
/**
 * Hints that an integer property is a bitmask using the optionally named 3D physics layers.
 *
*/
PROPERTY_HINT_LAYERS_3D_PHYSICS = 12,
/**
 * Hints that a string property is a path to a file. Editing it will show a file dialog for picking the path. The hint string can be a set of filters with wildcards like `"*.png,*.jpg"`.
 *
*/
PROPERTY_HINT_FILE = 13,
/**
 * Hints that a string property is a path to a directory. Editing it will show a file dialog for picking the path.
 *
*/
PROPERTY_HINT_DIR = 14,
/**
 * Hints that a string property is an absolute path to a file outside the project folder. Editing it will show a file dialog for picking the path. The hint string can be a set of filters with wildcards like `"*.png,*.jpg"`.
 *
*/
PROPERTY_HINT_GLOBAL_FILE = 15,
/**
 * Hints that a string property is an absolute path to a directory outside the project folder. Editing it will show a file dialog for picking the path.
 *
*/
PROPERTY_HINT_GLOBAL_DIR = 16,
/**
 * Hints that a property is an instance of a [Resource]-derived type, optionally specified via the hint string (e.g. `"Texture"`). Editing it will show a popup menu of valid resource types to instantiate.
 *
*/
PROPERTY_HINT_RESOURCE_TYPE = 17,
/**
 * Hints that a string property is text with line breaks. Editing it will show a text input field where line breaks can be typed.
 *
*/
PROPERTY_HINT_MULTILINE_TEXT = 18,
/**
 * Hints that a string property should have a placeholder text visible on its input field, whenever the property is empty. The hint string is the placeholder text to use.
 *
*/
PROPERTY_HINT_PLACEHOLDER_TEXT = 19,
/**
 * Hints that a color property should be edited without changing its alpha component, i.e. only R, G and B channels are edited.
 *
*/
PROPERTY_HINT_COLOR_NO_ALPHA = 20,
/**
 * Hints that an image is compressed using lossy compression.
 *
*/
PROPERTY_HINT_IMAGE_COMPRESS_LOSSY = 21,
/**
 * Hints that an image is compressed using lossless compression.
 *
*/
PROPERTY_HINT_IMAGE_COMPRESS_LOSSLESS = 22
    }
    

    declare enum PropertyUsageFlags {
      /**
 * The property is serialized and saved in the scene file (default).
 *
*/
PROPERTY_USAGE_STORAGE = 1,
/**
 * The property is shown in the editor inspector (default).
 *
*/
PROPERTY_USAGE_EDITOR = 2,
/**
 * Deprecated usage flag, unused.
 *
*/
PROPERTY_USAGE_NETWORK = 4,
/**
 * Deprecated usage flag, unused.
 *
*/
PROPERTY_USAGE_EDITOR_HELPER = 8,
/**
 * The property can be checked in the editor inspector.
 *
*/
PROPERTY_USAGE_CHECKABLE = 16,
/**
 * The property is checked in the editor inspector.
 *
*/
PROPERTY_USAGE_CHECKED = 32,
/**
 * The property is a translatable string.
 *
*/
PROPERTY_USAGE_INTERNATIONALIZED = 64,
/**
 * Used to group properties together in the editor.
 *
*/
PROPERTY_USAGE_GROUP = 128,
/**
 * Used to categorize properties together in the editor.
 *
*/
PROPERTY_USAGE_CATEGORY = 256,
/**
 * The property does not save its state in [PackedScene].
 *
*/
PROPERTY_USAGE_NO_INSTANCE_STATE = 2048,
/**
 * Editing the property prompts the user for restarting the editor.
 *
*/
PROPERTY_USAGE_RESTART_IF_CHANGED = 4096,
/**
 * The property is a script variable which should be serialized and saved in the scene file.
 *
*/
PROPERTY_USAGE_SCRIPT_VARIABLE = 8192,
/**
 * Default usage (storage, editor and network).
 *
*/
PROPERTY_USAGE_DEFAULT = 7,
/**
 * Default usage for translatable strings (storage, editor, network and internationalized).
 *
*/
PROPERTY_USAGE_DEFAULT_INTL = 71,
/**
 * Default usage but without showing the property in the editor (storage, network).
 *
*/
PROPERTY_USAGE_NOEDITOR = 5
    }
    

    declare enum MethodFlags {
      /**
 * Flag for a normal method.
 *
*/
METHOD_FLAG_NORMAL = 1,
/**
 * Flag for an editor method.
 *
*/
METHOD_FLAG_EDITOR = 2,
/**
 * Deprecated method flag, unused.
 *
*/
METHOD_FLAG_NOSCRIPT = 4,
/**
 * Flag for a constant method.
 *
*/
METHOD_FLAG_CONST = 8,
/**
 * Deprecated method flag, unused.
 *
*/
METHOD_FLAG_REVERSE = 16,
/**
 * Flag for a virtual method.
 *
*/
METHOD_FLAG_VIRTUAL = 32,
/**
 * Deprecated method flag, unused.
 *
*/
METHOD_FLAG_FROM_SCRIPT = 64,
/**
 * Default method flags.
 *
*/
METHOD_FLAGS_DEFAULT = 1
    }
    

    declare enum Variant_Type {
      /**
 * Variable is `null`.
 *
*/
TYPE_NIL = 0,
/**
 * Variable is of type [bool].
 *
*/
TYPE_BOOL = 1,
/**
 * Variable is of type [int].
 *
*/
TYPE_INT = 2,
/**
 * Variable is of type [float] (real).
 *
*/
TYPE_REAL = 3,
/**
 * Variable is of type [String].
 *
*/
TYPE_STRING = 4,
/**
 * Variable is of type [Vector2].
 *
*/
TYPE_VECTOR2 = 5,
/**
 * Variable is of type [Rect2].
 *
*/
TYPE_RECT2 = 6,
/**
 * Variable is of type [Vector3].
 *
*/
TYPE_VECTOR3 = 7,
/**
 * Variable is of type [Transform2D].
 *
*/
TYPE_TRANSFORM2D = 8,
/**
 * Variable is of type [Plane].
 *
*/
TYPE_PLANE = 9,
/**
 * Variable is of type [Quat].
 *
*/
TYPE_QUAT = 10,
/**
 * Variable is of type [AABB].
 *
*/
TYPE_AABB = 11,
/**
 * Variable is of type [Basis].
 *
*/
TYPE_BASIS = 12,
/**
 * Variable is of type [Transform].
 *
*/
TYPE_TRANSFORM = 13,
/**
 * Variable is of type [Color].
 *
*/
TYPE_COLOR = 14,
/**
 * Variable is of type [NodePath].
 *
*/
TYPE_NODE_PATH = 15,
/**
 * Variable is of type [RID].
 *
*/
TYPE_RID = 16,
/**
 * Variable is of type [Object].
 *
*/
TYPE_OBJECT = 17,
/**
 * Variable is of type [Dictionary].
 *
*/
TYPE_DICTIONARY = 18,
/**
 * Variable is of type [Array].
 *
*/
TYPE_ARRAY = 19,
/**
 * Variable is of type [PoolByteArray].
 *
*/
TYPE_RAW_ARRAY = 20,
/**
 * Variable is of type [PoolIntArray].
 *
*/
TYPE_INT_ARRAY = 21,
/**
 * Variable is of type [PoolRealArray].
 *
*/
TYPE_REAL_ARRAY = 22,
/**
 * Variable is of type [PoolStringArray].
 *
*/
TYPE_STRING_ARRAY = 23,
/**
 * Variable is of type [PoolVector2Array].
 *
*/
TYPE_VECTOR2_ARRAY = 24,
/**
 * Variable is of type [PoolVector3Array].
 *
*/
TYPE_VECTOR3_ARRAY = 25,
/**
 * Variable is of type [PoolColorArray].
 *
*/
TYPE_COLOR_ARRAY = 26,
/**
 * Represents the size of the [enum Variant.Type] enum.
 *
*/
TYPE_MAX = 27
    }
    

    declare enum Variant_Operator {
      /**
 * Equality operator (`==`).
 *
*/
OP_EQUAL = 0,
/**
 * Inequality operator (`!=`).
 *
*/
OP_NOT_EQUAL = 1,
/**
 * Less than operator (`<`).
 *
*/
OP_LESS = 2,
/**
 * Less than or equal operator (`<=`).
 *
*/
OP_LESS_EQUAL = 3,
/**
 * Greater than operator (`>`).
 *
*/
OP_GREATER = 4,
/**
 * Greater than or equal operator (`>=`).
 *
*/
OP_GREATER_EQUAL = 5,
/**
 * Addition operator (`+`).
 *
*/
OP_ADD = 6,
/**
 * Subtraction operator (`-`).
 *
*/
OP_SUBTRACT = 7,
/**
 * Multiplication operator (`*`).
 *
*/
OP_MULTIPLY = 8,
/**
 * Division operator (`/`).
 *
*/
OP_DIVIDE = 9,
/**
 * Unary negation operator (`-`).
 *
*/
OP_NEGATE = 10,
/**
 * Unary plus operator (`+`).
 *
*/
OP_POSITIVE = 11,
/**
 * Remainder/modulo operator (`%`).
 *
*/
OP_MODULE = 12,
/**
 * String concatenation operator (`+`).
 *
*/
OP_STRING_CONCAT = 13,
/**
 * Left shift operator (`<<`).
 *
*/
OP_SHIFT_LEFT = 14,
/**
 * Right shift operator (`>>`).
 *
*/
OP_SHIFT_RIGHT = 15,
/**
 * Bitwise AND operator (`&`).
 *
*/
OP_BIT_AND = 16,
/**
 * Bitwise OR operator (`|`).
 *
*/
OP_BIT_OR = 17,
/**
 * Bitwise XOR operator (`^`).
 *
*/
OP_BIT_XOR = 18,
/**
 * Bitwise NOT operator (`~`).
 *
*/
OP_BIT_NEGATE = 19,
/**
 * Logical AND operator (`and` or `&&`).
 *
*/
OP_AND = 20,
/**
 * Logical OR operator (`or` or `||`).
 *
*/
OP_OR = 21,
/**
 * Logical XOR operator (not implemented in GDScript).
 *
*/
OP_XOR = 22,
/**
 * Logical NOT operator (`not` or `!`).
 *
*/
OP_NOT = 23,
/**
 * Logical IN operator (`in`).
 *
*/
OP_IN = 24,
/**
 * Represents the size of the [enum Variant.Operator] enum.
 *
*/
OP_MAX = 25
    }
    
    