import { Box, Text, Center } from '@chakra-ui/react'
import React from 'react'

import { GameStats } from '../../../types/app'

import { useGamelog } from '../../../context'
import { Game } from '../../Homepage/Game'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

interface RecentGamesProps {
  team_id: string
}

export const RecentGames: React.FC<RecentGamesProps> = ({ team_id }) => {
  const { gamelog } = useGamelog()

  const [recentGames, setRecentGames] = React.useState<GameStats[]>([])
  const [recentGamesToggle, setRecentGamesToggle] = React.useState(false)

  const getRecentGames = (gamelog: GameStats[]): GameStats[] => {
    // get yesterday at this time
    const now = Date.now() - 3600 * 24 * 1000

    const recent_games = gamelog.filter((game) => {
      // get time of game
      const game_date = new Date(game.date)
      const time = game_date.getTime()
      // if time difference is positive then is past game
      const time_difference = now - time
      if (time_difference > 0) return true
      return false
    })

    return recent_games.sort((a, b) => {
      // get time fo both games
      const time_a = new Date(a.date).getTime()
      const time_b = new Date(b.date).getTime()
      // flip the greater time to the top
      return time_b - time_a
    })
  }

  React.useEffect(() => {
    const teams_games = gamelog.filter(
      (game) => game.away_team_id === team_id || game.home_team_id === team_id
    )
    const recent_games = getRecentGames(teams_games)
    setRecentGames(recent_games)
    console.log('recent games', recent_games)
  }, [team_id, gamelog])

  return (
    <>
      {recentGamesToggle ? (
        <Box>
          {recentGames.slice(0, 10).map((game) => (
            <Game key={game.id} game={game} />
          ))}
          <Center onClick={() => setRecentGamesToggle(false)}>
            <Text>{`See Less Games`.toUpperCase()}</Text>
            <TriangleUpIcon mx={2} />
          </Center>
        </Box>
      ) : (
        <Box>
          {recentGames.slice(0, 5).map((game) => (
            <Game key={game.id} game={game} />
          ))}
          <Center onClick={() => setRecentGamesToggle(true)}>
            <Text>{`See More Games`.toUpperCase()}</Text>
            <TriangleDownIcon mx={2} />
          </Center>
        </Box>
      )}
    </>
  )
}
