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
});

describe('LoopedList', () => {
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
