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

export const GameSummaryPage = () => {
  return (
    <Container pt={12}>
      <VStack spacing={6}>
        {/* game summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Game Summary</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GameSummary></GameSummary>
        </Box>
        {/* penalties by period */}
        <Box w='100%'>
          <Heading textAlign='center'>Penalities By Period</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <PenaltiesSummary></PenaltiesSummary>
        </Box>
        {/* scoring by period */}
        <Box w='100%'>
          <Heading textAlign='center'>Scoring By Period</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <ScoringByPeriod></ScoringByPeriod>
        </Box>
        {/* home skaters scoring summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Home Scoring</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <SkatersScoringSummary></SkatersScoringSummary>
        </Box>
        {/* away skaters scoring summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Away Scoring</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <SkatersScoringSummary></SkatersScoringSummary>
        </Box>
        {/* home goalies summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Home Goalies</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GoalieScoringSummary></GoalieScoringSummary>
        </Box>
        {/* away goalies summary */}
        <Box w='100%'>
          <Heading textAlign='center'>Away Goalies</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GoalieScoringSummary></GoalieScoringSummary>
        </Box>
      </VStack>
    </Container>
  )
}
