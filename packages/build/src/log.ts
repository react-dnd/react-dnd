import log = require('fancy-log')
import chalk = require('chalk')

const TASK_SZ = 9

export function subtaskSuccess(taskName: string, ...args: any[]) {
	log.info(
		`${chalk.green('✔')} [ ${chalk.green(taskName.padEnd(TASK_SZ, ' '))} ] `,
		...args,
	)
}
export function subtaskFail(taskName: string, ...args: any[]) {
	log.info(`❌ [ ${chalk.red(taskName.padEnd(TASK_SZ, ' '))} ] `, ...args)
}
