import { Events } from "../Events.js";

export default class CoH extends Events<CoHEvents> {
    running = false;
    steamId: bigint;
}

export const coh = new CoH;