import { watcher } from './Watcher.js';
import { inferTypes } from "./utils.js";
import { Events } from "./Events.js";
import { triggers } from './triggers.js';
export default class Log extends Events {
    constructor() {
        super();
        watcher.on('log:line', line => this.parse(line));
    }
    parse(line) {
        let trigger;
        for (trigger in triggers) {
            const match = line.match(triggers[trigger]);
            let data = match?.groups ? { ...match.groups } : undefined;
            if (match) {
                if (data) {
                    /**
                     * Try to convert to correct types
                     */
                    data = inferTypes(data);
                    this.emit(trigger, ...Object.values(data));
                    continue;
                }
                this.emit(trigger);
                continue;
            }
        }
    }
}
export const log = new Log();
