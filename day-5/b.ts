import { runSolution } from '../utils.ts';

type RuleMap = Record<number, number[]>;
type Update = number[];

const rules: RuleMap = {};

const checkUpdate = (update: Update, correct = true): number => {
    const passedElements: number[] = [];
    let errorFound = false;
    for (let indexUpdate = 0; indexUpdate < update.length; indexUpdate++) {
        const elem = update[indexUpdate];
        if (!rules[elem]) {
            // console.warn(`elem ${elem} has no rules!!`)
            passedElements.push(elem);
            continue;
        }
        const rule = rules[elem] as number[];
        // console.log(`Checking elem ${elem} with rule `, rule, passedElements);
        for (const pElem of passedElements) {
            if (rule.includes(pElem)) {
                correct = false;
                errorFound = true;
                const indexPassed = update.findIndex(value => value === pElem);
                update.splice(indexPassed, 1);
                update.splice(indexUpdate, 0, pElem);
            }
        }
        passedElements.push(elem);
    }

    if (errorFound) {
        return checkUpdate(update, false);
    }

    if (correct) {
        return 0;
    }

    // todo extraire la valeur du milieu

    return update[(update.length - 1) / 2];
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
            // console.log(update, update.length, update[update.length / 2]);
            result += checkUpdate(update);
        }
    }

    // console.log(rules);

    return result;
}

await runSolution(day5a);

