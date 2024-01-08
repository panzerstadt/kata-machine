/**
 * divide and conquer. usually done with MergeSort
 *
 */

const groupedLogs = new Map();
const _labelNumber =
    (currIdx: number, leftPartitionEndIdx: number) =>
    (v: number, j: number) => {
        let out = `${v}`;
        if (j === currIdx) {
            out = `(${out})`;
        }
        if (j === leftPartitionEndIdx) {
            out = `${out}|`;
        }
        return out;
    };

const qs = (
    arr: number[],
    lo: number,
    hi: number,
    _id: string,
    levels: number,
): void => {
    const id = _id + levels;
    if (!groupedLogs.has(id)) {
        groupedLogs.set(id, []);
    }
    const logGroup = groupedLogs.get(id) as string[];
    /**
     * base case
     */
    // 1. we're done sorting
    if (lo >= hi) {
        logGroup.push(`${id}: no sorting needed on [${arr.slice(lo, hi + 1)}]`);
        return;
    }
    // 2. we need to sort,
    //    by performing a weak sort and returning the pivot idx (get a sorted number)
    const pivotIdx = partition(arr, lo, hi, id);

    logGroup.push(`end  [${arr[pivotIdx]}] (i ${pivotIdx}) is now sorted.`);
    logGroup.push(`end  ${_id}L${levels+1}[${arr.slice(lo, pivotIdx)}] [${arr[pivotIdx]}] ${_id}R${levels+1}[${arr.slice(pivotIdx + 1,hi + 1)}]`) // prettier-ignore

    /**
     * recurse cases
     */
    // PRE

    // RECURSE
    // sorting on left half of array
    qs(arr, lo, pivotIdx - 1, _id + "L", levels + 1); // left
    // and right half of the array
    // but CRITICALLY not the pivot number (cause it's already 'sorted')
    qs(arr, pivotIdx + 1, hi, _id + "R", levels + 1); // right

    // POST
};

/**
 * what is the purpose of partitioning?
 *
 * @param arr
 * @param lo
 * @param hi
 * returns "what is the pivot index? where did we weakly sort this array?"
 *
 */
const partition = (
    arr: number[],
    lo: number,
    hi: number,
    id: string,
): number => {
    if (!groupedLogs.has(id)) {
        groupedLogs.set(id, []);
    }
    const logGroup = groupedLogs.get(id) as string[];

    const pivot = arr[hi];

    // this index tracks where to split the left side of the partition.
    // the pivot point (sorted number) should be right after this index
    // when we finish looping.
    let leftPartitionEndIdx = lo - 1; // index of the last element that is <= pivot
    // starts from OUTSIDE the subarray to be sorted
    // if sorting [1,2,3,4], start at idx, the -1th element (value = undefined) --> [idx][1,2,3,4]
    // because we wanna be able to put stuff into the first position

    // walk from the low to the hi bit NOT including the high (cause the hi is the pivot)
    // pivot is the 'sorted' number
    logGroup.push(`     [${arr.slice(lo, hi)},[${pivot}]] : walking from low to hi -1`); // prettier-ignore
    logGroup.push(
        `     (v) : loop current index      [v] : pivot (sorted number)      | : the end of the partition, something we're trying to find out by doing the following loop.`,
    );
    // loop through to:
    // - find out where to stuff in the (sorted) pivot number - left partition's end index
    // - ensure all numbers left of that partition index is smaller than pivot number
    //    - if number is bigger then pivot number,
    //      increment the partition index, then
    //      swap it with partition index's position.
    for (let currIdx = lo; currIdx < hi; currIdx++) {
        // each element has to only be compared to the pivot
        if (arr[currIdx] <= pivot) {
            leftPartitionEndIdx++;

            logGroup.push(`-----`);
            logGroup.push(`swap  ${arr[currIdx]} <= ${pivot}, we swap: (${arr[currIdx]}) currIdx ${currIdx} with ${arr[leftPartitionEndIdx]}| leftPartitionEndIdx ${leftPartitionEndIdx}.`); // prettier-ignore
            logGroup.push(`swap [${arr.map(_labelNumber(currIdx, leftPartitionEndIdx)).slice(lo, hi)},[${pivot}]] : before`); // prettier-ignore

            // this is the binary search-like swap
            const tmp = arr[currIdx];
            arr[currIdx] = arr[leftPartitionEndIdx];
            arr[leftPartitionEndIdx] = tmp;

            logGroup.push(`swap [${arr.map(_labelNumber(currIdx, leftPartitionEndIdx)).slice(lo, hi)},[${pivot}]] : after`); // prettier-ignore
        } else {
            logGroup.push(`-----`);
            logGroup.push(`keep  ${arr[currIdx]} is > ${pivot}, we're not gonna do anything here.`); // prettier-ignore
            logGroup.push(`keep [${arr.map(_labelNumber(currIdx, leftPartitionEndIdx)).slice(lo, hi)},[${pivot}]] : no change at currIdx ${currIdx}. leftPartitionEndIdx is ${leftPartitionEndIdx}`); // prettier-ignore
        }
    }

    logGroup.push(`-----`);
    logGroup.push(`     done a weak sort: ${arr}`);
    logGroup.push(`     idx is ${leftPartitionEndIdx}. increment it by 1.`);
    leftPartitionEndIdx++;

    logGroup.push(`pvt  [${arr.map((v) => v === pivot ? `[${v}]` : v)}] : pre-pivot`); // prettier-ignore
    arr[hi] = arr[leftPartitionEndIdx];
    arr[leftPartitionEndIdx] = pivot;
    logGroup.push(`pvt  [${arr.map((v) => v === pivot ? `[${v}]` : v)}] : post-pivot`); // prettier-ignore

    logGroup.push(`     [${arr}] : one round of weak sort done. now everything left of [${pivot}] is smaller, and everything right of [${pivot}] is larger.`); // prettier-ignore

    return leftPartitionEndIdx;
};

export default function quick_sort(arr: number[]): void {
    console.log(
        `[${arr}] : alllll right listen up lads, we're gonna need to sort this array here.`,
    );
    qs(arr, 0, arr.length - 1, "_", 0); // low inclusive, AND high inclusive

    console.log(groupedLogs.entries());
}
