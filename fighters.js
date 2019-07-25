const fs = require('fs');

let fighters = []

let lines = fs.readFileSync('./applicants.csv').toString().split('\n')
lines.forEach((line, i) => {
  if (line && i > 0) {
    lineData = line.split(',')
    let fighter = {
      "name" : lineData[0],
      "health" : parseInt(lineData[1]),
      "damage" : parseInt(lineData[2]),
      "attacks" : parseInt(lineData[3]),
      "dodge" : parseInt(lineData[4]),
      "critical" : parseInt(lineData[5]),
      "initiative" : parseInt(lineData[6])
    }

    fighters.push(fighter)
  }
})

//console.log(fighters)

/*
const fighters = [
   {
      "name" : "Tom Cruise",
      "health" : 136,
      "damage" : 6,
      "attacks": 4,
      "dodge" : 10,
      "critical" : 10,
      "initiative" : 4
  },
  {
      "name" : "Sponge Bob",
      "health" : 110,
      "damage" : 4,
      "attacks": 5,
      "dodge" : 12,
      "critical" : 12,
      "initiative" : 5
  },
  {
      "name" : "James Earl Jones",
      "health" : 175,
      "damage" : 8,
      "attacks": 3,
      "dodge" : 2,
      "critical" : 8,
      "initiative" : 3
  },
  {
      "name" : "Bob Barker",
      "health" : 112,
      "damage" : 2,
      "attacks": 8,
      "dodge" : 4,
      "critical" : 16,
      "initiative" : 2
  },
  {
      "name" : "Tonya Harding",
      "health" : 108,
      "damage" : 7,
      "attacks": 4,
      "dodge" : 12,
      "critical" : 18,
      "initiative" : 4
  },
  {
      "name" : "Charles Barkley",
      "health" : 220,
      "damage" : 12,
      "attacks": 2,
      "dodge" : 4,
      "critical" : 10,
      "initiative" : 2
  },
  {
      "name" : "Peter Piper",
      "health" : 116,
      "damage" : 4,
      "attacks": 6,
      "dodge" : 14,
      "critical" : 14,
      "initiative" : 6
  },
  {
      "name" : "Harry Potter",
      "health" : 96,
      "damage" : 16,
      "attacks": 2,
      "dodge" : 16,
      "critical" : 15,
      "initiative" : 6
  },
  {
      "name" : "Shamu",
      "health" : 280,
      "damage" : 24,
      "attacks": 1,
      "dodge" : 0,
      "critical" : 0,
      "initiative" : 0
  },
  {
      "name" : "Bill Gates",
      "health" : 124,
      "damage" : 6,
      "attacks": 4,
      "dodge" : 52,
      "critical" : 12,
      "initiative" : 4
  }
]
*/

module.exports = fighters
