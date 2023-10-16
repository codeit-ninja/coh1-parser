import Log from "../old/Log.js";
import Lobby from "./Lobby.js";

export default class Game {
    public isRunning: boolean = false;

    public profile: any;

    public lobby: Lobby;

    constructor() {
        this.lobby = new Lobby();

        Log.on('LOG:STARTED', () => this.gameStarted())
        Log.on('LOG:LOBBY:POPULATING', () => this.lobby.populatingStart())
        Log.on('LOG:LOBBY:POPULATING:PLAYER', player => this.lobby.addPlayer(player))
        Log.on('LOG:LOBBY:POPULATING:PLAYER:COUNT', data => this.lobby.setPlayerCount(data.count))
        Log.on('LOG:LOBBY:POPULATING:PLAYER:STEAM', player => {
            this.lobby.getPlayer(player.slot)
                .setSteamId(player.steamId)
                .setRanking(player.ranking)
        })
        Log.on('LOG:LOBBY:POPULATING:COMPLETE', () => this.lobby.populatingEnd())
        Log.on('LOG:LOBBY:DESTROYED', () => this.lobby.destroy())

        //this.log.on('GAME:LOBBY:POPULATING:COMPLETE', unsub);
    }

    gameStarted() {
        this.isRunning = true;
    }
}