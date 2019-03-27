import { Action } from '../interfaces';
export declare type State = number;
export default function refCount(state: number | undefined, action: Action<any>): number;
