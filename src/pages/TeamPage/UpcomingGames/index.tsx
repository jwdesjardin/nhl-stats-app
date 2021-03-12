import { Box, Text, VStack, Container, Heading, Center, Button, Link } from '@chakra-ui/react'
import React from 'react'

import { GameStats } from '../../../types/app'

import { useGamelog } from '../../../context'
import { Game } from '../../Homepage/Game'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Link as BrowserLink } from 'react-router-dom'

interface UpcomingGamesProps {
  team_id: string
}

export const UpcomingGames: React.FC<UpcomingGamesProps> = ({ team_id }) => {
  const { gamelog } = useGamelog()

  const [upcomingGames, setUpcomingGames] = React.useState<GameStats[]>([])
  const [upcomingGamesToggle, setUpcomingGamesToggle] = React.useState(false)

  const teams_games = gamelog.filter(
    (game) => game.away_team_id === team_id || game.home_team_id === team_id
  )

  const getUpcomingGames = (gamelog: GameStats[]): GameStats[] => {
    const now = Date.now()

    const upcoming_games = gamelog.filter((game) => {
      const game_date = new Date(game.date)
      const time = game_date.getTime()
      const seconds_in_week = 3600 * 24 * 21 * 1000
      const time_difference = time - now
      console.log(time_difference, seconds_in_week)
      if (time_difference < seconds_in_week && time_difference > 0) return true
      return false
    })

    return upcoming_games
  }

  React.useEffect(() => {
    const upcoming_games = getUpcomingGames(teams_games)
    setUpcomingGames(upcoming_games)
    console.log('upcoming games', upcoming_games)
  }, [])

  return (
    <>
      {upcomingGamesToggle ? (
        <Box>
          {upcomingGames.slice(0, 10).map((game) => (
            <Game key={game.id} game={game} />
          ))}
          <Center my={2}>
            <Link as={BrowserLink} to={`/schedule/${team_id}`}>
              <Button bg='orange.300'>Full Schedule</Button>
            </Link>
          </Center>

          <Center onClick={() => setUpcomingGamesToggle(false)}>
            <Text>{`See Less Games`.toUpperCase()}</Text>
            <TriangleUpIcon mx={2} />
          </Center>
        </Box>
      ) : (
        <Box>
          {upcomingGames.slice(0, 5).map((game) => (
            <Game key={game.id} game={game} />
          ))}
          <Center onClick={() => setUpcomingGamesToggle(true)}>
            <Text>{`See More Games`.toUpperCase()}</Text>
            <TriangleDownIcon mx={2} />
          </Center>
        </Box>
      )}
    </>
  )
}
