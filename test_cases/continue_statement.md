
### test-name: continue_statement/continue1

```typescript
for (let x = 0; x < 10; x++) {
  continue;
  print(x);
}
```
```gdscript
var x: int = 0
while x < 10:
  x += 1
  continue
  print(x)  
  x += 1
```


### test-name: continue_statement/continue2

```typescript
for (let x: int = 0; x < 10; x++) {
  if (x == (0 as int)) continue;
  print(x);
}
```
```gdscript
var x: int = 0
while x < 10:
  if x == 0:
    x += 1
    continue
  print(x)
  x += 1
```

