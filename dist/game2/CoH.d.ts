import { Events } from "../Events.js";
import type { CoHEvents } from "../types.js";
export default class CoH extends Events<CoHEvents> {
    running: boolean;
    steamId: bigint;
}
export declare const coh: CoH;
