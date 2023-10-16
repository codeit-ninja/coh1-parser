import { log } from "../Log.js";

export default class Player implements IPlayer {
    public steamId?: bigint;

    public ranking?: number;

    constructor(
        public index: number,
        public playerId: number,
        public type: number,
        public team: number,
        public race: number,
        public slot: number
    ) {
        /**
         * Set players steam ID when a new SteamID is populated in the log file
         */
        log.on('LOG:LOBBY:POPULATING:PLAYER:STEAM', this.setSteamId, this)
    }

    private setSteamId(data: { slot: number, steamId: bigint }) {
        if( this.slot === data.slot ) {
            this.steamId = data.steamId;
            /**
             * Unsubscribe from listener to prevent overloading
             */
            log.removeListener('LOG:LOBBY:POPULATING:PLAYER:STEAM', this.setSteamId, this);
        }
    }
}