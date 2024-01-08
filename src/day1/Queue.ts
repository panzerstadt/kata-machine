type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    private debug?: boolean;

    constructor(debug?: boolean) {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
        this.debug = debug;
    }

    show(getter = (v: T) => v as unknown) {
        const output = [];
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            output.push(getter(curr.value));
            curr = curr.next;
        }
        console.log(`queue:[${output}]`);
    }

    enqueue(item: T): void {
        this.debug && console.log(`op ${this.enqueue.name}: ${item}`);
        const node = { value: item } as Node<T>;
        this.length++;

        // new item
        if (!this.tail) {
            this.tail = node;
            this.head = node;
            this.debug && console.table({ head: this.head, tail: this.tail });
            return;
        }
        // existing queue
        this.tail.next = node;
        this.tail = node;

        this.debug && console.table({ head: this.head, tail: this.tail });
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

        this.debug && console.log(`op ${this.deque.name}: ${head.value}`);
        this.debug && console.table({ head: this.head, tail: this.tail });

        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
