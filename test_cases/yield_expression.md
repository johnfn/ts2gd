
### test-name: yield_expression/yield_signal

```typescript
export class Test {
  *test(): void {
    yield this.get_tree().$idle_frame
  }
}
```
```gdscript
class_name Test
func test():
  yield(self.get_tree(), "idle_frame")
```


### test-name: yield_expression/yield_signal2

```typescript
export class Test {
  $mysignal: Signal
  *test(): void {
    yield this.$mysignal
  }
}
```
```gdscript
class_name Test
signal mysignal
func test():
  yield(self, "mysignal")
```

