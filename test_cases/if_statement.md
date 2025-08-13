
### test-name: if_statement/if

```typescript
if (true) {
  print(1)
} else {
  print(0)
}
```
```gdscript
if true:
  print(1)
else:
  print(0)
```


### test-name: if_statement/else_if

```typescript
if (true) {
  print(1)
} else if ('maybe') {
  print(2)
} else {
  print(0)
}
```
```gdscript
if true:
  print(1)
else:
  if "maybe":
    print(2)
  else:
    print(0)
```


### test-name: if_statement/if_pre_inc1

```typescript
if (++x) {
  print(1)
} else {
  print(0)
}
```
```gdscript
x += 1
if x:
  print(1)
else:
  print(0)
```


### test-name: if_statement/if_pre_inc2

```typescript
if (x) {
  print(++x)
} else {
  print(++x)
}
```
```gdscript
if x:
  x += 1
  print(x)
else:
  x += 1
  print(x)
```


### test-name: if_statement/if_post_inc1

```typescript
if (x++) {
  print(1)
} else {
  print(0)
}
```
```gdscript
if x:
  x += 1
  print(1)
else:
  x += 1
  print(0)
```


### test-name: if_statement/if_post_inc2

```typescript
if (x) {
  print(x++)
} else {
  print(x++)
}
```
```gdscript
if x:
  print(x)
  x += 1
else:
  print(x)
  x += 1
```


### test-name: if_statement/if_pass

```typescript
if (true) {
} else {
  print(0)
}
```
```gdscript
if true:
  pass
else:
  print(0)
```


### test-name: if_statement/if_pass2

```typescript
if (true) {
  print(1)
} else {
}
```
```gdscript
if true:
  print(1)
```

