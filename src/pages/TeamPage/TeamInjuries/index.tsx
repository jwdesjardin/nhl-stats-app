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
  Select,
  Link,
} from '@chakra-ui/react'
import { teams } from '../../../data/teams'
import { useInjuries } from '../../../context'
import { Injury } from '../../../types/app'
import { Link as BrowserLink } from 'react-router-dom'

interface TeamInjuriesProps {
  team_id: string
}

export const TeamInjuries: React.FC<TeamInjuriesProps> = ({ team_id }) => {
  const { injuries } = useInjuries()

  const [teamInjuries, setTeamInjuries] = React.useState<Injury[]>([])

  React.useEffect(() => {
    setTeamInjuries(getTeamInjuries(team_id, injuries))
  }, [])

  const getTeamInjuries = (team_id: string, injuries: Injury[]) => {
    return injuries.filter((injury) => injury.team_id === team_id)
  }

  return (
    <Box>
      <Box bg='white' border='2px solid black' borderRadius='lg' p={2}>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th p={2}>Player</Th>
              <Th p={2}>START</Th>
              <Th p={2}>TYPE</Th>
              <Th p={2}>NOTE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamInjuries.map((injury) => (
              <Tr key={injury.id}>
                <Td p={2}>
                  <Link as={BrowserLink} to={`/player/${injury.player_id}`}>
                    {injury.player}
                  </Link>
                </Td>
                <Td p={2}>{injury.date}</Td>
                <Td p={2}>{injury.type}</Td>
                <Td p={2}>{injury.note}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
