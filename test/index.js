import assert from 'assert';
import { LoopedList, LoopedListItem } from '../lib/umd/looped-list.js';

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
