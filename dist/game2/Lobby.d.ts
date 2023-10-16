import { Events } from "../Events.js";
import type { ILobby, IPlayer, LobbyEvents } from "../types.js";
import { Map } from "./Map.js";
export default class Lobby extends Events<LobbyEvents> implements ILobby {
    id: number;
    populating: boolean;
    players: IPlayer[];
    playerCount: number;
    map: Map;
    getPlayerById(playerId: number): IPlayer;
    getPlayerBySlot(slot: number): IPlayer;
}
export declare const lobby: Lobby;
