export default function bubble_sort(arr: number[]): void {
    console.log(`original:${arr}`);
    const n = arr.length;

    // you need to do the inner thing for N times
    for (let i = 0; i < n; i++) {
        console.log(`loop no: ${i}, we're sorting from idx 0 to ${n - 1 - i}: arr is ${arr}`); // prettier-ignore
        // inner thing: (https://frontendmasters.com/courses/algorithms/implementing-bubble-sort/)
        // each round, you do this n times minus 1 minus the number of times you've done it
        // in the logic:
        // if j is bigger than j+!, swap
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                console.log(`${arr[j]} is larger than ${arr[j + 1]} in ${arr}, swapping.`); // prettier-ignore
                let bigger = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = bigger;
            }
        }
    }

    console.log(`after:${arr}`);
}

// my original attempt
// export default function bubble_sort(arr: number[]): void {
//     let sortHappened = false;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i + 1] < arr[i]) {
//             sortHappened = true;
//             let smaller = arr[i + 1];
//             arr[i + 1] = arr[i];
//             arr[i] = smaller;
//         }
//     }

//     if (!sortHappened) return;
//     bubble_sort(arr);
// }
