import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'

export const GoalieScoringSummary = () => {
  return (
    <Box bg='white' border='2px solid black' p={4} borderRadius='lg'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th isNumeric>GA</Th>
            <Th isNumeric>SA</Th>
            <Th isNumeric>SV</Th>
            <Th isNumeric>S%</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Martin Jones</Td>
            <Td isNumeric>1</Td>
            <Td isNumeric>32</Td>
            <Td isNumeric>31</Td>
            <Td isNumeric>.987</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}
