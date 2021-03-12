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

import { SkaterScoring } from '../../../types/app'
import { getStatHeader } from '../../../utils/helper'

interface SkaterScoringLeadersProps {
  skaterScoring: SkaterScoring[]
}

export const SkaterScoringLeaders: React.FC<SkaterScoringLeadersProps> = ({ skaterScoring }) => {
  const [scoringStat, setScoringStat] = React.useState('shots_on_goal')
  const [sortedSkaters, setSortedSkaters] = React.useState<SkaterScoring[]>([])
  const [statHeader, setStatHeader] = React.useState('G')

  React.useEffect(() => {
    setSortedSkaters(getSortedSkaters(skaterScoring, scoringStat))
    getStatHeader(scoringStat, setStatHeader)
  }, [scoringStat])

  const getSortedSkaters = (skaters: SkaterScoring[], attr: string) => {
    return skaters
      .sort((a, b) => {
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
      .slice(0, 50)
  }

  return (
    <Box>
      {/* stat select */}
      <Select
        onChange={(e) => {
          setScoringStat(e.target.value)
        }}
        bg='green.600'
        defaultValue='points'
        my={3}
      >
        <option value='goals'>Goals</option>
        <option value='assists'>Assists</option>
        <option value='points'>Points</option>
        <option value='gw_goals'>GW Goals</option>
        <option value='sh_goals'>SH Goals</option>
        <option value='pp_goals'>PP Goals</option>
        <option value='ev_goals'>EV Goals</option>
        <option value='penalty_minutes'>Penalty Minutes</option>
        <option value='plus_minus'>Plus-Minus</option>
        <option value='average_time_on_ice'>Avg. Time on Ice</option>
        <option value='shots_on_goal'>Shots</option>
        <option value='hits'>Hits</option>
        <option value='faceoff_percentage'>Faceoff %</option>
        <option value='faceoff_wins'>Faceoff Wins</option>
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
                G
              </Th>
              <Th p={2} isNumeric>
                A
              </Th>
              <Th p={2} isNumeric>
                PTS
              </Th>
              <Th p={2} isNumeric>
                {statHeader}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedSkaters.map((skater) => {
              const stat = Object.entries(skater).find((entry) => entry[0] === scoringStat)

              return (
                <Tr key={skater.player_id}>
                  <Td p={2}>{skater.player}</Td>
                  <Td p={2} isNumeric>
                    {skater.games_played}
                  </Td>
                  <Td p={2} isNumeric>
                    {skater.goals}
                  </Td>
                  <Td p={2} isNumeric>
                    {skater.assists}
                  </Td>
                  <Td p={2} isNumeric>
                    {skater.points}
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
