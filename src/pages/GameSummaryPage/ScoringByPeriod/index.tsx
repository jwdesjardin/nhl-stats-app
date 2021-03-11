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
            const goals = period.goals?.map((goal, idx) => (
              <GoalRow key={idx} goal={goal}></GoalRow>
            ))

            return (
              <>
                <Tr>
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

      {shootout && (
        <Table size='sm'>
          <Tbody>
            <Tr>
              <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
                Shootout
              </Th>
            </Tr>
            {shootout.so_attempts?.map((attempt, idx) => (
              <SOAttemptRow key={idx} attempt={attempt}></SOAttemptRow>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
