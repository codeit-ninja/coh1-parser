import { Events } from "./Events.js";
import { log } from "./Log.js";

export type GameEvents = {
    'GAME:STARTED': { lobby: object }
}

export class Game extends Events<GameEvents> {
    public isRunning = false;

    public user: bigint;

    constructor() {
        super();

        log.on('LOG:STARTED', () => this.isRunning = true);
        log.on('LOG:ENDED', () => this.isRunning = false);
        log.on('LOG:FOUND:PROFILE', (data) => this.user = data.steamId);
    }
}

export const game = new Game();