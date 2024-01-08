type Node<Partials extends Object> = {
    value: Partials | null;
    isWord: boolean;
    parent: Node<Partials> | null;
    children: Node<Partials>[]; // exactly 26 children
};

type Compare<P> = (a: P | null, b: P | null) => boolean;
type Concat<P, V> = (partials: P[]) => V;
type Split<V, P> = (value: V) => P[];

/**
 * if we're doing an english language autocomplete,
 * the runtime complexity is O(H), where the height is
 * bound by the longest word in the english dictionary
 *
 * also if its characters, then T is string
 */
export default class Trie<Partials extends Object, Value extends Object> {
    // DoublyLinkedList backed
    private head: Node<Partials>;
    private toValue: Concat<Partials, Value> = (parts: any[]) => parts.join("") as unknown as Value; // prettier-ignore
    private toPartials: Split<Value, Partials> = (value: Value) => (value as unknown as string).split("") as unknown as Partials[]; // prettier-ignore
    private comparePartials: Compare<Partials> = (a: any, b: any) => a === b; // prettier-ignore
    private compareValues: Compare<Value> = (a: any, b: any) => a === b;

    // TODO: allow user to customize the three transform/comparator functions
    constructor(compareFunction?: (a: Partials, b: Partials) => boolean) {
        this.head = {
            value: null,
            isWord: false,
            parent: null,
            children: [],
        };
        if (compareFunction) {
            this.comparePartials = compareFunction;
        }
    }

    private _replacer(key: any, value: any) {
        // Filtering out properties
        if (key === "parent") {
            return "<circular>";
        }
        return value;
    }

    toJSON() {
        const str = this.toString();
        return JSON.parse(str);
    }

    toString() {
        return JSON.stringify(this.head, this._replacer, 2);
    }

    /**
     * what we're trying to do is
     * - for every char in the arrayable item:
     * - if there is a child node for this char, move on to the next char (do nothing to it)
     * - else this char is a new child, create the node and add it to the child
     */
    insert(item: Partials[]): void {
        if (item.length === 0) return;
        let curr = this.head;
        item.forEach((c) => {
            const childIdx = curr.children.findIndex((n) => this.comparePartials(n.value, c)); // prettier-ignore
            if (childIdx !== -1) {
                curr = curr.children[childIdx];
            } else {
                // no child, make new child
                const childNode: Node<Partials> = {
                    value: c,
                    isWord: false,
                    parent: curr,
                    children: [],
                };
                curr.children.push(childNode);
                curr = childNode;
            }
        });
        curr.isWord = true;
    }
    delete(item: Value): void {
        /**
         * recursion is good here
         * - your recurse your way into the node
         * - in the post operation, you delete your way back up
         *      - only delete if you're the only link left
         */

        // recurse
        let curr = this._findOne(item, this.head, []);
        if (!curr) return;

        // 1. set isWord to false
        curr.isWord = false;
        // 2. remove nodes upward
        this._removeNode(curr);
    }

    // 2. recursively remove node upward
    _removeNode(node: Node<Partials> | null) {
        // base case
        if (!node) return;
        if (node.isWord) return;

        // pre
        // 2.1 if has children, don't remove
        if (node.children.length > 0) return;
        // 2.2 else remove node, go to parent, repeat 2
        let tmp: Node<Partials> | undefined = node;
        node = node.parent;
        if (node) {
            node.children = [];
        }
        tmp = undefined;

        // recurse
        this._removeNode(node);

        // post
    }

    _findOne(
        item: Value,
        curr: Node<Partials>,
        wordSoFar: Partials[],
    ): Node<Partials> | null {
        // base cases
        if (!this._hasPartialMatch(item, wordSoFar)) return null;

        // pre
        if (curr.value) {
            wordSoFar.push(curr.value);
        }
        if (curr.isWord && this._matches(item, wordSoFar)) {
            return curr;
        }
        // recurse
        for (const child of curr.children) {
            const res = this._findOne(item, child, [...wordSoFar]);
            if (res) return res;
        }

        // post
        return null;
    }

    private _matches(search: Value, wordSoFar: Partials[]) {
        return this.compareValues(search, this.toValue(wordSoFar));
    }

    find(partial: Value): Value[] {
        const result: Value[] = [];
        // this is just a dfs
        let curr = this.head;
        if (!curr) return [];

        this._find(partial, curr, [], result);

        return result;
    }

    private _find(
        search: Value,
        curr: Node<Partials>,
        wordSoFar: Partials[],
        results: Value[],
    ) {
        // base cases
        if (!this._hasPartialMatch(search, wordSoFar)) return;

        // pre
        if (curr.value) {
            wordSoFar.push(curr.value);
        }
        if (curr.isWord && this._hasPartialMatch(search, wordSoFar)) {
            results.push(this.toValue(wordSoFar));
        }
        // recurse
        curr.children.forEach((c) => {
            // important to pass in a new copy of words so far,
            // otherwise different branches mutate the same partials array
            this._find(search, c, [...wordSoFar], results);
        });

        // post
    }

    private _hasPartialMatch(search: Value, wordSoFar: Partials[]): boolean {
        const searchPartials = this.toPartials(search);
        for (const sIdx in searchPartials) {
            const searchChar = searchPartials[sIdx];
            const wordSoFarChar = wordSoFar[sIdx];
            if (!wordSoFarChar) break;
            // the partial search no longer matches the word so far
            if (!this.comparePartials(searchChar, wordSoFarChar)) return false;
        }
        return true;
    }
}
