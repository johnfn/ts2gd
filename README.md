# TypeScript 2 Godot

Combining the best gamedev experience with the best language.

![](output.gif)

## Why?

GDScript is a great language - it's perfectly designed for quick prototyping. But it lacks the type-safety and maturity of a language like TypeScript. By compiling TS into GD, we can get the best of both worlds: a rapid prototyping language that compiles virtually instantaneously, that also comes with excellent typesafety.

We can also get really, really good autocomplete and refactoring support.

## How?!

Compiling GDScript to TypeScript is actually pretty straightforward. Almost every keyword and control structure in GDScript compiles directly to a corresponding keyword or control structure in TypeScript.

## How it works

Add a tsgd.json file to your Godot project root:

```
{
  "destination": "./compiled",
  "source": "./src"
}
```

Now, run the compiler on tsgd.json:

`ts-node main.ts tsgd.json`

## Details and Differences

### Enums

Godot decides to put a bunch of enum values into global scope. I think this clutters things up: the global scope has tons of mostly useless enum values in it, and it's impossible to tell what property belongs to which enum. So we move them into `EnumName.PropertyName` instead. This is extra nice because now if you type `EnumName` you get autocomplete of all the types in that Enum.

For instance,

```
Input.is_key_pressed(KEY_W)
```

becomes

```
Input.is_key_pressed(KeyList.KEY_SPACE)
```

For the full list of namespaced enums, you can see the generated @globals.d.ts file.

In the future, this could become a configuration setting on tsgd.json.

### Autoloads

Autoloads are a little quirky in ts2gd because TS has no way to support only-static classes.

Be sure to mark all properties and methods of an autoload class `static`. If you don't, you'll probably run into errors.

We really should have a way to provide an error for this case.

#### Autoload node resolution

Note that `get_node()` on an autoloaded class will autocomplete to nodes found in the main scene (the scene that Godot launches at the start of the game). Since the autoload class initializes when the game starts, this is accurate.

### yield

Godot lets you do `yield(object, signal)`. We'd like to autocomplete signal names, but `yield` is a keyword in TypeScript, which can't provide completion like functions can. So, you can continue to use `yield` if you'd like, but you can also use the global function `Yield`. `Yield` works just like `yield` but provides type completion on the signal argument.

### Vector2 / Vector3 operator overloading

TypeScript sadly has no support for operator overloading.

There are two alternatives:

#### Use my forked TypeScript compiler

I forked TS and added support for Vectors, so you can do `Vector2(1, 1) + Vector(2, 2)` like normal.

#### Use replacement methods

I realize that using a forked TS compiler might not be the best option for everyone, so I provide an alternative solution.

```
const v1 = Vector(1, 2)
const v2 = Vector(1, 2);

v1.add(v2); // v1 + v2
v1.sub(v2); // v1 - v2
v1.mul(v2); // v1 * v2
v1.div(v2); // v1 / v2
```

The add/sub/mul/div gets compiled into the corresponding arithmatic.

# Roadmap

## Road to usability

- [x] load("myscene.tscn) should return a `PackedScene<T>` where T is the type of the root node of the scene
- [x] `connect()`
- [x] When i migrate to only using compiled gdscripts, adjust the imports() appropriately to figure out where the compiled versions are.
- [x] Compile "Yield" to "yield"
- [x] Translate `add()`, `sub()`, etc
- [x] mark int/float in API
- [x] add documentation for class names.
- [x] With int/float, mark down the variables we've determined to be int/float so we can use that information rather than TS telling us that everything is number.
- [x] Autocomplete relative node paths as well as absolute ones
- [x] `extends` must be transpiled before everything else, including enum declarations and other top level things
- [x] Godot expects methods like \_process to _always_ have a float parameter, but TS does not require this. It should be added implicitly.
- [ ] explain tne `enum` thing better
- [ ] @node annotations to say which node a class belongs to
- [ ] How come I can't call get_tree() on a class that extends Object?
- [x] handle parameters to \_functions that aren't provided in TS by autofilling them in Godot
- [x] `callables`
- [x] Handle passing anonymous functions around - probably with funcref for now.
- [ ] Handle the thing where if u never yield its never a coroutine
- [ ] Either allow the user to point their ts2gd at a godot source download, or more likely, just grab it from online? Idk.
- [ ] Fallthrough cases in switch are currently not supported.
- [ ] generate Godot without warnings (as much as possible)
- [ ] `tool`
- [ ] it would be very nice to be able to pass in anonymous functions in place of callables, and have the compiler sort that out.

## Road to superior development

- [ ] Autoload classes should have an @annotation and then get automatically added to the project
- [x] get_nodes_in_group should parse scene to determine a more accurate return type
- [x] Mark unused variables with \_ to avoid warnings
- [x] parse the bbcode in the XML into markdown that TS can read.
- [x] when scenes are updated, update their corresponding definition files
- [ ] create scripts and attach them to nodes directly through the editor - perhaps with @Node("/blah")
- [ ] don't hide object autocomplete names
- [ ] strongly type input action names
- [x] handle renames better - delete the old compiled file, etc.
- [ ] refactoring class names doesn't really work right now because i think we need to rename types in tscn files...
- [ ] would be nice to declare multiple classes in the same .ts file and have the compiler sort it out
- [ ] add a way to install ts2gd as a global command
- [x] ensure that signal arguments match up
- [ ] add a way to use ts2gd via installer rather than command line
- [ ] Whether to hide away constants into enums or not could be parameterizeable. It is _correct_ to hide them into enums, but it will be confusing for people who haven't read the README, which is probably everyone.
- [ ] Some sort of error if an autoload class is not entirely static.
- [x] yield(this.get_tree(), "idle_frame"); could autocomplete idle_frame? it's possible: just get all the signals on the object.
- [ ] Fancy TS/JS features
  - [ ] destructuring
  - [ ] ... spread operator
- [x] Map, filter, etc? even though they aren't part of godot, it would be nice to have them.
- [ ] Skip compiled/
- [x] ../ node paths (note: impossible)
- [x] Break our assumption that filename === classname
- [ ] Onready vs nonready - maybe we don't have to mark everything as an onready var? Is there an advantage to so doing?
- [x] ts2gd: Handle adding new files.
- [x] ts2gd: Handle deleting old files.
- [x] ts2gd: Random newlines at beginning of file.
- [ ] Is there a better way to do Dictionary, with strongly typed k/v?
- [ ] Sourcemaps / debugging???
- [ ] use LSP to handle operator overloading, sourcemap issues...?!?
