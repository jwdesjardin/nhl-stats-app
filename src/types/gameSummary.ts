// gameSummary - gameSummary
export interface GameSummary {
	scoring_summary: Period[]
  penalty_summary: Period[]
  home_team_scoring: SkaterGame[]
  home_team_goalies: GoalieGame[]
  away_team_scoring: SkaterGame[]
  away_team_goalies: GoalieGame[]
  box_score: BoxScore
}

export interface SkaterGame {
  id: number
	player: string
	goals: number
	assists: number
	points: number
	plus_minus: number
	penalty_minutes: number
	ev_goals: number
	sh_goals: number
	pp_goals: number
	gw_goals: number
	shots_on_goal: number
  shooting_percentage: number
  shifts: number
	time_on_ice: number
}

export interface GoalieGame {
  id: number
	name: string
  decision: string
	goals_against: number
	shots_against: number
	saves: number
	save_percentage: number
	shutouts: number
}

// BoxScore
export interface BoxScore {
  game_details: GameDetails
  home_scoring_total: TeamBoxScore
  away_scoring_total: TeamBoxScore
}

export interface GameDetails {
	date: Date
	time: string
  arena: string
  attendance: number
}
export interface TeamBoxScore {
  goals: number
  assists: number
  points: number
  penalty_minutes: number
  ev_goals: number
  pp_goals: number
  sh_goals: number
  shots_on_goal: number
  shooting_percentage: number
}

// Periods
export interface Period {
  title: string
	penalties?: Penalty[]
	goals?: Goal[]
	so_attempts?: SO_Attempt[]
}
export interface Goal {
  time: string
  team_id: string
  power_play: string
  scorer: string
  count: number
  assists: string[]
}
export interface SO_Attempt {
  shot_number: number
  team_id: string
  scorer: string
  success: boolean
  goalie: string
}
export interface Penalty {
  time: string
  team_id: string
  player: string
  type: string
  duration: number
}