Test Case Format for tsgd
=========================

This directory contains test cases written in markdown. 
You can run tests with `npm test` or `npm test -- no-skip`
Each test case must begin with a test name in the format:

`### test-name: some_group/some_name`

Each test should include one or more of the following code blocks:
- `typescript` — required, the source TypeScript code (all comments are stripped during validation)
- `gdscript` — optional, the expected output in GDScript (all comments are stripped during validation)
- `error` — optional, the expected error message (all comments are stripped during validation)
- `skip` — optional, a reason for skipping the test

See examples below for the required structure:

~~~markdown
### test-name: some-test-that-should-pass
```typescript
// source type script, all comments are stripped during validation
let a = 2 + 3;
```
```gdscript
# expected output, all comments are stripped during validation
var a = 2 + 3
```

### test-name: some-test-that-should-fail
```typescript
// source type script, all comments are stripped during validation
let a = 2 + 3;
```
```error
// expected error, all comments are stripped during validation
Expected an error here.
```

### test-name: some-test-that-should-be-skipped
```skip
This test is skipped because it is not implemented yet.
```
~~~markdown
  