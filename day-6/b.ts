import { runSolution } from '../utils.ts';

type Position = {
    x: number;
    y: number;
};

type PositionPlus = Position & {
    symbol: string;
}

const directions: PositionPlus[] = [
    { x: 0, y: -1, symbol: '|' },
    { x: 1, y: 0, symbol: '-' },
    { x: 0, y: 1, symbol: '|' },
    { x: -1, y: 0, symbol: '-' },
];

const display = (grid: string[][]): void => {
    // console.clear();
    for (const line of grid) {
        console.log(line.join(''));
    }
};

const outOfBounds = (guard: Position, width: number, height: number): boolean => {
    return guard.x < 0 || guard.x >= width || guard.y < 0 || guard.y >= height;
};

const simulate = async (guard: Position, grid: string[][]): Promise<boolean> => {
    const width = grid[0].length;
    const height = grid.length;
    let direction = 0;
    let tourneEnRond = false;

    grid[guard.y][guard.x] = '1';

    while (!outOfBounds(guard, width, height)) {
        // diplay
        // display(grid);

        // simulate
        const v = directions[direction];
        const newPos = { x: guard.x + v.x, y: guard.y + v.y };

        if (outOfBounds(newPos, width, height)) {
            break;
        }

        if (grid[newPos.y][newPos.x] === '#') {
            direction = (direction + 1) % 4;
        } else {
            const newNumber = Number(grid[newPos.y][newPos.x]);
            grid[newPos.y][newPos.x] = (newNumber + 1).toString();
            if (newNumber + 1 > 3) {
                tourneEnRond = true;
                break;
            }
            guard = newPos;
        }

        // sleep
        // await new Promise(r => setTimeout(r, 100));
    }

    if (tourneEnRond) {
        display(grid);
    }
    // await new Promise(r => setTimeout(r, 1000));


    return tourneEnRond;
}

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
    console.log(data);
    const grid: string[][] = [];
    let guard: Position = { x: 0, y: 0 };
    for (let i = 0; i < data.length; ++i) {
        grid[i] = [];
        const line = data[i];
        if (line.length) {
            for (let j = 0; j < line.length; ++j) {
                grid[i].push(line[j] === '#' ? '#' : '0');
            }
        }
        const index = line.indexOf('^');
        if (index !== -1) {
            guard = { x: index, y: i };
        }
    }

    let count = 0;
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            console.log(`Simulate with obstacle at ${x}:${y}, guard starting at ${guard.x}:${guard.y}`);
            if (guard.x === x && guard.y === y) {
                console.warn('This cell is occupied by the guard!');
                continue;
            }

            if (grid[y][x] === '#') {
                console.warn('This cell is blocked!');
                continue;
            }

            const dgrid = grid.map(line => line.slice());
            dgrid[y][x] = '#';
            if (await simulate(guard, dgrid)) {
                count++;
            }
        }
    }

    return count;
}

await runSolution(day6a);
