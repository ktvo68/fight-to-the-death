// My aplology.  This took a bit longer then I planned.  Ran into bugs and
// I forgot I was supposed to take my kids to their swimming classes
// In this version I added the implementation of 'dodge', 'role by initiative' and file import
// I implemented 'roll by initiative' based on the definition in Urban Dictionary.
// I did not understand the initiative data and sample output related to initiative data.
// I did not implement 'critical' because there is not enough informatino on it.
// I also declare the tournament winner.


const fighters = require('./fighters.js')
let Tournament = require('./tournament.js')

let tournament = new Tournament('Robin Health')
tournament.register(fighters)
tournament.start()
tournament.report()
winner = tournament.tournamentWinner()
console.log('\n\n\n\n\n########## Tournament Winner ##########')
console.log('\n' + winner[0] + ' is the champion with ' + winner[1] + ' wins.')
