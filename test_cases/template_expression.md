
### test-name: template_expression/string_interpolation

```typescript
let foo = `blah ${ 10 }  ${ 20 }`
```
```gdscript
var _foo = "blah " + str(10) + "  " + str(20) + ""
```

