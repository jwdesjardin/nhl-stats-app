import { Box, Image, Button, Link } from '@chakra-ui/react'
import React from 'react'

import { teams } from '../../../data/teams'
import { useGamelog } from '../../../context'
import { Game } from '../../Homepage/Game'

import { Link as RouterLink } from 'react-router-dom'

interface FullScheduleProps {
  team_id: string
}

export const FullSchedule: React.FC<FullScheduleProps> = ({ team_id }) => {
  const { gamelog } = useGamelog()

  const teamsGames = gamelog.filter(
    (game) => game.away_team_id === team_id || game.home_team_id === team_id
  )

  const team = teams.find((team) => team.teamID === team_id)

  console.log(teamsGames)

  return (
    <Box>
      {team && (
        <Link as={RouterLink} to={`/team/${team_id}`}>
          <Button border='2px solid black' bg='white'>
            <Image w='35px' src={team.image_url} />
            {team.name}
          </Button>
        </Link>
      )}
      {teamsGames.map((game) => (
        <Game key={game.id} game={game} />
      ))}
    </Box>
  )
}
