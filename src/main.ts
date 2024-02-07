import { log } from './Log.js';
import { lobby } from './game2/Lobby.js';
import { coh } from './game2/CoH.js';
import { triggers } from './triggers.js';
import Player from './game2/Player.js';
import { getPlayerSlotByIndex, randomId } from './utils.js';
import { maps } from './constants.js';
import type {
    CoHEvents,
    CoHMaps,
    ILobby,
    IPlayer,
    LobbyEvents,
    LobbyPopulatedMap,
    LobbyPopulatedPlayer,
    LobbyPopulatedPlayerCount,
    LobbyPopulatedSteamId,
    LogEvents
} from './types.js';
import config from './config.js';

log.on('LOG:STARTED', () => {
    coh.running = true;
})

log.on('LOG:FOUND:PROFILE', steamId => {
    coh.steamId = steamId;
})

log.on('LOG:LOBBY:POPULATING', () => {
    lobby.id = randomId();
    lobby.populating = true;
})

log.on('LOG:LOBBY:POPULATING:COMPLETE', () => {
    lobby.populating = false
})

log.on('LOG:LOBBY:POPULATING:PLAYER:COUNT', playerCount => {
    lobby.playerCount = playerCount;
    lobby.emit('LOBBY:POPULATED:PLAYERCOUNT', playerCount);
})

log.on('LOG:LOBBY:POPULATING:PLAYER', (index, playerId, type, team, race) => {
    if( lobby.populating === false ) {
        return;
    }

    const player = new Player()

    player.index = index;
    player.playerId = playerId;
    player.type = type;
    player.team = team;
    player.race = race;
    player.slot = getPlayerSlotByIndex(index, lobby.playerCount);

    lobby.players.push(player);

    lobby.emit('LOBBY:POPULATED:PLAYER', player)
})

log.on('LOG:LOBBY:POPULATING:MAP', map => {
    lobby.map.name = map;

    if( maps.includes(map) )  {
        lobby.map.supported = true;
    }
})

log.on('LOG:LOBBY:POPULATING:PLAYER:STEAM', (steamId, slot, ranking) => {
    const player = lobby.getPlayerBySlot(slot);
    
    if( ! player ) {
        return;
    }

    player.steamId = steamId;
    player.ranking = ranking;

    lobby.emit('LOBBY:POPULATED:STEAM', steamId)
})

log.on('LOG:LOBBY:PLAYER:RESULT', (playerId, result) => {
    const player = lobby.getPlayerById(playerId);

    player.result = result;

    /**
     * Emit result to game for user
     */
    if( player.steamId === coh.steamId ) {
        coh.emit(player.result === 'PS_WON' ? 'GAME:WON': 'GAME:LOST', lobby)
    }
})

log.on('LOG:LOBBY:POPULATING:COMPLETE', () => {
    lobby.populating = false;
})

log.on('LOG:LOBBY:STARTED', () => {
    lobby.emit('LOBBY:STARTED', lobby);
})

log.on('LOG:LOBBY:GAMEOVER', () => {
    lobby.emit('LOBBY:GAMEOVER', lobby);
})

log.on('LOG:LOBBY:DESTROYED', () => {
    lobby.populating = false;
    lobby.playerCount = undefined;
    lobby.id = undefined;
    lobby.players = [];
    lobby.map.name = undefined;
    lobby.map.supported = false;
})

log.on('LOG:ENDED', () => {
    coh.running = false;
    coh.steamId = undefined;
})

export {
    log,
    coh,
    lobby,
    triggers,
    config,
    CoHEvents,
    CoHMaps,
    ILobby,
    IPlayer,
    LobbyEvents,
    LobbyPopulatedMap,
    LobbyPopulatedPlayer,
    LobbyPopulatedPlayerCount,
    LobbyPopulatedSteamId,
    LogEvents
}