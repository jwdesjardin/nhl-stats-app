import * as React from 'react'
import { Box, Table, Tbody, Th, Tr } from '@chakra-ui/react'

import { GoalRow } from './GoalRow'
import { SOAttemptRow } from './SOAttemptRow'
import { Goal, SO_Attempt } from '../../../types/gameSummary'

interface ScoringByPeriodProps {
  scoringSummary: {
    title: string
    goals?: Goal[]
    so_attempts?: SO_Attempt[]
  }[]
}

export const ScoringByPeriod: React.FC<ScoringByPeriodProps> = ({ scoringSummary }) => {
  const shootout = scoringSummary.find((period) => period.title === 'Shootout')
  const regulation_scoring = scoringSummary.filter((period) => period.title !== 'Shootout')

  return (
    <Box bg='white' border='2px solid black' borderRadius='lg'>
      <Table size='sm'>
        <Tbody>
          {regulation_scoring.map((period) => {
            // get goals
            const goals = period.goals?.map((goal, idx) => (
              <GoalRow key={`${goal.scorer_id}${goal.count}`} goal={goal}></GoalRow>
            ))

            return (
              // render period title and goals if they exist
              <>
                <Tr key={period.title}>
                  <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
                    {period.title}
                  </Th>
                </Tr>
                {goals}
              </>
            )
          })}
        </Tbody>
      </Table>

      {/* if shootout period exists render shootout table */}
      {shootout && (
        <Table size='sm'>
          <Tbody>
            <Tr>
              <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
                Shootout
              </Th>
            </Tr>
            {/* get shootout attempts if they exist */}
            {shootout.so_attempts?.map((attempt, idx) => (
              <SOAttemptRow key={idx} attempt={attempt}></SOAttemptRow>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
