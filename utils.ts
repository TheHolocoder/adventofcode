import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function runSolution(solution: (data: string[]) => any) {
  const data = await readData();
  const answer = await solution(data);
  console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
}

export async function readData() {
  const [_, fullPath, ...args] = process.argv;

  const dataSetArg = args.find((arg) => arg.startsWith('--data='));
  const dataSet = dataSetArg ? dataSetArg.split('=')[1] : undefined;

  const puzzle = fullPath.split('/').slice(-2).join('/');
  const [day, part] = puzzle
    .split('/')
    .map((x, i) => (i === 0 ? +x.split('-')[1] : x)) as [number, 'a' | 'b'];
  const fileName = createFileName(day, part, dataSet);
  const data = (await readFile(fileName)).toString().split('\n');
  return data;
}
function createFileName(day: number, part: 'a' | 'b', dataSet?: string) {
  return join(`day-${day}`, `${part}.data${dataSet ? `.${dataSet}` : ''}.txt`);
}
