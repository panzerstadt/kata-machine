// Depth First

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // base case is when we are at a node that doesn't exist
    // if we've gone too far and there's no value, then we're done!
    if (!curr) {
        return path;
    }

    // pre

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    path.push(curr.value); // visitNode()
    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
