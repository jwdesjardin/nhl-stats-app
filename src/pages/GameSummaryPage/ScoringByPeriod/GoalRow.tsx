import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as BrowserLink } from 'react-router-dom'
import { Goal } from '../../../types/gameSummary'

interface GoalRowProps {
  goal: Goal
}

export const GoalRow: React.FC<GoalRowProps> = ({ goal }) => {
  return (
    <Tr>
      <Td p={2}>{goal.time}</Td>
      <Td p={2}>
        <Link as={BrowserLink} to={`/team/${goal.team_id}`}>
          {goal.team_id}
        </Link>
      </Td>
      <Td p={2}>{goal.power_play}</Td>
      <Td p={2}>
        <Link as={BrowserLink} to={`/player/${goal.scorer_id}`}>
          {goal.scorer}
        </Link>{' '}
        ({goal.count})
      </Td>
      <Td p={2}>
        {goal.assists.map((assist) => (
          <Link as={BrowserLink} to={`/player/${assist.player_id}`}>
            {assist.name}
            {', '}
          </Link>
        ))}
      </Td>
    </Tr>
  )
}
