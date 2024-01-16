// example adjacency list
// prettier-ignore
[
    [{ to: 1, weight: 3 }, { to: 2, weight: 1 }], // 0
    [{ to: 4, weight: 1 }], // 1
    [{ to: 3, weight: 7 }], // 2
    [], // 3
    [{ to: 1, weight: 1 }, { to: 5, weight: 2 }], // 4
    [{ to: 6, weight: 1 }, { to: 2, weight: 18 }], // 5
    [{ to: 3, weight: 1 }] // 6
]
const walk = (
    graph: WeightedAdjacencyList,
    curr: number, // current node
    needle: number,
    seen: boolean[],
    path: number[],
): boolean => {
    if (seen[curr]) return false;

    seen[curr] = true;

    // pre
    path.push(curr); // this is a 'try'
    if (curr === needle) return true;

    //recurse
    const nodeEdges = graph[curr];
    for (const edge of nodeEdges) {
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }
    //post
    path.pop(); // this completes a 'try', indicating nothing came of exploring the node, so we go back

    return false;
};

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (path.length === 0) {
        return null;
    }

    return path;
}
