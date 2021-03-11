import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as BrowserLink } from 'react-router-dom'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { SO_Attempt } from '../../../types/gameSummary'

interface SOAttemptRowProps {
  attempt: SO_Attempt
}

export const SOAttemptRow: React.FC<SOAttemptRowProps> = ({ attempt }) => {
  return (
    <Tr>
      <Td p={2}>{attempt.shot_number}</Td>
      <Td p={2}>
        <Link as={BrowserLink} to={`/team/${attempt.team_id}`}>
          {attempt.team_id}
        </Link>
      </Td>
      <Td p={2}>
        <Link as={BrowserLink} to={`/player/${attempt.scorer_id}`}>
          {attempt.scorer}
        </Link>
      </Td>
      <Td p={2}>
        {attempt.success ? <CheckIcon color='green.500' /> : <CloseIcon color='red.500' />}
      </Td>
      <Td p={2}>
        <Link as={BrowserLink} to={`/player/${attempt.goalie_id}`}>
          {attempt.goalie}
        </Link>
      </Td>
    </Tr>
  )
}
