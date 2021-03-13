import * as React from 'react'
import { Container, HStack } from '@chakra-ui/layout'
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  RadioGroup,
  Stack,
  Radio,
  Link,
} from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'
import TEAMSUMMARY from '../../../data/team.json'
import { usePlayers } from '../../../context'
import { Link as BrowserLink } from 'react-router-dom'

interface GoalieGoalsAgainstAvgProps {
  goalie: GoalieScoring
}

export const GoalieGoalsAgainstAvg: React.FC<GoalieGoalsAgainstAvgProps> = ({ goalie }) => {
  const { goalies } = usePlayers()

  const [teamClosest, setTeamClosest] = React.useState<GoalieScoring[]>([])
  const [teamGAAIndex, setTeamGAAIndex] = React.useState(0)
  const [leagueClosest, setLeagueClosest] = React.useState<GoalieScoring[]>([])
  const [leagueGAAIndex, setLeagueGAAIndex] = React.useState(0)
  const [radioValue, setRadioValue] = React.useState('league')

  React.useEffect(() => {
    setLeagueClosest(getClosestGAA(goalies, goalie, setLeagueGAAIndex))
    setTeamClosest(getClosestGAA(TEAMSUMMARY.goalieStats, goalie, setTeamGAAIndex))
  }, [goalie])

  const getClosestGAA = (
    teamScoring: GoalieScoring[],
    goalie: GoalieScoring,
    setGAAIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const sorted_team = teamScoring.sort((a, b) => {
      const stat_A = a.goals_against_average
      const stat_B = b.goals_against_average
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

    const index = sorted_team.findIndex((stat) => stat.player_id === goalie.player_id)

    console.log(sorted_team, index)

    if (index - 5 > 0) {
      setGAAIndex(index - 5)
      return sorted_team.slice(index - 5, index + 6)
    } else {
      setGAAIndex(0)
      return sorted_team.slice(0, index + 6)
    }
  }

  return (
    <Box>
      {/* stat select */}
      <Box d='flex' alignItems='center' justifyContent='space-between'>
        <Heading textAlign='center'>GAA</Heading>
        <RadioGroup
          defaultValue='2'
          onChange={(e) => setRadioValue(e.toString())}
          value={radioValue}
        >
          <Stack spacing={5} direction='row'>
            <Radio value='league' bg='blackAlpha.400'>
              League
            </Radio>
            <Radio bg='blackAlpha.400' value='team'>
              Team
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />

      <Box bg='white' border='2px solid black' borderRadius='lg' p={2}>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th p={2}>RK</Th>
              <Th p={2}>TEAM</Th>
              <Th p={2}>PLAYER</Th>
              <Th p={2} isNumeric>
                GP
              </Th>
              <Th p={2} isNumeric>
                GAA
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {radioValue === 'team' &&
              teamClosest.map((row, idx) => {
                return (
                  <Tr
                    key={row.player_id}
                    bg={row.player_id === goalie.player_id ? 'yellow.200' : 'white'}
                  >
                    <Td p={2}>{teamGAAIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>

                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.goals_against_average}
                    </Td>
                  </Tr>
                )
              })}
            {radioValue === 'league' &&
              leagueClosest.map((row, idx) => {
                return (
                  <Tr
                    key={row.player_id}
                    bg={row.player_id === goalie.player_id ? 'yellow.200' : 'white'}
                  >
                    <Td p={2}>{leagueGAAIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>

                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.goals_against_average}
                    </Td>
                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
