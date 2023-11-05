export default function two_crystal_balls(breaks: boolean[]): number {
    // sqrtidx is the new 'unit' to jump through
    const sqrtIdx = Math.floor(Math.sqrt(breaks.length));
    let finalJumpIdx = 0;

    // this part skips to the point of the segment (sqrt(n)) that contains the breaking point -> loop size of sqrt(n)
    for (let i = 0; i < breaks.length; i += sqrtIdx) {
        if (breaks[i] === true) {
            // 1. you break one crystal ball
            finalJumpIdx = i - sqrtIdx; // go to one index before and scan
            break;
        }
    }

    // this part just scans the last unit, the size of which is sqrt(n) -> loop size of sqrt(n)
    for (let j = finalJumpIdx; j < breaks.length; j++) {
        if (breaks[j] === true) return j; // 2. you break the second one, but you already got the answer to your crystal ball hardness. elon could have used this test on his cybertruck
    }

    // got nothing
    return -1;
}

// sqrt(n) + sqrt(n) = 2 * sqrt(n) --> big O = O(sqrt(n))
/**
 * bonus: what happens if you get one more crystal ball?
 * a: not much. you can maybe loop once more, and have a second jump space(?) which would speed up the 3rd scan
 *    however this would make it 3 * sqrt(n) which is still sqrt(n)
 * */
