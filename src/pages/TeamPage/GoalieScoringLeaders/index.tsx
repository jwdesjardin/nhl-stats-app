import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Select, Link } from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'
interface GoalieScoringLeadersProps {
  goalieScoring: GoalieScoring[]
}

export const GoalieScoringLeaders: React.FC<GoalieScoringLeadersProps> = ({ goalieScoring }) => {
  const [category, setCategory] = React.useState('saves')
  const [sortedGoalies, setSortedGoalies] = React.useState<GoalieScoring[]>([])

  React.useEffect(() => {
    setSortedGoalies(getSortedGoalies(goalieScoring, category))
  }, [category, goalieScoring])

  const getSortedGoalies = (goalies: GoalieScoring[], attr: string) => {
    return goalies.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

      if (stat_A !== '' && stat_B !== '') {
        return parseFloat(stat_B) - parseFloat(stat_A)
      }
      // fails no attr found NEVER
      return -1
    })
  }

  return (
    <Box>
      {/* stat select */}
      <Select
        onChange={(e) => {
          setCategory(e.target.value)
        }}
        bg='cyan.200'
        defaultValue='save_percentage'
        my={3}
        w='80%'
        mx='auto'
      >
        <option value='saves'>Saves</option>
        <option value='goals'>Goals</option>
      </Select>

      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        {category === 'saves' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RK</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  SV
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  SHOTS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  SV %
                </Th>
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
                    <Td px={1} isNumeric>
                      {goalie.games_started}
                    </Td>
                    <Td px={1} isNumeric>
                      {goalie.saves}
                    </Td>
                    <Td px={1} isNumeric>
                      {goalie.shots_against}
                    </Td>

                    <Td px={1} isNumeric>
                      {goalie.save_percentage}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {category === 'goals' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RKr</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GA
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  SHOTS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GAA
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  SO
                </Th>
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
                    <Td px={1} isNumeric>
                      {goalie.games_started}
                    </Td>
                    <Td px={1} isNumeric>
                      {goalie.goals_against}
                    </Td>
                    <Td px={1} isNumeric>
                      {goalie.shots_against}
                    </Td>

                    <Td px={1} isNumeric>
                      {goalie.goals_against_average}
                    </Td>
                    <Td px={1} isNumeric>
                      {goalie.shutouts}
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
