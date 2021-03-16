import React from 'react'
import { Box, VStack, Container, Heading } from '@chakra-ui/react'

import { Conference, GameStats } from '../../types/app'
import { useStandings, useGamelog } from '../../context'
import { ConferenceStandings } from '../../utils/ConferenceStandings'
import { Game } from '../../utils/Game'

export const HomePage: React.FC = () => {
  // context
  const { standings } = useStandings()
  const { gamelog } = useGamelog()

  // state
  const [todaysGames, setTodaysGames] = React.useState<GameStats[]>([])
  const [westernConference, setWesternConference] = React.useState<Conference | undefined>()
  const [easternConference, setEasternConference] = React.useState<Conference | undefined>()
  const [centralConference, setCentralConference] = React.useState<Conference | undefined>()
  const [northernConference, setNorthernConference] = React.useState<Conference | undefined>()

  // FUNCTION: get's games for today
  const getTodaysGames = (gamelog: GameStats[]): GameStats[] => {
    const today = new Date()
    const month = today.getMonth()
    const date = today.getDate()
    const year = today.getFullYear()

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

  // get todays games and set conference state
  React.useEffect(() => {
    const todays_games = getTodaysGames(gamelog)
    setTodaysGames(todays_games)

    setWesternConference(standings.find((conference) => conference.name === 'West Division'))
    setEasternConference(standings.find((conference) => conference.name === 'East Division'))
    setNorthernConference(standings.find((conference) => conference.name === 'North Division'))
    setCentralConference(standings.find((conference) => conference.name === 'Central Division'))
  }, [standings, gamelog])

  return (
    <Container pt={20} pb={7}>
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
