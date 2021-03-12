import * as React from 'react'
import { Container, HStack } from '@chakra-ui/layout'
import {
  Box,
  Heading,
  Image,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Select,
} from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'
import { getStatHeader } from '../../../utils/helper'

interface GoalieScoringLeadersProps {
  goalieScoring: GoalieScoring[]
}

export const GoalieScoringLeaders: React.FC<GoalieScoringLeadersProps> = ({ goalieScoring }) => {
  const [scoringStat, setScoringStat] = React.useState('save_percentage')
  const [sortedGoalies, setSortedGoalies] = React.useState<GoalieScoring[]>([])
  const [statHeader, setStatHeader] = React.useState('SAVE %')

  React.useEffect(() => {
    setSortedGoalies(getSortedGoalies(goalieScoring, scoringStat))
    getStatHeader(scoringStat, setStatHeader)
  }, [scoringStat])

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
          setScoringStat(e.target.value)
        }}
        bg='cyan.200'
        defaultValue='save_percentage'
        my={3}
        w='80%'
        mx='auto'
      >
        <option value='goals_against_average'>Goals Against Avg.</option>
        <option value='shutouts'>Shutouts</option>
        <option value='save_percentage'>Save %</option>
        <option value='goals_against'>Goals Against</option>
        <option value='shots_against'>Shots Against</option>
        <option value='saves'>Saves</option>
      </Select>

      <Box bg='white' border='2px solid black' borderRadius='lg' p={2}>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th p={2}>Player</Th>
              <Th p={2} isNumeric>
                GP
              </Th>
              <Th p={2} isNumeric>
                SHOTS
              </Th>
              <Th p={2} isNumeric>
                GA
              </Th>
              <Th p={2} isNumeric>
                {statHeader}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedGoalies.map((goalie) => {
              const stat = Object.entries(goalie).find((entry) => entry[0] === scoringStat)

              return (
                <Tr key={goalie.player_id}>
                  <Td p={2}>{goalie.player}</Td>
                  <Td p={2} isNumeric>
                    {goalie.games_played}
                  </Td>
                  <Td p={2} isNumeric>
                    {goalie.shots_against}
                  </Td>
                  <Td p={2} isNumeric>
                    {goalie.goals_against}
                  </Td>
                  {stat && (
                    <Td p={2} isNumeric>
                      {stat[1]}
                    </Td>
                  )}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
