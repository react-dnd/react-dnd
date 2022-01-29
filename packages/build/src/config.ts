/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { load } from 'tsconfig'
import * as ts from 'typescript'

const BASIC_HOST: ts.ParseConfigHost = {
	useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
	fileExists: ts.sys.fileExists,
	readFile: ts.sys.readFile,
	readDirectory: ts.sys.readDirectory,
}

export async function loadTSConfig(): Promise<any> {
	const { config } = await load(process.cwd())
	return config
}

export function parseTSConfig(config: any): ts.CompilerOptions {
	const result = ts.parseJsonConfigFileContent(
		config,
		BASIC_HOST,
		process.cwd(),
	)
	return result.options
}
