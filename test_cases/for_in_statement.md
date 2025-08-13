
### test-name: for_in_statement/for_in1

```typescript
for (let x in []);
```
```gdscript
for x in []:
  pass
```


### test-name: for_in_statement/for_in2

```typescript
let x: never;
for (x in []);
```
```gdscript
var x
for x in []:
  pass
```

