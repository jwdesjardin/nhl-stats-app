import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, Text, HStack } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'

import { SortableTh } from '../../SortableTh'
import { SortableButton } from '../../SortableButton'

interface SkaterFaceoffsTableProps {
  sortedSkaters: SkaterScoring[]
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
}

export const SkaterFaceoffsTable: React.FC<SkaterFaceoffsTableProps> = ({
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
            attribute={'faceoff_wins'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            WINS
          </SortableButton>
          <SortableButton
            attribute={'faceoff_taken'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            TAKEN
          </SortableButton>
          <SortableButton
            attribute={'faceoff_percentage'}
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            %
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
              <SortableTh sortAttribute={sortAttribute} ThAttribute='faceoff_wins'>
                WINS
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='faceoff_taken'>
                TAKEN
              </SortableTh>
              <SortableTh sortAttribute={sortAttribute} ThAttribute='faceoff_percentage'>
                %
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
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'faceoff_wins' ? 'bold' : 'normal'}
                  >
                    {skater.faceoff_wins}
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'faceoff_taken' ? 'bold' : 'normal'}
                  >
                    {skater.faceoff_wins + skater.faceoff_losses}
                  </Td>
                  <Td
                    px={1}
                    isNumeric
                    fontWeight={sortAttribute === 'faceoff_percentage' ? 'bold' : 'normal'}
                  >
                    {skater.faceoff_percentage?.toFixed(1)}
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
