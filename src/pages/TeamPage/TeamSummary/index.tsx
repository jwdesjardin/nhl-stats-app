import * as React from 'react'
import { Container, HStack } from '@chakra-ui/layout'
import {
  Box,
  Heading,
  Image,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { teams } from '../../../data/teams'

export const TeamSummary = () => {
  return (
    <Box bg='white' border='2px solid black' borderRadius='lg' p={4} d='flex'>
      <VStack justifyContent='center'>
        <Image src='images/mapleleafs.gif'></Image>
        <Text>0-4-5</Text>
      </VStack>
      <VStack justifyContent='center'>
        <Heading fontSize={24} mb={2} textAlign='center'>
          Toronto Maple Leafs
        </Heading>
        <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
          <Text fontWeight='semibold'>Seed:</Text>
          <Text>1st</Text>
        </Box>
        <Box d='flex' alignItems='center' justifyContent='space-between' w='100%'>
          <Text fontWeight='semibold'>Division:</Text>
          <Text>Northern</Text>
        </Box>
      </VStack>
    </Box>
  )
}
