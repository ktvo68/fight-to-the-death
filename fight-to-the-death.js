
const fighters = require('./fighters.js')
let Tournament = require('./tournament.js')

let tournament = new Tournament('Robin Health')
tournament.register(fighters)
tournament.start()
tournament.report()
winner = tournament.tournamentWinner()
console.log('\n\n\n\n\n########## Tournament Winner ##########')
console.log('\n' + winner[0] + ' is the champion with ' + winner[1] + ' wins.')
