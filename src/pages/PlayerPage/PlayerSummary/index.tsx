import * as React from 'react'
import { Container, HStack } from '@chakra-ui/layout'
import { Box, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'
import { teams } from '../../../data/teams'
import { usePlayers, useStandings } from '../../../context'
import { Conference, SkaterScoring, Team, TeamSeasonStats } from '../../../types/app'
import { RosterStat, TeamSummary } from '../../../types/team'
import TEAMSUMMARY from '../../../data/team.json'
import Flag from 'react-flagkit'
import { Link as BrowserLink } from 'react-router-dom'
import { RosterStats } from '../../TeamPage/RosterStats'

interface PlayerSummaryProps {
  player_id: string
  team: Team
}

export const PlayerSummary: React.FC<PlayerSummaryProps> = ({ player_id, team }) => {
  let teamSummary: TeamSummary | undefined
  if (team) {
    teamSummary = TEAMSUMMARY
  }

  let playerRoster: RosterStat | undefined
  if (teamSummary) {
    playerRoster = teamSummary.rosterStats.find((stat) => stat.player_id === player_id)
  }

  return (
    <>
      {team && playerRoster && (
        <Box bg='white' border='2px solid black' borderRadius='lg' p={4} d='flex'>
          <VStack w='100%' justifyContent='center'>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Team:</Text>
              <Link as={BrowserLink} to={`/team/${team.teamID}`}>
                <Box d='flex' alignItems='center'>
                  <Image w='65px' alignSelf='flex-end' src={team.image_url}></Image>
                  <Text fontSize={18}>{team.name}</Text>
                </Box>
              </Link>
            </Box>

            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Position:</Text>
              <Text>{playerRoster.position}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Age:</Text>
              <Text>{playerRoster.age}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Draft:</Text>
              {playerRoster.draft.overall === null ? (
                <Text>N/A</Text>
              ) : (
                <Text>{`${playerRoster.draft.round} Round ${playerRoster.draft.year}, (${playerRoster.draft.overall})`}</Text>
              )}
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Experience:</Text>
              <Text>{playerRoster.experience}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Country: </Text>
              <Flag country={playerRoster.country.toUpperCase()} />
            </Box>
          </VStack>
        </Box>
      )}
    </>
  )
}
