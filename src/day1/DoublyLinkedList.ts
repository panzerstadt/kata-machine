type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};
export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {}
    insertAt(item: T, idx: number): void {}
    append(item: T): void {}
    remove(item: T): T | undefined {}
    get(idx: number): T | undefined {
        let curr = this.head;
        // traverse until you get there
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr?.value;
    }
    removeAt(idx: number): T | undefined {}
}
