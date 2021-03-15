import { Box, HStack, Table, Tbody, Td, Th, Thead, Tr, Text, Select } from '@chakra-ui/react'
import * as React from 'react'
import { SkaterGame } from '../../../../types/gameSummary'
import { SortableButton } from '../../../../utils/SortableButton'
import { SortableTh } from '../../../../utils/SortableTh'

interface ShootingStatsTableProps {
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  sortedSkaters: SkaterGame[]
}

export const ShootingStatsTable: React.FC<ShootingStatsTableProps> = ({
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
            attribute='shifts'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SHIFTS
          </SortableButton>
          <SortableButton
            attribute='goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            G
          </SortableButton>
          <SortableButton
            attribute='shots_on_goal'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SHOTS
          </SortableButton>
          <SortableButton
            attribute='shooting_percentage'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SH%
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
              <SortableTh ThAttribute='shifts' sortAttribute={sortAttribute}>
                SHIFT
              </SortableTh>
              <SortableTh ThAttribute='goals' sortAttribute={sortAttribute}>
                G
              </SortableTh>
              <SortableTh ThAttribute='shots_on_goal' sortAttribute={sortAttribute}>
                SHOTS
              </SortableTh>
              <SortableTh ThAttribute='shooting_percentage' sortAttribute={sortAttribute}>
                SH%
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
                <Td px={1} isNumeric fontWeight={sortAttribute === 'shifts' ? 'bold' : 'normal'}>
                  {skater.shifts}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}>
                  {skater.goals}
                </Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'shots_on_goal' ? 'bold' : 'normal'}
                >
                  {skater.shots_on_goal}
                </Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'shooting_percentage' ? 'bold' : 'normal'}
                >
                  {skater.shooting_percentage}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
