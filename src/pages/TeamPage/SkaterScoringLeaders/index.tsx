import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Select, Link } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'
import { getStatHeader } from '../../../utils/helper'

import { Link as RouterLink } from 'react-router-dom'
import { Category } from '@material-ui/icons'

interface SkaterScoringLeadersProps {
  skaterScoring: SkaterScoring[]
}

export const SkaterScoringLeaders: React.FC<SkaterScoringLeadersProps> = ({ skaterScoring }) => {
  const [category, setCategory] = React.useState('points')
  const [sortedSkaters, setSortedSkaters] = React.useState<SkaterScoring[]>([])

  React.useEffect(() => {
    setSortedSkaters(getSortedSkaters(skaterScoring, category))
  }, [category, skaterScoring])

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
          setCategory(e.target.value)
        }}
        bg='cyan.200'
        defaultValue='points'
        my={3}
        w='80%'
        mx='auto'
      >
        <option value='points'>Points</option>
        <option value='goals'>Goals</option>
        <option value='shooting'>Shooting</option>
        <option value='penalties'>Penalties</option>
        <option value='faceoffs'>Faceoffs</option>
      </Select>

      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        {/* scoring */}

        {category === 'points' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RK</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th px={1}>ATOI</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  p
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  G
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  A
                </Th>
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
                    <Td px={1} isNumeric>
                      {skater.games_played}
                    </Td>
                    <Td px={1}>{skater.average_time_on_ice}</Td>
                    <Td px={1} isNumeric>
                      {skater.points}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.goals}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.assists}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {/* goals */}
        {category === 'goals' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RK</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th px={1}>ATOI</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  G
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  PP
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GW
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  SH
                </Th>
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
                    <Td px={1} isNumeric>
                      {skater.games_played}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.average_time_on_ice}
                    </Td>

                    <Td px={1} isNumeric>
                      {skater.goals}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.pp_goals}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.gw_goals}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.sh_goals}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {/* shooting */}
        {category === 'shooting' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RK</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th px={1}>ATOI</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  G
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  S
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  S %
                </Th>
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
                    <Td px={1} isNumeric>
                      {skater.games_played}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.average_time_on_ice}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.goals}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.shots_on_goal}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.shooting_percentage}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {/* physical */}
        {category === 'penalties' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RK</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th px={1}>ATOI</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  PTS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  HITS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  PIMS
                </Th>
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
                    <Td px={1} isNumeric>
                      {skater.games_played}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.average_time_on_ice}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.points}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.hits}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.penalty_minutes}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}

        {/* faceoffs */}
        {category === 'faceoffs' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th px={1}>RK</Th>
                <Th px={1}>POS</Th>
                <Th px={1}>Player</Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  FO WINS
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  FO TAKEN
                </Th>
                <Th px={1} isNumeric textDecoration='underline'>
                  FO %
                </Th>
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
                    <Td px={1} isNumeric>
                      {skater.games_played}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.faceoff_wins}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.faceoff_wins + skater.faceoff_losses}
                    </Td>
                    <Td px={1} isNumeric>
                      {skater.faceoff_percentage}
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
