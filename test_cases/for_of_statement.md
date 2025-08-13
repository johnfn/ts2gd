
### test-name: for_of_statement/basic_for_of

```typescript
for (let x of []) print(1)
```
```gdscript
for x in []:
  print(1)
```


### test-name: for_of_statement/for_of_destructuring

```typescript
for (let [a, b] of [[1, 2]]) print(a, b)
```
```gdscript
for __gen in [[1, 2]]:
  var a = __gen[0]
  var b = __gen[1]
  print(a, b)
```

