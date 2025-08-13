
### test-name: postfix_unary_expression/basic_inc

```typescript
var x = 1
x++
```
```gdscript
var x: int = 1
x += 1
```


### test-name: postfix_unary_expression/basic_inc2

```typescript
var x = 1
if (x++) {
  print(x)
}
```
```gdscript
var x: int = 1
if x:
  x += 1
  print(x)
else:
  x += 1
```

