const { LoopedList } = require('../lib/cjs/looped-list');

let list = new LoopedList(1);
console.log(list.head.value); // 1
