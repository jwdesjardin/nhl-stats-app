import { Td, Tr, Image, Link, Box } from '@chakra-ui/react'
import React from 'react'
import { teams } from '../../data/teams'

import { Team, TeamSeasonStats } from '../../types/app'

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
  }, [stats])

  return (
    <Tr bg={selected ? 'yellow.200' : 'white'}>
      {/* team name */}
      {team && (
        <Td px={1}>
          <Link as={RouterLink} to={`/team/${team?.teamID}`}>
            <Box d='flex' alignItems='center'>
              <Image width='37px' src={team.image_url} mr={2}></Image>
              {team.name}
            </Box>
          </Link>
        </Td>
      )}
      {/* games played */}
      <Td px={1} isNumeric>
        {stats.games}
      </Td>
      {/* wins */}
      <Td px={1} isNumeric>
        {stats.wins}
      </Td>
      {/* losses */}
      <Td px={1} isNumeric>
        {stats.losses}
      </Td>
      {/* OT losses */}
      <Td px={1} isNumeric>
        {stats.losses_ot}
      </Td>
      {/* points */}
      <Td px={1} fontWeight='bold' isNumeric>
        {stats.points}
      </Td>
      {/* point percentage  */}
      <Td px={1} isNumeric>
        {stats.points_pct.toFixed(3).toString().slice(1)}
      </Td>
    </Tr>
  )
}
