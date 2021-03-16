import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Center, HStack } from '@chakra-ui/layout'
import { Box, Image, Text, VStack, Link } from '@chakra-ui/react'

import { BoxScore } from '../../../types/gameSummary'
import { teams } from '../../../data/teams'

interface GameSummaryProps {
  boxScore: BoxScore
}

export const GameSummary: React.FC<GameSummaryProps> = ({ boxScore }) => {
  // get date of game and team ids
  const { game_details, home_scoring_total, away_scoring_total } = boxScore
  const { home_team_id, away_team_id } = game_details
  const away_team = teams.find((team) => team.teamID === away_team_id)
  const home_team = teams.find((team) => team.teamID === home_team_id)
  const date = new Date(game_details.date)

  return (
    <Box border='2px solid black' p={4} bg='white' borderRadius='lg'>
      {/* header */}
      {home_team && away_team && (
        <>
          <Center mb={4}>
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
                <HStack spacing={1}>
                  <Text fontWeight='bold'>Attendance: </Text>{' '}
                  <Text>{game_details.attendance.toLocaleString()}</Text>
                </HStack>
              )}
              {game_details.arena && (
                <HStack spacing={1}>
                  <Text fontWeight='bold'>Arena: </Text>{' '}
                  <Text textAlign='center'>{game_details.arena}</Text>
                </HStack>
              )}
            </VStack>
          </Center>

          <Box d='flex' justifyContent='space-between' alignItems='center'>
            {/* home team */}
            <VStack>
              <Image src={away_team.image_url} />
              <Link as={RouterLink} to={`/team/${away_team_id}`}>
                <Text textAlign='center'>{away_team.name}</Text>
              </Link>
              <Text fontWeight='bold'>Away</Text>
            </VStack>

            {/* away team */}
            <VStack>
              <Image src={home_team.image_url} />
              <Link as={RouterLink} to={`/team/${home_team_id}`}>
                <Text textAlign='center'>{home_team.name}</Text>
              </Link>
              <Text fontWeight='bold'>Home</Text>
            </VStack>
          </Box>
        </>
      )}

      {/* divider */}
      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />

      {/* stat by stat summary */}
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
          <Text>{home_scoring_total.shooting_percentage.toFixed(1)}</Text>
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
