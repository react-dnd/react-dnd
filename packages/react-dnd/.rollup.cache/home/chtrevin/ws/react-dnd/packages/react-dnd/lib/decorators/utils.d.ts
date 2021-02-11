import { RefObject } from 'react';
export declare function getDecoratedComponent(instanceRef: RefObject<any>): any;
export declare function isClassComponent(Component: unknown): boolean;
export declare function isRefForwardingComponent(C: unknown): boolean;
export declare function isRefable(C: unknown): boolean;
export declare function checkDecoratorArguments(functionName: string, signature: string, ...args: any[]): void;
