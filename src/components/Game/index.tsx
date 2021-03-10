import { Text, Box, Link, Image, Badge } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Icon } from '@chakra-ui/react'
import { SportsHockey } from '@material-ui/icons'

// import GAMELOG from '../data/gamelog.json'
// import STANDINGS from '../data/standings.json'

import { teams } from '../../data/teams'

export interface GameStats {
	id: number
	date: string
	home_team: string
	home_goals: number | null
	away_team: string
	away_goals: number | null
	overtime: string
	attendance: number | null
	length_of_game: string
	notes: string
}

interface GameProps {
	game: GameStats
}

export const Game: React.FC<GameProps> = ({ game }) => {
	// find the team object
	const home_team = teams.find((team) => team.name === game.home_team)
	const away_team = teams.find((team) => team.name === game.away_team)

	// helper function to pad single digit months and dates
	const padStart = (str: string) => {
		const number = parseInt(str)
		if (number < 10) {
			return '0' + str
		} else return str
	}

	// create a date object
	const game_date = new Date(game.date)

	// create game_link
	let game_link = ''
	if (home_team) {
		game_link =
			game_date.getFullYear().toString() +
			padStart((game_date.getMonth() + 1).toString()) +
			padStart((game_date.getDate() + 1).toString()) +
			0 +
			home_team.teamID
		console.log(game_link)
	}

	return (
		<Box
			border='1px solid black'
			bg='white'
			borderRadius='lg'
			p={2}
			d='flex'
			alignItems='center'
			justifyContent='space-evenly'
			my={1}
		>
			<Box d='flex' flexDirection='column' alignItems='center' p={1}>
				<Text>
					{game_date.getMonth() + 1}
					{'/'}
					{game_date.getDate()}
				</Text>
			</Box>
			{home_team && away_team && (
				<Box d='flex' alignItems='center'>
					<Image w='45px' src={away_team.image_url} />
					<Text fontSize={16} fontWeight='bold' mr={2}>
						{game.away_goals}
					</Text>
					<Text mr={2}>@</Text>
					<Image w='45px' src={home_team.image_url} />
					<Text fontSize={16} fontWeight='bold' mr={4}>
						{game.home_goals}
					</Text>
				</Box>
			)}
			{game.overtime && (
				<Badge p={1} mr={2}>
					{game.overtime}
				</Badge>
			)}
			{game_link !== '' && (
				<Link as={RouterLink} to={`games/${game_link}`}>
					<Icon as={SportsHockey} />
				</Link>
			)}
		</Box>
	)
}