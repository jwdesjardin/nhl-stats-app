import { Container } from '@chakra-ui/layout'
import { Box, Heading, Link, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'
import { usePlayers } from '../../context'
import { GoalieScoring, SkaterScoring } from '../../types/app'
import { Link as BrowserLink } from 'react-router-dom'
import { getStatHeader } from '../../utils/helper'

export const LeadersPage = () => {
  const { skaters, goalies } = usePlayers()

  const [leaderStat, setLeaderStat] = React.useState('points')
  const [statHeader, setStatHeader] = React.useState('P')
  const [top50Skaters, setTop50Skaters] = React.useState<SkaterScoring[]>([])
  const [top50Goalies, setTop50Goalies] = React.useState<GoalieScoring[]>([])

  React.useEffect(() => {
    if (Object.keys(skaters[0]).includes(leaderStat)) {
      setTop50Skaters(findTop50Skaters(skaters, leaderStat))
      setTop50Goalies([])
    } else if (Object.keys(goalies[0]).includes(leaderStat)) {
      setTop50Goalies(findTop50Goalies(goalies, leaderStat))
      setTop50Skaters([])
    }
    getStatHeader(leaderStat, setStatHeader)
  }, [leaderStat])

  const findTop50Skaters = (skaters: SkaterScoring[], attr: string) => {
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
        return 0
      })
      .slice(0, 50)
  }

  const findTop50Goalies = (goalies: GoalieScoring[], attr: string) => {
    return goalies
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
        return 0
      })
      .slice(0, 50)
  }

  return (
    <Container pt={12}>
      <Heading textAlign='center'>Leaders</Heading>
      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />

      {/* stat select */}
      <Select
        onChange={(e) => {
          setLeaderStat(e.target.value)
        }}
        bg='cyan.200'
        defaultValue='points'
        my={3}
        w='80%'
        mx='auto'
      >
        <option disabled>SKATERS</option>
        <option value='points'>Points</option>
        <option value='goals'>Goals</option>
        <option value='assists'>Assists</option>
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
        <option disabled>GOALIES</option>
        <option value='goals_against_average'>Goals Against Avg.</option>
        <option value='shutouts'>Shutouts</option>
        <option value='save_percentage'>Save %</option>
        <option value='goals_against'>Goals Against</option>
        <option value='saves'>Saves</option>
      </Select>

      <Box bg='white' border='2px solid black' p={2} borderRadius='lg'>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th p={2}>RK</Th>
              <Th p={2}>TEAM</Th>
              <Th p={2}>PLAYER</Th>
              <Th p={2} isNumeric>
                GP
              </Th>
              <Th p={2} isNumeric>
                {statHeader}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {top50Skaters.map((player, idx) => {
              const stat = Object.entries(player).find((entry) => entry[0] === leaderStat)

              return (
                <Tr>
                  <Td p={2}>{idx + 1}</Td>
                  <Td p={2}>
                    <Link as={BrowserLink} to={`/team/${player.team_id}`}>
                      {player.team_id}
                    </Link>
                  </Td>
                  <Td p={2}>
                    <Link as={BrowserLink} to={`/player/${player.player_id}`}>
                      {player.player}
                    </Link>
                  </Td>
                  <Td p={2} isNumeric>
                    {player.games_played}
                  </Td>
                  <Td p={2} isNumeric>
                    {stat && stat[1]}
                  </Td>
                </Tr>
              )
            })}
            {top50Goalies.map((player, idx) => {
              const stat = Object.entries(player).find((entry) => entry[0] === leaderStat)

              return (
                <Tr>
                  <Td p={2}>{idx + 1}</Td>
                  <Td p={2}>
                    <Link as={BrowserLink} to={`/team/${player.team_id}`}>
                      {player.team_id}
                    </Link>
                  </Td>
                  <Td p={2}>
                    <Link as={BrowserLink} to={`/player/${player.player_id}`}>
                      {player.player}
                    </Link>
                  </Td>
                  <Td p={2} isNumeric>
                    {player.games_played}
                  </Td>
                  <Td p={2} isNumeric>
                    {stat && stat[1]}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}
