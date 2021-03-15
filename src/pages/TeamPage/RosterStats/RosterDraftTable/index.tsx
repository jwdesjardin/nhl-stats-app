import * as React from 'react'

import { Box, Text, Table, Tbody, Td, Th, Thead, Tr, Link, HStack } from '@chakra-ui/react'

import { RosterStat } from '../../../../types/team'

import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../../../utils/SortableButton'
import { SortableTh } from '../../../../utils/SortableTh'

interface RosterDraftTableProps {
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  sortedRoster: RosterStat[]
}

export const RosterDraftTable: React.FC<RosterDraftTableProps> = ({
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
            attribute='round'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            RND
          </SortableButton>
          <SortableButton
            attribute='year'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            YR
          </SortableButton>
          <SortableButton
            attribute='overall'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            OVR
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
                AGE
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='round'>
                RND
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='year'>
                YR
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='overall'>
                OVR
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
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'round' ? 'bold' : 'normal'}>
                    {player.draft.round}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'year' ? 'bold' : 'normal'}>
                    {player.draft.year}
                  </Td>
                  <Td px={1} isNumeric fontWeight={sortAttribute === 'overall' ? 'bold' : 'normal'}>
                    {player.draft.overall}
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
