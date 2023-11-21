/**
 * base cases
 * - make sure you do as many things as you can in a base case
 *   because otherwise you would have to do it in the recursive case
 *   and that makes it a million times harder
 *
 * maze base cases
 * 1. is a wall (invalid state)
 * 2. is off the map (invalid state)
 * 3. is the end (valid state, we're done)
 * 4. if we have seen it before (invalid state)
 *
 * recursive cases
 * - when you put as many things in the base cases, you simplify recursive cases
 *
 * maze recursive case
 * 1. check every direction (that's it)
 *
 */

interface Point {
    x: number;
    y: number;
}

const mouse = (
    prevLocs: Point[],
    loc: Point,
    win: Point,
    maze: string[],
    wall: string,
): false | null | Point[] => {
    // maze base cases
    // 1. is a wall (invalid state)
    if (maze[loc.y]?.[loc.x] === wall) return false;
    // 2. is off the map (invalid state)
    if (!maze[loc.y]?.[loc.x]) return false;
    // 3. if we have seen it before (invalid state)
    if (prevLocs.find((p) => p.x === loc.x && p.y === loc.y)) return false;

    // Viz
    maze.forEach((rowY, y) => {
        if (y !== loc.y) {
            [...rowY].forEach((item) => {
                process.stdout.write(` ${item} `);
            });
            console.log("");
            return;
        }

        [...rowY].forEach((item, x) => {
            if (x === loc.x) {
                process.stdout.write(`[${item}]`);
            } else {
                process.stdout.write(` ${item} `);
            }
        });
        console.log("");
        return;
    });
    console.log("");

    console.log(
        `at valid position: ${loc.x},${loc.y}: [${maze?.[loc.y]?.[loc.x]}]`,
    );
    // 4. is the end (valid state, we're done)
    if (loc.x === win.x && loc.y === win.y) {
        const all = [...prevLocs, loc];
        console.log("hey we win! E is:", loc);
        console.log("------------WIN-------------");

        return all;
    }
    console.log("----------------------------");
    const nextUp = mouse([...prevLocs, loc], { x: loc.x, y: loc.y - 1 }, win, maze, wall); // prettier-ignore
    const nextRight = mouse([...prevLocs, loc], { x: loc.x + 1, y: loc.y }, win, maze, wall); // prettier-ignore
    const nextDn = mouse([...prevLocs, loc], { x: loc.x, y: loc.y + 1 }, win, maze, wall); // prettier-ignore
    const nextLeft = mouse([...prevLocs, loc], { x: loc.x - 1, y: loc.y }, win, maze, wall); // prettier-ignore

    if (!!nextUp) return nextUp;
    if (!!nextRight) return nextRight;
    if (!!nextDn) return nextDn;
    if (!!nextLeft) return nextLeft;
    return null;
};

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const res = mouse([], start, end, maze, wall);
    return res || [];
}

// prettier-ignore
const MAZE1 = [
    "#####E#",
    "#     #",
    "#S#####"
]
// const MAZE2 = [
//     "xxxxxxxxxx x",
//     "x        x x",
//     "x        x x",
//     "x xxxxxxxx x",
//     "x          x",
//     "x xxxxxxxxxx",
// ];
const result = solve(MAZE1, "#", { x: 1, y: 2 }, { x: 5, y: 0 });
// const result = solve(MAZE2, "x", { x: 10, y: 0 }, { x: 1, y: 5 });
console.log("final result", result);
// npx run src/day3/MazeSolver.ts
