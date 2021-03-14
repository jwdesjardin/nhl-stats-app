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

      <Box bg='white' border='2px solid black' borderRadius='lg' p={2}>
        {/* scoring */}

        {category === 'points' && (
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th p={2}>RK</Th>
                <Th p={2}>POS</Th>
                <Th p={2}>Player</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th p={2}>ATOI</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  p
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  G
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  A
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSkaters.map((skater, idx) => {
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
                    <Td p={2}>{skater.average_time_on_ice}</Td>
                    <Td p={2} isNumeric>
                      {skater.points}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.goals}
                    </Td>
                    <Td p={2} isNumeric>
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
                <Th p={2}>RK</Th>
                <Th p={2}>POS</Th>
                <Th p={2}>Player</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th p={2}>ATOI</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  G
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  PP
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  GW
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  SH
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSkaters.map((skater, idx) => {
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
                      {skater.average_time_on_ice}
                    </Td>

                    <Td p={2} isNumeric>
                      {skater.goals}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.pp_goals}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.gw_goals}
                    </Td>
                    <Td p={2} isNumeric>
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
                <Th p={2}>RK</Th>
                <Th p={2}>POS</Th>
                <Th p={2}>Player</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th p={2}>ATOI</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  G
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  S
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  S %
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSkaters.map((skater, idx) => {
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
                      {skater.average_time_on_ice}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.goals}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.shots_on_goal}
                    </Td>
                    <Td p={2} isNumeric>
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
                <Th p={2}>RK</Th>
                <Th p={2}>POS</Th>
                <Th p={2}>Player</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th p={2}>ATOI</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  PTS
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  HITS
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  PIMS
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSkaters.map((skater, idx) => {
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
                      {skater.average_time_on_ice}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.points}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.hits}
                    </Td>
                    <Td p={2} isNumeric>
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
                <Th p={2}>RK</Th>
                <Th p={2}>POS</Th>
                <Th p={2}>Player</Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  GP
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  FO WINS
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  FO TAKEN
                </Th>
                <Th p={2} isNumeric textDecoration='underline'>
                  FO %
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSkaters.map((skater, idx) => {
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
                      {skater.faceoff_wins}
                    </Td>
                    <Td p={2} isNumeric>
                      {skater.faceoff_wins + skater.faceoff_losses}
                    </Td>
                    <Td p={2} isNumeric>
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
