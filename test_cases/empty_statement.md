
### test-name: empty_statement/pass1

```typescript
for (let x = 0; x < 10; x++);
```
```gdscript
var x: int = 0
while x < 10:
  x += 1
```


### test-name: empty_statement/pass_for_in

```typescript
for (let x in {});
```
```gdscript
for x in {}:
  pass
```

