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
            <Tr key={skater.player_id}>
              <Td>{skater.player}</Td>
              <Td isNumeric>{skater.goals}</Td>
              <Td isNumeric>{skater.assists}</Td>
              <Td isNumeric>{skater.points}</Td>
              <Td isNumeric>{skater.shots_on_goal}</Td>
              <Td isNumeric>{skater.time_on_ice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
