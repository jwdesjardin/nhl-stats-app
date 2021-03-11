import * as React from 'react'
import { HStack } from '@chakra-ui/layout'
import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { BoxScore } from '../../../types/gameSummary'
import { teams } from '../../../data/teams'

interface GameSummaryProps {
  boxScore: BoxScore
}

export const GameSummary: React.FC<GameSummaryProps> = ({ boxScore }) => {
  const { game_details, home_scoring_total, away_scoring_total } = boxScore

  const { home_team_id, away_team_id } = game_details

  const date = new Date(game_details.date)
  const away_team = teams.find((team) => team.teamID === away_team_id)
  const home_team = teams.find((team) => team.teamID === home_team_id)

  return (
    <Box border='2px solid black' p={4} bg='white' borderRadius='lg'>
      {/* header */}
      {home_team && away_team && (
        <HStack>
          {/* home team */}
          <VStack>
            <Image src={away_team.image_url} />
            <Text textAlign='center'>{away_team.name}</Text>
            <Text fontWeight='bold'>Away</Text>
          </VStack>
          {/* game details */}
          <VStack>
            <Box d='flex' alignItems='center'>
              <Text fontSize={18} fontWeight='bold'>
                {date.getMonth() + 1}
                {'/'}
                {date.getDate()}
              </Text>
              <Text fontSize={12} ml={2}>
                {game_details.time}
              </Text>
            </Box>
            {game_details.attendance && (
              <VStack spacing={1}>
                <Text fontWeight='bold'>Attendance: </Text> <Text>{game_details.attendance}</Text>
              </VStack>
            )}
            {game_details.arena && (
              <VStack spacing={1}>
                <Text fontWeight='bold'>Arena: </Text>{' '}
                <Text textAlign='center'>{game_details.arena}</Text>
              </VStack>
            )}
          </VStack>
          {/* away team */}
          <VStack>
            <Image src={home_team.image_url} />
            <Text textAlign='center'>{home_team.name}</Text>
            <Text fontWeight='bold'>Home</Text>
          </VStack>
        </HStack>
      )}

      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />

      <VStack>
        {/* Goals */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>{away_scoring_total.goals}</Text>
          <Text fontWeight='bold'>Goals</Text>
          <Text>{home_scoring_total.goals}</Text>
        </Box>
        {/* Shots */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>{away_scoring_total.shots_on_goal}</Text>
          <Text fontWeight='bold'>Shots</Text>
          <Text>{home_scoring_total.shots_on_goal}</Text>
        </Box>
        {/* Shooting Percentage */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>{away_scoring_total.shooting_percentage}</Text>
          <Text fontWeight='bold'>Shooting %</Text>
          <Text>{home_scoring_total.shooting_percentage}</Text>
        </Box>
        {/* Power Play Goals */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>{away_scoring_total.pp_goals}</Text>
          <Text fontWeight='bold'>PP Goals</Text>
          <Text>{home_scoring_total.pp_goals}</Text>
        </Box>
        {/* Short Handed Goals */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>{away_scoring_total.sh_goals}</Text>
          <Text fontWeight='bold'>SH Goals</Text>
          <Text>{home_scoring_total.sh_goals}</Text>
        </Box>
        {/* Penalty Minutes */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>{away_scoring_total.penalty_minutes}</Text>
          <Text fontWeight='bold'>PIMS</Text>
          <Text>{home_scoring_total.penalty_minutes}</Text>
        </Box>
      </VStack>
    </Box>
  )
}
