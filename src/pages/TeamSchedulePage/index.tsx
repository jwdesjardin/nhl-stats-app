import * as React from 'react'
import { Container } from '@chakra-ui/layout'
import { Box, Heading, VStack } from '@chakra-ui/react'

import { RouteComponentProps } from 'react-router-dom'
import { FullSchedule } from './FullSchedule'

interface TeamSchedulePageProps extends RouteComponentProps<any> {}

export const TeamSchedulePage: React.FC<TeamSchedulePageProps> = ({ match }) => {
  const { id } = match.params

  return (
    <Container pt={20}>
      <VStack spacing={6}>
        {/* Full Schedule */}
        <Box w='100%'>
          <Heading textAlign='center'>2020-21 Full Schedule</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
          {/* bring in games */}
          <FullSchedule team_id={id}></FullSchedule>
        </Box>
      </VStack>
    </Container>
  )
}
