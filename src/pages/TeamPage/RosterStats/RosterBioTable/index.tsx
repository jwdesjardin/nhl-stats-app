import * as React from 'react'

import { Box, Text, Table, Tbody, Td, Th, Thead, Tr, Link, HStack, Center } from '@chakra-ui/react'

import { RosterStat } from '../../../../types/team'

import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../../../utils/SortableButton'
import { SortableTh } from '../../../../utils/SortableTh'
import Flag from 'react-flagkit'

interface RosterBioTableProps {
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  sortedRoster: RosterStat[]
}

export const RosterBioTable: React.FC<RosterBioTableProps> = ({
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
            attribute='height'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            Ht
          </SortableButton>
          <SortableButton
            attribute='weight'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            Wt
          </SortableButton>
          <SortableButton
            attribute='country'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            CTRY
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
              <SortableTh sortAttribute={sortAttribute} ThAttribute='age'>
                Age
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='height'>
                Ht
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='weight'>
                Wt
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='country'>
                Country
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
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'height' ? 'bold' : 'normal'}>
                    {player.height}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'weight' ? 'bold' : 'normal'}>
                    {player.weight}
                  </Td>
                  <Td px={1} fontWeight={sortAttribute === 'country' ? 'bold' : 'normal'}>
                    <Center>
                      <Flag country={player.country.toUpperCase()} />
                    </Center>
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
