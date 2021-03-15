import * as React from 'react'

import { Box, Text, Table, Tbody, Td, Th, Thead, Tr, Link, HStack } from '@chakra-ui/react'

import { RosterStat } from '../../../../types/team'

import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../../../utils/SortableButton'
import { SortableTh } from '../../../../utils/SortableTh'

interface RosterSalaryTableProps {
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  sortedRoster: RosterStat[]
}

export const RosterSalaryTable: React.FC<RosterSalaryTableProps> = ({
  sortAttribute,
  handleSortColumn,
  sortedRoster,
}) => {
  return (
    <>
      <HStack mb={2}>
        <Text>Sort Column:</Text>
        <Box d='flex' alignItems='center' justifyContent='center'>
          <SortableButton
            attribute='age'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            AGE
          </SortableButton>
          <SortableButton
            attribute='experience'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            EXP
          </SortableButton>
          <SortableButton
            attribute='salary'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SALARY
          </SortableButton>
        </Box>
      </HStack>
      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th px={1}>#</Th>
              <Th px={1}>POS</Th>
              <Th px={1}>Player</Th>
              <SortableTh ThAttribute='age' sortAttribute={sortAttribute}>
                AGE
              </SortableTh>
              <SortableTh ThAttribute='experience' sortAttribute={sortAttribute}>
                EXP
              </SortableTh>
              <SortableTh ThAttribute='salary' sortAttribute={sortAttribute}>
                SALARY
              </SortableTh>
            </Tr>
          </Thead>
          <Tbody>
            {sortedRoster.map((player) => {
              return (
                <Tr key={player.player_id}>
                  <Td px={1}>{player.number}</Td>
                  <Td px={1}>{player.position}</Td>
                  <Td px={1}>
                    {' '}
                    <Link as={RouterLink} to={`/player/${player.player_id}`}>
                      {player.player}
                    </Link>
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'age' ? 'bold' : 'normal'}>
                    {player.age}
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'experience' ? 'bold' : 'normal'}
                  >
                    {player.experience}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'salary' ? 'bold' : 'normal'}>
                    {player.salary === null ? 'N/A' : '$' + Number(player.salary).toLocaleString()}
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
