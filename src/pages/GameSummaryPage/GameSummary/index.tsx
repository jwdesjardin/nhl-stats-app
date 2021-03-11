import * as React from 'react'
import { HStack } from '@chakra-ui/layout'
import { Box, Image, Text, VStack } from '@chakra-ui/react'

export const GameSummary = () => {
  return (
    <Box border='2px solid black' p={4} bg='white' borderRadius='lg'>
      {/* header */}
      <HStack>
        {/* home team */}
        <VStack>
          <Image src='images/mapleleafs.gif' />
          <Text>0-3-4</Text>
          <Text fontWeight='bold'>Away</Text>
        </VStack>
        {/* game details */}
        <VStack>
          <Box d='flex'>
            <Text fontWeight='bold'>3/6</Text>
            <Text ml={2}>5:00pm</Text>
          </Box>
          <VStack spacing={1}>
            <Text fontWeight='bold'>Attendance: </Text> <Text> 2,274</Text>
          </VStack>
          <VStack spacing={1}>
            <Text fontWeight='bold'>Arena: </Text> <Text textAlign='center'>Gila River Arena</Text>
          </VStack>
        </VStack>
        {/* away team */}
        <VStack>
          <Image src='images/senators.gif' />
          <Text>0-2-5</Text>
          <Text fontWeight='bold'>Home</Text>
        </VStack>
      </HStack>

      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />

      <VStack>
        {/* Goals */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>3</Text>
          <Text fontWeight='bold'>Goals</Text>
          <Text>4</Text>
        </Box>
        {/* Shots */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>3</Text>
          <Text fontWeight='bold'>Shots</Text>
          <Text>4</Text>
        </Box>
        {/* Shooting Percentage */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>3</Text>
          <Text fontWeight='bold'>Shooting %</Text>
          <Text>4</Text>
        </Box>
        {/* Power Play Goals */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>3</Text>
          <Text fontWeight='bold'>PP Goals</Text>
          <Text>4</Text>
        </Box>
        {/* Short Handed Goals */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>3</Text>
          <Text fontWeight='bold'>SH Goals</Text>
          <Text>4</Text>
        </Box>
        {/* Penalty Minutes */}
        <Box d='flex' w='80%' alignItems='center' justifyContent='space-between'>
          <Text>3</Text>
          <Text fontWeight='bold'>PIMS</Text>
          <Text>4</Text>
        </Box>
      </VStack>
    </Box>
  )
}
