import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Select, Link, HStack, Text } from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../../utils/SortableButton'
import { SortableTh } from '../../../utils/SortableTh'
interface GoalieScoringLeadersProps {
  goalieScoring: GoalieScoring[]
}

export const GoalieScoringLeaders: React.FC<GoalieScoringLeadersProps> = ({ goalieScoring }) => {
  const [category, setCategory] = React.useState('saves')
  const [sortedGoalies, setSortedGoalies] = React.useState<GoalieScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    if (category === 'saves') {
      setSortedGoalies(getSortedGoalies(goalieScoring, 'saves'))
      setSortAttribute('saves')
    } else if (category === 'goals') {
      setSortedGoalies(getSortedGoalies(goalieScoring, 'goals_against_average'))
      setSortAttribute('goals_against_average')
    }
  }, [category, goalieScoring])

  const getSortedGoalies = (goalies: GoalieScoring[], attr: string) => {
    return goalies.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

      if (stat_A !== null && stat_B !== null) {
        return parseFloat(stat_B) - parseFloat(stat_A)
      }
      //move nulls to the bottom
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
      setSortedGoalies(getSortedGoalies(goalieScoring, attr))
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
          defaultValue='saves'
        >
          <option value='saves'>Saves</option>
          <option value='goals'>Goals</option>
        </Select>
      </HStack>

      {category === 'saves' && (
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
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'saves' ? 'bold' : 'normal'}
                      >
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
      )}

      {category === 'goals' && (
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
                attribute='goals_against'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                GA
              </SortableButton>
              <SortableButton
                attribute='shots_against'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                SHOTS
              </SortableButton>
              <SortableButton
                attribute='goals_against_average'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                GAA
              </SortableButton>
              <SortableButton
                attribute='shutouts'
                sortAttribute={sortAttribute}
                handleSortColumn={handleSortColumn}
              >
                SO
              </SortableButton>
            </Box>
          </HStack>

          <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th px={1}>RKr</Th>
                  <Th px={1}>POS</Th>
                  <Th px={1}>Player</Th>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='games_started'>
                    GS
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='goals_against'>
                    GA
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='shtos_on_goal'>
                    SHOTS
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='goals_against_average'>
                    GAA
                  </SortableTh>
                  <SortableTh sortAttribute={sortAttribute} ThAttribute='shutouts'>
                    SO
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
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'goals_against' ? 'bold' : 'normal'}
                      >
                        {goalie.goals_against}
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
                        fontWeight={sortAttribute === 'goals_against_average' ? 'bold' : 'normal'}
                      >
                        {goalie.goals_against_average}
                      </Td>
                      <Td
                        px={1}
                        isNumeric
                        fontWeight={sortAttribute === 'shutouts' ? 'bold' : 'normal'}
                      >
                        {goalie.shutouts}
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
