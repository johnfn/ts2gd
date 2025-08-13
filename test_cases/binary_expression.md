
### test-name: binary_expression/add

```typescript
1 + 2
```
```gdscript
1 + 2
```


### test-name: binary_expression/multiply

```typescript
1 * 2
```
```gdscript
1 * 2
```


### test-name: binary_expression/assignment_to_dict

```typescript
const foo = {};
foo.bar = 1
```
```gdscript
var foo = {}
foo.bar = 1
```


### test-name: binary_expression/nested_assignment_to_dict

```typescript
const foo = { bar: {} };
foo.bar.baz = 1
```
```gdscript
var foo = { "bar": {} }
foo.bar.baz = 1
```


### test-name: binary_expression/double_equal

```typescript
(1 as int) == (2 as int)
```
```gdscript
1 == 2
```


### test-name: binary_expression/double_equal_different_types

```typescript
let a: { a: number; } | string
let b: string

a == b
```
```gdscript
var a
var b  
((typeof(a) == typeof(b)) and (a == b))
```


### test-name: binary_expression/double_not_equal_different_types

```typescript
let a: { a: number; } | string
let b: string

a != b
```
```gdscript
var a
var b  
((typeof(a) != typeof(b)) or ((typeof(a) == typeof(b)) and (a != b)))
```

