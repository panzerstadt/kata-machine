// Depth First

/**
 * base cases
 * - make sure you do as many things as you can in a base case
 *   because otherwise you would have to do it in the recursive case
 *   and that makes it a million times harder
 *
 * recurse substeps
 * - pre
 * - recurse
 * - post
 */

// in here, we pass the result as a convenience, cause we just wanna get a result in the end
// reads nicer
function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // base case is when we are at a node that doesn't exist
    // if we've gone too far and there's no value, then we're done!
    if (!curr) {
        return path;
    }

    // pre
    path.push(curr.value); // visitNode()

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    return path;
}

// in here, we get the result by assigning path to a variable, then while
// recursing it gets mutated (push) until its done
function walkWithoutReturn(
    curr: BinaryNode<number> | null,
    path: number[],
): void {
    // base case is when we are at a node that doesn't exist
    // if we've gone too far and there's no value, then we're done!
    if (!curr) {
        return;
    }

    // pre
    path.push(curr.value); // visitNode()

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    return;
}

// path is inside the function
function walkToPathInput(curr: BinaryNode<number> | null): number[] {
    const localPath: number[] = [];

    if (!curr) {
        return [];
    }

    // pre
    console.log(`visiting node: ${curr.value}`);
    localPath.push(curr.value);

    // recurse
    const leftChildren = walkToPathInput(curr.left);
    console.log(`left child of ${curr.value}: <${leftChildren}>`);
    const rightChildren = walkToPathInput(curr.right);
    console.log(`right child of ${curr.value}: <${rightChildren}>`);

    //post
    console.log(
        `done. returning: ${localPath}: left <${leftChildren}> right <${rightChildren}>`,
    );
    return localPath;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    // return walkToPathInput(head);
    return walk(head, []);
}
