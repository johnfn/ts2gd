
### test-name: object_literal_expression/object_literal

```typescript
let x = {}
```
```gdscript
var _x = {}
```


### test-name: object_literal_expression/object_literal2

```typescript
let x = {a: 1}
```
```gdscript
var _x = { "a": 1 }
```


### test-name: object_literal_expression/object_literal_shorthand

```typescript
let x = {a}
```
```gdscript
var _x = { "a": a }
```


### test-name: object_literal_expression/object_literal_shorthand2

```typescript
let x = { a: 1 }
```
```gdscript
var _x = { "a": 1 }
```


### test-name: object_literal_expression/object_literal_multiline

```typescript
let x = {
  a: 1
}
```
```gdscript
var _x = { 
  "a": 1,
}
```


### test-name: object_literal_expression/object_literal_multiline2

```typescript
let x = {
  a: 1,
  b: 1,
}
```
```gdscript
var _x = { 
  "a": 1,
  "b": 1,
}
```


### test-name: object_literal_expression/object_literal_multiline3

```typescript
{
  let foo = {
    a: 1,
    b: 2,
  }
  foo
}
```
```gdscript
var foo = {
  "a": 1,
  "b": 2,
}
foo
```

