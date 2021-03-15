import * as React from 'react'

import {
  Box,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Link,
  Center,
  HStack,
} from '@chakra-ui/react'

import { RosterStat } from '../../../types/team'
import { getStatHeader } from '../../../utils/helper'
import Flag from 'react-flagkit'
import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../../utils/SortableButton'
import { SortableTh } from '../../../utils/SortableTh'
interface RosterStatsProps {
  rosterStats: RosterStat[]
}

export const RosterStats: React.FC<RosterStatsProps> = ({ rosterStats }) => {
  const [category, setCategory] = React.useState('bio')
  const [sortedRoster, setSortedRoster] = React.useState<RosterStat[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    if (category === 'bio') {
      setSortedRoster(getSortedRosterWithNulls(rosterStats, 'age'))
      setSortAttribute('age')
    } else if (category === 'draft') {
      setSortedRoster(getSortedRosterDraft(rosterStats, 'overall'))
      setSortAttribute('overall')
    } else if (category === 'salary') {
      setSortedRoster(getSortedRosterWithNulls(rosterStats, 'salary'))
      setSortAttribute('salary')
    }
  }, [category, rosterStats])

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

  const getSortedRosterDraft = (roster: RosterStat[], attr: string) => {
    return roster.sort((a, b) => {
      let draftA: number | null = null
      let draftB: number | null = null

      if (attr === 'round') {
        draftA = parseInt(a.draft.round || '')
        draftB = parseInt(b.draft.round || '')
      } else if (attr === 'overall') {
        draftA = a.draft.overall
        draftB = b.draft.overall
      } else if (attr === 'year') {
        draftA = a.draft.year
        draftB = b.draft.year
      }

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

  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedRoster(getSortedRosterWithNulls(rosterStats, attr))
      setSortAttribute(attr)
    }
  }

  const handleSortDraftColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedRoster(getSortedRosterDraft(rosterStats, attr))
      setSortAttribute(attr)
    }
  }
  const handleSortCountryColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedRoster(getSortedRosterCountry(rosterStats))
      setSortAttribute(attr)
    }
  }
  const handleSortHeightColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedRoster(getSortedRosterHeight(rosterStats))
      setSortAttribute(attr)
    }
  }

  return (
    <Box>
      {/* stat select */}
      <HStack mb={2}>
        <Text>Categories:</Text>
        <Select
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          bg='cyan.200'
          defaultValue='bio'
        >
          <option value='salary'>Salary</option>
          <option value='bio'>Bio</option>
          <option value='draft'>Draft</option>
        </Select>
      </HStack>

      {category === 'draft' && (
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
                handleSortColumn={handleSortDraftColumn}
              >
                RND
              </SortableButton>
              <SortableButton
                attribute='year'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortDraftColumn}
              >
                YR
              </SortableButton>
              <SortableButton
                attribute='overall'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortDraftColumn}
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
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'round' ? 'bold' : 'normal'}
                      >
                        {player.draft.round}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'year' ? 'bold' : 'normal'}
                      >
                        {player.draft.year}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'overall' ? 'bold' : 'normal'}
                      >
                        {player.draft.overall}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {category === 'bio' && (
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
                handleSortColumn={handleSortHeightColumn}
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
                handleSortColumn={handleSortCountryColumn}
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
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'height' ? 'bold' : 'normal'}
                      >
                        {player.height}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'weight' ? 'bold' : 'normal'}
                      >
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
      )}

      {category === 'salary' && (
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
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'salary' ? 'bold' : 'normal'}
                      >
                        {player.salary === null
                          ? 'N/A'
                          : '$' + Number(player.salary).toLocaleString()}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </Box>
  )
}
