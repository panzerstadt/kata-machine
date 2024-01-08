// hey i can use this to compare dom trees!
// dom tree diffing here?
// TODO: extend to compare differences in nodes (what's different)
export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // base cases (comparisons at leaf nodes)
    // both are null
    if (a === null && b === null) {
        return true; // (final return, cause we've exhausted the entire tree)
    }
    // not same (one's a node, the other is not)
    if ((a === null && b !== null) || (a !== null && b === null)) {
        return false; // makes the whole 'subtree' invalid (early return)
    }
    // not same (values are different)
    if (a?.value !== b?.value) {
        return false; // makes the whole 'subtree' invalid (early return)
    }

    // only if both sides of the binary tree match exactly,
    // we consider it true
    return compare(a!.left, b!.left) && compare(a!.right, b!.right);
}

type ActionType = "create" | "update" | "delete";
interface DiffNode<T> {
    action?: ActionType;
    prevValue?: T | undefined;
    nextValue?: T | undefined;
    left?: DiffNode<T>;
    right?: DiffNode<T>;
}
// this returns the 'diff'
export function diff<T>(
    prev: BinaryNode<T> | null,
    next: BinaryNode<T> | null,
    diffTree: DiffNode<T>,
): boolean {
    // this node
    diffTree.left = {};
    diffTree.right = {};

    console.log(
        `comparing L<${prev?.value}:${prev}> R<${next?.value}:${next}>`,
    );
    // base cases (comparisons at leaf nodes)
    // both are null
    if (prev === null && next === null) {
        return true; // they're exactly the same
    }
    // not same (one's a node, the other is not)
    if (prev === null && next !== null) {
        diffTree.nextValue = next?.value;
        diffTree.action = "create";
        // return false; // nodes changes
    }
    if (prev !== null && next === null) {
        diffTree.prevValue = prev.value;
        diffTree.action = "delete";
        // return false;
    }

    // not same (values are different)
    if (prev?.value !== next?.value) {
        diffTree.prevValue = prev?.value;
        diffTree.nextValue = next?.value;
        diffTree.action = "update";
        // return false; // values changed
    }

    // only if both sides of the binary tree match exactly,
    // we consider it true
    const left = diff(prev?.left || null, next?.left || null, diffTree.left);
    const right = diff(prev?.right || null, next?.right || null, diffTree.right); // prettier-ignore
    return left && right;
}

const tree1: BinaryNode<string> = {
    value: "html",
    left: {
        value: "body",
        left: {
            value: "div",
            left: null,
            right: {
                value: "h1",
                left: null,
                right: null,
            },
        },
        right: null,
    },
    right: {
        value: "footer",
        left: null,
        right: null,
    },
};

const tree2: BinaryNode<string> = {
    value: "html",
    left: {
        value: "body",
        left: {
            value: "div",
            left: {
                value: "span",
                left: null,
                right: {
                    value: "p",
                    left: null,
                    right: null,
                },
            },
            right: {
                value: "a",
                left: null,
                right: null,
            },
        },
        right: null,
    },
    right: null,
};

const diffTree: DiffNode<string> = {};
console.log(`is the DOM tree the same? <${diff(tree1, tree2, diffTree)}>`);
console.log(`after diffing: `);
console.log(JSON.stringify(diffTree, null, 4));
