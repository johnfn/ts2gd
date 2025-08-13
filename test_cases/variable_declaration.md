
### test-name: variable_declaration/destructure

```typescript
let [a, [b, c]] = [1, [2, 3]]
```
```gdscript
var __gen = [1, [2, 3]]
var a = __gen[0]
var b = __gen[1][0]
var c = __gen[1][1]
```


### test-name: variable_declaration/destructure2

```typescript
let [a] = [1]
let [b] = [1]
```
```gdscript
var __gen = [1]
var a = __gen[0]
var __gen1 = [1]
var b = __gen1[0]
```


### test-name: variable_declaration/destructure3

```typescript
let { a, b } = { a: 1, b: 2 }
```
```gdscript
var __gen = { "a": 1, "b": 2 }
var a = __gen.a
var b = __gen.b
```


### test-name: variable_declaration/destructure4

```typescript
let __gen = 1
let { a, b } = { a: 1, b: 2 }

print(__gen)
```
```gdscript
var __gen: int = 1
var __gen1 = { "a": 1, "b": 2 }
var a = __gen1.a
var b = __gen1.b
print(__gen)
```


### test-name: variable_declaration/destructure_rename

```typescript
let { a: a1, b: b1 } = { a: 1, b: 2 }
```
```gdscript
var __gen = { "a": 1, "b": 2 }
var a1 = __gen.a
var b1 = __gen.b
```


### test-name: variable_declaration/normal_variable_declaration

```typescript
let x = 1
let y = 'a'
```
```gdscript
var _x: int = 1
var _y = "a"
```


### test-name: variable_declaration/autoload_variable_declaration

```typescript
@autoload()
export class Blah {

}

const x: Blah = new Blah();
```
```gdscript
```


### test-name: variable_declaration/class_name_without_autoload

```typescript
export class Blah {

}

const x: Blah = new Blah();
```
```gdscript
class_name Blah

var _x = Blah.new()
```


### test-name: variable_declaration/autoload_variable_declaration2

```typescript
@autoload()
export class Blah {

}

const x: Blah = new Blah();
```
```gdscript
```


### test-name: variable_declaration/autoload_variable_declaration3

```typescript
@autoload()
export class Blah {
  test() {
    const blah: Blah = new Blah();
  }
}

const x: Blah = new Blah();
```
```gdscript
func test():
  var _blah = Blah.new()
```


### test-name: variable_declaration/keyword

```typescript
let preload = 123
print(preload)
```
```gdscript
var preload_: int = 123
print(preload_)
```


### test-name: variable_declaration/int_float1

```typescript
let int = 1
```
```gdscript
var _int: int = 1
```


### test-name: variable_declaration/int_float2

```typescript
let float = 1.0
```
```gdscript
var _float: float = 1.0
```


### test-name: variable_declaration/int_float3

```typescript
let float: int = 1.0
```
```gdscript
var _float: int = 1.0
```


### test-name: variable_declaration/int_float4

```typescript
let float: float = 0
```
```gdscript
var _float: float = 0
```

