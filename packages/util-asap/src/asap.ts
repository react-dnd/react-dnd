import { rawAsap } from './raw.js'
import type { Task } from './types.js'

// rawAsap provides everything we need except exception management.
// RawTasks are recycled to reduce GC churn.
const freeTasks: Task[] = []
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
const pendingErrors: any[] = []
const requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError)

function throwFirstError() {
	if (pendingErrors.length) {
		throw pendingErrors.shift()
	}
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
export function asap(task: Task) {
	let rawTask
	if (freeTasks.length) {
		rawTask = freeTasks.pop()
	} else {
		rawTask = new RawTask()
	}
	rawTask.task = task
	rawAsap(rawTask)
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
class RawTask {
	private task: Task

	public call() {
		try {
			this.task.call()
		} catch (error) {
			if ((asap as any).onerror) {
				// This hook exists purely for testing purposes.
				// Its name will be periodically randomized to break any code that
				// depends on its existence.
				;(asap as any).onerror(error)
			} else {
				// In a web browser, exceptions are not fatal. However, to avoid
				// slowing down the queue of pending tasks, we rethrow the error in a
				// lower priority turn.
				pendingErrors.push(error)
				requestErrorThrow()
			}
		} finally {
			this.task = null
			freeTasks[freeTasks.length] = this
		}
	}
}
