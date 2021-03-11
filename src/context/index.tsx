import * as React from 'react'
import { Conference, GameStats, GoalieScoring, Injury, SkaterScoring } from '../types/app'

interface InjuriesContextType {
	injuries: Injury[]
}
interface SkatersContextType {
	skaters: SkaterScoring[]
}
interface GoaliesContextType {
	goalies: GoalieScoring[]
}
interface StandingsContextType {
	stangings: Conference[]
}
interface GamelogContextType {
	gamelog: GameStats[]
}

// create context
export const InjuriesContext = React.createContext<InjuriesContextType | undefined>(undefined)
export const SkatersContext = React.createContext<SkatersContextType | undefined>(undefined)
export const GoaliesContext = React.createContext<GoaliesContextType | undefined>(undefined)
export const GamelogContext = React.createContext<GamelogContextType | undefined>(undefined)
export const StandingsContext = React.createContext<StandingsContextType | undefined>(undefined)

// create hooks
export const useInjuries = () => React.useContext(InjuriesContext)
export const useSkaters = () => React.useContext(SkatersContext)
export const useGoalies = () => React.useContext(GoaliesContext)
export const useGamelog = () => React.useContext(GamelogContext)
export const useStandings = () => React.useContext(StandingsContext)

// const Provider = InjuriesContext.Provider
// // create providers
// export const InjuriesProvider = ({ children}) => {
//   return <InjuriesContext.Provider value={}>
//     {children}
//   </InjuriesContext.Provider>
// }
