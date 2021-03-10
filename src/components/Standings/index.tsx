import { Td, Tr, Image, Box, Heading, Table, Thead, Th, Tbody, VStack } from '@chakra-ui/react'
import React from 'react'
import { Team, teams } from '../../data/teams'

export interface TeamSeasonStats {
	_id: number
	name: string
	games: number
	wins: number
	losses: number
	losses_ot: number
	points: number
	points_pct: number
}

export interface Conference {
	name: string
	teams: TeamSeasonStats[]
}

interface TeamSeasonStatProps {
	stats: TeamSeasonStats
}

export const TeamSeasonStat: React.FC<TeamSeasonStatProps> = ({ stats }) => {
	const getTeamImage = (teams: Team[], teamName: string) => {
		const team: Team | undefined = teams.find((team) => team.name === teamName)
		if (!team) return
		return team.image_url
	}

	return (
		<Tr>
			<Td p={2}>
				<Image width='37px' src={`${getTeamImage(teams, stats.name)}`}></Image>
			</Td>
			<Td p={2} isNumeric>
				{stats.games}
			</Td>
			<Td p={2} isNumeric>
				{stats.wins}
			</Td>
			<Td p={2} isNumeric>
				{stats.losses}
			</Td>
			<Td p={2} isNumeric>
				{stats.losses_ot}
			</Td>
			<Td p={2} fontWeight='bold' isNumeric>
				{stats.points}
			</Td>
			<Td p={2} isNumeric>
				{stats.points_pct}
			</Td>
		</Tr>
	)
}

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
