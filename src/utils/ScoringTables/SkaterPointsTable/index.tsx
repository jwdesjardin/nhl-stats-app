import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, Text, HStack } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'

import { SortableTh } from '../../SortableTh'
import { SortableButton } from '../../SortableButton'

interface SkaterPointsTableProps {
  sortedSkaters: SkaterScoring[]
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
}

export const SkaterPointsTable: React.FC<SkaterPointsTableProps> = ({
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
            attribute='points'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            P
          </SortableButton>
          <SortableButton
            attribute='goals'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            G
          </SortableButton>
          <SortableButton
            attribute='assists'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            A
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
              <SortableTh sortAttribute={sortAttribute} ThAttribute='games_played'>
                GP
              </SortableTh>
              <Th px={1}>ATOI</Th>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='points'>
                P
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='goals'>
                G
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='assists'>
                A
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
                  <Td px={1}>{skater.average_time_on_ice}</Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'points' ? 'bold' : 'normal'}>
                    {skater.points}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'goals' ? 'bold' : 'normal'}>
                    {skater.goals}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'assists' ? 'bold' : 'normal'}>
                    {skater.assists}
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
