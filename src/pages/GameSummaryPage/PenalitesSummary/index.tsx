import * as React from 'react'
import { HStack } from '@chakra-ui/layout'
import { Box, Table, Tbody, Th, Tr } from '@chakra-ui/react'
import { Link as BrowserLink } from 'react-router-dom'
import { PenaltyRow } from './PenaltyRow'
import { Penalty } from '../../../types/gameSummary'

interface PenaltiesSummaryProps {
  penaltySummary: {
    title: string
    penalties?: Penalty[]
  }[]
}

export const PenaltiesSummary: React.FC<PenaltiesSummaryProps> = ({ penaltySummary }) => {
  return (
    <Box bg='white' border='2px solid black' borderRadius='lg'>
      <Table size='sm'>
        <Tbody>
          {penaltySummary.map((period) => {
            const penalties = period.penalties?.map((penalty, idx) => (
              <PenaltyRow
                key={`${penalty.player_id}${penalty.time}`}
                penalty={penalty}
              ></PenaltyRow>
            ))

            return (
              <>
                <Tr key={period.title}>
                  <Th colSpan={5} textAlign='center' bg='blackAlpha.600' color='white'>
                    {period.title}
                  </Th>
                </Tr>
                {penalties}
              </>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}
