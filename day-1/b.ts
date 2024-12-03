import { runSolution } from '../utils.ts';

const column1: number[] = [];
const column2: number[] = [];
const similarities: number[] = [];

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
    console.log(data);
    data.forEach(line => {
        if (line.length !== 0) {
            const r = line.split('   ');
            column1.push(Number(r[0]));
            column2.push(Number(r[1]));
        }
    });

    if (column1.length !== column2.length) {
        throw new Error("OUPSIE");
    }

    for (let i = 0; i < column1.length; ++i) {
        const num = column1[i];
        const frequency = column2.filter(elem => elem === num).length;
        similarities.push(num * frequency);
    }
    
    console.log(similarities);
    
    return similarities.reduce((total, current) => total += current, 0);
}

await runSolution(day1a);

