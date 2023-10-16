import Emittery from 'emittery';
import Watcher from "../Watcher.js";
import { inferTypes } from '../utils.js';
import { triggers } from './triggers.js';

export class Log extends Emittery<CoH.Log.Triggers> {
    private watcher: Watcher;
    private triggers: CoH.Log.Trigger;

    constructor() {
        super();

        this.watcher = new Watcher();
        this.watcher.on('log:line', this.parse.bind(this));

        this.triggers = triggers;
    }

    parse(line: string) {
        let trigger: keyof CoH.Log.Triggers;

        for(trigger in this.triggers) {
            const match = line.match(this.triggers[trigger]);
            let data = match?.groups ? {...match.groups} : undefined;
            
            if(match) {
                if( data ) {
                    /**
                     * Try to convert to correct types
                     */
                    data = inferTypes(data);
                }
                
                this.trigger(trigger, { line: match.input, ...data });
            }
        }
    }

    trigger<T extends keyof CoH.Log.Triggers>(trigger: T, data?: CoH.Log.Triggers[T]) {
        // if( this.triggers[trigger].transform ) {
        //     data = this.triggers[trigger].transform(data)
        // }

        this.emit(trigger, data);
    }

    createTrigger<T extends keyof CoH.Log.Triggers>(eventName: T, regex: RegExp, transform?: CoH.Log.Transformer<T>) {
        this.triggers[eventName] = regex;
        
        return this;
    }
}

const log = new Log();

export default log;