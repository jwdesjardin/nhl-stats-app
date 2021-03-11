import * as React from 'react'
import { HStack } from '@chakra-ui/layout'
import { Box, Table, Tbody, Th, Tr } from '@chakra-ui/react'
import { Link as BrowserLink } from 'react-router-dom'
import { PenaltyRow } from './PenaltyRow'

export const PenaltiesSummary = () => {
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
          {/* penalty */}
          <PenaltyRow></PenaltyRow>
          <PenaltyRow></PenaltyRow>
          <PenaltyRow></PenaltyRow>

          {/* period */}
          <Tr>
            <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
              1st Period
            </Th>
          </Tr>

          {/* penalty */}
          <PenaltyRow></PenaltyRow>
          <PenaltyRow></PenaltyRow>
          <PenaltyRow></PenaltyRow>

          {/* period */}
          <Tr>
            <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
              1st Period
            </Th>
          </Tr>

          {/* penalty */}
          <PenaltyRow></PenaltyRow>
          <PenaltyRow></PenaltyRow>
          <PenaltyRow></PenaltyRow>
        </Tbody>
      </Table>
    </Box>
  )
}
