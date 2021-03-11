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

export const GameSummaryPage = () => {
  return (
    <Container pt={12}>
      <Heading textAlign='center'>Game Summary</Heading>
      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
      <GameSummary></GameSummary>
    </Container>
  )
}
