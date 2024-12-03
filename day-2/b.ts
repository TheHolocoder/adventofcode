import { runSolution } from '../utils.ts';

type Report = number[];

let safeReports: number = 0;

const checkAscending = (report: Report): boolean => {
    let elem = report[0];
    for (let i = 1; i < report.length; ++i) {
        if (report[i] <= elem) {
            return false;
        }

        elem = report[i];
    }

    return true;
}

const checkDescending = (report: Report): boolean => {
    let elem = report[0];
    for (let i = 1; i < report.length; ++i) {
        if (report[i] >= elem) {
            return false;
        }

        elem = report[i];
    }

    return true;
}

const checkDistance = (report: Report): boolean => {
    let elem = report[0];
    for (let i = 1; i < report.length; ++i) {
        const distance = Math.abs(elem - report[i]);
        if (distance < 1 || distance > 3) {
            return false;
        }

        elem = report[i];
    }

    return true;
}


const check = (report: Report, exceptionUsed: boolean): boolean => {
    if (
        (checkAscending(report) || checkDescending(report))
        && checkDistance(report)
    ) {
        return true;
    } else {
        if (!exceptionUsed) {
            exceptionUsed = true;
            for (let i = 0; i < report.length; ++i) {
                const clone = [...report];
                clone.splice(i, 1);
                if (check(clone, exceptionUsed)) {
                    return true;
                }
            }
        }
    }

    return false;
}


/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
    console.log(data);
    data.forEach(line => {
        if (line.length !== 0) {
            // const r = line.match(/([0-9]) {3}([0-9])/);
            const r = line.split(' ');
            const report: Report = [];
            r.forEach(level => report.push(Number(level)));

            if(check(report, false)) {
                safeReports++;
            }
        }
    });

    return safeReports;
}

await runSolution(day2a);

