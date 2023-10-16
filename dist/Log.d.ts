import { Events } from "./Events.js";
import type { LogEvents } from './types.js';
export default class Log extends Events<LogEvents> {
    constructor();
    parse(line: string): void;
}
export declare const log: Log;
