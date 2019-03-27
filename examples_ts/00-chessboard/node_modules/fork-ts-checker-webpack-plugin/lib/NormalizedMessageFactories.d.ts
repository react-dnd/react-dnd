import * as ts from 'typescript';
import * as tslint from 'tslint';
import { NormalizedMessage } from './NormalizedMessage';
export declare const makeCreateNormalizedMessageFromDiagnostic: (typescript: typeof ts) => (diagnostic: ts.Diagnostic) => NormalizedMessage;
export declare const makeCreateNormalizedMessageFromRuleFailure: () => (lint: tslint.RuleFailure) => NormalizedMessage;
