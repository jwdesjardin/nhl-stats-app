import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, Text, HStack } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'

import { SortableTh } from '../..//SortableTh'
import { SortableButton } from '../..//SortableButton'

interface SkaterPenaltiesTableProps {
  sortedSkaters: SkaterScoring[]
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
}

export const SkaterPenaltiesTable: React.FC<SkaterPenaltiesTableProps> = ({
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
            attribute={'games_played'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            GP
          </SortableButton>
          <SortableButton
            attribute={'points'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            PTS
          </SortableButton>
          <SortableButton
            attribute={'hits'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            HITS
          </SortableButton>
          <SortableButton
            attribute={'penalty_minutes'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            PIMS
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
              <SortableTh ThAttribute='points' sortAttribute={sortAttribute}>
                Pts
              </SortableTh>
              <SortableTh ThAttribute='hits' sortAttribute={sortAttribute}>
                hits
              </SortableTh>
              <SortableTh ThAttribute='penalty_minutes' sortAttribute={sortAttribute}>
                Pims
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
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'hits' ? 'bold' : 'normal'}>
                    {skater.hits}
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'penalty_minutes' ? 'bold' : 'normal'}
                  >
                    {skater.penalty_minutes}
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
