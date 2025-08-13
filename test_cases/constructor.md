
### test-name: constructor/constructor_no_body

```typescript
export class Test {
  constructor();
}
```
```gdscript
class_name Test

func _ready():
  pass
```


### test-name: constructor/constructor_empty_body

```typescript
export class Test {
  constructor() {

  }
}
```
```gdscript
class_name Test

func _ready():
  pass
```


### test-name: constructor/constructor

```typescript
export class Test {
  constructor() {
    print("Hello");
  }
}
```
```gdscript
class_name Test

func _ready():
  print("Hello")
```


### test-name: constructor/inner_class_constructor_empty_body

```typescript
@inner
export class Test {
  constructor() {

  }
}
```
```gdscript
class Test:
  func _init():
    pass
```


### test-name: constructor/extended_inner_class_constructor_no_body

```typescript
@inner
export class Test extends Node2D {
  constructor();
}
```
```gdscript
class Test extends Node2D:
  func _init():
    pass
```


### test-name: constructor/extended_inner_class_constructor

```typescript
@inner
export class Test extends Node2D {
  constructor() {
    super();
    print("Hello");
  }
}
```
```gdscript
class Test extends Node2D:
  func _init().():
    print("Hello")
```


### test-name: constructor/extended_inner_class_constructor_with_arguments

```typescript
class Base extends Node2D {
  constructor(name: string) {
    super();
    print(name);
  }
}

export class Test extends Base {
  constructor() {
    super("TestName");
  }
}
```
```gdscript
extends Base
class_name Test

class Base extends Node2D:
  func _init(name: String).():
    print(name)

func _init().("TestName"):
  pass

func _ready():
  pass
```

