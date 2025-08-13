
### test-name: break_statement/break1

```typescript
for (let x = 0; x < 10; x++) {
  break;
  print(x);
}
```
```gdscript
var x: int = 0
while x < 10:
  x += 1
  break
  print(x)  
  x += 1
```


### test-name: break_statement/break2

```typescript
for (let x: int = 0; x < 10; x++) {
  if (x == (0 as int)) break;
  print(x);
}
```
```gdscript
var x: int = 0
while x < 10:
  if x == 0:
    x += 1
    break
  print(x)
  x += 1
```

