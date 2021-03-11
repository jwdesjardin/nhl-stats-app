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

export const GameSummaryPage = () => {
  return (
    <Container pt={12}>
      <VStack spacing={6}>
        {/* game summary */}
        <Box>
          <Heading textAlign='center'>Game Summary</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <GameSummary></GameSummary>
        </Box>
        {/* penalties summary */}
        <Box>
          <Heading textAlign='center'>Penalities By Period</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <PenaltiesSummary></PenaltiesSummary>
        </Box>
        {/* scoring summary */}
        <Box>
          <Heading textAlign='center'>Scoring By Period</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          <ScoringByPeriod></ScoringByPeriod>
        </Box>
      </VStack>
    </Container>
  )
}
