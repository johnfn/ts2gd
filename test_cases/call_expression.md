
### test-name: call_expression/basic_call

```typescript
foo("bar")
```
```gdscript
foo("bar")
```


### test-name: call_expression/add_vec

```typescript
const v1: Vector2; const v2: Vector2; v1.add(v2)
```
```gdscript
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
var v1
var v2
add_vec_lib(v1, v2)
```


### test-name: call_expression/add_vec2

```typescript
const foo: { v: Vector2; }; const v2: Vector2; foo.v.add(v2)
```
```gdscript
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
var foo
var v2
add_vec_lib(foo.v, v2)
```


### test-name: call_expression/normal_vec

```typescript
const v1: Vector2; v1.distance_to(v1)
```
```gdscript
var v1
v1.distance_to(v1)
```


### test-name: call_expression/arrow_scoping

```typescript
export class Foo {
  a() {
    const a = () => {};
  }

  b() {
    const b = () => {};
  }
}
```
```gdscript
class_name Foo
func __gen(captures):
  pass
func __gen1(captures):
  pass
func a():
  var _a = [funcref(self, "__gen"), {}]
func b():
  var _b = [funcref(self, "__gen1"), {}]
```


### test-name: call_expression/arrow_function

```typescript
const test = () => 5;
test()
```
```gdscript
func __gen(captures):
  return 5
var test = [funcref(self, "__gen"), {}]
test[0].call_func(test[1])
```


### test-name: call_expression/map

```typescript
let x: string[] = ['a', 'b', 'c']
x.map(y => y + '1')
```
```gdscript
func __map(list, fn):
  var result = []

  for item in list:
    result.append(fn[0].call_func(item, fn[1]))

  return result
    
func __gen(y: String, captures):
  return y + "1"
var x = ["a", "b", "c"]
__map(x, [funcref(self, "__gen"), {}])
```


### test-name: call_expression/map_capture

```typescript
let x = [1, 2, 3]
let z = 5
let big = { a : 6 }
x.map((y: int) => {
  return z + big.a + y * 3
})
```
```gdscript
func __map(list, fn):
  var result = []

  for item in list:
    result.append(fn[0].call_func(item, fn[1]))

  return result
    
func __gen(y: int, captures):
  var z = captures.z
  var big = captures.big
  return z + big.a + y * 3
var x = [1, 2, 3]
var z: int = 5
var big = { "a": 6 }
__map(x, [funcref(self, "__gen"), {"z": z, "big": big}])
```


### test-name: call_expression/rewrite_dict_put

```typescript
let d = todict({ 'a': 1 })
d.put('b', 2)
```
```gdscript
var d = { "a": 1 }
d["b"] = 2
```


### test-name: call_expression/connect

```typescript
export class Test extends Area2D {
  constructor() {
    super()

    this.$body_entered.connect(this.on_body_entered)
  }

  on_body_entered(body: Node) {

  }
}
```
```gdscript
extends Area2D
class_name Test
func _ready():
  self.connect("body_entered", self, "on_body_entered")
func on_body_entered(_body):
  pass
```
```skip
This should work, fix me!
```


### test-name: call_expression/connect2

```typescript
export class Test extends Area2D {
  constructor() {
    super()

    let x = 5
    this.$body_entered.connect((body: Node) => { print(body) })
  }
}
```
```gdscript
extends Area2D
class_name Test
func __gen(body, captures):
  print(body)
func _ready():
  var _x: int = 5
  self.connect("body_entered", self, "__gen", [{}])
```


### test-name: call_expression/connect_with_closures

```typescript
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;

    this.$body_entered.connect((body: Node) => { print(x + y) })
  }
}
```
```gdscript
extends Area2D
class_name Test
func __gen(_body, captures):
  var x = captures.x
  var y = captures.y
  print(x + y)
func _ready():
  var x: int = 1
  var y: int = 2
  self.connect("body_entered", self, "__gen", [{"x": x, "y": y}])
```


### test-name: call_expression/connect_with_closures_no_this

```typescript
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;

    this.$body_entered.connect((body: Node) => { this.print(x + y) })
  }
}
```
```gdscript
extends Area2D
class_name Test
func __gen(_body, captures):
  var x = captures.x
  var y = captures.y
  self.print(x + y)
func _ready():
  var x: int = 1
  var y: int = 2
  self.connect("body_entered", self, "__gen", [{"x": x, "y": y}])
```


### test-name: call_expression/connect_complex

```typescript
export class Test {
  enemies: any;

  foo() {
    let enem: any;

    enem.$on_die.connect(() => { this.enemies.erase(enem) });
  }
}
```
```gdscript
class_name Test
func __gen(captures):
  var enem = captures.enem
  self.enemies.erase(enem)
var enemies
func foo():
  var enem
  enem.connect("on_die", self, "__gen", [{"enem": enem}])
```


### test-name: call_expression/rewrite_dict_put2

```typescript
let d = todict({ 'a': 1 })
d.put([1, 2], 2)
```
```gdscript
var d = { "a": 1 }
d[[1, 2]] = 2
```


### test-name: call_expression/emit_signal

