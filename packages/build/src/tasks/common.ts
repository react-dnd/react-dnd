import { TaskFunction } from 'gulp'
import through2 = require('through2')

export const noopStep = (): any => through2.obj()
export const noopTask: TaskFunction = (cb: (err?: Error) => void): void => cb()
