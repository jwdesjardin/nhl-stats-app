import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, HStack, Text } from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../SortableButton'
import { SortableTh } from '../../SortableTh'

interface GoalieSavesTableProps {
  sortedGoalies: GoalieScoring[]
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
}

export const GoalieSavesTable: React.FC<GoalieSavesTableProps> = ({
  sortedGoalies,
  sortAttribute,
  handleSortColumn,
}) => {
  return (
    <>
      <HStack mb={2}>
        <Text>Sort Column:</Text>
        <Box d='flex' alignItems='center' justifyContent='center'>
          <SortableButton
            attribute='games_started'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            GS
          </SortableButton>
          <SortableButton
            attribute='saves'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SV
          </SortableButton>
          <SortableButton
            attribute='shots_against'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SHOTS
          </SortableButton>
          <SortableButton
            attribute='save_percentage'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SV %
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
              <SortableTh ThAttribute='games_started' sortAttribute={sortAttribute}>
                GS
              </SortableTh>
              <SortableTh ThAttribute='saves' sortAttribute={sortAttribute}>
                SV
              </SortableTh>
              <SortableTh ThAttribute='shots_against' sortAttribute={sortAttribute}>
                SHOTS
              </SortableTh>
              <SortableTh ThAttribute='save_percentage' sortAttribute={sortAttribute}>
                SV%
              </SortableTh>
            </Tr>
          </Thead>
          <Tbody>
            {sortedGoalies.map((goalie, idx) => {
              return (
                <Tr key={goalie.player_id}>
                  <Td px={1}>{idx + 1}</Td>
                  <Td px={1}>{goalie.position}</Td>
                  <Td px={1}>
                    <Link as={RouterLink} to={`/player/${goalie.player_id}`}>
                      {goalie.player}
                    </Link>
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'games_started' ? 'bold' : 'normal'}
                  >
                    {goalie.games_started}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'saves' ? 'bold' : 'normal'}>
                    {goalie.saves}
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'shots_against' ? 'bold' : 'normal'}
                  >
                    {goalie.shots_against}
                  </Td>

                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'save_percentage' ? 'bold' : 'normal'}
                  >
                    {goalie.save_percentage}
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
