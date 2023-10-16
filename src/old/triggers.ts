import { 
    createRegExp, 
    digit, 
    exactly, 
    oneOrMore, 
    char 
} from "magic-regexp";

export const triggers = {
    'LOG:STARTED': createRegExp(
        exactly('RELICCOH started')
    ),
    'LOG:ENDED': createRegExp(
        exactly('Application closed without errors')
    ),
    'LOG:FOUND:PROFILE': createRegExp( 
        oneOrMore(digit)
        .after('Found 1 profiles for account /steam/')
        .as('steamId')
    ),
    'LOG:LOBBY:JOINED': createRegExp(
        exactly('RLINK -- JoinAsync: AsyncJob Complete')
    ),
    'LOG:LOBBY:POPULATING': createRegExp(
        exactly('Form - Starting game')
    ),
    'LOG:LOBBY:POPULATING:PLAYER': createRegExp(
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
    ),
    'LOG:LOBBY:POPULATING:PLAYER:COUNT': createRegExp(
        oneOrMore(digit).after('GetMaxFrameTimeFromProfile: players=').groupedAs('count')
    ),
    'LOG:LOBBY:POPULATING:PLAYER:STEAM': createRegExp(
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
    ),
    'LOG:LOBBY:POPULATING:COMPLETE': createRegExp(
        exactly('GAME -- *** Beginning mission')
    ),
    'LOG:LOBBY:STARTED': createRegExp(
        exactly('GameObj::StartGameObj')
    ),
    'LOG:LOBBY:DESTROYED': createRegExp(
        exactly('GameObj::DoGameOverPopup')
    ),
}