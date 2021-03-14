import { Text, Link, Image, Center } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { teams } from '../../data/teams'
import { SkaterScoring, Team } from '../../types/app'

interface PlayerLinkProps {
  skater: SkaterScoring
  onClose: () => void
}

export const PlayerLink: React.FC<PlayerLinkProps> = ({ skater, onClose }) => {
  const [team, setTeam] = React.useState<Team | undefined>()

  React.useEffect(() => {
    setTeam(teams.find((team) => team.teamID === skater.team_id))
  }, [skater])

  return (
    <>
      {team && (
        <Link as={RouterLink} to={`/player/${skater.player_id}`} onClick={onClose}>
          <Center h='65px' shadow='md'>
            <Image width='65px' src={team.image_url}></Image>
            <Text fontSize={20} fontWeight='bold'>
              {skater.player}
            </Text>
          </Center>
        </Link>
      )}
    </>
  )
}
