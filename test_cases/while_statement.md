
### test-name: while_statement/pass_while

```typescript
while (true);
```
```gdscript
while true:
  pass
```


### test-name: while_statement/while_condition_post_increment

```typescript
let x = 0
while (x++ < 10) {
  print(x)
}
```
```gdscript
var x: int = 0
while x < 10:
  x += 1
  print(x)
```


### test-name: while_statement/while_condition_pass

```typescript
let x = 0
while (x++ < 10) { }
```
```gdscript
var x: int = 0
while x < 10:
  x += 1
```


### test-name: while_statement/while_condition_pre_increment

```typescript
let x = 0
while (++x < 10) {
  print(x)
}
```
```gdscript
var x: int = 0
x += 1
while x < 10:
  print(x)
  x += 1
```

