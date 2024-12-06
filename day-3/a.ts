import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
    let result = 0;
    const rx = /mul\((\d{1,3}),(\d{1,3})\)/g;
    for (const line of data) {
        let match = rx.exec(line);
        while (null !== match) {
            result += Number(match[1]) * Number(match[2]);
            match = rx.exec(line);
        }
    }

    return result;
}

await runSolution(day3a);
