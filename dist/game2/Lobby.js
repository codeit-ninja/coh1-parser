import { Events } from "../Events.js";
import { Map } from "./Map.js";
export default class Lobby extends Events {
    constructor() {
        super(...arguments);
        this.populating = false;
        this.players = [];
        this.map = new Map;
    }
    getPlayerById(playerId) {
        return this.players.find(p => p.playerId === playerId);
    }
    getPlayerBySlot(slot) {
        return this.players.find(p => p.slot === slot);
    }
}
export const lobby = new Lobby;
