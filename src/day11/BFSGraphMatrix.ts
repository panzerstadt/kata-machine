/**
 * the adjacency matrix that we're searching
 * [    0  1  2  3  4
 * 0 [  0  1  4  5  0 ]   <-- this is a list of adjacencies (from 0 to 1, the weight of the adjacency is 1)
 * 1 [  1  0  0  0  0 ]
 * 2 [  0  0  0  2  0 ]
 * 3 [  0  0  0  0  5 ]
 * 4 [  0  0  0  0  0 ]
 * ]
 */

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number, // e.g. i'm starting from value 0
    needle: number, // e.g. i'm looking for value 4
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q: number[] = [source];

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            // here i = the row in the adj matrix
            // e.g. 0 = [0,1,4,5,0]
            if (adjs[i] === 0) {
                continue; // if there's no edge (line connecting nodes), we just continue to keep looking
            }

            if (seen[i]) {
                continue; // if we've already seen it, we don't need to check again
            }

            // we haven't seen it, so we need to
            // - mark it as seen,
            seen[i] = true;
            // - record where it came from
            prev[i] = curr;
            // - push into the queue,
            q.push(i);
        }
        seen[curr] = true; // we have now checked the current number
    } while (q.length);

    if (prev[needle] === -1) {
        return null;
    }

    // build it backwards
    let curr = needle;
    const out: number[] = []; // the path, from needle to source

    // keep doing this until you find a path that has no more parent (-1 is default num as defined above)
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    return [source].concat(out.reverse());
}
