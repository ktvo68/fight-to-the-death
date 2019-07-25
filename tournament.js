module.exports = class Tournament {

  constructor(name) {
    this.name = name
    this.fighters = []
    this.tournamentDetails = {}
    this.tally = {}
  }

  register(fighters) {
    this.fighters = fighters
  }

  start() {
    // this method will set up and track all the fights.

    this.fighters.forEach((fighter1, index) => {

      let remainingFighters = this.fighters.slice(index+1)
      for (let fighter2 of remainingFighters) {
        let matchKey = fighter1.name + ' - ' + fighter2.name
        let result = this.match(fighter1, fighter2)
        this.tournamentDetails[matchKey] = result
      }
    })
  }

  match(player1, player2) {
    // this method will track the activities in the match
    // a match can go as many rounds as there is still life left.
    // It will not stop until one fighter passes out.

    let player1Health = player1.health
    let player2Health = player2.health

    let winner = ''
    let matchResult = {}
    let round = 0
    let roundsPlayByPlay = {}

    while (player1Health > 0 && player2Health > 0) {
      round++
      let roundResult = this.roundFight(player1, player2, player1Health, player2Health)

      // packaging round's data
      roundsPlayByPlay[round] = roundResult['playbyplay']
      player1Health = roundResult['player1Health']
      player2Health = roundResult['player2Health']
      winner = roundResult['winner']
    }

    matchResult['playbyplay'] = roundsPlayByPlay
    matchResult['winner'] = winner

    return matchResult
  }

  roundFight(player1, player2, player1Health, player2Health) {
    // this method records all the slapping activities in the round
    // the round stops one fighter passes out or everybody gets a turn per specification.

    let roundPlayByPlay = []
    let roundResult = {}

    let totalNumTurns = player1.attacks + player2.attacks
    let player1Attacks = player1.attacks
    let player2Attacks = player2.attacks
    let player1Initiative = player1.initiative
    let player2Initiative = player2.initiative

    let winner = ''

    // fighters roll dice to determine the winner who gets to slap first.
    let currentSlapper = this.pickFirstSlapper(player1.name, player2.name)

    while (totalNumTurns > 0 && player1Health > 0 && player2Health > 0) {

      totalNumTurns--
      let dodge = false
      let res = {}
      // to determine if the current slapper gets to slap or loses the turn
      currentSlapper = this.verifyCurrentSlapper(currentSlapper, player1, player2, player1Attacks, player2Attacks)

      if (currentSlapper == player1.name) {
        player1Attacks--
        res = this.processSlap(player1, player2, player2Health)
        player2Health = res['facerHealth']

      } else {
        player2Attacks--
        res = this.processSlap(player2, player1, player1Health)
        player1Health = res['facerHealth']
      }

      currentSlapper = res['currentSlapper']   // switch to the other slapper

      let turn = {}
      turn.hitter = res['hitter']
      turn.face = res['face']
      turn.damage = res['damage']
      turn.dodged = res['dodge']
      turn.healthBeforeDamage = res['healthBeforeDamage']
      turn.healthAfterDamage = res['healthAfterDamage'] > 0 ? res['healthAfterDamage'] : 0
      winner = res['winner']

      roundPlayByPlay.push(turn)
    }

    roundResult['playbyplay'] = roundPlayByPlay
    roundResult['player1Health'] = player1Health
    roundResult['player2Health'] = player2Health
    roundResult['winner'] = winner

    return roundResult
  }

  verifyCurrentSlapper(currentSlapper, player1, player2, player1Attacks, player2Attacks) {
    if (currentSlapper == player1.name) {
      if (player1Attacks <= 0)
        currentSlapper = player2.name
    } else {
      if (player2Attacks <= 0)
        currentSlapper = player1.name
    }

    return currentSlapper
  }

  processSlap(hitter, facer, facerHealth) {
    let res = {}
    res['hitter'] = hitter.name
    res['face'] = facer.name
    res['damage'] = hitter.damage
    res['winner'] = ''

    res['healthBeforeDamage'] = res['healthAfterDamage'] = facerHealth

    res['dodge'] = this.canDodge(facer.dodge)
    if (res['dodge']) {
      // slap is dodged.
    } else {
      facerHealth -= hitter.damage
      res['healthAfterDamage'] = facerHealth
    }

    res['facerHealth'] = facerHealth
    if (facerHealth <= 0)
      res['winner'] = hitter.name

    // next slapper
    res['currentSlapper'] = facer.name

    return res
  }

  pickFirstSlapper(player1Name, player2Name) {
    // pick the first slapper based on Urban Dictionary for "roll for initiative"
    // each player gets to roll a dice. whoever get the larger number win.
    // continues rolling the dice until a winner is picked.

    let playerSelected = false

    while (!playerSelected) {
      let randomNumPlayer1 = this.generateRandomNum(1, 6)
      let randomNumPlayer2 = this.generateRandomNum(1, 6)
      if (randomNumPlayer1 > randomNumPlayer2) {
        playerSelected = player1Name
      } else if (randomNumPlayer2 > randomNumPlayer1) {
        playerSelected = player2Name
      }
    }

    return playerSelected
  }

  canDodge(percentChance) {
    let randomNum = this.generateRandomNum(1, 100)
    if (randomNum <= percentChance)
      return true

    return false
  }

  generateRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /*  Sample report data
  { 'Tom Cruise - Sponge Bob':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array],
          '6': [Array] },
       winner: 'Tom Cruise' },
    'Tom Cruise - James Earl Jones':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array],
          '6': [Array],
          '7': [Array] },
       winner: 'James Earl Jones' },
    'Tom Cruise - Bob Barker':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array] },
       winner: 'Tom Cruise' },
    'Tom Cruise - Tonya Harding':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array] },
       winner: 'Tom Cruise' },
    'Tom Cruise - Charles Barkley':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array],
          '6': [Array],
          '7': [Array] },
       winner: 'Charles Barkley' },
    'Tom Cruise - Peter Piper':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array],
          '6': [Array] },
       winner: 'Tom Cruise' },
    'Tom Cruise - Harry Potter':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array] },
       winner: 'Tom Cruise' },
    'Tom Cruise - Shamu':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array],
          '6': [Array] },
       winner: 'Shamu' },
    'Tom Cruise - Bill Gates':
     { playbyplay:
        { '1': [Array],
          '2': [Array],
          '3': [Array],
          '4': [Array],
          '5': [Array],
          '6': [Array],
          '7': [Array] },
       winner: 'Bill Gates' },
  */
  report() {
    console.log('\n\n\n\nTime to show who has the nastiest slap!!!')

    for (let matchKey in this.tournamentDetails) {
      console.log('\n\n\n########## Match : ' + matchKey + ' ##########')

      let matchResult = this.tournamentDetails[matchKey]
      let matchPlayByPlay = matchResult['playbyplay']
      let winner = matchResult['winner']

      for (let roundNum in matchPlayByPlay) {
        console.log('\nRound ' + roundNum)
        let round = matchPlayByPlay[roundNum]
        let firstSlap = round[0]

        console.log(firstSlap.hitter + ' gets to roll by initiative.')
        for (let turn of round) {
          if (turn.dodged)
            console.log(turn.hitter + ' tries to slap ' + turn.face + ' , but ' + turn.face + ' is able to dodge it.' + ' (' + turn.healthBeforeDamage + ' -> ' + turn.healthAfterDamage + '). ')
          else
            console.log(turn.hitter + ' hits ' + turn.face + ' for ' + turn.damage + ' damage(s) (' + turn.healthBeforeDamage + ' -> ' + turn.healthAfterDamage + '). ')
        }
      }

      console.log('\n$$$ Match winner : ' + winner + '\n')
    }
  }

  tournamentWinner() {
    let arrWinners = {}
    let tournamentWinner = ''

    // collect the winners and their wins
    for (let matchKey in this.tournamentDetails) {
      let matchResult = this.tournamentDetails[matchKey]
      let winner = matchResult['winner']

      if (arrWinners[winner]) {
        arrWinners[winner]++
      } else {
        arrWinners[winner] = 1
      }
    }


    let mostWins = 0
    for (let winner in arrWinners) {
      if (arrWinners[winner] > mostWins) {
        mostWins = arrWinners[winner]
        tournamentWinner = winner
      }
    }

    return [tournamentWinner, mostWins]
  }
}
