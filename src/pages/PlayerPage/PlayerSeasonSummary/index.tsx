import * as React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { SkaterScoring } from '../../../types/app'

interface PlayerSeasonSummaryProps {
  skater: SkaterScoring
}

export const PlayerSeasonSummary: React.FC<PlayerSeasonSummaryProps> = ({ skater }) => {
  return (
    <>
      {skater && (
        <Box bg='white' border='2px solid black' borderRadius='lg' p={4} d='flex'>
          <VStack w='100%' justifyContent='center'>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Games Played:</Text>
              <Text>{skater.games_played}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Points: </Text>
              <Text>{skater.points}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Assists: </Text>
              <Text>{skater.assists}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Goals: </Text>
              <Text>{skater.goals}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Shots:</Text>
              <Text>{skater.shots_on_goal}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Shooting %:</Text>
              <Text>{skater.shooting_percentage}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Power-Play Goals: </Text>
              <Text>{skater.pp_goals}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Game-Winners: </Text>
              <Text>{skater.gw_goals}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Short-Handed Goals: </Text>
              <Text>{skater.sh_goals}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Avg Time on Ice: </Text>
              <Text>{skater.average_time_on_ice}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Plus / Minus: </Text>
              <Text>{skater.plus_minus}</Text>
            </Box>
            <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
              <Text fontWeight='semibold'>Penalty Minutes: </Text>
              <Text>{skater.penalty_minutes}</Text>
            </Box>
          </VStack>
        </Box>
      )}
    </>
  )
}
