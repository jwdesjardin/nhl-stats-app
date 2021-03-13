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
import { GameSummary } from './GameSummary'
import { PenaltiesSummary } from './PenalitesSummary'
import { ScoringByPeriod } from './ScoringByPeriod'
import { SkatersScoringSummary } from './SkatersScoringSummary'
import { GoalieScoringSummary } from './GoalieScoringSummary'
import GAMESUMMARY from '../../data/gameSummary.json'
import { RouteComponentProps } from 'react-router-dom'

interface TeamSchedulePageProps extends RouteComponentProps<any> {}

export const GameSummaryPage: React.FC<TeamSchedulePageProps> = ({ match }) => {
  const { game_id } = match.params

  return (
    <Container pt={12}>
      <VStack spacing={6}>
        {/* game summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Game Summary</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GameSummary boxScore={GAMESUMMARY.box_score}></GameSummary>
        </Box>
        {/* penalties by period */}
        <Box w='100%'>
          <Heading textAlign='center'>Penalities By Period</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <PenaltiesSummary penaltySummary={GAMESUMMARY.penalty_summary}></PenaltiesSummary>
        </Box>
        {/* scoring by period */}
        <Box w='100%'>
          <Heading textAlign='center'>Scoring By Period</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <ScoringByPeriod scoringSummary={GAMESUMMARY.scoring_summary}></ScoringByPeriod>
        </Box>
        {/* home skaters scoring summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Home Scoring</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <SkatersScoringSummary summary={GAMESUMMARY.home_team_scoring}></SkatersScoringSummary>
        </Box>
        {/* away skaters scoring summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Away Scoring</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <SkatersScoringSummary summary={GAMESUMMARY.away_team_scoring}></SkatersScoringSummary>
        </Box>
        {/* home goalies summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Home Goalies</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GoalieScoringSummary summary={GAMESUMMARY.home_team_goalies}></GoalieScoringSummary>
        </Box>
        {/* away goalies summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Away Goalies</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GoalieScoringSummary summary={GAMESUMMARY.away_team_goalies}></GoalieScoringSummary>
        </Box>
      </VStack>
    </Container>
  )
}
