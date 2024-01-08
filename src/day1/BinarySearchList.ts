/**
 * requirements: has to be a sorted array
 */
export default function bs_list(haystack: number[], needle: number): boolean {
    // low and hi indices
    let low = 0;
    let hi = haystack.length;

    do {
        let m = Math.floor(low + (hi - low) / 2); // indices
        let v = haystack[m];
        console.table({ needle, low, m, hi, v });
        if (v === needle) {
            console.log("found it!");
            return true;
        } else if (needle > v) {
            console.log(`${needle} is bigger than ${v}`);
            low = m + 1;
        } else {
            console.log(`${needle} is smaller than ${v}`);
            // v < m
            hi = m;
        }
        console.log(
            `remaining array from index ${low} to index: ${
                hi - 1
            }: ${haystack.slice(low, hi)}`,
        );
    } while (low < hi);

    return false;
}
