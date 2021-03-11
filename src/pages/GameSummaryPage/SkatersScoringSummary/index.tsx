import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'

export const SkatersScoringSummary = () => {
  return (
    <Box bg='white' border='2px solid black' p={2} borderRadius='lg'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th>G</Th>
            <Th>A</Th>
            <Th>PTS</Th>
            <Th>S</Th>
            <Th>TOI</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Logan Couture</Td>
            <Td>1</Td>
            <Td>0</Td>
            <Td>1</Td>
            <Td>4</Td>
            <Td>15</Td>
          </Tr>
          <Tr>
            <Td>Logan Couture</Td>
            <Td>1</Td>
            <Td>0</Td>
            <Td>1</Td>
            <Td>4</Td>
            <Td>15</Td>
          </Tr>
          <Tr>
            <Td>Logan Couture</Td>
            <Td>1</Td>
            <Td>0</Td>
            <Td>1</Td>
            <Td>4</Td>
            <Td>15</Td>
          </Tr>
          <Tr>
            <Td>Logan Couture</Td>
            <Td>1</Td>
            <Td>0</Td>
            <Td>1</Td>
            <Td>4</Td>
            <Td>15</Td>
          </Tr>
          <Tr>
            <Td>Logan Couture</Td>
            <Td>1</Td>
            <Td>0</Td>
            <Td>1</Td>
            <Td>4</Td>
            <Td>15</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}
