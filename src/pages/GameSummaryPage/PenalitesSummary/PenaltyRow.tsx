import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Penalty } from '../../../types/gameSummary'

interface PenaltyRowProps {
  penalty: Penalty
}

export const PenaltyRow: React.FC<PenaltyRowProps> = ({ penalty }) => {
  return (
    <Tr>
      {/* time */}
      <Td p={2}>{penalty.time}</Td>
      {/* team id */}
      <Td p={2}>
        <Link as={RouterLink} to='/team'>
          {penalty.team_id}
        </Link>
      </Td>
      {/* player name */}
      <Td p={2}>
        <Link as={RouterLink} to='/player'>
          {penalty.player}
        </Link>
      </Td>
      {/* type */}
      <Td p={2}>{penalty.type}</Td>
      {/* duration */}
      <Td p={2}>{penalty.duration}m</Td>
    </Tr>
  )
}
