import * as ts from 'typescript';
import { NormalizedMessage } from './NormalizedMessage';
export declare const createNormalizedMessageFromDiagnostic: (diagnostic: ts.Diagnostic) => NormalizedMessage;
export declare const createNormalizedMessageFromRuleFailure: (lint: import("tslint").RuleFailure) => NormalizedMessage;
