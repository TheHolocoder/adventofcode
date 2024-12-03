import { runSolution } from '../utils.ts';

const column1: number[] = [];
const column2: number[] = [];
const distances: number[] = [];

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
    console.log(data);
    data.forEach(line => {
        if (line.length !== 0) {
            // const r = line.match(/([0-9]) {3}([0-9])/);
            const r = line.split('   ');
            column1.push(Number(r[0]));
            column2.push(Number(r[1]));
        }
    });

    column1.sort();
    column2.sort();
    
    if (column1.length !== column2.length) {
        throw new Error("OUPSIE");
    }

    for (let i = 0; i < column1.length; ++i) {
        distances.push(Math.abs(column2[i] - column1[i]));
    }
    
    return distances.reduce((total, current) => total += current, 0);
}

await runSolution(day1a);
