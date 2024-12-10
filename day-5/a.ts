import { runSolution } from '../utils.ts';

type RuleMap = Record<number, number[]>;
type Update = number[];

const rules: RuleMap = {};

const checkUpdate = (update: Update): boolean => {
    const passedElements: number[] = [];
    for (const elem of update) {
        if (!rules[elem]) {
            // console.warn(`elem ${elem} has no rules!!`)
            passedElements.push(elem);
            continue;
        }
        const rule = rules[elem] as number[];
        // console.log(`Checking elem ${elem} with rule `, rule, passedElements);
        for (const pElem of passedElements) {
            if (rule.includes(pElem)) {
                return false;
            }
        }
        passedElements.push(elem);
    }

    return true;
};

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
    let rulesRead = false;
    let result = 0;

    for (const line of data) {
        if ("" === line) {
            rulesRead = true;
            continue;
        }

        if (!rulesRead) {
            const r = line.split("|");
            const index = Number(r[0]);
            if (rules[index] === undefined) {
                rules[index] = [];
            }
            rules[index].push(Number(r[1]));
        } else {
            // Parsing
            const r = line.split(",");
            const update: number[] = [];
            for (const n of r) {
                update.push(Number(n));
            }

            // Check rules
            if (checkUpdate(update)) {
                // console.log(update, update.length, update[update.length / 2]);
                result += update[(update.length - 1) / 2];
            }
        }
    }

    console.log(rules);

    return result;
}

await runSolution(day5a);
