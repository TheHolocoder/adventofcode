import { runSolution } from '../utils.ts';

type Letter = 'X' | 'M' | 'A' | 'S';
type Direction = 'N' | 'S' | 'E' | 'O' | 'NE' | 'SE' | 'NO' | 'SO';

const nextCoord = {
    'N': (x: number, y: number) => ({ x: x, y: y - 1 }),
    'S': (x: number, y: number) => ({ x: x, y: y + 1 }),
    'E': (x: number, y: number) => ({ x: x + 1, y }),
    'O': (x: number, y: number) => ({ x: x - 1, y }),
    'NE': (x: number, y: number) => ({ x: x + 1, y: y - 1 }),
    'NO': (x: number, y: number) => ({ x: x - 1, y: y - 1 }),
    'SE': (x: number, y: number) => ({ x: x + 1, y: y + 1 }),
    'SO': (x: number, y: number) => ({ x: x - 1, y: y + 1 }),
}
const nextLetter = {
    'X': 'M',
    'M': 'A',
    'A': 'S',
    'S': undefined
};

const check = (letters: Letter[][], curX: number, curY: number, shouldFind: Letter, direction: Direction): boolean => {
    const { x, y } = nextCoord[direction](curX, curY);
    if (shouldFind !== letters[y][x]) {
        return false;
    }

    const nl = nextLetter[shouldFind];
    if (undefined === nl) {
        return true;
    }

    return check(letters, x, y, nl, direction);
}

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {

    // Bataille navale de lettres
    const letters: Letter[][] = [];
    for (const line of data) {
        letters.push(line.split("") as Letter[]);
    }
    // on retire l'initialisation, c'est crade mais osef
    letters.splice(-1);

    const width = letters[0].length;
    const height = letters.length;
    let xmasCount = 0;

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const letter = letters[y][x];
            // On veut que les X
            if ('X' !== letter) {
                continue;
            }

            // N
            if ((y - 3) >= 0) {
                if (check(letters, x, y, 'M', 'N')) {
                    xmasCount++;
                }
                // NE
                if ((x + 3) < width) {
                    if (check(letters, x, y, 'M', 'NE')) {
                        xmasCount++;
                    }
                }
                // NO
                if ((x - 3) >= 0) {
                    if (check(letters, x, y, 'M', 'NO')) {
                        xmasCount++;
                    }
                }
            }
            // S
            if ((y + 3) < height) {
                if (check(letters, x, y, 'M', 'S')) {
                    xmasCount++;
                }
                // SE
                if ((x + 3) < width) {
                    if (check(letters, x, y, 'M', 'SE')) {
                        xmasCount++;
                    }
                }
                // SO
                if ((x - 3) >= 0) {
                    if (check(letters, x, y, 'M', 'SO')) {
                        xmasCount++;
                    }
                }
            }
            // E
            if ((x + 3) < width) {
                if (check(letters, x, y, 'M', 'E')) {
                    xmasCount++;
                }
            }
            // O
            if ((x - 3) >= 0) {
                if (check(letters, x, y, 'M', 'O')) {
                    xmasCount++;
                }
            }
        }
    }


    // console.log(letters);
    return xmasCount;
}

await runSolution(day4a);
