import type { LogEvents } from "./types.js";
export declare const triggers: Record<keyof LogEvents, RegExp>;
/**
 * Add a new trigger, if it already exists the existing one will be overwritten
 *
 * @param name
 * @param matcher
 */
export declare function addEvent(name: keyof LogEvents, matcher: RegExp): void;
