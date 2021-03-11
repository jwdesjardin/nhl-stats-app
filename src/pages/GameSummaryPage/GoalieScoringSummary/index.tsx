import { Box, Link, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'
import { GoalieGame } from '../../../types/gameSummary'
import { Link as BrowserLink } from 'react-router-dom'

interface GoalieScoringSummaryProps {
  summary: GoalieGame[]
}

export const GoalieScoringSummary: React.FC<GoalieScoringSummaryProps> = ({ summary }) => {
  return (
    <Box bg='white' border='2px solid black' p={4} borderRadius='lg'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th isNumeric>GA</Th>
            <Th isNumeric>SA</Th>
            <Th isNumeric>SV</Th>
            <Th isNumeric>S%</Th>
          </Tr>
        </Thead>
        <Tbody>
          {summary.map((goalie) => (
            <Tr>
              <Td>
                <Link as={BrowserLink} to={`/player/${goalie.player_id}`}>
                  {goalie.player}
                </Link>
              </Td>
              <Td isNumeric>{goalie.goals_against}</Td>
              <Td isNumeric>{goalie.shots_against}</Td>
              <Td isNumeric>{goalie.saves}</Td>
              <Td isNumeric>{goalie.save_percentage}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
