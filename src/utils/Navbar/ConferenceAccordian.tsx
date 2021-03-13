import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React from 'react'

//types
import { Team } from '../../types/app'
//components
import { TeamPageLinks } from './TeamPageLinks'

interface ConferenceAccordianProps {
  conference: {
    name: string
    teams: Team[]
  }
}

export const ConferenceAccordian: React.FC<ConferenceAccordianProps> = ({ conference }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton shadow='md'>
          <Box flex='1' textAlign='center'>
            {conference.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          {conference.teams.map((team) => (
            <TeamPageLinks
              key={team.teamID}
              teamID={team.teamID}
              teamName={team.name}
              imgURL={team.image_url}
            />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
