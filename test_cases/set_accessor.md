
### test-name: set_accessor/get

```typescript
export class Foo {
  _x: float;
  set x(value: float) { _x = value; }
}
```
```gdscript
class_name Foo
var x setget x_set,
var _x: float
func x_set(value: float):
  _x = value
```

