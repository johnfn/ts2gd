
### test-name: class_declaration/inner_class_extends

```typescript
export default class Test {
}

export class InnerTest extends Node2D {
  field: int = 2;
}
```
```gdscript
class_name Test

class InnerTest extends Node2D:
  var field: int = 2
```


### test-name: class_declaration/inner_class_extends_super_call

```typescript
export default class Test {
}

export class InnerTest extends Node2D {
  field: int = 2;

  constructor() {
    super();
  }
}
```
```gdscript
class_name Test

class InnerTest extends Node2D:
  var field: int = 2
  func _init().():
    pass
```


### test-name: class_declaration/file_without_default_class

```typescript
class Foo {
  x = 1
}

export class Foo2 {
  y = 1
}
```
```gdscript
class_name Foo2

class Foo:
  var x: int = 1

var y: int = 1
```


### test-name: class_declaration/dont_require_exporting_autoloads

```typescript
@autoload()
export default class Foo extends Node {
  x = 1
}
```
```gdscript
extends Node
var x: int = 1
```


### test-name: class_declaration/main_decorator_autoload

```typescript
@autoload()
export default class Foo {
  x = 1
}

export class Bar {

}
```
```gdscript
class Bar:
  pass
var x: int = 1
```


### test-name: class_declaration/autoload_must_be_main_class

```typescript
@autoload
export class Foo {
  x = 1
}

export default class Bar {
  y = 2
}
```
```error
Only the main class can be autoloaded. You can make this the main class either by exporting it as default, or using @main. For example:

@autoload export default class Foo { // ...

Or:

@autoload @main export class Foo { // ...
```


### test-name: class_declaration/export_args_set_get

```typescript
export default class Foo {
  @exports
  get nodes(): PackedScene<Node2D>[] {
      return [];
  }

  set nodes(v: PackedScene<Node2D>[]) {

  }
}
```
```gdscript
class_name Foo
export(Array, PackedScene) var nodes setget nodes_set, nodes_get
func nodes_get():
  return []
func nodes_set(_v):
  pass
```


### test-name: class_declaration/dont_require_default_exporting_autoloads

```typescript
@autoload
@inner
class Foo {
  x = 1
}
```
```error
Only the main class can be autoloaded. You can make this the main class either by exporting it as default, or using @main. For example:

@autoload export default class Foo { // ...

Or:

@autoload @main export class Foo { // ...
```


### test-name: class_declaration/multiple_classes_without_marking

```typescript
class Foo {
  x = 1
}

class Bar {
  x = 1
}
```
```error
Please mark one of Foo, Bar as the main class using 'export default' or '@main' decorator. For example:

export default class Foo { // ...

Or:

@main export class Foo { // ...
```


### test-name: class_declaration/multiple_classes_with_main_marking

```typescript
@main
export class Foo {
  x = 1
}

class Bar {
  y = 1
}
```
```gdscript
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
```


### test-name: class_declaration/multiple_classes_with_inner_marking

```typescript
export class Foo {
  x = 1
}

@inner
class Bar {
  y = 1
}
```
```gdscript
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
```


### test-name: class_declaration/multiple_classes_with_default_marking

```typescript
export default class Foo {
  x = 1
}

class Bar {
  y = 1
}
```
```gdscript
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
```


### test-name: class_declaration/multiple_classes_with_export_marking

```typescript
export class Foo {
  x = 1
}

class Bar {
  y = 1
}
```
```gdscript
class_name Foo

class Bar:
  var y: int = 1

var x: int = 1
```


### test-name: class_declaration/multiple_classes_with_main_marking_fail

```typescript
@main
class Foo {
  x = 1
}

class Bar {
  y = 1
}
```
```error
Main class Foo must be exported. For example:

export default class Foo { // ...
```


### test-name: class_declaration/main_class_not_exported

```typescript
class Foo {
  y = 1
}
```
```error
Main class Foo must be exported. For example:

export default class Foo { // ...
```


### test-name: class_declaration/multiple_classes_with_inner_marking2

```typescript
@inner
export class Foo {
  x = 1
}

@inner
class Bar {
  y = 1
}
```
```gdscript
class Foo:
  var x: int = 1

class Bar:
  var y: int = 1
```

