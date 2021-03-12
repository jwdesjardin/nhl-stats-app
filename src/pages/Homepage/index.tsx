import { Box, VStack, Container, Heading } from '@chakra-ui/react'
import React from 'react'

import { Conference, GameStats } from '../../types/app'
import { ConferenceStandings } from './Standings'
import { Game } from './Game'
import { useStandings, useGamelog } from '../../context'

export const HomePage: React.FC = () => {
  const { standings } = useStandings()
  const { gamelog } = useGamelog()

  const [todaysGames, setTodaysGames] = React.useState<GameStats[]>([])

  const [westernConference, setWesternConference] = React.useState<Conference | undefined>(
    standings.find((conference) => conference.name === 'West Division')
  )
  const [easternConference, setEasternConference] = React.useState<Conference | undefined>(
    standings.find((conference) => conference.name === 'East Division')
  )
  const [centralConference, setCentralConference] = React.useState<Conference | undefined>(
    standings.find((conference) => conference.name === 'Central Division')
  )
  const [northernConference, setNorthernConference] = React.useState<Conference | undefined>(
    standings.find((conference) => conference.name === 'North Division')
  )

  const getTodaysGames = (gamelog: GameStats[]): GameStats[] => {
    const today = new Date()
    const month = today.getMonth()
    const date = today.getDate()
    const year = today.getFullYear()

    console.log(today, month, date, year)

    const todays_games = gamelog.filter((game) => {
      const game_date = new Date(game.date)
      if (
        game_date.getFullYear() === year &&
        game_date.getMonth() === month &&
        game_date.getDate() + 1 === date
      )
        return true
      return false
    })

    return todays_games
  }

  React.useEffect(() => {
    const todays_games = getTodaysGames(gamelog)
    setTodaysGames(todays_games)
    console.log('todays games', todays_games)
  }, [])

  return (
    <Container pt={12}>
      <VStack spacing={4}>
        {/* todays games */}
        <Box p={4} w='100%'>
          <Heading textAlign='center'>Today's Games</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          {todaysGames.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </Box>

        {/* standings */}
        <Box w='100%'>
          <Heading textAlign='center'>Standings</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          {westernConference && <ConferenceStandings conference={westernConference} />}
          {easternConference && <ConferenceStandings conference={easternConference} />}
          {northernConference && <ConferenceStandings conference={northernConference} />}
          {centralConference && <ConferenceStandings conference={centralConference} />}
        </Box>
      </VStack>
    </Container>
  )
}
