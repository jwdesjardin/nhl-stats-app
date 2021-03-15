import { GoalieScoring, SkaterScoring } from '../types/app'

// export const getStatHeader = (leaderStat: string, setState: (str: string) => void) => {
//   switch (leaderStat) {
//     case 'games_played':
//       setState('GP')
//       break
//     case 'goals':
//       setState('G')
//       break
//     case 'assists':
//       setState('A')
//       break
//     case 'points':
//       setState('P')
//       break
//     case 'plus_minus':
//       setState('+/-')
//       break
//     case 'penalty_minutes':
//       setState('PIMS')
//       break
//     case 'ev_goals':
//       setState('EV')
//       break
//     case 'sh_goals':
//       setState('SH')
//       break
//     case 'pp_goals':
//       setState('PP')
//       break
//     case 'gw_goals':
//       setState('GW')
//       break
//     case 'shots_on_goal':
//       setState('SHOTS')
//       break
//     case 'average_time_on_ice':
//       setState('ATOI')
//       break
//     case 'hits':
//       setState('HITS')
//       break
//     case 'faceoff_wins':
//       setState('FO WINS')
//       break
//     case 'faceoff_percentage':
//       setState('FO %')
//       break
//     case 'goals_against':
//       setState('GA')
//       break
//     case 'saves':
//       setState('SAVES')
//       break
//     case 'save_percentage':
//       setState('SAVE %')
//       break
//     case 'goals_against_average':
//       setState('GAA')
//       break
//     case 'shutouts':
//       setState('SO')
//       break
//     case 'salary':
//       setState('SALARY')
//       break
//     case 'age':
//       setState('AGE')
//       break
//     case 'height':
//       setState('HEIGHT')
//       break
//     case 'weight':
//       setState('WEIGHT')
//       break
//     case 'experience':
//       setState('EXP')
//       break
//     case 'draft':
//       setState('DRAFT')
//       break
//     case 'country':
//       setState('COUNTRY')
//       break
//     default:
//       setState('')
//       break
//   }
// }

export const getSortedGoalies = (goalies: GoalieScoring[], attr: string) => {
  return goalies.sort((a, b) => {
    // either two stats values or two empty strings
    const A = Object.entries(a)
    const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
    const B = Object.entries(b)
    const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

    if (stat_A !== null && stat_B !== null) {
      if (attr === 'goals_against' || attr === 'goals_against_average') {
        return parseFloat(stat_A) - parseFloat(stat_B)
      }
      return parseFloat(stat_B) - parseFloat(stat_A)
    }
    //move nulls to the bottom
    if (stat_A === null) {
      return 1
    }
    if (stat_B === null) {
      return -1
    }
    return 0
  })
}

export const getSortedSkaters = (skaters: SkaterScoring[], attr: string) => {
  return skaters.sort((a, b) => {
    let stat_A: number
    let stat_B: number

    if (attr === 'faceoff_taken') {
      stat_A = a.faceoff_wins + a.faceoff_losses
      stat_B = b.faceoff_wins + b.faceoff_losses
    } else {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      stat_A = parseFloat((A.find((entry) => entry[0] === attr) || ['', ''])[1])
      const B = Object.entries(b)
      stat_B = parseFloat((B.find((entry) => entry[0] === attr) || ['', ''])[1])
    }

    if (stat_A !== null && stat_B !== null) {
      return stat_B - stat_A
    }
    //move nulls to the bottom
    if (stat_A === null) {
      return 1
    }
    if (stat_B === null) {
      return -1
    }
    return 0
  })
}
