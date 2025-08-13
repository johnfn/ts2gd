
### test-name: method_declaration/process_gets_args_added

```typescript
export class Foo extends Node2D {
  _process() {}
}
```
```gdscript
extends Node2D
class_name Foo
func _process(_delta: float):
  pass
```


### test-name: method_declaration/process_doesnt_get_args_added

```typescript
export class Foo extends Node2D {
  _process(d: float) {}
}
```
```gdscript
extends Node2D
class_name Foo
func _process(_d: float):
  pass
```


### test-name: method_declaration/default_value

```typescript
export class Foo extends Node2D {
  testDefault(a = 1) { }
}
```
```gdscript
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]"):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
```


### test-name: method_declaration/default_values

```typescript
export class Foo extends Node2D {
  testDefault(a = 1, b = 2) {
    print("OK")
    print("OK")
  }
}
```
```gdscript
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]", b = "[no value passed in]"):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
  b = (2 if (typeof(b) == TYPE_STRING and b == "[no value passed in]") else b)
  print("OK")
  print("OK")
```


### test-name: method_declaration/default_values_self_reference

```typescript
export class Foo extends Node2D {
  testDefault(a = 1, b: int = a) {
  }
}
```
```gdscript
extends Node2D
class_name Foo
func testDefault(a = "[no value passed in]", b = "[no value passed in]"):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
  b = (a if (typeof(b) == TYPE_STRING and b == "[no value passed in]") else b)
```


### test-name: method_declaration/static_method

```typescript
export class Foo extends Node2D {
  static staticMethod() {}
}
```
```gdscript
extends Node2D
class_name Foo

static func staticMethod():
  pass
```

