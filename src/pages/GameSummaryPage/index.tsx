import * as React from 'react'
import { Container } from '@chakra-ui/layout'
import { Box, Heading, VStack } from '@chakra-ui/react'
import { GameSummary } from './GameSummary'
import { PenaltiesSummary } from './PenalitesSummary'
import { ScoringByPeriod } from './ScoringByPeriod'
import { SkatersScoringSummary } from './SkatersScoringSummary'
import { GoalieScoringSummary } from './GoalieScoringSummary'

import { RouteComponentProps } from 'react-router-dom'
import { GameSummaryStats } from '../../types/gameSummary'
import { STATS_API_KEY } from '../../config'

interface TeamSchedulePageProps extends RouteComponentProps<any> {}

export const GameSummaryPage: React.FC<TeamSchedulePageProps> = ({ match }) => {
  const { game_id } = match.params

  const [gameSummary, setGameSummary] = React.useState<GameSummaryStats | undefined>()

  const getGameSummary = async (game_id: string) => {
    console.log('game_id', game_id)
    const res = await fetch(`/api/game/${game_id}?API_KEY=${STATS_API_KEY}`)
    const data = await res.json()
    console.log('game summary', data)
    setGameSummary(data)
  }

  React.useEffect(() => {
    getGameSummary(game_id)
  }, [game_id])

  return (
    <Container pt={12}>
      {gameSummary && (
        <VStack spacing={6}>
          {/* game summary */}
          <Box w='100%'>
            <Heading textAlign='center'>Game Summary</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <GameSummary boxScore={gameSummary.box_score}></GameSummary>
          </Box>
          {/* penalties by period */}
          <Box w='100%'>
            <Heading textAlign='center'>Penalities By Period</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PenaltiesSummary penaltySummary={gameSummary.penalty_summary}></PenaltiesSummary>
          </Box>
          {/* scoring by period */}
          <Box w='100%'>
            <Heading textAlign='center'>Scoring By Period</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <ScoringByPeriod scoringSummary={gameSummary.scoring_summary}></ScoringByPeriod>
          </Box>
          {/* home skaters scoring summary */}
          <Box w='100%'>
            <Heading textAlign='center'>Home Scoring</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <SkatersScoringSummary summary={gameSummary.home_team_scoring}></SkatersScoringSummary>
          </Box>
          {/* away skaters scoring summary */}
          <Box w='100%'>
            <Heading textAlign='center'>Away Scoring</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <SkatersScoringSummary summary={gameSummary.away_team_scoring}></SkatersScoringSummary>
          </Box>
          {/* home goalies summary */}
          <Box w='100%'>
            <Heading textAlign='center'>Home Goalies</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <GoalieScoringSummary summary={gameSummary.home_team_goalies}></GoalieScoringSummary>
          </Box>
          {/* away goalies summary */}
          <Box w='100%'>
            <Heading textAlign='center'>Away Goalies</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <GoalieScoringSummary summary={gameSummary.away_team_goalies}></GoalieScoringSummary>
          </Box>
        </VStack>
      )}
    </Container>
  )
}
