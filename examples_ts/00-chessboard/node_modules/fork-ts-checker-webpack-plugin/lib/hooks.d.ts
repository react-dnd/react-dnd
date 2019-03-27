import * as webpack from 'webpack';
import { AsyncSeriesHook, SyncHook } from 'tapable';
declare type ForkTsCheckerHooks = 'serviceBeforeStart' | 'cancel' | 'serviceStartError' | 'waiting' | 'serviceStart' | 'receive' | 'serviceOutOfMemory' | 'emit' | 'done';
declare type ForkTsCheckerLegacyHookMap = Record<ForkTsCheckerHooks, string>;
export declare const legacyHookMap: ForkTsCheckerLegacyHookMap;
export declare function getForkTsCheckerWebpackPluginHooks(compiler: webpack.Compiler): Record<ForkTsCheckerHooks, SyncHook<any, any, any> | AsyncSeriesHook<any, any, any>>;
export {};
