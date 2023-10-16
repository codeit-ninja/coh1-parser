import { Events } from "../Events.js";
export default class CoH extends Events {
    constructor() {
        super(...arguments);
        this.running = false;
    }
}
export const coh = new CoH;
