
### test-name: enum_declaration/enum_declaration

```typescript
export enum MyEnum { A, B }

export class Hello {
  constructor() {
    print(MyEnum.A)
  }
}
```
```gdscript
class_name Hello
const MyEnum = {
  "A": 0,
  "B": 1,
}
func _ready():
  print(MyEnum.A)
```


### test-name: enum_declaration/enum_declaration2

```typescript
export enum TestEnum {
  A = 1,
  B = 2
}

export class Hello {
  constructor() {
    print(TestEnum.A)
  }
}
```
```gdscript
class_name Hello
const TestEnum = {
  "A": 1,
  "B": 2,
}
func _ready():
  print(TestEnum.A)
```


### test-name: enum_declaration/enum_declaration3

```typescript
export enum TestEnum {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export class Hello {
  constructor() {
    print(TestEnum.C)
  }
}
```
```gdscript
class_name Hello
const TestEnum = {
  "A": "A",
  "B": "B",
  "C": "C",
  "D": "D",
}
func _ready():
  print(TestEnum.C)
```

