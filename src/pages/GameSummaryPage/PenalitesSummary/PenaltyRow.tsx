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
      <Td p={2}>{penalty.time}</Td>
      <Td p={2}>
        <Link as={RouterLink} to='/team'>
          {penalty.team_id}
        </Link>
      </Td>
      <Td p={2}>
        <Link as={RouterLink} to='/player'>
          {penalty.player}
        </Link>
      </Td>
      <Td p={2}>{penalty.type}</Td>
      <Td p={2}>{penalty.duration}m</Td>
    </Tr>
  )
}