```typescript
export class CityGridCollision extends Area {
  $mouseenter!: Signal<[]>;
  test() {
    this.$mouseenter.emit()
  }
}
```
```gdscript
extends Area
class_name CityGridCollision
signal mouseenter
func test():
  self.emit_signal("mouseenter")
```


### test-name: call_expression/double_map

```typescript
let a: string[] = []
a.filter(x => x).map(x => x)
```
```gdscript
func __filter(list, fn):
  var result = []

  for item in list:
    if fn[0].call_func(item, fn[1]):
      result.append(item)

  return result
    

func __map(list, fn):
  var result = []

  for item in list:
    result.append(fn[0].call_func(item, fn[1]))

  return result
    
func __gen(x: String, captures):
  return x
func __gen1(x: String, captures):
  return x
var a = []
__map(__filter(a, [funcref(self, "__gen"), {}]), [funcref(self, "__gen1"), {}])
```


### test-name: call_expression/rewrite_get_node

```typescript
export class Test {
  foo() {
    this.get_node('hello')
  }
}
```
```gdscript
class_name Test

func foo():
  self.get_node("hello")
```


### test-name: call_expression/rewrite_get_node2

```typescript
export class Test {
  foo() {
    this.get_node_unsafe('hello')
  }
}
```
```gdscript
class_name Test

func foo():
  self.get_node("hello")
```


### test-name: call_expression/double_capture

```typescript
let big = { a : 6 }
let x = []
x.map(() => {
  return big.a + big.a
})
```
```gdscript
func __map(list, fn):
  var result = []

  for item in list:
    result.append(fn[0].call_func(item, fn[1]))

  return result
    
func __gen(captures):
  var big = captures.big
  return big.a + big.a
var big = { "a": 6 }
var x = []
__map(x, [funcref(self, "__gen"), {"big": big}])
```


### test-name: call_expression/function_null

```typescript
declare class Foo {
    x(): number | null;
  }

  export class Test {
    example() {
      const thing: Foo = new Foo()
      let result = thing.x()

      if (result) {
        print("Woohoo")
      }
    }
  }
```
```gdscript
class_name Test
func example():
  var thing = Foo.new()
  var result = thing.x()
  if result:
    print("Woohoo")
```


### test-name: call_expression/rewrite_get_node_unsafe

```typescript
let x: Node = 0 as any
x.get_node_unsafe("Foo")
```
```gdscript
var x = 0
x.get_node("Foo")
```


### test-name: call_expression/connect_directly_to_sig

```typescript
export class Test extends Area2D {
  $mysig!: Signal

  constructor() {
    super()

    this.$mysig.connect(() => {
      print("OK")
    })
  }
}
```
```gdscript
extends Area2D
class_name Test
func __gen(captures):
  print("OK")
signal mysig
func _ready():
  self.connect("mysig", self, "__gen", [{}])
```


### test-name: call_expression/nested_direct_signal_connect

```typescript
export class Test extends Area2D {
  $mysig!: Signal
  test!: Test

  constructor() {
    super()

    this.test.$mysig.connect(() => {
      print("OK")
    })

    this.test.$mysig.emit()
    this.$mysig.emit(1, 2, 3)
  }
}
```
```gdscript
extends Area2D
class_name Test
func __gen(captures):
  print("OK")
signal mysig
var test
func _ready():
  self.test.connect("mysig", self, "__gen", [{}])
  self.test.emit_signal("mysig")
  self.emit_signal("mysig", 1, 2, 3)
```


### test-name: call_expression/rpc_rewrite

```typescript
export class Test extends Area2D {
  rpc_me() {

  }

  rpc_me_2() {

  }

  rpc_me_3() {

  }

  constructor() {
    super()

    this.rpc_me.rpc()
    this.rpc_me_2.rpc(1, 2, 3)
    this.rpc_me_3.rpc_id(1, "egg")
  }
}
```
```gdscript
extends Area2D
class_name Test
func rpc_me():
  pass
func rpc_me_2():
  pass
func rpc_me_3():
  pass
func _ready():
  self.rpc("rpc_me")
  self.rpc("rpc_me_2", 1, 2, 3)
  self.rpc_id(1, "rpc_me_3", "egg")
```


### test-name: call_expression/pass_in_function

```typescript
export class Test extends Area2D {
  fn(other: () => void) {
    other()
  }

  constructor() {
    super()

    const fnObject = () => {}

    this.fn(() => {})
    fnObject()
  }
}
```
```gdscript
extends Area2D
class_name Test
func __gen(captures):
  pass
func __gen1(captures):
  pass
func fn(other):
  other[0].call_func(other[1])
func _ready():
  var fnObject = [funcref(self, "__gen"), {}]
  self.fn([funcref(self, "__gen1"), {}])
  fnObject[0].call_func(fnObject[1])
```


### test-name: call_expression/lib_function

```typescript
let test = [Vector2.UP, Vector2.DOWN].random_element()?.mul(5)
```
```gdscript
func __random_element(list):
  if len(list) == 0:
    return null
  return list[randi() % len(list)]
var __gen = __random_element([Vector2.UP, Vector2.DOWN])
var __gen1 = [funcref(self, "mul_vec_lib") if __gen != null else null, {}, __gen]
var __gen2 = __gen1[0].call_func(__gen1[2], 5) if __gen1 != null else null
var _test = __gen2
```

