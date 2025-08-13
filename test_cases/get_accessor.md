
### test-name: get_accessor/get

```typescript
export class Foo {
  _x;
  get x() { return this._x; }
}
```
```gdscript
class_name Foo
var x setget , x_get
var _x
func x_get():
  return self._x
```


### test-name: get_accessor/exporting_get_set_big

```typescript
export class Test {
  @exports
  set label(text: string) {
    if (this.LI) {
      this.LI.text = text;
    }
  }

  get label(): string {
    return this.LI?.text ?? "";
  }
}
```
```gdscript
class_name Test
export(String) var label setget label_set, label_get
func label_set(text: String):
  if self.LI:
    self.LI.text = text
func label_get():
  var __gen = self.LI
  return ((__gen.text if __gen != null else null) if ((__gen.text if __gen != null else null)) != null else "")
```


### test-name: get_accessor/exporting_get_set2

```typescript
export class Test {
  set label(text: string) {
  }

  @exports
  get label(): string {
    return ""
  }
}
```
```gdscript
class_name Test
export(String) var label setget label_set, label_get
func label_set(_text: String):
  pass
func label_get():
  return ""
```


### test-name: get_accessor/exporting_get_set_both

```typescript
export class Test {
  @exports
  set label(text: string) {
  }

  @exports
  get label(): string {
    return ""
  }
}
```
```gdscript
class_name Test
export(String) var label setget label_set, label_get
func label_set(_text: String):
  pass
func label_get():
  return ""
```

