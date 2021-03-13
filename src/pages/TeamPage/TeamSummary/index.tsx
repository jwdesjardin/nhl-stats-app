import * as React from 'react'

import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { teams } from '../../../data/teams'
import { useStandings } from '../../../context'
import { Conference, TeamSeasonStats } from '../../../types/app'

interface TeamSummaryProps {
  team_id: string
}

export const TeamSummary: React.FC<TeamSummaryProps> = ({ team_id }) => {
  const { standings } = useStandings()

  const team = teams.find((team) => team.teamID === team_id)
  let conference: Conference | undefined
  let team_season: TeamSeasonStats | undefined
  if (team) {
    conference = standings.find((conference) => conference.name.includes(team.conference))
    if (conference) {
      team_season = conference.teams.find((team) => team.team_id === team_id)
    }
  }

  let record = ''
  if (team_season) {
    record = `${team_season.wins}-${team_season.losses}-${team_season.losses_ot}`
  }

  let seed = ''
  if (conference && team) {
    seed = conference.teams.findIndex((team) => team.team_id === team_id).toString()
  }

  console.log(team, team_season, conference)

  return (
    <>
      {team && team_season && conference && (
        <Box bg='white' border='2px solid black' borderRadius='lg' p={4} d='flex'>
          <VStack justifyContent='center'>
            <Image src={team.image_url}></Image>
            <Text>{record}</Text>
          </VStack>
          <VStack justifyContent='center'>
            <Heading fontSize={24} mb={2} textAlign='center'>
              {team.name}
            </Heading>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Seed:</Text>
              <Text>{seed}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Division:</Text>
              <Text>{team.conference}</Text>
            </Box>
          </VStack>
        </Box>
      )}
    </>
  )
}
