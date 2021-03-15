import { Box, HStack, Table, Tbody, Td, Th, Thead, Tr, Text, Select } from '@chakra-ui/react'
import * as React from 'react'
import { SkaterGame } from '../../../../types/gameSummary'
import { SortableButton } from '../../../../utils/SortableButton'
import { SortableTh } from '../../../../utils/SortableTh'

interface PointsStatsTableProps {
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  sortedSkaters: SkaterGame[]
}

export const PointsStatsTable: React.FC<PointsStatsTableProps> = ({
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
            attribute='points'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            PTS
          </SortableButton>
          <SortableButton
            attribute='goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            G
          </SortableButton>
          <SortableButton
            attribute='plus_minus'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            +/-
          </SortableButton>
          <SortableButton
            attribute='penalty_minutes'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            PIMS
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
              <SortableTh ThAttribute='points' sortAttribute={sortAttribute}>
                PTS
              </SortableTh>
              <SortableTh ThAttribute='goals' sortAttribute={sortAttribute}>
                G
              </SortableTh>
              <SortableTh ThAttribute='assists' sortAttribute={sortAttribute}>
                A
              </SortableTh>
              <SortableTh ThAttribute='plus_minus' sortAttribute={sortAttribute}>
                +/-
              </SortableTh>
              <SortableTh ThAttribute='penalty_minutes' sortAttribute={sortAttribute}>
                PIMS
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
                <Td px={1} isNumeric fontWeight={sortAttribute === 'points' ? 'bold' : 'normal'}>
                  {skater.points}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}>
                  {skater.goals}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'assists' ? 'bold' : 'normal'}>
                  {skater.assists}
                </Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'plus_minus' ? 'bold' : 'normal'}
                >
                  {skater.plus_minus}
                </Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'penalty_minutes' ? 'bold' : 'normal'}
                >
                  {skater.penalty_minutes}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
