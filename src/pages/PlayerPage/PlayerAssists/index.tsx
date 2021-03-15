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

import { SkaterScoring } from '../../../types/app'
import { usePlayers } from '../../../context'
import { Link as RouterLink } from 'react-router-dom'
import { TeamSummaryStats } from '../../../types/team'

interface PlayerAssistsProps {
  skater: SkaterScoring
  teamSummary: TeamSummaryStats
}

export const PlayerAssists: React.FC<PlayerAssistsProps> = ({ skater, teamSummary }) => {
  const { skaters } = usePlayers()

  const [teamClosest, setTeamClosest] = React.useState<SkaterScoring[]>([])
  const [teamAssistsIndex, setTeamAssistsIndex] = React.useState(0)
  const [leagueClosest, setLeagueClosest] = React.useState<SkaterScoring[]>([])
  const [leagueAssistsIndex, setLeagueAssistsIndex] = React.useState(0)
  const [radioValue, setRadioValue] = React.useState('team')

  React.useEffect(() => {
    setLeagueClosest(getClosestAssists(skaters, skater, setLeagueAssistsIndex))
    setTeamClosest(getClosestAssists(teamSummary.skaterStats, skater, setTeamAssistsIndex))
  }, [skater, teamSummary, skaters])

  const getClosestAssists = (
    teamScoring: SkaterScoring[],
    skater: SkaterScoring,
    setAssistsIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const sorted_team = teamScoring.sort((a, b) => {
      return b.assists - a.assists
    })

    const index = sorted_team.findIndex((stat) => stat.player_id === skater.player_id)

    console.log(sorted_team, index)

    const startIndex = index - 5
    if (startIndex > 0) {
      setAssistsIndex(startIndex)
      return sorted_team.slice(startIndex, startIndex + 10)
    } else {
      setAssistsIndex(0)
      return sorted_team.slice(0, 10)
    }
  }

  return (
    <Box>
      {/* stat select */}
      <Box d='flex' alignItems='center' minH='3.5rem' justifyContent='space-between'>
        <Heading textAlign='center'>Assists</Heading>
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
          defaultValue='team'
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
                A
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
                    <Td p={2}>{teamAssistsIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.assists}
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
                    <Td p={2}>{leagueAssistsIndex + idx + 1}</Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/player/${row.player_id}`}>
                        {row.player}
                      </Link>
                    </Td>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/team/${row.team_id}`}>
                        {row.team_id}
                      </Link>
                    </Td>
                    <Td p={2} isNumeric>
                      {row.games_played}
                    </Td>
                    <Td p={2} isNumeric>
                      {row.assists}
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
