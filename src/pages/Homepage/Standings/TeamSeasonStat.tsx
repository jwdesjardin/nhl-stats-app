import { Td, Tr, Image } from '@chakra-ui/react'
import React from 'react'
import { teams } from '../../../data/teams'

import { Team, TeamSeasonStats } from '../../../types/app'

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
