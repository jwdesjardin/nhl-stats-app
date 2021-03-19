import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { SO_Attempt } from '../../../types/gameSummary'

interface SOAttemptRowProps {
  attempt: SO_Attempt
}

export const SOAttemptRow: React.FC<SOAttemptRowProps> = ({ attempt }) => {
  return (
    <Tr>
      {/* shootout shot # */}
      <Td p={2}>{attempt.shot_number}</Td>
      {/* team id */}
      <Td p={2}>
        <Link as={RouterLink} to={`/team/${attempt.team_id}`}>
          {attempt.team_id}
        </Link>
      </Td>
      {/* scorer name */}
      <Td p={2}>
        <Link as={RouterLink} to={`/player/${attempt.scorer_id}`}>
          {attempt.scorer}
        </Link>
      </Td>
      {/* success  icon */}
      <Td p={2}>
        {attempt.success ? <CheckIcon color='green.500' /> : <CloseIcon color='red.500' />}
      </Td>
      {/* goalie name */}
      <Td p={2}>
        <Link as={RouterLink} to={`/player/${attempt.goalie_id}`}>
          {attempt.goalie}
        </Link>
      </Td>
    </Tr>
  )
}
