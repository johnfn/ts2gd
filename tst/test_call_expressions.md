
### test-name: call_expressions/basic-call
```typescript
foo("bar")
```
```gdscript
foo("bar")
```

### test-name: call-expressions/add-vec
TODO: don't check vecs for null, don't generate extra method, just add inline
```typescript
const v1: Vector2
const v2: Vector2
v1.add(v2)
```
```gdscript
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
var v1
var v2
add_vec_lib(v1, v2)
```

### test-name: call-expressions/add-vec-2
TODO: don't check vecs for null, don't generate extra method, just add inline:
like `foo.v.add(v2)` -> `foo.v + v2`
```typescript
const foo: {
    v: Vector2
}
const v2: Vector2
foo.v.add(v2)
```
```gdscript
func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
var foo
var v2
add_vec_lib(foo.v, v2)
```

### test-name: call-expressions/normal-vec
```typescript
  const v1: Vector2
  v1.distance_to(v1)
```
```gdscript
var v1
v1.distance_to(v1)
```

### test-name: call-expressions/arrow-scoping
TODO: use uniform separate context objects for closures
```typescript
export class Foo {
  a() {
    const a = () => {}
  }
  b() {
    const b = () => {}
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
