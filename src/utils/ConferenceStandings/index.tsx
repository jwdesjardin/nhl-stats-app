import { Tr, Box, Heading, Table, Thead, Th, Tbody, VStack } from '@chakra-ui/react'
import React from 'react'

//Types
import { Conference } from '../../types/app'
//Components
import { TeamSeasonStat } from './TeamSeasonStat'

interface ConferenceStandingsProps {
  conference: Conference
  team_id?: string
}

export const ConferenceStandings: React.FC<ConferenceStandingsProps> = ({
  conference,
  team_id,
}) => {
  return (
    <VStack>
      <Box w='100%'>
        <Heading fontSize={16} mb={2}>
          {conference.name.toUpperCase()}
        </Heading>
        <Table justifySelf='center' variant='simple' bg='white' size='sm' borderRadius='md' mb={4}>
          <Thead>
            <Tr>
              <Th px={1}>TEAM</Th>
              <Th px={1} isNumeric>
                GP
              </Th>
              <Th px={1} isNumeric>
                W
              </Th>
              <Th px={1} isNumeric>
                L
              </Th>
              <Th px={1} isNumeric>
                OTL
              </Th>
              <Th px={1} fontWeight='bold' isNumeric>
                PTS
              </Th>
              <Th px={1} isNumeric>
                W%
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {conference.teams.map((team) => (
              <TeamSeasonStat key={team._id} stats={team} selected={team.team_id === team_id} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  )
}
