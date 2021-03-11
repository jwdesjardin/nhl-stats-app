import { SkaterScoring, GoalieScoring } from './app'

export interface TeamSummary {
	rosterStats: RosterStat[]
	skaterStats: SkaterScoring[]
	goalieStats: GoalieScoring[]
}

export interface RosterStat {
	id: number
	number: number
	player: string
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
		round: number | null
		overall: number | null
	}
}
