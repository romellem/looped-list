# Looped List

Simple doubly linked list implementation. Uses a custom class
`LoopedListItem` under the hood for the `next` and `prev` pointers.

### Example Usage

```
import { LoopedList } from 'looped-list';

let list = new LoopedList(1);

console.log(list.head.value); // 1

list.insertNext(2);
console.log(list.head.value); // 2

list.insertNext(3);
console.log(list.head.value); // 3

list.move(1);
console.log(list.head.value); // 1

list.move(2);
console.log(list.head.value); // 3

list.move(1);
console.log(list.head.value); // 1
```

### API (TODO)

- `constructor`
- `init`
- `move`
- `insertNext`
- `insertPrev`
- `popHeadMoveNext`
- `popHeadMovePrev`
- `length`
