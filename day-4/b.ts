import { runSolution } from '../utils.ts';

type Letter = 'X' | 'M' | 'A' | 'S';

const nextCoord = {
    'NE': (x: number, y: number) => ({ x: x + 1, y: y - 1 }),
    'NO': (x: number, y: number) => ({ x: x - 1, y: y - 1 }),
    'SE': (x: number, y: number) => ({ x: x + 1, y: y + 1 }),
    'SO': (x: number, y: number) => ({ x: x - 1, y: y + 1 }),
}

const check = (letters: Letter[][], curX: number, curY: number, direction: '/' | '\\'): boolean => {
    if ('/' === direction) {
        const { x: nex, y: ney } = nextCoord['NE'](curX, curY);
        const { x: sox, y: soy } = nextCoord['SO'](curX, curY);
        const neLetter = letters[ney][nex];
        const soLetter = letters[soy][sox];

        return ((neLetter === 'M' && soLetter === 'S') || (neLetter === 'S' && soLetter === 'M'));
    }

    const { x: nox, y: noy } = nextCoord['NO'](curX, curY);
    const { x: sex, y: sey } = nextCoord['SE'](curX, curY);
    const noLetter = letters[noy][nox];
    const seLetter = letters[sey][sex];

    return ((noLetter === 'M' && seLetter === 'S') || (noLetter === 'S' && seLetter === 'M'));
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

    for (let y = 1; y < height - 1; ++y) {
        for (let x = 1; x < width - 1; ++x) {
            const letter = letters[y][x];
            // On veut que les A
            if ('A' !== letter) {
                continue;
            }

            if (check(letters, x, y, '/') && check(letters, x, y, '\\')) {
                xmasCount++;
            }
        }
    }

    // console.log(letters);
    return xmasCount;
}

await runSolution(day4a);

