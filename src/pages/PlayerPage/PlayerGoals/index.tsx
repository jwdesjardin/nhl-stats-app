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

import { SkaterScoring } from '../../../types/app'
import TEAMSUMMARY from '../../../data/team.json'
import { usePlayers } from '../../../context'
import { Link as BrowserLink } from 'react-router-dom'

interface PlayerGoalsProps {
  skater: SkaterScoring
}

export const PlayerGoals: React.FC<PlayerGoalsProps> = ({ skater }) => {
  const { skaters } = usePlayers()

  const [teamClosest, setTeamClosest] = React.useState<SkaterScoring[]>([])
  const [teamGoalsIndex, setTeamGoalsIndex] = React.useState(0)
  const [leagueClosest, setLeagueClosest] = React.useState<SkaterScoring[]>([])
  const [leagueGoalsIndex, setLeagueGoalsIndex] = React.useState(0)
  const [radioValue, setRadioValue] = React.useState('league')

  React.useEffect(() => {
    setLeagueClosest(getClosestGoals(skaters, skater, setLeagueGoalsIndex))
    setTeamClosest(getClosestGoals(TEAMSUMMARY.skaterStats, skater, setTeamGoalsIndex))
  }, [skater])

  const getClosestGoals = (
    teamScoring: SkaterScoring[],
    skater: SkaterScoring,
    setGoalsIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const sorted_team = teamScoring.sort((a, b) => {
      return b.goals - a.goals
    })

    const index = sorted_team.findIndex((stat) => stat.player_id === skater.player_id)

    console.log(sorted_team, index)

    if (index - 5 > 0) {
      setGoalsIndex(index - 5)
      return sorted_team.slice(index - 5, index + 6)
    } else {
      setGoalsIndex(0)
      return sorted_team.slice(0, index + 6)
    }
  }

  return (
    <Box>
      {/* stat select */}
      <Box d='flex' alignItems='center' justifyContent='space-between'>
        <Heading textAlign='center'>Goals</Heading>
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
                G
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {radioValue === 'team' &&
              teamClosest.map((row, idx) => {
                return (
                  <Tr
                    key={row.player_id}
                    bg={row.player_id === skater.player_id ? 'yellow.200' : 'white'}
                  >
                    <Td p={2}>{teamGoalsIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.goals}
                    </Td>
                  </Tr>
                )
              })}
            {radioValue === 'league' &&
              leagueClosest.map((row, idx) => {
                return (
                  <Tr
                    key={row.player_id}
                    bg={row.player_id === skater.player_id ? 'yellow.200' : 'white'}
                  >
                    <Td p={2}>{leagueGoalsIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={BrowserLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.goals}
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
