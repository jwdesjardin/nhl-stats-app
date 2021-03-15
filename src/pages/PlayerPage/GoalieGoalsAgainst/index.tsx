import * as React from 'react'

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
  Center,
  Button,
} from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'

import { usePlayers } from '../../../context'
import { Link as RouterLink } from 'react-router-dom'
import { TeamSummaryStats } from '../../../types/team'

interface GoalieGoalsAgainstProps {
  goalie: GoalieScoring
  teamSummary: TeamSummaryStats
}

export const GoalieGoalsAgainst: React.FC<GoalieGoalsAgainstProps> = ({ teamSummary, goalie }) => {
  const { goalies } = usePlayers()

  const [teamClosest, setTeamClosest] = React.useState<GoalieScoring[]>([])
  const [teamGAIndex, setTeamGAIndex] = React.useState(0)
  const [leagueClosest, setLeagueClosest] = React.useState<GoalieScoring[]>([])
  const [leagueGAIndex, setLeagueGAIndex] = React.useState(0)
  const [radioValue, setRadioValue] = React.useState('team')

  React.useEffect(() => {
    setLeagueClosest(getClosestGA(goalies, goalie, setLeagueGAIndex))
    setTeamClosest(getClosestGA(teamSummary.goalieStats, goalie, setTeamGAIndex))
  }, [goalie, teamSummary, goalies])

  const getClosestGA = (
    teamScoring: GoalieScoring[],
    goalie: GoalieScoring,
    setGAIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const sorted_team = teamScoring.sort((a, b) => {
      const stat_A = a.goals_against
      const stat_B = b.goals_against
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
      setGAIndex(index - 5)
      return sorted_team.slice(index - 5, index + 6)
    } else {
      setGAIndex(0)
      return sorted_team.slice(0, index + 6)
    }
  }

  return (
    <Box w='100%'>
      {/* stat select */}
      <Box d='flex' alignItems='center' minH='3.5rem' justifyContent='space-between'>
        <Heading textAlign='center'>Goals Against</Heading>
        {radioValue === 'league' && (
          <Center my={2}>
            <Link as={RouterLink} to={`/leaders`}>
              <Button m={0} bg='orange.300'>
                Leaders
              </Button>
            </Link>
          </Center>
        )}
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
                GA
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
                    <Td p={2}>{teamGAIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>

                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.goals_against}
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
                    <Td p={2}>{leagueGAIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>

                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.goals_against}
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
