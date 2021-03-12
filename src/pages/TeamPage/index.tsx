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

import TEAMSUMMARY from '../../data/team.json'
import { TeamSummary } from './TeamSummary'
import { SkaterScoringLeaders } from './SkaterScoringLeaders'
import { GoalieScoringLeaders } from './GoalieScoringLeaders'
import { TeamInjuries } from './TeamInjuries'
import { RosterStats } from './RosterStats'
import { ConferenceStandings } from '../Homepage/Standings'
import { useStandings } from '../../context'
import { teams } from '../../data/teams'
import { UpcomingGames } from './UpcomingGames'
import { RecentGames } from './RecentGames'

export const TeamPage = () => {
  const team_id = TEAMSUMMARY.skaterStats[0].team_id
  const { standings } = useStandings()

  const division = teams.find((team) => team.teamID === team_id)?.conference

  const conference = standings.find((conference) => conference.name.includes(division || 'none'))

  return (
    <Container pt={20}>
      <VStack spacing={6}>
        {/* Team Summary */}
        <Box w='100%'>
          <TeamSummary></TeamSummary>
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Recent Games</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          {/* bring in games */}
          <RecentGames team_id={team_id}></RecentGames>
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Scoring Leaders</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <SkaterScoringLeaders skaterScoring={TEAMSUMMARY.skaterStats} />
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Injuries</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <TeamInjuries team_id={team_id} />
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Goalies</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GoalieScoringLeaders goalieScoring={TEAMSUMMARY.goalieStats} />
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Standings</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          {/* bring in standings */}
          {conference && (
            <ConferenceStandings conference={conference} team_id={team_id}></ConferenceStandings>
          )}
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Upcoming Games</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          {/* bring in games */}
          <UpcomingGames team_id={team_id}></UpcomingGames>
        </Box>

        <Box w='100%'>
          <Heading textAlign='center'>Roster Stats</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <RosterStats rosterStats={TEAMSUMMARY.rosterStats}></RosterStats>
        </Box>
      </VStack>
    </Container>
  )
}
