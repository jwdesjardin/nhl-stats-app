import { Text, Box, Link, Image } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface TeamPageLinksProps {
  teamID: string
  teamName: string
  imgURL: string
}

export const TeamPageLinks: React.FC<TeamPageLinksProps> = ({ teamID, teamName, imgURL }) => {
  return (
    <Link as={RouterLink} to={`/team/${teamID}`}>
      <Box p={2} d='flex' alignItems='center' shadow='md'>
        <Image width='40px' src={imgURL} />
        <Text fontSize={14} ml='.5rem'>
          {teamName}
        </Text>
      </Box>
    </Link>
  )
}
