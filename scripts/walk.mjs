import fs from 'fs/promises'
import path from 'path'

export async function walk(dir, handleFile) {
	const entries = await fs.readdir(dir)

	for (const entry of entries) {
		const entryPath = path.join(dir, entry)
		const stat = await fs.stat(entryPath)
		if (stat.isDirectory()) {
			await walk(entryPath, handleFile)
		} else {
			await handleFile(entryPath)
		}
	}
}
