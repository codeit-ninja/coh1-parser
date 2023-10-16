import { createRegExp, digit, exactly, oneOrMore, char } from "magic-regexp";

export const GAME_STARTED   = createRegExp(
    exactly('RELICCOH started')
)

export const GAME_CLOSED    = createRegExp(
    exactly('Application closed without errors')
)

export const GAME_PROFILE   = createRegExp( 
    oneOrMore(digit)
    .after('Found 1 profiles for account /steam/')
    .as('steamId')
)

export const GAME_LOBBY_JOINED  = createRegExp(
    exactly('RLINK -- JoinAsync: AsyncJob Complete')
)

export const GAME_LOBBY_POPULATING = createRegExp(
    exactly('Form - Starting game')
)

export const GAME_LOBBY_POPULATING_PLAYER_COUNT = createRegExp(
    oneOrMore(digit).after('GetMaxFrameTimeFromProfile: players=').groupedAs('count')
)

export const GAME_LOBBY_POPULATING_PLAYER = createRegExp(
    oneOrMore(digit)
    .after('PopulateGameInfoInternal - Player #')
    .groupedAs('index')
    .and(
        oneOrMore(char)
    )
    .and(
        oneOrMore(digit).or('-1').after('Id ').groupedAs('playerId')
    )
    .and(
        oneOrMore(char)
    )
    .and(
        oneOrMore(digit).after('Type ').groupedAs('type')
    )
    .and(
        oneOrMore(char)
    )
    .and(
        oneOrMore(digit).after('Team ').groupedAs('team')
    )
    .and(
        oneOrMore(char)
    )
    .and(
        oneOrMore(digit).after('Race ').groupedAs('race')
    )
)

export const GAME_LOBBY_POPULATING_PLAYER_STEAMID = createRegExp(
    exactly('/steam/')
    .and(
        oneOrMore(digit).groupedAs('steamId')
    )
    .and(
        oneOrMore(char)
    )
    .and(
        digit.after('slot =  ').groupedAs('slot')
    )
    .and(
        oneOrMore(char)
    )
    .and(
        digit.or('-1').after('ranking =   ').groupedAs('ranking')
    )
)

export const GAME_LOBBY_POPULATING_COMPLETE = createRegExp(
    exactly('GAME -- *** Beginning mission')
)

export const GAME_LOBBY_DESTROYED = createRegExp(
    exactly('GameObj::DoGameOverPopup')
)

export const GAME_LOBBY_STARTED = createRegExp(
    exactly('GameObj::StartGameObj')
)