import LoopedListItem from './looped-list-item';

class LoopedList {
    constructor(value) {
        // Keep head unset if we didn't pass in a value
        this.head = undefined;

        if (Array.isArray(value) && value.length) {
            /**
             * When an array is passed, use the first value as the `head`,
             * and loop through other values and insert them.
             */
            let intial_value = value.shift();

            // This sets `this.head`
            this.init(intial_value);

            if (value.length) {
                // Loop through remaining values
                for (let i = 0; i < value.length; i++) {
                    this.insertNext(value[i]);
                }

                // Move forward one tick to reset head back to `intial_value`
                this.move(1);
            }
        } else if (typeof value !== 'undefined') {
            // This sets `this.head`
            this.init(value);
        }
    }

    init(value) {
        if (!(value instanceof LoopedListItem)) {
            value = new LoopedListItem(value, true);
        }
        this.head = value;

        return this;
    }

    move(steps = 1) {
        // Steps can be negative to move backwards
        let direction = steps > 0 ? 'next' : 'prev';

        steps = Math.abs(steps);
        this.head = this.head[direction](steps);

        return this;
    }

    insertNext(item) {
        if (!(item instanceof LoopedListItem)) {
            item = new LoopedListItem(item);
        }
        this.head = this.head.insertNext(item);

        return this;
    }

    insertPrev(item) {
        if (!(item instanceof LoopedListItem)) {
            item = new LoopedListItem(item);
        }
        this.head = this.head.insertPrev(item);

        return this;
    }

    popHeadMoveNext() {
        let next_item = this.head.next_item;
        let old_head = this.head.removeSelf();
        this.head = next_item;

        return old_head;
    }

    popHeadMovePrev() {
        let prev_item = this.head.prev_item;
        let old_head = this.head.removeSelf();
        this.head = prev_item;

        return old_head;
    }

    length() {
        let head = this.head;
        this.move(1);

        let length = 1;

        while (this.head !== head) {
            length++;
            this.move(1);
        }

        return length;
    }
}

export default LoopedList;
