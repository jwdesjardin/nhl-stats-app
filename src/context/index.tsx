import * as React from 'react'
import { Conference, GameStats, GoalieScoring, Injury, SkaterScoring } from '../types/app'

// import STANDINGS from '../data/standings.json'
// import GAMELOG from '../data/gamelog.json'
import SKATERS from '../data/skaters.json'
import GOALIES from '../data/goalies.json'
import INJURIES from '../data/injuries.json'
import { STATS_API_KEY } from '../config'

interface InjuriesContextType {
  injuries: Injury[]
}

interface PlayersContextType {
  skaters: SkaterScoring[]
  goalies: GoalieScoring[]
}

interface StandingsContextType {
  standings: Conference[]
}

interface GamelogContextType {
  gamelog: GameStats[]
}

// create context
export const InjuriesContext = React.createContext<InjuriesContextType>({ injuries: [] })
export const PlayersContext = React.createContext<PlayersContextType>({ skaters: [], goalies: [] })
export const GamelogContext = React.createContext<GamelogContextType>({ gamelog: [] })
export const StandingsContext = React.createContext<StandingsContextType>({ standings: [] })

// create hooks
export const useInjuries = () => React.useContext(InjuriesContext)
export const usePlayers = () => React.useContext(PlayersContext)
export const useGamelog = () => React.useContext(GamelogContext)
export const useStandings = () => React.useContext(StandingsContext)

// create providers
export const GamelogProvider: React.FC = ({ children }) => {
  // set state
  const [gamelog, setGamelog] = React.useState<GameStats[]>([])

  const getGamelog = async () => {
    try {
      const res = await fetch(`/api/games?API_KEY=${STATS_API_KEY}`)
      const data = await res.json()
      console.log('setting gamelog', data)
      setGamelog(data)
    } catch {
      console.log('Gamelog not found')
    }
  }

  React.useEffect(() => {
    getGamelog()
  }, [])

  return <GamelogContext.Provider value={{ gamelog }}>{children}</GamelogContext.Provider>
}

export const StandingsProvider: React.FC = ({ children }) => {
  // set state
  const [standings, setStandings] = React.useState<Conference[]>([])

  const getStandings = async () => {
    try {
      const res = await fetch(`/api/standings?API_KEY=${STATS_API_KEY}`)
      const data = await res.json()
      console.log('setting standings', data)
      setStandings(data)
    } catch {
      console.log('Standings not found')
    }
  }

  React.useEffect(() => {
    getStandings()
  }, [])

  return <StandingsContext.Provider value={{ standings }}>{children}</StandingsContext.Provider>
}

export const PlayersProvider: React.FC = ({ children }) => {
  // set state
  const [skaters, setSkaters] = React.useState<SkaterScoring[]>([])
  const [goalies, setGoalies] = React.useState<GoalieScoring[]>([])

  const getPlayers = async () => {
    try {
      const res1 = await fetch(`/api/skaters?API_KEY=${STATS_API_KEY}`)
      const data1 = await res1.json()
      console.log('setting skaters', data1)
      setSkaters(data1)
      const res2 = await fetch(`/api/goalies?API_KEY=${STATS_API_KEY}`)
      const data2 = await res2.json()
      console.log('setting goalies', data2)
      setGoalies(data2)
    } catch {
      console.log('Players not found')
    }
  }

  React.useEffect(() => {
    getPlayers()
  }, [])

  return <PlayersContext.Provider value={{ skaters, goalies }}>{children}</PlayersContext.Provider>
}

export const InjuriesProvider: React.FC = ({ children }) => {
  // set state
  const [injuries, setInjuries] = React.useState<Injury[]>([])

  const getInjuries = async () => {
    try {
      const res = await fetch(`/api/injuries?API_KEY=${STATS_API_KEY}`)
      const data = await res.json()
      console.log('setting standings', data)
      setInjuries(data)
    } catch {
      console.log('Injuries not found')
    }
  }

  React.useEffect(() => {
    getInjuries()
  }, [])

  return <InjuriesContext.Provider value={{ injuries }}>{children}</InjuriesContext.Provider>
}
