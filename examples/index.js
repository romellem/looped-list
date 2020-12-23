const { LoopedList } = require('../lib/umd/looped-list');

let list = new LoopedList(1);
console.log(list.head.value); // 1
