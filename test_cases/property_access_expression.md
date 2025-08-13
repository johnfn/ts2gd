
### test-name: property_access_expression/access

```typescript
let foo = { bar: 1 }
print(foo.bar)
```
```gdscript
var foo = { "bar": 1 }
print(foo.bar)
```


### test-name: property_access_expression/access_rewriting

```typescript
let foo = { bar: 1 }
if (foo.bar) {
  print (foo.bar)
}
```
```gdscript
var foo = { "bar": 1 }
if foo.bar:
  print(foo.bar)
```


### test-name: property_access_expression/access_rewriting2

```typescript
let foo: { bar?: int } = { bar: 1 as int }
if (foo.bar === 1 as int) {
  print (foo.bar)
}
```
```gdscript
var foo = { "bar": 1 }
if ((typeof((foo.bar if foo.has("bar") else null)) == typeof(1)) and ((foo.bar if foo.has("bar") else null) == 1)):
  print(foo.bar)
```


### test-name: property_access_expression/nullable_access

```typescript
let foo: { bar: number | null } = { bar: 1 }
print(foo.bar)
```
```gdscript
var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
```


### test-name: property_access_expression/optional_access

```typescript
let foo: { bar?: number } = { bar: 1 }
print(foo.bar)
```
```gdscript
var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
```


### test-name: property_access_expression/optional_assignment

```typescript
let foo: { bar?: number } = { bar: 1 }
foo.bar = 2
```
```gdscript
var foo = { "bar": 1 }
foo.bar = 2
```


### test-name: property_access_expression/complex_lhs

```typescript
let foo: { bar?: number }[] = [{ bar: 1 }]
foo[0].bar = 2
```
```gdscript
var foo = [{ "bar": 1 }]
foo[0].bar = 2
```


### test-name: property_access_expression/no_self_for_signal

```typescript
export class Test {
  $mouseenter!: Signal<[]>;

  test() {
    this.$mouseenter.emit()
  }
}
```
```gdscript
class_name Test
signal mouseenter

func test():
  self.emit_signal("mouseenter")
```


### test-name: property_access_expression/add_self_for_params

```typescript
export class Test {
  a: float
  b: string

  test(a: float, b: string) {
    this.a = a;
    this.b = b;
  }
}
```
```gdscript
class_name Test
var a: float
var b: String
func test(a: float, b: String):
  self.a = a
  self.b = b
```


### test-name: property_access_expression/null_coalesce

```typescript
export class Test {
  test() {
    const foo: string | null = "hello"

    print(foo?.bar)
  }
}
```
```gdscript
class_name Test
func test():
  var foo = "hello"
  var __gen = foo
  print((__gen.bar if __gen != null else null))
```


### test-name: property_access_expression/null_coalesce2

```typescript
export class Test {
  test() {
    const foo: string | null = "hello"

    print((foo + "a")?.bar)
  }
}
```
```gdscript
class_name Test
func test():
  var foo = "hello"
  var __gen = (foo + "a")
  print((__gen.bar if __gen != null else null))
```


### test-name: property_access_expression/null_coalesce3

```typescript
export class Test {
  foo: string | null = "hello"

  test(): void {
    print(this.foo?.bar)
  }
}
```
```gdscript
class_name Test
var foo = "hello"
func test():
  var __gen = self.foo
  print((__gen.bar if __gen != null else null))
```


### test-name: property_access_expression/null_coalesce4

```typescript
export class Test {
  test(): void {
    let foo: Test | null = null as (Test | null)
    print(foo?.test())
  }
}
```
```gdscript
class_name Test
func test():
  var foo = null
  var __gen = foo
  var __gen1 = [funcref(__gen, "test") if __gen != null else null, {}, null]
  var __gen2 = __gen1[0].call_func() if __gen1 != null else null
  print(__gen2)
```


### test-name: property_access_expression/null_coalesce5

```typescript
export class Test {
  test(x: int): void {
    let foo: Test | null = null as (Test | null)
    print(foo?.test(1))
  }
}
```
```gdscript
class_name Test
func test(_x: int):
  var foo = null
  var __gen = foo
  var __gen1 = [funcref(__gen, "test") if __gen != null else null, {}, null]
  var __gen2 = __gen1[0].call_func(1) if __gen1 != null else null
  print(__gen2)
```


### test-name: property_access_expression/property_convert_to_func_ref

```typescript
export class Test extends Area2D {
  foo(arg: () => void) {

  }

  bar() {
    this.foo(this.foo)
  }
}
```
```gdscript
extends Area2D
class_name Test
func foo(arg):
  pass

func bar():
  this.foo(funcref(self, "foo"))
```
```skip
Not implemented yet, see https://github.com/funexpected/tsgd/issues/4
```


### test-name: property_access_expression/complicated_lib_func

```typescript
export class Test extends Area2D {
  test() {
    const maybeVec = randi() ? Vector2(0, 0) : null
    const foo = maybeVec?.mul(4)
  }
}
```
```gdscript
extends Area2D
class_name Test
func test():
  var maybeVec = Vector2(0, 0) if randi() else null
  var __gen = maybeVec
  var __gen1 = [funcref(self, "mul_vec_lib") if __gen != null else null, {}, __gen]
  var __gen2 = __gen1[0].call_func(__gen1[2], 4) if __gen1 != null else null
  var _foo = __gen2
```


### test-name: property_access_expression/static_class_method_invoke

```typescript
export class Test extends Area2D {
  constructor() {
    super()
    Test.test()
  }

  static test() {
    print("static")
  }
}
```
```gdscript
extends Area2D
class_name Test
func _ready():
  self.test()
static func test():
  print("static")
```

