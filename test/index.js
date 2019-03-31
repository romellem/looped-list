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
        it('should not tick forward when passed a move length less than 1', () => {
            let list = new LoopedList([1, 2]);

            list.move(0);
            assert.strictEqual(list.head.value, 1);

            list.move(-1);
            assert.strictEqual(list.head.value, 1);
        });
    });
});

describe('LoopedListItem Tests', () => {
    describe('`next`', () => {
        it('should not move forward when passed a length less than 1', () => {
            const list = new LoopedList([1, 2]);
            let list_head = list.head;

            let next = list_head.next(0);
            assert.strictEqual(list_head, next);

            next = list_head.next(-1);
            assert.strictEqual(list_head, next);
        });
    });

    describe('`prev`', () => {
        it('should not move back when passed a length less than 1', () => {
            const list = new LoopedList([1, 2]);
            let list_head = list.head;

            let prev = list_head.prev(0);
            assert.strictEqual(list_head, prev);

            prev = list_head.prev(-1);
            assert.strictEqual(list_head, prev);
        });
    });
});
