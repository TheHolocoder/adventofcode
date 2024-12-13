import { runSolution } from '../utils.ts';

type Position = {
    x: number;
    y: number;
};

const directions: Position[] = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
];

const display = (grid: string[][]): void => {
    console.clear();
    for(const line of grid) {
        console.log(line.join(''));
    }
};

const outOfBounds = (guard: Position, width: number, height: number): boolean => {
    return guard.x < 0 || guard.x >= width || guard.y < 0 || guard.y >= height;
};

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
    console.log(data);
    const grid: string[][] = [];
    const visited: string[][] = [];
    let guard: Position = {x: 0, y:0};
    for (let i = 0; i < data.length; ++i) {
        const line = data[i];
        if (line.length) {
            grid.push(line.split(''));
            visited.push(line.split(''));
            visited[i].fill('.');
        }
        const index = line.indexOf('^');
        if (index !== -1) {
            guard = {x: index, y: i};
        }
    }
    const width = grid[0].length;
    const height = grid.length;
    let direction = 0;
    visited[guard.x][guard.y] = 'X';

    while (!outOfBounds(guard, width, height)) {
        // diplay
        display(grid);

        // simulate
        const v = directions[direction];
        const newPos = {x: guard.x + v.x, y: guard.y + v.y};

        if (outOfBounds(newPos, width, height)) {
            break;
        }

        if (grid[newPos.y][newPos.x] === '#') {
            direction = (direction + 1) % 4;
        } else {
            grid[newPos.y][newPos.x] = '^';
            grid[guard.y][guard.x] = '.';
            guard = newPos;
            visited[newPos.x][newPos.y] = 'X';
        }

        // sleep
        await new Promise(r => setTimeout(r, 100));
    }

    display(visited);

    let count = 0;
    for(const line of visited) {
        for (const cell of line) {
            if ('X' === cell) {
                count++;
            }
        }
    }

    return count;
}

await runSolution(day6a);
