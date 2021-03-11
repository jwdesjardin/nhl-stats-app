import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'
import { SkaterGame } from '../../../types/gameSummary'

interface SkatersScoringSummaryProps {
  summary: SkaterGame[]
}

export const SkatersScoringSummary: React.FC<SkatersScoringSummaryProps> = ({ summary }) => {
  return (
    <Box bg='white' border='2px solid black' p={2} borderRadius='lg'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th>G</Th>
            <Th>A</Th>
            <Th>PTS</Th>
            <Th>S</Th>
            <Th>TOI</Th>
          </Tr>
        </Thead>
        <Tbody>
          {summary.map((skater) => (
            <Tr>
              <Td>{skater.player}</Td>
              <Td isNumberic>{skater.goals}</Td>
              <Td isNumberic>{skater.assists}</Td>
              <Td isNumberic>{skater.points}</Td>
              <Td isNumberic>{skater.shots_on_goal}</Td>
              <Td isNumberic>{skater.time_on_ice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
