import * as React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { GoalieScoring } from '../../../types/app'

interface GoalieSeasonSummaryProps {
  goalie: GoalieScoring
}

export const GoalieSeasonSummary: React.FC<GoalieSeasonSummaryProps> = ({ goalie }) => {
  return (
    <>
      {goalie && (
        <Box bg='white' border='2px solid black' borderRadius='lg' p={4} d='flex'>
          <VStack w='100%' justifyContent='center'>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Games Played:</Text>
              <Text>{goalie.games_played}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Games Started: </Text>
              <Text>{goalie.games_started}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Wins: </Text>
              <Text>{goalie.wins}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Losses: </Text>
              <Text>{goalie.losses}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>OT Losses:</Text>
              <Text>{goalie.ot_losses}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Shutouts:</Text>
              <Text>{goalie.shutouts}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Shots Against: </Text>
              <Text>{goalie.shots_against}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Goals Against: </Text>
              <Text>{goalie.goals_against}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Saves: </Text>
              <Text>{goalie.saves}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Save Percentage: </Text>
              <Text>{goalie.save_percentage}</Text>
            </Box>
          </VStack>
        </Box>
      )}
    </>
  )
}
