import assert from 'assert';
import { LoopedList, LoopedListItem } from '../lib/cjs/looped-list.js';

describe('LoopedList Tests', () => {
    describe('constructor', () => {
        it('should not initialize when constructed with no value', () => {
            let list = new LoopedList();
            assert.strictEqual(list.head, undefined);
        });

        it('should initialize with a LoopedListItem when constructed with a value', () => {
            let list = new LoopedList(1);
            assert.strictEqual(list.head instanceof LoopedListItem, true);
            assert.strictEqual(list.head.value, 1);
        });

        it('should allow for arrays to be passed', () => {
            let list = new LoopedList([1, 2, 3]);
            assert.strictEqual(list.head.value, 1);

            list.move(1);
            assert.strictEqual(list.head.value, 2);

            list.move(1);
            assert.strictEqual(list.head.value, 3);

            list.move(1);
            assert.strictEqual(list.head.value, 1);
        });

        it('should throw an error when not used as a constructor', () => {
            assert.throws(LoopedList);
        });
    });

    describe('`move`', () => {
        it('should tick backwards when passed a move length less than 0', () => {
            let list = new LoopedList([1, 2, 3]);

            assert.strictEqual(list.head.value, 1);

            list.move(0);
            assert.strictEqual(list.head.value, 1);

            list.move(-1);
            assert.strictEqual(list.head.value, 3);
        });
    });

    describe('`find`', () => {
        it('should return undefined on an empty list', () => {
            let empty_list = new LoopedList();
            let found = empty_list.find(1);

            assert.strictEqual(found, undefined);
        });

        it('should return a primative element that is the head', () => {
            let list = new LoopedList([1, 2, 3, 4, 5]);
            let head = list.head;
            let found = list.find(1);

            assert.strictEqual(found.value, 1);
            assert.strictEqual(found, head);
        });

        it('should return undefined on a value that is not preset', () => {
            let list = new LoopedList([1, 2, 3]);
            let found = list.find(9);

            assert.strictEqual(found, undefined);
        });

        it('should not adjust the head of the list', () => {
            let list = new LoopedList([1, 2, 3, 4, 5]);
            let head = list.head;
            let found = list.find(3);

            assert.strictEqual(found.value, 3);
            assert.notStrictEqual(found, head);
            assert.strictEqual(head, list.head);
        });

        it('should allow for searching for a LoopedListItem', () => {
            let list = new LoopedList([1, 2, 3, 4, 5]);
            let three = list.head.next_item.next_item;
            let found = list.find(three);

            assert.strictEqual(found.value, 3);
            assert.strictEqual(found, three);
        });

        it('should not find a LoopedListItem even if they have the same value', () => {
            let list = new LoopedList([1, 2, 3, 4, 5]);
            let other_three = new LoopedListItem(3);
            let found = list.find(other_three);
            let found_real = list.find(3);

            assert.strictEqual(found, undefined);
            assert.notStrictEqual(found_real, other_three);
            assert.strictEqual(found_real.value, other_three.value);
        });
    });

    describe('`@@iterator`', () => {
        it('should allow you to iterate over the internal list', () => {
            let list = new LoopedList([1, 2, 3, 4, 5]);

            let values = [1, 2, 3, 4, 5];
            let i = 0;
            for (let item of list) {
                let value = values[i++];
                assert.strictEqual(item.value, value);
            }
        });

        it('should allow you to spread into an array', () => {
            let values = [1, 2, 3, 4, 5];
            let list = new LoopedList(values);

            let spread_list = [...list].map(v => v.value);
            assert.deepStrictEqual(spread_list, values);
        });

        it('should spread nothing when we have an empty list', () => {
            let list = new LoopedList();

            let spread_list = [...list];
            assert.deepStrictEqual(spread_list, []);
        });
    });
});

describe('LoopedListItem Tests', () => {
    describe('`next`', () => {
        it('should move backwards when passed a length less than 0', () => {
            const list = new LoopedList([1, 2, 3]);
            assert.strictEqual(list.head.value, 1);

            let prev = list.head.next(-1);
            assert.strictEqual(list.head.prev_item, prev);
            assert.strictEqual(prev.value, 3);
        });
    });

    describe('`prev`', () => {
        it('should move forward when passed a length less than 0', () => {
            const list = new LoopedList([1, 2, 3]);
            assert.strictEqual(list.head.value, 1);

            let next = list.head.prev(-1);
            assert.strictEqual(list.head.next_item, next);
            assert.strictEqual(next.value, 2);
        });
    });
});
