import * as React from 'react'

import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr, Link } from '@chakra-ui/react'

import { useInjuries } from '../../../context'
import { Injury } from '../../../types/app'
import { Link as RouterLink } from 'react-router-dom'

interface PlayerInjuriesProps {
  player_id: string
}

export const PlayerInjuries: React.FC<PlayerInjuriesProps> = ({ player_id }) => {
  const { injuries } = useInjuries()

  const [playerInjuries, setPlayerInjuries] = React.useState<Injury[]>([])

  React.useEffect(() => {
    setPlayerInjuries(getPlayerInjuries(player_id, injuries))
  }, [player_id, injuries])

  const getPlayerInjuries = (player_id: string, injuries: Injury[]) => {
    return injuries.filter((injury) => injury.player_id === player_id)
  }

  return (
    <>
      {playerInjuries.length > 0 && (
        <Box>
          <Heading textAlign='center'>Injuries</Heading>
          <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
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
                {playerInjuries.map((injury) => (
                  <Tr key={injury.id}>
                    <Td p={2}>
                      <Link as={RouterLink} to={`/player/${injury.player_id}`}>
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
      )}
    </>
  )
}
