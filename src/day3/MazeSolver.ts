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

const dir = [
    [0, -1], // up
    [1, 0], // right
    [0, 1], //dn
    [-1, 0], // left
];

const walk = (
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean => {
    // 1. base case: off the map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    // 2. base case: on a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // 3. have we seen it
    if (seen[curr.y][curr.x]) {
        return false;
    }

    maze.forEach((rowY, y) => {
        if (y !== curr.y) {
            [...rowY].forEach((item) => {
                process.stdout.write(` ${item} `);
            });
            console.log("");
            return;
        }

        [...rowY].forEach((item, x) => {
            if (x === curr.x) {
                process.stdout.write(`[${item}]`);
            } else {
                process.stdout.write(` ${item} `);
            }
        });
        console.log("");
        return;
    });
    console.log([...maze[0]].map((_) => "---").join(""));

    // 4. are we at end
    if (curr.x === end.x && curr.y === end.y) {
        seen[curr.y][curr.x] = true;
        path.push(end);
        return true;
    }

    // at this point you don't even need to think of the base case anymore

    // 3 steps to recursion
    // pre
    seen[curr.y][curr.x] = true;
    path.push(curr);
    // recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    // post
    path.pop();

    return false;
};

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    seen.forEach((row) => {
        row.forEach((item) => {
            process.stdout.write(!!item ? "." : "x");
        });
        process.stdout.write("\n");
    });

    return path;
}

// prettier-ignore
const MAZE1 = [
    "#####E#",
    "#     #",
    "#S#####"
]
const MAZE2 = [
    "xxxxxxxxxx x",
    "x        x x",
    "x        x x",
    "x xxxxxxxx x",
    "x          x",
    "x xxxxxxxxxx",
];
// const result = solve(MAZE1, "#", { x: 1, y: 2 }, { x: 5, y: 0 });
const result = solve(MAZE2, "x", { x: 10, y: 0 }, { x: 1, y: 5 });
console.log("final result", result);
// npx run src/day3/MazeSolver.ts
