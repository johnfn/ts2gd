
### test-name: prefix_unary_expression/preincrement1

```typescript
if (true) {
  ++x
  print(x)
}
```
```gdscript
if true:
  x += 1
  print(x)
```


### test-name: prefix_unary_expression/preincrement2

```typescript
if (true) {
  print(++x)
}
```
```gdscript
if true:
  x += 1
  print(x)
```


### test-name: prefix_unary_expression/postincrement1

```typescript
if (true) {
  print(x++)
}
```
```gdscript
if true:
  print(x)
  x += 1
```


### test-name: prefix_unary_expression/if_statement

```typescript
let x = 0
if (true) {
  if (++x) {
    print(x)
  } else {
    print(x)
  }
}
```
```gdscript
var x: int = 0
if true:
  x += 1
  if x:
    print(x)
  else:
    print(x)
```


### test-name: prefix_unary_expression/if_statement2

```typescript
let x = 0
if (true) {
  if (x++) {
    print(x)
  } else {
    print(x)
  }
}
```
```gdscript
var x: int = 0
if true:
  if x:
    x += 1
    print(x)
  else:
    x += 1
    print(x)
```

