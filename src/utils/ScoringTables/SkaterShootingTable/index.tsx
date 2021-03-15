import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, Text, HStack } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'

import { SortableTh } from '../../SortableTh'
import { SortableButton } from '../../SortableButton'

interface SkaterShootingTableProps {
  sortedSkaters: SkaterScoring[]
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
}

export const SkaterShootingTable: React.FC<SkaterShootingTableProps> = ({
  sortedSkaters,
  sortAttribute,
  handleSortColumn,
}) => {
  return (
    <>
      <HStack mb={2}>
        <Text>Sort Column:</Text>
        <Box d='flex' alignItems='center' justifyContent='center'>
          <SortableButton
            attribute='games_played'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            GP
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
            SHOT %
          </SortableButton>
        </Box>
      </HStack>

      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th px={1}>RK</Th>
              <Th px={1}>POS</Th>
              <Th px={1}>Player</Th>
              <SortableTh ThAttribute='games_played' sortAttribute={sortAttribute}>
                GP
              </SortableTh>
              <Th px={1}>ATOI</Th>
              <SortableTh ThAttribute='goals' sortAttribute={sortAttribute}>
                G
              </SortableTh>
              <SortableTh ThAttribute='shots_on_goal' sortAttribute={sortAttribute}>
                S
              </SortableTh>
              <SortableTh ThAttribute='shooting_percentage' sortAttribute={sortAttribute}>
                S %
              </SortableTh>
            </Tr>
          </Thead>
          <Tbody>
            {sortedSkaters.map((skater, idx) => {
              return (
                <Tr key={skater.player_id}>
                  <Td px={1}>{idx + 1}</Td>
                  <Td px={1}>{skater.position}</Td>
                  <Td px={1}>
                    <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                      {skater.player}
                    </Link>
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'games_played' ? 'bold' : 'normal'}
                  >
                    {skater.games_played}
                  </Td>
                  <Td px={1} isNumeric>
                    {skater.average_time_on_ice}
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
                    {skater.shooting_percentage?.toFixed(1)}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
