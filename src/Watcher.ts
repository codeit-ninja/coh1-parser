import { EventEmitter } from 'eventemitter3';
import { createReadStream, statSync, type ReadStream, type Stats } from 'node:fs';
import { EOL } from 'node:os';

import config from "./config.js";

export default class Watcher extends EventEmitter {
    private file: ReadStream;
    
    private size = {
        prev: 0,
        current: 0
    }

    constructor() {
        super();

        setInterval(() => this.watch(), 1000);
    }

    private watch() {
        if( ! config.pathToWarnings ) {
            return;
        }
        
        try {
            const { size } = statSync(config.pathToWarnings);

            this.size.prev = this.size.current;
            this.size.current = size;

            this.file = createReadStream(config.pathToWarnings, {
                encoding: 'utf-8',
                start: this.size.prev,
                end: this.size.current,
            });

            this.file.on('data', (data: string) => 
                data
                    .split(EOL)
                    .forEach(line => line !== '' && this.emit('log:line', line))
            )
        } catch(e) {
            this.size.prev = 0;
            this.size.current = 0;
        }
    }
}

const watcher = new Watcher();

export { watcher }