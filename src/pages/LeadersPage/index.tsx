import { Container } from '@chakra-ui/layout'
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'

export const LeadersPage = () => {
	return (
		<Container pt={12}>
			<Heading>Leaders</Heading>
			<Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th>To convert</Th>
						<Th>into</Th>
						<Th isNumeric>multiply by</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>inches</Td>
						<Td>millimetres (mm)</Td>
						<Td isNumeric>25.4</Td>
					</Tr>
					<Tr>
						<Td>feet</Td>
						<Td>centimetres (cm)</Td>
						<Td isNumeric>30.48</Td>
					</Tr>
					<Tr>
						<Td>yards</Td>
						<Td>metres (m)</Td>
						<Td isNumeric>0.91444</Td>
					</Tr>
				</Tbody>
			</Table>
		</Container>
	)
}
