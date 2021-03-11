import { Tr, Box, Heading, Table, Thead, Th, Tbody, VStack } from '@chakra-ui/react'
import React from 'react'

//Types
import { Conference } from '../../../../types/app'
//Components
import { TeamSeasonStat } from './TeamSeasonStat'

interface ConferenceStandingsProps {
  conference: Conference
}

export const ConferenceStandings: React.FC<ConferenceStandingsProps> = ({ conference }) => {
  return (
    <VStack>
      <Box w='100%'>
        <Heading fontSize={16} mb={2}>
          {conference.name.toUpperCase()}
        </Heading>
        <Table justifySelf='center' variant='simple' bg='white' size='sm' borderRadius='md' mb={4}>
          <Thead>
            <Tr>
              <Th p={2}>TEAM</Th>
              <Th p={2} isNumeric>
                GP
              </Th>
              <Th p={2} isNumeric>
                W
              </Th>
              <Th p={2} isNumeric>
                L
              </Th>
              <Th p={2} isNumeric>
                OTL
              </Th>
              <Th p={2} fontWeight='bold' isNumeric>
                PTS
              </Th>
              <Th p={2} isNumeric>
                %
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {conference.teams.map((team) => (
              <TeamSeasonStat key={team._id} stats={team} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  )
}
