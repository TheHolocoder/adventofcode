import { runSolution } from '../utils.ts';

// const mulIndex = 1;
const number1Index = 2;
const number2Index = 3;
const doIndex = 4;
const dontIndex = 5;

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
    let result = 0;
    let enabled = true;

    const rx = /(mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don't)\(\)/g;
    for (const line of data) {
        let match = rx.exec(line);
        while (null !== match) {
            if (undefined !== match[doIndex]) {
                enabled = true;
            } else if (undefined !== match[dontIndex]) {
                enabled = false;
            } else if (enabled) {
                // mul
                result += Number(match[number1Index]) * Number(match[number2Index]);
            }
            match = rx.exec(line);
        }
    }

    return result;
}

await runSolution(day3a);

