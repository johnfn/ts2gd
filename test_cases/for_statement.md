
### test-name: for_statement/multiple_same_name_vars

```typescript
for (let i = 0; i < 6; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
```
```gdscript
var i: int = 0
while i < 6:
  print(i)
  i += 1
var i1: int = 0
while i1 < 5:
  print(i1)
  i1 += 1
var i2: int = 0
while i2 < 5:
  print(i2)
  i2 += 1
```


### test-name: for_statement/pass2

```typescript
for (let x = 0; x < 10; );
```
```gdscript
var x: int = 0
while x < 10:
  pass
```

