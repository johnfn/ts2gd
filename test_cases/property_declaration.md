
### test-name: property_declaration/normal_exported_variable

```typescript
export class Test {
  @exports
  foo: int
}
```
```gdscript
class_name Test
export(int) var foo: int
```


### test-name: property_declaration/normal_exported_variable2

```typescript
export class Test {
  @exports
  foo: float
}
```
```gdscript
class_name Test
export(float) var foo: float
```


### test-name: property_declaration/normal_exported_variable3

```typescript
export class Test {
  @exports
  foo: string
}
```
```gdscript
class_name Test
export(String) var foo: String
```


### test-name: property_declaration/normal_exported_variable4

```typescript
export class Test {
  @exports
  foo: { [key: string]: string }
}
```
```gdscript
class_name Test
export(Dictionary) var foo
```


### test-name: property_declaration/normal_exported_variable5

```typescript
export class Test {
  @exports
  foo: float[]
}
```
```gdscript
class_name Test
export(Array, float) var foo
```


### test-name: property_declaration/not_so_normal_exported_variable6

```typescript
export class Test {
  @exports
  foo: { [key: string]: string }[]
}
```
```gdscript
class_name Test
export(Array, Dictionary) var foo
```


### test-name: property_declaration/not_so_normal_exported_variable7

```typescript
export class Test {
  @exports
  foo: int | null
}
```
```gdscript
class_name Test
export(int) var foo
```


### test-name: property_declaration/not_so_normal_exported_variable8

```typescript
export class Test {
  @exports
  foo: int | null | undefined
}
```
```gdscript
class_name Test
export(int) var foo
```


### test-name: property_declaration/not_so_normal_exported_variable9

```typescript
export class Test {
  @exports
  foo: { [key: string]: string } | null | undefined
}
```
```gdscript
class_name Test
export(Dictionary) var foo
```


### test-name: property_declaration/not_so_normal_exported_variable10

```typescript
export enum MyEnum {

}

export class Test {
  @exports
  foo: MyEnum
}
```
```gdscript
class_name Test
const MyEnum = {
}
export(MyEnum) var foo
```


### test-name: property_declaration/export_obj

```typescript
export class Test {
  @exports
  foo: Vector2
}
```
```gdscript
class_name Test
export(Vector2) var foo
```


### test-name: property_declaration/export_obj2

```typescript
export class Test {
  @exports
  foo: Vector2 | null
}
```
```gdscript
class_name Test
export(Vector2) var foo
```


### test-name: property_declaration/number_type_by_annotation

```typescript
export class Test {
  x: int = 1
}
```
```gdscript
class_name Test
var x: int = 1
```


### test-name: property_declaration/number_type_by_annotation2

```typescript
export class Test {
  x: float = 1
}
```
```gdscript
class_name Test
var x: float = 1
```


### test-name: property_declaration/number_type_by_no_annotation

```typescript
export class Test {
  x = 1
}
```
```gdscript
class_name Test
var x: int = 1
```


### test-name: property_declaration/number_type_by_no_annotation2

```typescript
export class Test {
  x = 1.0
}
```
```gdscript
class_name Test
var x: float = 1.0
```


### test-name: property_declaration/export_flags

```typescript
export class Test {
  @export_flags("A", "B", "C")
  exportFlagsTest
}
```
```gdscript
class_name Test
export(int, FLAGS, "A", "B", "C") var exportFlagsTest
```


### test-name: property_declaration/export_infer_array_type_from_non_generic_element

```typescript
export class Test {
  @exports
  exportFlagsTest: float[];
}
```
```gdscript
class_name Test
export(Array, float) var exportFlagsTest
```


### test-name: property_declaration/export_infer_array_type_from_generic_element

```typescript
export class Test {
  @exports
  exportFlagsTest: PackedScene<Node2D>[];
}
```
```gdscript
class_name Test
export(Array, PackedScene) var exportFlagsTest
```


### test-name: property_declaration/export_infer_any_or_unknown_array

```typescript
export class Test {
  @exports
  exportFlagsTest: any[];

  @exports
  exportFlagsTest2: unknown[];
}
```
```gdscript
class_name Test
export(Array) var exportFlagsTest
export(Array) var exportFlagsTest2
```


### test-name: property_declaration/export_infer_array_of_arrays

```typescript
export class Test {
  @exports
  exportFlagsTest: float[][];
}
```
```gdscript
class_name Test
export(Array, Array, float) var exportFlagsTest
```


### test-name: property_declaration/export_export_hint

```typescript
export class Test {
  @exports(ExportHint.RGBA)
  exportFlagsTest: Color;
}
```
```gdscript
class_name Test
export(Color, RGBA) var exportFlagsTest
```


### test-name: property_declaration/export_export_hint_complex

```typescript
export class Test {
  @exports(ExportHint.EXP, 100, 1000, 20)
  exportFlagsTest: float;

  @exports("Value1", "Value2", "Value3")
  exportFlagsTest2: string;

  @exports(ExportHint.FLAGS, "Fire", "Water", "Earth", "Wind")
  exportFlagsTest3: int;

  @exports(ExportHint.FILE, ExportHint.GLOBAL, "*.png")
  exportFlagsTest4: string;
}
```
```gdscript
class_name Test
export(float, EXP, 100, 1000, 20) var exportFlagsTest: float
export(String, "Value1", "Value2", "Value3") var exportFlagsTest2: String
export(int, FLAGS, "Fire", "Water", "Earth", "Wind") var exportFlagsTest3: int
export(String, FILE, GLOBAL, "*.png") var exportFlagsTest4: String
```

