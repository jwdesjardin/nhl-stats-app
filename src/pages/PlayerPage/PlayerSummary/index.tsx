import * as React from 'react'

import { Box, Image, Link, Text, VStack } from '@chakra-ui/react'

import { Team } from '../../../types/app'
import { RosterStat } from '../../../types/team'

import Flag from 'react-flagkit'
import { Link as RouterLink } from 'react-router-dom'

interface PlayerSummaryProps {
  player_id: string
  team: Team
  teamRosterStats: RosterStat[]
}

export const PlayerSummary: React.FC<PlayerSummaryProps> = ({
  player_id,
  team,
  teamRosterStats,
}) => {
  const playerRoster = teamRosterStats.find((stat) => stat.player_id === player_id)

  console.log(team, playerRoster)
  return (
    <>
      {team && playerRoster && (
        <Box bg='white' border='2px solid black' borderRadius='lg' p={4} d='flex'>
          <VStack w='100%' justifyContent='center'>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Team:</Text>
              <Link as={RouterLink} to={`/team/${team.teamID}`}>
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
