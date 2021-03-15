import { Text, Box, Link, Image, Badge, HStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

//Data
import { teams } from '../../data/teams'
//Types
import { GameStats } from '../../types/app'

interface GameProps {
  game: GameStats
  decision_team_id?: string
}

export const Game: React.FC<GameProps> = ({ game, decision_team_id }) => {
  // find the team object
  const home_team = teams.find((team) => team.name === game.home_team)
  const away_team = teams.find((team) => team.name === game.away_team)

  const dec_team = home_team?.teamID === decision_team_id ? 'home' : 'away'

  const [decision, setDecision] = React.useState('')
  const [gameLink, setGameLink] = React.useState('')
  const [gameDate, setGameDate] = React.useState<Date | undefined>()

  React.useEffect(() => {
    // create a date object
    const game_date = new Date(game.date)
    setGameDate(game_date)

    // create game_link if game was not yesterday or earlier
    let game_link = ''
    if (home_team) {
      const today = new Date('3/14/2021')
      const tomorrow = new Date('3/15/2021')

      // get time of game
      const game_time = game_date.getTime()

      // get this time yesterday shifted by 8 hours for UTC
      const yesterday = Date.now() - 3600 * 1000 * 32

      console.log(
        tomorrow.getTime() - today.getTime() + +3600000,
        (tomorrow.getTime() - today.getTime() + 3600000) / 24
      )
      console.log(yesterday, today.getTime(), game_time)
      console.log(today.getTime() - game_time)

      console.log(game_time - yesterday)
      if (game_time < yesterday) {
        game_link =
          game_date.getFullYear().toString() +
          padStart((game_date.getMonth() + 1).toString()) +
          padStart((game_date.getDate() + 1).toString()) +
          0 +
          home_team.teamID
        setGameLink(game_link)
      }
    }

    // decision

    if (game.home_goals !== null && game.away_goals !== null && dec_team) {
      const home_value = dec_team === 'home' ? game.home_goals : game.away_goals
      const away_value = dec_team === 'home' ? game.away_goals : game.home_goals

      const result = home_value - away_value > 0 ? 'Win' : 'Loss'

      setDecision(result)
    }
  }, [dec_team, game, home_team])

  // helper function to pad single digit months and dates
  const padStart = (str: string) => {
    const number = parseInt(str)
    if (number < 10) {
      return '0' + str
    } else return str
  }

  return (
    <Box
      border='1px solid black'
      bg='white'
      borderRadius='lg'
      p={2}
      d='flex'
      alignItems='center'
      justifyContent='space-evenly'
      my={1}
    >
      {/* game date */}
      {gameDate && (
        <Box d='flex' flexDirection='column' alignItems='center' p={1}>
          <Text>
            {gameDate.getMonth() + 1}
            {'/'}
            {gameDate.getDate() + 1}
          </Text>
        </Box>
      )}

      {/* score */}
      {home_team && away_team && (
        <Box d='flex' alignItems='center'>
          <Link as={RouterLink} to={`/team/${away_team.teamID}`}>
            <Image w='45px' src={away_team.image_url} />
          </Link>

          <Text fontSize={16} fontWeight='bold' mr={2}>
            {game.away_goals}
          </Text>
          <Text mr={2}>@</Text>
          <Link as={RouterLink} to={`/team/${home_team.teamID}`}>
            <Image w='45px' src={home_team.image_url} />
          </Link>

          <Text fontSize={16} fontWeight='bold' mr={4}>
            {game.home_goals}
          </Text>
        </Box>
      )}

      {/* result */}
      <HStack spacing={2}>
        {/* ot */}
        {game.overtime ? (
          <Badge p={1} mr={2}>
            {game.overtime}
          </Badge>
        ) : (
          <Badge bg='white' p={3} mr={2}></Badge>
        )}

        {/* decision */}
        {decision !== '' && decision === 'Win' && (
          <Badge w={5} textAlign='center' colorScheme='green' p={1} mr={2}>
            W
          </Badge>
        )}
        {decision !== '' && decision === 'Loss' && (
          <Badge w={5} textAlign='center' colorScheme='orange' p={1} mr={2}>
            L
          </Badge>
        )}

        {/* match details */}
        {gameLink !== '' ? (
          <Link as={RouterLink} to={`/game-summary/${gameLink}`}>
            <Heading fontSize={14}>GAME</Heading>
          </Link>
        ) : (
          <Box />
        )}
      </HStack>
    </Box>
  )
}
