import * as React from 'react'
import { Table, Tbody, Th, Tr } from '@chakra-ui/react'

import { GoalRow } from './GoalRow'
import { SOAttemptRow } from './SOAttemptRow'

export const ScoringByPeriod = () => {
  return (
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
  )
}
