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
  Link,
} from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'
import { getStatHeader } from '../../../utils/helper'

import { Link as RouterLink } from 'react-router-dom'

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
  }, [scoringStat, skaterScoring])

  const getSortedSkaters = (skaters: SkaterScoring[], attr: string) => {
    return skaters
      .sort((a, b) => {
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
      .slice(0, 50)
  }

  return (
    <Box>
      {/* stat select */}
      <Select
        onChange={(e) => {
          setScoringStat(e.target.value)
        }}
        bg='cyan.200'
        defaultValue='points'
        my={3}
        w='80%'
        mx='auto'
      >
        <option value='games_played'>Game Played</option>
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
              <Th p={2}>RK</Th>
              <Th p={2}>POS</Th>
              <Th p={2}>Player</Th>
              <Th p={2} isNumeric>
                GP
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
            {sortedSkaters.map((skater, idx) => {
              const stat = Object.entries(skater).find((entry) => entry[0] === scoringStat)

              return (
                <Tr key={skater.player_id}>
                  <Td p={2}>{idx + 1}</Td>
                  <Td p={2}>{skater.position}</Td>
                  <Td p={2}>
                    <Link as={RouterLink} to={`/player/${skater.player_id}`}>
                      {skater.player}
                    </Link>
                  </Td>
                  <Td p={2} isNumeric>
                    {skater.games_played}
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
