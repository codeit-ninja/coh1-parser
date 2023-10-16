declare module CoH {
    export namespace Log {
        export type Trigger = {
            [key in keyof Triggers]: RegExp
        }

        export interface Triggers {
            'LOG:STARTED': { line: string };
            'LOG:ENDED': { line: string };
            'LOG:FOUND:PROFILE': { line: string, steamId: bigint };
            'LOG:LOBBY:JOINED': { line: string };
            'LOG:LOBBY:POPULATING': { line: string };
            'LOG:LOBBY:POPULATING:PLAYER': { line: string, index: number, playerId: number, type: number, team: number, race: number };
            'LOG:LOBBY:POPULATING:PLAYER:COUNT': { line: string, count: number };
            'LOG:LOBBY:POPULATING:PLAYER:STEAM': { line: string, steamId: bigint, slot: number, ranking: number };
            'LOG:LOBBY:POPULATING:COMPLETE': { line: string };
            'LOG:LOBBY:DESTROYED': { line: string };
            'LOG:LOBBY:STARTED': { line: string };
        }

        export type CombineTriggers<T> = {
            [K in keyof Triggers | keyof T]: K extends keyof T ? T[K] : K extends keyof Triggers ? Triggers[K] : never;
        };

        export type Transformer<T extends keyof Triggers> = (data: Triggers[T]) => Triggers[T];
    }
}