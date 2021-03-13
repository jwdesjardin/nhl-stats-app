import { Td, Tr, Image, Link } from '@chakra-ui/react'
import React from 'react'
import { teams } from '../../../data/teams'

import { Team, TeamSeasonStats } from '../../../types/app'

import { Link as RouterLink } from 'react-router-dom'

interface TeamSeasonStatProps {
  stats: TeamSeasonStats
  selected: boolean
}

export const TeamSeasonStat: React.FC<TeamSeasonStatProps> = ({ stats, selected }) => {
  const [team, setTeam] = React.useState<Team | undefined>()

  React.useEffect(() => {
    const team = teams.find((team) => team.teamID === stats.team_id)
    setTeam(team)
  }, [])

  const getTeamImage = (teams: Team[], teamName: string) => {
    const team: Team | undefined = teams.find((team) => team.name === teamName)
    if (!team) return
    return team.image_url
  }

  return (
    <Tr bg={selected ? 'yellow.200' : 'white'}>
      {team && (
        <Td p={2}>
          <Link as={RouterLink} to={`/team/${team?.teamID}`}>
            <Image width='37px' src={team?.image_url}></Image>
          </Link>
        </Td>
      )}
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
