import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, HStack, Text } from '@chakra-ui/react'

import { GoalieScoring, SkaterScoring } from '../../types/app'

import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../SortableButton'
import { SortableTh } from '../SortableTh'
import { GoalieGame, SkaterGame } from '../../types/gameSummary'

interface SmallStatTableProps {
  skaterGames?: SkaterGame[]
  skaterScoring?: SkaterScoring[]
  goalieScoring?: GoalieScoring[]
  goalieGames?: GoalieGame[]
  sortAttribute: string
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  columns: {
    header_name: string
    isSortable: boolean
    isNumeric?: boolean
    attr: string
    isSkaterPercentage?: boolean
    hasTeamLink?: boolean
    hasPlayerLink?: boolean
  }[]
}

export const SmallStatTable: React.FC<SmallStatTableProps> = ({
  skaterGames,
  skaterScoring,
  goalieScoring,
  goalieGames,
  sortAttribute,
  handleSortColumn,
  columns,
}) => {
  let players1: SkaterGame[] | undefined
  let players2: GoalieGame[] | undefined
  let players3: SkaterScoring[] | undefined
  let players4: GoalieScoring[] | undefined

  if (skaterGames) {
    players1 = skaterGames
  }
  if (skaterScoring) {
    players3 = skaterScoring
  }
  if (goalieGames) {
    players2 = goalieGames
  }
  if (goalieScoring) {
    players4 = goalieScoring
  }

  return (
    <>
      <HStack mb={2}>
        <Text>Sort Column:</Text>
        <Box d='flex' alignItems='center' justifyContent='center'>
          {columns.map((column, idx) => {
            if (column.isSortable) {
              return (
                <SortableButton
                  attribute={column.attr}
                  sortAttribute={sortAttribute}
                  handleSortColumn={handleSortColumn}
                  key={idx}
                >
                  {column.header_name}
                </SortableButton>
              )
            }
            return ''
          })}
        </Box>
      </HStack>
      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        <Table size='sm'>
          <Thead>
            <Tr>
              {columns.map((column, idx) =>
                column.isSortable ? (
                  <SortableTh
                    key={idx}
                    isNumeric={column.isNumeric ? true : false}
                    ThAttribute={column.attr}
                    sortAttribute={sortAttribute}
                  >
                    {column.header_name}
                  </SortableTh>
                ) : (
                  <Th key={idx} isNumeric={column.isNumeric ? true : false} px={1}>
                    {column.header_name}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {/* skatersGame */}
            {players1?.map((player, idx) => (
              <Tr key={player.player_id}>
                {columns.map((column, idx) => {
                  const data = Object.entries(player).filter(
                    (entry) => entry[0] === column.attr
                  )[0][1]
                  if (column.isSortable) {
                    // CASE: sorted percentage
                    if (column.isSkaterPercentage) {
                      return (
                        <Td
                          key={idx}
                          px={1}
                          isNumeric={column.isNumeric ? true : false}
                          fontWeight={sortAttribute === column.attr ? 'bold' : 'normal'}
                        >
                          {/* show percentage unless null show nothing */}
                          {data === null ? '' : data.toFixed(1)}
                        </Td>
                      )
                    }
                    // CASE: sorted plain data
                    return (
                      <Td
                        key={idx}
                        px={1}
                        isNumeric={column.isNumeric ? true : false}
                        fontWeight={sortAttribute === column.attr ? 'bold' : 'normal'}
                      >
                        {data}
                      </Td>
                    )
                  } else {
                    // CASE: payer name
                    if (column.hasPlayerLink) {
                      const link = `/player/${player.player_id}`
                      return (
                        <Td isNumeric={column.isNumeric ? true : false} px={1}>
                          <Link as={RouterLink} to={link}>
                            {data}
                          </Link>
                        </Td>
                      )
                    }
                    // CASE: plain unsorted data
                    return (
                      <Td key={idx} isNumeric={column.isNumeric ? true : false} px={1}>
                        {data}
                      </Td>
                    )
                  }
                })}
              </Tr>
            ))}

            {/* goalieGame */}
            {players2?.map((player, idx) => (
              <Tr key={player.player_id}>
                {columns.map((column, idx) => {
                  const data = Object.entries(player).filter(
                    (entry) => entry[0] === column.attr
                  )[0][1]

                  if (column.isSortable) {
                    // CASE sorted plain data
                    return (
                      <Td
                        key={idx}
                        px={1}
                        isNumeric={column.isNumeric ? true : false}
                        fontWeight={sortAttribute === column.attr ? 'bold' : 'normal'}
                      >
                        {data}
                      </Td>
                    )
                  } else {
                    // CASE: payer name
                    if (column.hasPlayerLink) {
                      const link = `/player/${player.player_id}`
                      return (
                        <Td isNumeric={column.isNumeric ? true : false} px={1}>
                          <Link as={RouterLink} to={link}>
                            {data}
                          </Link>
                        </Td>
                      )
                    }
                    // CASE unsorted plain data
                    return (
                      <Td key={idx} isNumeric={column.isNumeric ? true : false} px={1}>
                        {data}
                      </Td>
                    )
                  }
                })}
              </Tr>
            ))}

            {/* skatersScoring */}
            {players3?.map((player, idx) => (
              <Tr key={player.player_id}>
                {columns.map((column, idx) => {
                  const data = Object.entries(player).filter(
                    (entry) => entry[0] === column.attr
                  )[0][1]
                  if (column.isSortable) {
                    // CASE: sorted percentage
                    if (column.isSkaterPercentage) {
                      return (
                        <Td
                          key={idx}
                          px={1}
                          isNumeric={column.isNumeric ? true : false}
                          fontWeight={sortAttribute === column.attr ? 'bold' : 'normal'}
                        >
                          {data.toFixed(1)}
                        </Td>
                      )
                    }
                    // CASE: sorted plain data
                    return (
                      <Td
                        key={idx}
                        px={1}
                        isNumeric={column.isNumeric ? true : false}
                        fontWeight={sortAttribute === column.attr ? 'bold' : 'normal'}
                      >
                        {data}
                      </Td>
                    )
                  } else {
                    // CASE: team name
                    if (column.hasTeamLink) {
                      const link = `/team/${player.team_id}`
                      return (
                        <Td isNumeric={column.isNumeric ? true : false} px={1}>
                          <Link as={RouterLink} to={link}>
                            {data}
                          </Link>
                        </Td>
                      )
                    }
                    // CASE: payer name
                    if (column.hasPlayerLink) {
                      const link = `/player/${player.player_id}`
                      return (
                        <Td isNumeric={column.isNumeric ? true : false} px={1}>
                          <Link as={RouterLink} to={link}>
                            {data}
                          </Link>
                        </Td>
                      )
                    }
                    // CASE unsorted plain data
                    return (
                      <Td key={idx} isNumeric={column.isNumeric ? true : false} px={1}>
                        {data}
                      </Td>
                    )
                  }
                })}
              </Tr>
            ))}

            {/* goaliesScoring */}
            {players4?.map((player, idx) => (
              <Tr key={player.player_id}>
                {columns.map((column, idx) => {
                  const data = Object.entries(player).filter(
                    (entry) => entry[0] === column.attr
                  )[0][1]
                  if (column.isSortable) {
                    // CASE: sorted plain data
                    return (
                      <Td
                        key={idx}
                        px={1}
                        isNumeric={column.isNumeric ? true : false}
                        fontWeight={sortAttribute === column.attr ? 'bold' : 'normal'}
                      >
                        {data}
                      </Td>
                    )
                  } else {
                    // CASE: team name
                    if (column.hasTeamLink) {
                      const link = `/team/${player.team_id}`
                      return (
                        <Td isNumeric={column.isNumeric ? true : false} px={1}>
                          <Link as={RouterLink} to={link}>
                            {data}
                          </Link>
                        </Td>
                      )
                    }
                    // CASE: player name
                    if (column.hasPlayerLink) {
                      const link = `/player/${player.player_id}`
                      return (
                        <Td isNumeric={column.isNumeric ? true : false} px={1}>
                          <Link as={RouterLink} to={link}>
                            {data}
                          </Link>
                        </Td>
                      )
                    }
                    // CASE: unsorted plain data
                    return (
                      <Td key={idx} isNumeric={column.isNumeric ? true : false} px={1}>
                        {data}
                      </Td>
                    )
                  }
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
