import { asap } from '../node'
import { rawAsap } from '../node/raw'
import { domain } from './domain'

const MAX_RECURSION = 10
let WAIT_FOR_NORMAL_CASE = 100
let WAIT_FOR_ERRORS = 100

if (typeof process === 'undefined' && typeof window === 'undefined') {
	// give web workers a chance
	WAIT_FOR_NORMAL_CASE = 1000
	WAIT_FOR_ERRORS = 1000
}

describeAsap('rawAsap', rawAsap)
describeAsap('asap', asap)

function describeAsap(name: string, asap: any) {
	describe(name, () => {
		it(name + ' calls task in a future turn', () => {
			return new Promise<void>((done) => {
				let called = false
				asap(function () {
					called = true
					done()
				})
				expect(called).toBe(false)
			})
		})

		it(name + ' calls task.call method in a future turn', () => {
			return new Promise<void>((done) => {
				let called = false
				asap({
					call: function () {
						called = true
						done()
					},
				})
				expect(called).toBe(false)
			})
		})

		it(name + ' calls multiple tasks in order', () => {
			const calls: any = []

			asap(function () {
				calls.push(0)
			})
			asap(function () {
				calls.push(1)
			})
			asap(function () {
				calls.push(2)
			})

			expect(calls).toEqual([])

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(calls).toEqual([0, 1, 2])
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		it(name + ' calls tasks in breadth-first order', () => {
			const calls: any = []

			asap(function () {
				calls.push(0)

				asap(function () {
					calls.push(2)

					asap(function () {
						calls.push(5)
					})

					asap(function () {
						calls.push(6)
					})
				})

				asap(function () {
					calls.push(3)
				})
			})

			asap(function () {
				calls.push(1)

				asap(function () {
					calls.push(4)
				})
			})

			expect(calls).toEqual([])

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(calls).toEqual([0, 1, 2, 3, 4, 5, 6])
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		it(name + ' can schedule more than capacity tasks', () => {
			const target = 1060
			const targetList: any = []
			for (let i = 0; i < target; i++) {
				targetList.push(i)
			}

			const newList: any = []
			for (let i = 0; i < target; i++) {
				;(function (i) {
					asap(function () {
						newList.push(i)
					})
				})(i)
			}

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(newList).toEqual(targetList)
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		it(name + ' can schedule more than capacity*2 tasks', () => {
			const target = 2060
			const targetList: any[] = []
			for (let i = 0; i < target; i++) {
				targetList.push(i)
			}

			const newList: any[] = []
			for (let i = 0; i < target; i++) {
				;(function (i) {
					asap(function () {
						newList.push(i)
					})
				})(i)
			}

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(newList).toEqual(targetList)
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		// Recursion
		it(name + ' can schedule tasks recursively', () => {
			const steps: any[] = []

			asap(function () {
				steps.push(0)
				asap(function () {
					steps.push(2)
					asap(function () {
						steps.push(4)
					})
					steps.push(3)
				})
				steps.push(1)
			})

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(steps).toEqual([0, 1, 2, 3, 4])
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		it(name + ' can recurse ' + MAX_RECURSION + ' tasks deep', () => {
			let timesRecursed = 0
			function go() {
				if (++timesRecursed < MAX_RECURSION) {
					asap(go)
				}
			}

			asap(go)

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(timesRecursed).toBe(MAX_RECURSION)
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		it(name + ' can execute two branches of recursion in parallel', () => {
			let timesRecursed1 = 0
			let timesRecursed2 = 0
			const calls: any[] = []

			function go1() {
				calls.push(timesRecursed1 * 2)
				if (++timesRecursed1 < MAX_RECURSION) {
					asap(go1)
				}
			}

			function go2() {
				calls.push(timesRecursed2 * 2 + 1)
				if (++timesRecursed2 < MAX_RECURSION) {
					asap(go2)
				}
			}

			asap(go1)
			asap(go2)

			return new Promise<void>((done) => {
				setTimeout(function () {
					expect(calls.length).toBe(MAX_RECURSION * 2)
					for (let index = 0; index < MAX_RECURSION * 2; index++) {
						expect(calls[index]).toBe(index)
					}
					done()
				}, WAIT_FOR_NORMAL_CASE)
			})
		})

		it(
			name + ' does not stall with an explicit request to flush before error',
			() => {
				return new Promise<void>((done) => done())
			},
		)
	})
}

// Errors

it('asap throws errors in order', function () {
	const calls: any[] = []
	const errors: any[] = []

	const d = domain.create()
	d.on('error', (error: any) => {
		errors.push(error)
	})

	d.run(function () {
		asap(function () {
			calls.push(0)
			throw 0
		})
		asap(function () {
			calls.push(1)
			throw 1
		})
		asap(function () {
			calls.push(2)
			throw 2
		})
	})

	expect(calls).toEqual([])
	expect(errors).toEqual([])

	return new Promise<void>((done) => {
		setTimeout(function () {
			expect(calls).toEqual([0, 1, 2])
			expect(errors).toEqual([0, 1, 2])
			done()
		}, WAIT_FOR_ERRORS)
	})
})

it('asap preserves the respective order of errors interleaved among successes', () => {
	const calls: any[] = []
	const errors: any[] = []

	const d = domain.create()
	d.on('error', (error: any) => {
		errors.push(error)
	})

	d.run(function () {
		asap(function () {
			calls.push(0)
		})
		asap(function () {
			calls.push(1)
			throw 1
		})
		asap(function () {
			calls.push(2)
		})
		asap(function () {
			calls.push(3)
			throw 3
		})
		asap(function () {
			calls.push(4)
			throw 4
		})
		asap(function () {
			calls.push(5)
		})
	})

	expect(calls).toEqual([])
	expect(errors).toEqual([])

	return new Promise<void>((done) => {
		setTimeout(function () {
			expect(calls).toEqual([0, 1, 2, 3, 4, 5])
			expect(errors).toEqual([1, 3, 4])
			done()
		}, WAIT_FOR_ERRORS)
	})
})

it('asap executes tasks scheduled by another task that later throws an error', () => {
	const errors: any[] = []

	const d = domain.create()
	d.on('error', (error: any) => {
		errors.push(error)
	})

	d.run(function () {
		asap(function () {
			asap(function () {
				throw 1
			})

			throw 0
		})
	})

	expect(errors).toEqual([])
	return new Promise<void>((done) => {
		setTimeout(function () {
			expect(errors).toEqual([0, 1])
			done()
		}, WAIT_FOR_ERRORS)
	})
})

it('asap executes a tree of tasks in breadth-first order when some tasks throw errors', () => {
	const calls: any[] = []
	const errors: any[] = []

	const d = domain.create()
	d.on('error', (error: any) => {
		errors.push(error)
	})

	d.run(function () {
		asap(function () {
			calls.push(0)

			asap(function () {
				calls.push(2)

				asap(function () {
					calls.push(5)
					throw 5
				})

				asap(function () {
					calls.push(6)
				})
			})

			asap(function () {
				calls.push(3)
			})

			throw 0
		})

		asap(function () {
			calls.push(1)

			asap(function () {
				calls.push(4)
				throw 4
			})
		})
	})

	expect(calls).toEqual([])
	expect(errors).toEqual([])

	return new Promise<void>((done) => {
		setTimeout(function () {
			expect(calls).toEqual([0, 1, 2, 3, 4, 5, 6])
			expect(errors).toEqual([0, 4, 5])
			done()
		}, WAIT_FOR_ERRORS)
	})
})

// Recursion and errors

it('asap rethrows task errors and preserves the order of recursive tasks', () => {
	let timesRecursed = 0
	const errors: any[] = []

	function go() {
		if (++timesRecursed < MAX_RECURSION) {
			asap(go)
			throw timesRecursed - 1
		}
	}

	const d = domain.create()
	d.on('error', (error: any) => {
		errors.push(error)
	})

	d.run(function () {
		asap(go)
	})

	return new Promise<void>((done) => {
		setTimeout(function () {
			expect(timesRecursed).toBe(MAX_RECURSION)
			expect(errors.length).toBe(MAX_RECURSION - 1)
			for (let index = 0; index < MAX_RECURSION - 1; index++) {
				expect(errors[index]).toBe(index)
			}
			done()
		}, WAIT_FOR_ERRORS)
	})
})

it('asap can execute three parallel deep recursions in order, one of which throwing every task', () => {
	let timesRecursed1 = 0
	let timesRecursed2 = 0
	let timesRecursed3 = 0
	const calls: any[] = []
	const errors: any[] = []

	function go1() {
		calls.push(timesRecursed1 * 3)
		if (++timesRecursed1 < MAX_RECURSION) {
			asap(go1)
		}
	}

	function go2() {
		calls.push(timesRecursed2 * 3 + 1)
		if (++timesRecursed2 < MAX_RECURSION) {
			asap(go2)
		}
	}

	function go3() {
		calls.push(timesRecursed3 * 3 + 2)
		if (++timesRecursed3 < MAX_RECURSION) {
			asap(go3)
			throw timesRecursed3 - 1
		}
	}

	const d = domain.create()
	d.on('error', function (error: any) {
		errors.push(error)
	})

	d.run(function () {
		asap(go1)
		asap(go2)
		asap(go3)
	})

	return new Promise<void>((done) => {
		setTimeout(function () {
			expect(calls.length).toBe(MAX_RECURSION * 3)
			for (let index = 0; index < MAX_RECURSION * 3; index++) {
				expect(calls[index]).toBe(index)
			}
			expect(errors.length).toBe(MAX_RECURSION - 1)
			for (let index = 0; index < MAX_RECURSION - 1; index++) {
				expect(errors[index]).toBe(index)
			}
			done()
		}, WAIT_FOR_ERRORS)
	})
})

it('does not confuse domains when a task throws an error', () => {
	return new Promise<void>((done) => done())
})
