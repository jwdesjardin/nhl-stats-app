import * as React from 'react'
import { Container, HStack } from '@chakra-ui/layout'
import {
  Box,
  Heading,
  Image,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'

import { RouteComponentProps } from 'react-router-dom'
import { PlayerInjuries } from './PlayerInjuries'
import { PlayerSummary } from './PlayerSummary'
import { usePlayers } from '../../context'
import { PlayerGoals } from './PlayerGoals'
import { PlayerAssists } from './PlayerAssists'
import { PlayerPoints } from './PlayerPoints'
import { PlayerSeasonSummary } from './PlayerSeasonSummary'
import { GoalieScoring, SkaterScoring, Team } from '../../types/app'
import { teams } from '../../data/teams'
import { GoalieGoalsAgainstAvg } from './GoalieGoalsAgainstAvg'
import { GoalieSavePercentage } from './GoalieSavePercentage'
import { GoalieGoalsAgainst } from './GoalieGoalsAgainst'
import { GoalieSeasonSummary } from './GoalieSeasonSummary'

interface PlayerPageProps extends RouteComponentProps<any> {}

export const PlayerPage: React.FC<PlayerPageProps> = ({ match }) => {
  const { player_id } = match.params

  const { skaters, goalies } = usePlayers()

  const [skater, setSkater] = React.useState<SkaterScoring | undefined>()
  const [goalie, setGoalie] = React.useState<GoalieScoring | undefined>()
  const [team, setTeam] = React.useState<Team | undefined>()

  React.useEffect(() => {
    // first see if player is goalie and store data
    const isGoalie = goalies.find((goalie) => goalie.player_id === player_id)
    if (isGoalie !== undefined) {
      setGoalie(isGoalie)
      setTeam(teams.find((team) => team.teamID === isGoalie.team_id))

      // else check if player is skater and store data
    } else {
      const isSkater = skaters.find((skater) => skater.player_id === player_id)
      if (isSkater) {
        console.log('isSkater', isSkater)
        setSkater(skaters.find((skater) => skater.player_id === player_id))
        setTeam(teams.find((team) => team.teamID === isSkater.team_id))
      }
    }
  }, [player_id])

  return (
    <Container pt={20}>
      {skater && team && (
        <VStack spacing={6}>
          <Box w='100%'>
            <Heading d='flex' fontSize={32} mb={2} textAlign='center'>
              {skater.player}
            </Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PlayerSummary player_id={player_id} team={team}></PlayerSummary>
          </Box>

          <PlayerInjuries player_id={player_id}></PlayerInjuries>

          <Box w='100%'>
            <PlayerGoals skater={skater}></PlayerGoals>
          </Box>

          <Box w='100%'>
            <PlayerAssists skater={skater}></PlayerAssists>
          </Box>

          <Box w='100%'>
            <PlayerPoints skater={skater}></PlayerPoints>
          </Box>

          <Box w='100%'>
            <Heading textAlign='center'>2020-21 Scoring</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PlayerSeasonSummary skater={skater}></PlayerSeasonSummary>
          </Box>
        </VStack>
      )}
      {goalie && team && (
        <VStack spacing={6}>
          <Box w='100%'>
            <Heading d='flex' fontSize={32} mb={2} textAlign='center'>
              {goalie.player}
            </Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PlayerSummary player_id={player_id} team={team}></PlayerSummary>
          </Box>

          <PlayerInjuries player_id={player_id}></PlayerInjuries>

          <Box w='100%'>
            <GoalieGoalsAgainstAvg goalie={goalie}></GoalieGoalsAgainstAvg>
          </Box>

          <Box w='100%'></Box>
          <GoalieSavePercentage goalie={goalie}></GoalieSavePercentage>
          <Box w='100%'></Box>

          <Box w='100%'></Box>
          <GoalieGoalsAgainst goalie={goalie}></GoalieGoalsAgainst>
          <Box w='100%'></Box>

          <Box w='100%'>
            <Heading textAlign='center'>2020-21 Scoring</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <GoalieSeasonSummary goalie={goalie}></GoalieSeasonSummary>
          </Box>
        </VStack>
      )}
    </Container>
  )
}
