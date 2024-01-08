// because a heap tree is always a full tree / balanced tree
// the height of the tree is always log n
// so inserts and deletes are always O log n (O(h) which is O log n)
export default class MinHeap<T> {
    public length: number;
    private data: { priority: number; value?: T }[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    // insert at the end of data, and heapify up
    insert(priority: number, value?: T): void {
        this.data[this.length] = { priority, value };
        this.heapifyUp(this.length);
        this.length++;
    }
    // pop the first item, move last data to top, and heapify down
    delete(): T | number | null {
        if (this.length === 0) return null;

        const out = this.data[0];
        if (this.length === 1) {
            this.length = 0;
            this.data = [];
            return out.value || out.priority;
        }

        this.data[0] = this.data[this.length - 1]; // put the last thing on top
        this.length--;
        this.heapifyDown(0); // swap downward
        return out.value || out.priority;
    }

    // synonyms for delete
    poll() {
        return this.delete();
    }
    pop() {
        return this.delete();
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        if (idx >= this.length || lIdx >= this.length) return;

        // get both values, find the minimum one, then check if we need to swap
        const lVal = this.data[lIdx];
        const rVal = this.data[rIdx];
        const value = this.data[idx];

        if (lVal.priority < rVal.priority) {
            // left is the one we want to compare
            if (value.priority > lVal.priority) {
                // if our current node value is bigger, we needa swap
                this.data[idx] = lVal;
                this.data[lIdx] = value;
                this.heapifyDown(lIdx);
            }
        } else if (rVal.priority < lVal.priority) {
            if (value.priority > rVal.priority) {
                this.data[idx] = rVal;
                this.data[rIdx] = value;
                this.heapifyDown(rIdx);
            }
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return;

        // get parent
        const pIdx = this.parent(idx);
        // get value
        const parentValue = this.data[pIdx];
        const value = this.data[idx];
        // check if parent is large than me
        if (parentValue.priority > value.priority) {
            this.data[idx] = parentValue;
            this.data[pIdx] = value;
            this.heapifyUp(pIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
