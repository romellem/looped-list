import LoopedListItem from './looped-list-item';

class LoopedList {
    /**
     * @param {Any} value
     */
    constructor(value) {
        // Keep head unset if we didn't pass in a value
        this.head = undefined;

        if (Array.isArray(value) && value.length) {
            /**
             * When an array is passed, use the first value as the `head`,
             * and loop through other values and insert them.
             */
            let intial_value = value[0];

            this.setHead(intial_value);

            if (value.length > 2) {
                // Loop through remaining values
                for (let i = 1; i < value.length; i++) {
                    this.insertNext(value[i]);
                }

                // Move forward one tick to reset head back to `intial_value`
                this.move(1);
            }
        } else if (typeof value !== 'undefined') {
            this.setHead(value);
        }
    }

    /**
     * @chainable
     * @param {Any} value - If the value is not a `LoopedListItem`, it'll be converted into one, unless `undefined` is passed, which essentially "unsets" the head.
     * @returns {LoopedList} Returns `this`
     */
    setHead(value) {
        if (!(value instanceof LoopedListItem) && value !== undefined) {
            value = new LoopedListItem(value, true);
        }
        this.head = value;

        return this;
    }

    /**
     * Sets the `head` to `undefined`, effectively removing all list items.
     * @chainable
     * @returns {LoopedList} Returns `this`
     */
    unsetHead() {
        return this.setHead(undefined);
    }

    /**
     * @deprecated - Use `setHead(value)` instead.
     */
    init(...args) {
        return this.setHead(...args);
    }

    /**
     * Moves the head pointer forward or backward by a number of steps.
     * @chainable
     * @param {Number} steps Any number. If a negative number is passed, the head pointer moves backwards.
     * @returns {LoopedList} Returns `this`
     */
    move(steps = 1) {
        steps = Math.trunc(steps);

        // Steps can be negative to move backwards
        let direction = steps > 0 ? 'next' : 'prev';

        steps = Math.abs(steps);
        this.head = this.head[direction](steps);

        return this;
    }

    /**
     * @chainable
     * @param {Any|LoopedListItem} item
     * @returns {LoopedList} Returns `this`
     */
    insertNext(item) {
        if (!(item instanceof LoopedListItem)) {
            item = new LoopedListItem(item);
        }
        this.head = this.head.insertNext(item);

        return this;
    }

    /**
     * @chainable
     * @param {Any|LoopedListItem} item
     * @returns {LoopedList} Returns `this`
     */
    insertPrev(item) {
        if (!(item instanceof LoopedListItem)) {
            item = new LoopedListItem(item);
        }
        this.head = this.head.insertPrev(item);

        return this;
    }

    /**
     * @returns {LoopedListItem} Returns the old `head`
     */
    popHeadMoveNext() {
        let next_item = this.head.next_item;
        let old_head = this.head.removeSelf();
        this.head = next_item;

        return old_head;
    }

    /**
     * @returns {LoopedListItem} Returns the old `head`
     */
    popHeadMovePrev() {
        let prev_item = this.head.prev_item;
        let old_head = this.head.removeSelf();
        this.head = prev_item;

        return old_head;
    }

    /**
     * @returns {Number} Returns the number of items in our LoopedList.
     */
    length() {
        let head = this.head;

        if (!head) {
            return 0;
        }

        let next = head.next_item;

        let length = 1;

        while (next !== head) {
            length++;
            next = next.next_item;
        }

        return length;
    }

    /**
     * Searches for the item and returns that item if it is found. Returns `undefined` if the value is not found.
     * @param {Any|LoopedListItem} value You can pass in a primative value or a `LoopedListItem`.
     * @returns {LoopedListItem|undefined}
     */
    find(value) {
        let get_value = !(value instanceof LoopedListItem);
        let head = this.head;

        if (!head) {
            return;
        }

        let next = this.head;

        do {
            let next_value = get_value ? next.value : next;
            if (value === next_value) {
                return next;
            }
            next = next.next_item;
        } while (next !== head);
    }

    /**
     * An iterator for the `LoopedListItem` objects.
     * @alias LoopedList.prototype[@@iterator]
     * @generator
     * @function
     * @returns {Any} Yields the `LoopedListItem` objects in our list, starting with `this.head`.
     */
    *[Symbol.iterator]() {
        yield* this.items();
    }

    /**
     * An iterator for the `LoopedListItem` objects.
     * @generator
     * @returns {Any} Yields the `LoopedListItem` objects in our list, starting with `this.head`.
     */
    *items() {
        let head = this.head;

        if (!head) {
            return;
        }

        yield head;

        let next = head.next_item;

        while (next !== head) {
            yield next;
            next = next.next_item;
        }
    }

    /**
     * An iterator for _values_ of the `LoopedListItem` objects.
     * @generator
     * @returns {Any} Yields the _values_ of the `LoopedListItem` objects in our list, starting with `this.head`.
     * @example assert.deepStrictEqual([...(new LoopedList([1, 2, 3])).values()], [1, 2, 3]);
     */
    *values() {
        let items = this.items();
        for (let item of items) {
            yield item.value;
        }
    }
}

export default LoopedList;
