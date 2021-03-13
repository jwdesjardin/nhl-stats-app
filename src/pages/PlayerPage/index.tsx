import * as React from 'react'
import { Container } from '@chakra-ui/layout'
import { Box, Heading, VStack } from '@chakra-ui/react'

import { RouteComponentProps } from 'react-router-dom'
import { PlayerInjuries } from './PlayerInjuries'
import { PlayerSummary } from './PlayerSummary'
import { usePlayers } from '../../context'
import { PlayerGoals } from './PlayerGoals'
import { PlayerAssists } from './PlayerAssists'
import { PlayerPoints } from './PlayerPoints'
import { PlayerSeasonSummary } from './PlayerSeasonSummary'
import { GoalieScoring, SkaterScoring, Team } from '../../types/app'
import { teams } from '../../data/teams'
import { GoalieGoalsAgainstAvg } from './GoalieGoalsAgainstAvg'
import { GoalieSavePercentage } from './GoalieSavePercentage'
import { GoalieGoalsAgainst } from './GoalieGoalsAgainst'
import { GoalieSeasonSummary } from './GoalieSeasonSummary'
import { TeamSummaryStats } from '../../types/team'
import { STATS_API_KEY } from '../../config'

interface PlayerPageProps extends RouteComponentProps<any> {}

export const PlayerPage: React.FC<PlayerPageProps> = ({ match }) => {
  const { player_id } = match.params

  const { skaters, goalies } = usePlayers()

  const [skater, setSkater] = React.useState<SkaterScoring | undefined>()
  const [goalie, setGoalie] = React.useState<GoalieScoring | undefined>()
  const [team, setTeam] = React.useState<Team | undefined>()
  const [teamSummary, setTeamSummary] = React.useState<TeamSummaryStats | undefined>()

  React.useEffect(() => {
    const getTeamSummary = async (team: Team) => {
      const res = await fetch(
        `https://ts-node-scraping-nhl.herokuapp.com/api/team/${team.teamID}?API_KEY=${STATS_API_KEY}`
      )
      const data = await res.json()
      setTeamSummary(data)
    }

    // first see if player is goalie and store data
    const isGoalie = goalies.find((goalie) => goalie.player_id === player_id)
    if (isGoalie !== undefined) {
      setGoalie(isGoalie)
      const team = teams.find((team) => team.teamID === isGoalie.team_id)
      if (team) {
        setTeam(team)
        getTeamSummary(team)
      }

      // else check if player is skater and store data
    } else {
      const isSkater = skaters.find((skater) => skater.player_id === player_id)
      if (isSkater) {
        console.log('isSkater', isSkater)
        setSkater(isSkater)
        const team = teams.find((team) => team.teamID === isSkater.team_id)
        if (team) {
          setTeam((prevState) => {
            if (prevState !== team) {
              setTeam(team)
              getTeamSummary(team)
              console.log('fetched new team', team)
              return undefined
            }
            console.log('same team', team)
            setTeam(team)
            return undefined
          })
        }
      }
    }
  }, [player_id, goalies, skaters])

  console.log(skater, team, teamSummary)

  return (
    <Container pt={20}>
      {skater && team && teamSummary && (
        <VStack spacing={6}>
          <Box w='100%'>
            <Heading d='flex' fontSize={32} mb={2} textAlign='center'>
              {skater.player}
            </Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PlayerSummary
              player_id={player_id}
              team={team}
              teamRosterStats={teamSummary.rosterStats}
            ></PlayerSummary>
          </Box>

          <PlayerInjuries player_id={player_id}></PlayerInjuries>
          <Box w='100%'>
            <Heading textAlign='center'>2020-21 Scoring</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PlayerSeasonSummary skater={skater}></PlayerSeasonSummary>
          </Box>
          <Box w='100%'>
            <PlayerGoals skater={skater} teamSummary={teamSummary}></PlayerGoals>
          </Box>

          <Box w='100%'>
            <PlayerAssists skater={skater} teamSummary={teamSummary}></PlayerAssists>
          </Box>

          <Box w='100%'>
            <PlayerPoints skater={skater} teamSummary={teamSummary}></PlayerPoints>
          </Box>
        </VStack>
      )}
      {goalie && team && teamSummary && (
        <VStack spacing={6}>
          <Box w='100%'>
            <Heading d='flex' fontSize={32} mb={2} textAlign='center'>
              {goalie.player}
            </Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <PlayerSummary
              player_id={player_id}
              team={team}
              teamRosterStats={teamSummary.rosterStats}
            ></PlayerSummary>
          </Box>

          <PlayerInjuries player_id={player_id}></PlayerInjuries>

          <Box w='100%'>
            <Heading textAlign='center'>2020-21 Scoring</Heading>
            <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
            <GoalieSeasonSummary goalie={goalie}></GoalieSeasonSummary>
          </Box>
          <Box w='100%'>
            <GoalieGoalsAgainstAvg
              goalie={goalie}
              teamSummary={teamSummary}
            ></GoalieGoalsAgainstAvg>
          </Box>

          <Box w='100%'></Box>
          <GoalieSavePercentage goalie={goalie} teamSummary={teamSummary}></GoalieSavePercentage>
          <Box w='100%'></Box>

          <Box w='100%'></Box>
          <GoalieGoalsAgainst goalie={goalie} teamSummary={teamSummary}></GoalieGoalsAgainst>
          <Box w='100%'></Box>
        </VStack>
      )}
    </Container>
  )
}
