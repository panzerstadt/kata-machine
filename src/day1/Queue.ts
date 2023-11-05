type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        console.log(`op ${this.enqueue.name}: ${item}`);
        const node = { value: item } as Node<T>;
        this.length++;

        // new item
        if (!this.tail) {
            this.tail = node;
            this.head = node;
            console.table({ head: this.head, tail: this.tail });
            return;
        }
        // existing queue
        this.tail.next = node;
        this.tail = node;

        console.table({ head: this.head, tail: this.tail });
    }
    deque(): T | undefined {
        if (!this.head) return undefined;

        this.length--;
        const head = this.head;
        this.head = this.head.next;

        // free
        head.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }

        console.log(`op ${this.deque.name}: ${head.value}`);
        console.table({ head: this.head, tail: this.tail });

        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
