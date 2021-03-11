import * as React from 'react'
import { Conference, GameStats, GoalieScoring, Injury, SkaterScoring } from '../types/app'

import STANDINGS from '../data/standings.json'
import GAMELOG from '../data/gamelog.json'

// interface InjuriesContextType {
// 	injuries: Injury[]
// }
// interface SkatersContextType {
// 	skaters: SkaterScoring[]
// }
// interface GoaliesContextType {
// 	goalies: GoalieScoring[]
// }

interface StandingsContextType {
	standings: Conference[]
}

interface GamelogContextType {
	gamelog: GameStats[]
}

// create context
// export const InjuriesContext = React.createContext<InjuriesContextType | undefined>(undefined)
// export const SkatersContext = React.createContext<SkatersContextType | undefined>(undefined)
// export const GoaliesContext = React.createContext<GoaliesContextType | undefined>(undefined)
export const GamelogContext = React.createContext<GamelogContextType>({ gamelog: [] })
export const StandingsContext = React.createContext<StandingsContextType>({ standings: [] })

// create hooks
// export const useInjuries = () => React.useContext(InjuriesContext)
// export const useSkaters = () => React.useContext(SkatersContext)
// export const useGoalies = () => React.useContext(GoaliesContext)
export const useGamelog = () => React.useContext(GamelogContext)
export const useStandings = () => React.useContext(StandingsContext)

// create providers
export const GamelogProvider: React.FC = ({ children }) => {
	// set state
	const [gamelog, setGamelog] = React.useState<GameStats[]>(GAMELOG)

	const value = {
		gamelog,
	}

	return <GamelogContext.Provider value={value}>{children}</GamelogContext.Provider>
}

export const StandingsProvider: React.FC = ({ children }) => {
	// set state
	const [standings, setStandings] = React.useState<Conference[]>(STANDINGS)

	const value = {
		standings,
	}

	return <StandingsContext.Provider value={value}>{children}</StandingsContext.Provider>
}
