import { GoalieScoring, SkaterScoring } from '../types/app'
import { GoalieGame, SkaterGame } from '../types/gameSummary'
import { RosterStat } from '../types/team'

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

export const getSortedRosterHeight = (roster: RosterStat[]) => {
  return roster.sort((a, b) => {
    const heightA = a.height.split('-')
    const heightB = b.height.split('-')

    const feetA = heightA[0]
    const inchesA = heightA[1]

    const feetB = heightB[0]
    const inchesB = heightB[1]

    if (feetB > feetA) return 1
    if (feetA > feetB) return -1
    if (inchesB > inchesA) return 1
    if (inchesA > inchesB) return -1

    return 0
  })
}

export const getSortedRosterCountry = (roster: RosterStat[]) => {
  return roster.sort((a, b) => {
    const countryA = a.country
    const countryB = b.country
    if (countryA > countryB) {
      return 1
    } else if (countryA < countryB) {
      return -1
    }
    return 0
  })
}

export const getSortedRosterDraft = (roster: RosterStat[], attr: string) => {
  return roster.sort((a, b) => {
    let draftA: number | null = null
    let draftB: number | null = null

    if (attr === 'round') {
      draftA = parseInt(a.draft.round || '')
      draftB = parseInt(b.draft.round || '')
    } else if (attr === 'overall') {
      draftA = a.draft.overall
      draftB = b.draft.overall
    } else if (attr === 'year') {
      draftA = a.draft.year
      draftB = b.draft.year
    }

    // sort accending
    if (draftA && draftB) {
      return draftA - draftB
    }
    // move nulls to the bottom
    if (draftA === null) {
      return 1
    }
    if (draftB === null) {
      return -1
    }
    return 0
  })
}

export const getSortedRosterWithNulls = (roster: RosterStat[], attr: string) => {
  return roster.sort((a, b) => {
    // either two stats values or two empty strings
    const A = Object.entries(a)
    const stat_A = (A.find((entry) => entry[0] === attr) || ['', 0])[1]
    // number/null or '' if attr not found
    const B = Object.entries(b)
    const stat_B = (B.find((entry) => entry[0] === attr) || ['', 0])[1]

    if (stat_A && stat_B) {
      return stat_B - stat_A
    }
    if (stat_A === null) {
      return 1
    }
    if (stat_B === null) {
      return -1
    }
    return 0
  })
}

export const getSortedSkatersGame = (skaters: SkaterGame[], attr: string) => {
  return skaters.sort((a, b) => {
    // either two stats values or two empty strings
    const A = Object.entries(a)
    const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
    const B = Object.entries(b)
    const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

    if (stat_A !== null && stat_B !== null) {
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

export const getSortedGoaliesGame = (skaters: GoalieGame[], attr: string) => {
  return skaters.sort((a, b) => {
    // either two stats values or two empty strings
    const A = Object.entries(a)
    const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
    const B = Object.entries(b)
    const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

    if (stat_A !== null && stat_B !== null) {
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
