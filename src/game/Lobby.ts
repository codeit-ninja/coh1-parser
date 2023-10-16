import Player from "./Player.js";
import Map from "./Map.js";
import { getPlayerSlotByIndex } from "../utils.js";
import { log } from "../Log.js";
import { Events } from "../Events.js";

export class Lobby extends Events<LobbyEvents> implements ILobby {
    public id: number;

    public isPopulating = false;

    public map: Map;

    public playerCount: number;

    public players: IPlayer[] = [];

    constructor() {
        super();

        this.subscribeToLogEvents();
    }

    private subscribeToLogEvents() {
        log.on('LOG:LOBBY:POPULATING', this.populatingStart, this);
        log.on('LOG:LOBBY:POPULATING:PLAYER', this.addPlayer, this);
        log.on('LOG:LOBBY:POPULATING:PLAYER:COUNT', (data: { count: number }) => this.setPlayerCount(data.count));
        log.on('LOG:LOBBY:POPULATING:COMPLETE', this.populatingEnd, this);
        log.on('LOG:LOBBY:DESTROYED', this.destroy, this);
        log.on('LOG:LOBBY:STARTED', this.started, this);
    }

    setPlayerCount( count: number ) {
        this.playerCount = count;
    }

    populatingStart() {
        this.id = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
        this.isPopulating = true;
    }

    populatingEnd() {
        this.isPopulating = false;
    }

    addPlayer( { index, playerId, race, team, type }: IPlayer ) {
        if( false === this.isPopulating ) return;

        const player = new Player(
            index, 
            playerId, 
            type, 
            team, 
            race, 
            getPlayerSlotByIndex( index, this.playerCount )
        )

        this.players.push(player);
        this.emit('PLAYER:POPULATED', player)
    }

    getPlayer( slot: number ) {
        return this.players.find(p => p.slot === slot);
    }

    started() {
        this.emit('LOBBY:STARTED', this);
    }

    ended() {
        
    }

    destroy() {
        this.players = [];
    }

    public get teams() {
        return {
            0: [...this.players.filter(p => p.team === 0)],
            1: [...this.players.filter(p => p.team === 1)]
        }
    }
}

export const lobby = new Lobby();