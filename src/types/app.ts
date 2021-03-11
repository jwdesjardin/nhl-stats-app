// gamelog
export interface GameStats {
	id: number
	date: string
	home_team: string
	home_goals: number | null
	away_team: string
	away_goals: number | null
	overtime: string
	attendance: number | null
	length_of_game: string
	notes: string
}

// goalie scoring
export interface GoalieScoring {
	id: number
	name: string
	age: number
	team_id: string
	position: string
	games_played: number
	games_started: number
	wins: number
	losses: number
	ot_losses: number
	goals_against: number
	shots_against: number
	saves: number
	save_percentage: number
	goals_against_average: number
	shutouts: number
}

// injuries
export interface Injury {
	id: number
	player: string
	date: Date
	type: string
	note: string
}

// skater scoring
export interface SkaterScoring {
	_id: number
	player: string
	age: number
	team_id: string
	position: string
	games_played: number
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
	time_on_ice: number
	average_time_on_ice: string
	blocks: number
	hits: number
	faceoff_wins: number
	faceoff_losses: number
	faceoff_percentage: number
}

// standings
export interface Conference {
	name: string
	teams: TeamSeasonStats[]
}
export interface TeamSeasonStats {
	_id: number
	name: string
	games: number
	wins: number
	losses: number
	losses_ot: number
	points: number
	points_pct: number
}

// team hard coded
export interface Team {
	teamID: string
	name: string
	image_url: string
	conference: string
}
