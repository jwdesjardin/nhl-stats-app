import * as React from 'react'
import { Box, HStack, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react'

import { SkaterGame } from '../../../../types/gameSummary'
import { SortableButton } from '../../../../utils/SortableButton'
import { SortableTh } from '../../../../utils/SortableTh'

interface GoalsStatsTableProps {
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  sortedSkaters: SkaterGame[]
}

export const GoalsStatsTable: React.FC<GoalsStatsTableProps> = ({
  sortAttribute,
  handleSortColumn,
  sortedSkaters,
}) => {
  return (
    <>
      <HStack mb={2}>
        <Text>Sort Column:</Text>
        <Box d='flex' alignItems='center' justifyContent='center'>
          <SortableButton
            attribute='time_on_ice'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            TOI
          </SortableButton>
          <SortableButton
            attribute='goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            G
          </SortableButton>
          <SortableButton
            attribute='pp_goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            PP
          </SortableButton>
          <SortableButton
            attribute='gw_goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            GW
          </SortableButton>
          <SortableButton
            attribute='sh_goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SH
          </SortableButton>
        </Box>
      </HStack>

      <Box bg='white' border='2px solid black' p={2} borderRadius='lg'>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th px={1}>Player</Th>

              <SortableTh ThAttribute='time_on_ice' sortAttribute={sortAttribute}>
                TOI
              </SortableTh>
              <SortableTh ThAttribute='goals' sortAttribute={sortAttribute}>
                G
              </SortableTh>
              <SortableTh ThAttribute='pp_goals' sortAttribute={sortAttribute}>
                PP
              </SortableTh>
              <SortableTh ThAttribute='gw_goals' sortAttribute={sortAttribute}>
                GW
              </SortableTh>

              <SortableTh ThAttribute='sh_goals' sortAttribute={sortAttribute}>
                SH
              </SortableTh>
            </Tr>
          </Thead>
          <Tbody>
            {sortedSkaters.map((skater) => (
              <Tr key={skater.player_id}>
                <Td px={1}>{skater.player}</Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'time_on_ice' ? 'bold' : 'normal'}
                >
                  {skater.time_on_ice}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}>
                  {skater.goals}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'pp_goals' ? 'bold' : 'normal'}>
                  {skater.pp_goals}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'gw_goals' ? 'bold' : 'normal'}>
                  {skater.gw_goals}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'sh_goals' ? 'bold' : 'normal'}>
                  {skater.sh_goals}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
