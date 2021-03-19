import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Goal } from '../../../types/gameSummary'

interface GoalRowProps {
  goal: Goal
}

export const GoalRow: React.FC<GoalRowProps> = ({ goal }) => {
  return (
    <Tr>
      {/* 00:00 format time of goal */}
      <Td p={2}>{goal.time}</Td>
      {/* team id */}
      <Td p={2}>
        <Link as={RouterLink} to={`/team/${goal.team_id}`}>
          {goal.team_id}
        </Link>
      </Td>
      {/* indicates pp goal or empty net */}
      <Td p={2}>{goal.power_play}</Td>
      {/* scorer name with goal count */}
      <Td p={2}>
        <Link as={RouterLink} to={`/player/${goal.scorer_id}`}>
          {goal.scorer}
        </Link>{' '}
        ({goal.count})
      </Td>
      {/* player name for each assist */}
      <Td p={2}>
        {goal.assists.map((assist) => (
          <Link as={RouterLink} to={`/player/${assist.player_id}`}>
            {assist.name}
            {', '}
          </Link>
        ))}
      </Td>
    </Tr>
  )
}
