import Queue from "../day1/Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = new Queue<BinaryNode<number> | null>();

    queue.enqueue(head);
    while (queue.length) {
        const curr = queue.deque();
        if (!curr) {
            continue;
        }

        // visit: do things, e.g. search
        console.log(`visiting node at ${curr?.value}`);
        if (curr?.value === needle) {
            return true;
        }

        // left
        queue.enqueue(curr.left);
        // right
        queue.enqueue(curr.right);
        queue.show((v) => v?.value ?? "_");
    }

    return false;
}
