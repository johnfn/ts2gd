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

```ts-node main.ts tsgd.json```

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

### Vector2 / Vector3 operator overloading

For now, TypeScript sadly has no support for operator overloading. 

But for now, you have to write code like this:

```
const v1 = Vector(1, 2)
const v2 = Vector(1, 2);

v1.add(v2); // v1 + v2
v1.sub(v2); // v1 - v2
v1.mul(v2); // v1 * v2
v1.div(v2); // v1 / v2
```

The add/sub/mul/div will get compiled into the corresponding arithmatic.

Yeah, it kinda sucks. This is a huge bummer, and I'm still thinking about alternate approaches here. (I'm highly tempted to fork the TypeScript LSP. HIGHLY TEMPTED.)

# Roadmap

## Road to usability

- [ ] load("myscene.tscn) should return a `PackedScene<T>` where T is the type of the root node of the scene
- [ ] add documentation for class names.
- [ ] Autocomplete relative node paths as well as absolute ones
- [ ] `callables`
- [ ] `connect()`
- [ ] Translate `add()`, `sub()`, etc
- [ ] When i migrate to only using compiled gdscripts, adjust the imports() appropriately to figure out where the compiled versions are.
- [ ] Handle passing anonymous functions around - probably with funcref for now.
- [ ] `extends` must be transpiled before everything else, including enum declarations and other top level things
- [ ] Handle the thing where if u never yield its never a coroutine
- [ ] Have a way to mark int vs float, even though it's not particulary typesafe

## Road to superior development
- [ ] would be nice to declare multiple classes in the same .ts file and have the compiler sort it out
- [ ] get_nodes_in_group should parse scene to determine a more accurate return type
- [ ] add a way to install ts2gd as a global command
- [ ] add a way to use ts2gd via installer rather than command line
- [ ] Whether to hide away constants into enums or not could be parameterizeable. It is *correct* to hide them into enums, but it will be confusing for people who haven't read the README, which is probably everyone. 
- [ ] Some sort of error if an autoload class is not entirely static.
- [ ] yield(this.get_tree(), "idle_frame"); could autocomplete idle_frame? it's possible: just get all the signals on the object.
- [ ] Fancy TS/JS features
  * [ ] destructuring
  * [ ] ... spread operator
- [ ] Map, filter, etc? even though they aren't part of godot, it would be nice to have them. 
- [ ] Skip compiled/
- [ ] ../ node paths
- [ ] Break our assumption that filename === classname
- [ ] handle actions
- [ ] Onready vs nonready - maybe we don't have to mark everything as an onready var? Is there an advantage to so doing?
- [ ] ts2gd: Handle adding new files.
- [ ] ts2gd: Handle deleting old files.
- [ ] ts2gd: Random newlines at beginning of file.
- [ ] Mark unused variables with _ to avoid warnings
- [ ] Rewrite the code so you dont even need to add autoload classes bc they just get auto registered.
- [ ] Is there a better way to do Dictionary, with strongly typed k/v?
- [ ] Sourcemaps / debugging???
- [ ] use LSP to handle operator overloading, sourcemap issues...?!?
