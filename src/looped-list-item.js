class LoopedListItem {
    /**
     * @param {Any} value
     * @param {Boolean} [is_first=false]
     */
    constructor(value, is_first = false) {
        this.value = value;

        // Pointers to other LoopedListItems
        this.next_item;
        this.prev_item;

        // Set next and prev to itself
        if (is_first) {
            this.next_item = this;
            this.prev_item = this;
        }
    }

    /**
     * @param {Number} n
     * @returns {LoopedListItem}
     */
    next(n = 1) {
        n = Math.trunc(n);

        if (n === 0) {
            return this;
        } else if (n < 0) {
            return this.prev(Math.abs(n));
        }

        let current = this;
        do {
            current = current.next_item;
        } while (--n);
        return current;
    }

    /**
     * @param {Number} n
     * @returns {LoopedListItem}
     */
    prev(n = 1) {
        n = Math.trunc(n);

        if (n === 0) {
            return this;
        } else if (n < 0) {
            return this.next(Math.abs(n));
        }

        let current = this;
        do {
            current = current.prev_item;
        } while (--n);
        return current;
    }

    /**
     * @param {LoopedListItem} item
     * @returns {LoopedListItem} Returns the item we just inserted
     */
    insertNext(item) {
        this.next_item.prev_item = item;
        item.next_item = this.next_item;

        this.next_item = item;
        item.prev_item = this;

        return item;
    }

    /**
     * @param {LoopedListItem} item
     * @returns {LoopedListItem} Returns the item we just inserted
     */
    insertPrev(item) {
        this.prev_item.next_item = item;
        item.next_item = this;

        item.prev_item = this.prev_item;
        this.prev_item = item;

        return item;
    }

    /**
     * @returns {LoopedListItem}
     */
    removeSelf() {
        this.next_item.prev_item = this.prev_item;
        this.prev_item.next_item = this.next_item;

        return this;
    }
}

export default LoopedListItem;
