import { SkaterScoring, GoalieScoring } from './app'

export interface TeamSummaryStats {
  rosterStats: RosterStat[]
  skaterStats: SkaterScoring[]
  goalieStats: GoalieScoring[]
}

export interface RosterStat {
  number: number
  player: string
  player_id: string
  country: string
  position: string
  age: number
  height: string
  weight: number
  shoots: string
  experience: number | null
  salary: number | null
  draft: {
    year: number | null
    team_id: string | null
    round: string | null
    overall: number | null
  }
}
