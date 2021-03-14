import * as React from 'react'

import { Box, Table, Tbody, Td, Th, Thead, Tr, Link } from '@chakra-ui/react'

import { useInjuries } from '../../../context'
import { Injury } from '../../../types/app'
import { Link as RouterLink } from 'react-router-dom'

interface TeamInjuriesProps {
  team_id: string
}

export const TeamInjuries: React.FC<TeamInjuriesProps> = ({ team_id }) => {
  const { injuries } = useInjuries()

  const [teamInjuries, setTeamInjuries] = React.useState<Injury[]>([])

  React.useEffect(() => {
    setTeamInjuries(getTeamInjuries(team_id, injuries))
  }, [team_id, injuries])

  const getTeamInjuries = (team_id: string, injuries: Injury[]) => {
    return injuries.filter((injury) => injury.team_id === team_id)
  }

  return (
    <Box>
      <Box bg='white' border='2px solid black' borderRadius='lg' px={1}>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th px={1}>Player</Th>
              <Th px={1}>START</Th>
              <Th px={1}>TYPE</Th>
              <Th px={1}>NOTE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamInjuries.map((injury) => (
              <Tr key={injury.id}>
                <Td px={1}>
                  <Link as={RouterLink} to={`/player/${injury.player_id}`}>
                    {injury.player}
                  </Link>
                </Td>
                <Td px={1}>{injury.date}</Td>
                <Td px={1}>{injury.type}</Td>
                <Td px={1}>{injury.note}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
