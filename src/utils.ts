import { isBoolean, isNaN, isString, toNumber } from 'lodash-es';

export function isBigInt(value) {
    try { return BigInt(parseInt(value, 10)) !== BigInt(value) }
    catch (e) { return false }
}

export function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }

export function convertToType(value: any) {
    if( isBigInt(value) ) return BigInt(value);
    if( isNumeric(value) ) return Number(value);
    if( isBoolean(value) ) return Boolean(value);
    if( isString(value) ) return String(value);
    return value;
}

export function inferTypes( data: object ) {
    return Object.keys(data).reduce((acc, key) => ({
        ...acc,
        [key]: convertToType(data[key])
    }), {})
}

export function getPlayerSlotByIndex(index: number, playerCount: number) {
    if(playerCount === 8) {
        if(index === 0) return 0;
        if(index === 1) return 2;
        if(index === 2) return 4;
        if(index === 3) return 6;
        if(index === 4) return 1;
        if(index === 5) return 3;
        if(index === 6) return 5;
        if(index === 7) return 7;
    }

    if(playerCount === 6) {
        if(index === 0) return 0;
        if(index === 1) return 2;
        if(index === 2) return 4;
        if(index === 3) return 1;
        if(index === 4) return 3;
        if(index === 5) return 5;
    }

    if(playerCount === 4) {
        if(index === 0) return 0;
        if(index === 1) return 2;
        if(index === 2) return 1;
        if(index === 3) return 3;
    }

    if(playerCount === 2) {
        if(index === 0) return 0;
        if(index === 1) return 1;
    }
}

export function randomId() {
    return Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
}