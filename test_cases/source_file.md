
### test-name: source_file/tool_annotation

```typescript
@tool
export default class Test {
}
```
```gdscript
tool
class_name Test
```


### test-name: source_file/inner_class

```typescript
@inner
export class InnerTest {
  field: int = 2;
}
```
```gdscript
class InnerTest:
  var field: int = 2
```


### test-name: source_file/anonymous_class

```typescript
export default class extends Node2D {
}
```
```gdscript
extends Node2D
```

