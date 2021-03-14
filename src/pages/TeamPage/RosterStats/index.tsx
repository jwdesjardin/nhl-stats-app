import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Select, Link, Center } from '@chakra-ui/react'

import { RosterStat } from '../../../types/team'
import { getStatHeader } from '../../../utils/helper'
import Flag from 'react-flagkit'
import { Link as RouterLink } from 'react-router-dom'
interface RosterStatsProps {
  rosterStats: RosterStat[]
}

export const RosterStats: React.FC<RosterStatsProps> = ({ rosterStats }) => {
  const [rosterStat, setRosterStat] = React.useState('bio')
  const [sortedRoster, setSortedRoster] = React.useState<RosterStat[]>([])
  const [statHeader, setStatHeader] = React.useState('')

  React.useEffect(() => {
    if (rosterStat === 'bio') {
      setSortedRoster(getSortedRosterNumeric(rosterStats, 'age'))
    }
    if (rosterStat === 'draft') {
      setSortedRoster(getSortedRosterDraft(rosterStats))
    }
    if (rosterStat === 'salary') {
      getSortedRosterWithNulls(rosterStats, 'salary')
    }

    // if (['age', 'weight'].includes(rosterStat)) {
    //   setSortedRoster(getSortedRosterNumeric(rosterStats, rosterStat))
    // } else if (['experience', 'salary'].includes(rosterStat)) {
    //   setSortedRoster(getSortedRosterWithNulls(rosterStats, rosterStat))
    // } else if (['height'].includes(rosterStat)) {
    //   setSortedRoster(getSortedRosterHeight(rosterStats))
    // } else if (['draft'].includes(rosterStat)) {
    //   setSortedRoster(getSortedRosterDraft(rosterStats))
    // } else if (['country'].includes(rosterStat)) {
    //   setSortedRoster(getSortedRosterCountry(rosterStats))
    // }
    // getStatHeader(rosterStat, setStatHeader)
  }, [rosterStat, rosterStats])

  const getSortedRosterNumeric = (roster: RosterStat[], attr: string) => {
    return roster.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', 0])[1]
      // number or ''
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', 0])[1]

      if (stat_A !== '' && stat_B !== '') {
        return parseFloat(stat_B) - parseFloat(stat_A)
      }
      // fails no attr found NEVER(when getting null : dont flip)
      return -1
    })
  }

  const getSortedRosterHeight = (roster: RosterStat[]) => {
    return roster.sort((a, b) => {
      const heightA = a.height.split('-')
      const heightB = b.height.split('-')

      const feetA = heightA[0]
      const inchesA = heightA[1]

      const feetB = heightB[0]
      const inchesB = heightB[1]

      if (feetB > feetA) return 1
      if (feetA > feetB) return -1
      if (inchesB > inchesA) return 1
      if (inchesA > inchesB) return -1

      return 0
    })
  }

  const getSortedRosterCountry = (roster: RosterStat[]) => {
    return roster.sort((a, b) => {
      const countryA = a.country
      const countryB = b.country
      if (countryA > countryB) {
        return 1
      } else if (countryA < countryB) {
        return -1
      }
      return 0
    })
  }

  const getSortedRosterDraft = (roster: RosterStat[]) => {
    return roster.sort((a, b) => {
      const draftA = a.draft.overall
      const draftB = b.draft.overall

      // sort accending
      if (draftA && draftB) {
        return draftA - draftB
      }
      // move nulls to the bottom
      if (draftA === null) {
        return 1
      }
      if (draftB === null) {
        return -1
      }
      return 0
    })
  }

  const getSortedRosterWithNulls = (roster: RosterStat[], attr: string) => {
    return roster.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', 0])[1]
      // number/null or '' if attr not found
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', 0])[1]

      if (stat_A && stat_B) {
        return stat_B - stat_A
      }
      if (stat_A === null) {
        return 1
      }
      if (stat_B === null) {
        return -1
      }
      return 0
    })
  }

  return (
    <Box>
      {/* stat select */}
      <Select
        onChange={(e) => {
          setRosterStat(e.target.value)
        }}
        bg='cyan.200'
        defaultValue='bio'
        my={3}
        w='80%'
        mx='auto'
      >
        <option value='salary'>Salary</option>
        <option value='bio'>Bio</option>
        <option value='draft'>Draft</option>
      </Select>

      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        {rosterStat === 'draft' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>#</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  Age
                </Th>

                <Th px={1} isNumeric textDecoration='underline'>
                  Round
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  Year
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  OVRL
                </Th>
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
                    <Td px={1} isNumeric>
                      {player.age}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.draft.round}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.draft.year}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.draft.overall}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {rosterStat === 'bio' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>#</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  Age
                </Th>

                <Th px={1} isNumeric textDecoration='underline'>
                  HT
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  WT
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  COUNTRY
                </Th>
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
                    <Td px={1} isNumeric>
                      {player.age}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.height}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.weight}
                    </Td>
                    <Td px={1}>
                      <Center>
                        <Flag country={player.country.toUpperCase()} />
                      </Center>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {rosterStat === 'salary' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>#</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  Age
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  EXP
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  Salary
                </Th>
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
                    <Td px={1} isNumeric>
                      {player.age}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.experience}
                    </Td>
                    <Td px={1} isNumeric>
                      {player.salary === null
                        ? 'N/A'
                        : '$' + Number(player.salary).toLocaleString()}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  )
}
