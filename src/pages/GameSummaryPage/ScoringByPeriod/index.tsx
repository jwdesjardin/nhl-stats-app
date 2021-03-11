import * as React from 'react'
import { Box, Table, Tbody, Th, Tr } from '@chakra-ui/react'

import { GoalRow } from './GoalRow'
import { SOAttemptRow } from './SOAttemptRow'

export const ScoringByPeriod = () => {
  return (
    <Box bg='white' border='2px solid black' borderRadius='lg'>
      <Table size='sm'>
        <Tbody>
          {/* period */}
          <Tr>
            <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
              1st Period
            </Th>
          </Tr>
          {/* goals */}
          <GoalRow></GoalRow>
          <GoalRow></GoalRow>
          <GoalRow></GoalRow>

          {/* period */}
          <Tr>
            <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
              2nd Period
            </Th>
          </Tr>

          {/* goals */}
          <GoalRow></GoalRow>
          <GoalRow></GoalRow>
          <GoalRow></GoalRow>

          {/* period */}
          <Tr>
            <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
              3rd Period
            </Th>
          </Tr>

          {/* goals */}
          <GoalRow></GoalRow>
          <GoalRow></GoalRow>
          <GoalRow></GoalRow>
        </Tbody>
      </Table>

      <Table>
        <Tbody>
          {/* shootout */}
          <Tr>
            <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
              Shootout
            </Th>
          </Tr>

          {/* goals */}
          <SOAttemptRow></SOAttemptRow>
          <SOAttemptRow></SOAttemptRow>
          <SOAttemptRow></SOAttemptRow>
          <SOAttemptRow></SOAttemptRow>
          <SOAttemptRow></SOAttemptRow>
        </Tbody>
      </Table>
    </Box>
  )
}
