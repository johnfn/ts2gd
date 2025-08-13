
### test-name: variable_declaration_list/vdl

```typescript
let a = 1, b = 2
print(a)
print(b)
```
```gdscript
var a: int = 1
var b: int = 2
print(a)
print(b)
```


### test-name: variable_declaration_list/vdl2

```typescript
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;
    this.print(1)
  }
}
```
```gdscript
extends Area2D
class_name Test
func _ready():
  var _x: int = 1
  var _y: int = 2
  self.print(1)
```

