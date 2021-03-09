import { HamburgerIcon } from '@chakra-ui/icons'
import { Text, Box, Link, VStack, Heading, Image, AspectRatio, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, Center, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  interface TeamPageLinksProps {
    teamID: string
    teamName: string
    imgURL: string
  } 

  const TeamPageLinks: React.FC<TeamPageLinksProps> = ({teamID, teamName, imgURL }) => {
    return (
      <Link as={RouterLink} to={`/teams/${teamID}`}>
        <Box p={2} d='flex' alignItems='center' shadow='md'>
          <Image width='40px' src={imgURL} />
          <Text fontSize={14}  ml='.5rem'>{teamName}</Text>  
        </Box>          
      </Link>
    )
  }
  

  return (

    <Box h='50px' w='100vw' d='flex' bg='white' justifyContent='space-between' alignItems='center' fontSize="xl" p={2}>
      <Box />

      {/* site name and logo */}
      <Box d='flex' >
        <Image htmlWidth='55px' src='images/nhl.gif' objectFit="cover" />
        <Heading fontFamily='heading' fontSize={32} fontWeight='extrabold' >NHLStats</Heading>
      </Box>

      {/* menu icon */}
      <HamburgerIcon  onClick={onOpen} />


      {/* menu drawer */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            {/* drawer header */}
            <Box d='flex' p={2}>
              <Image htmlWidth='55px' src='images/nhl.gif' objectFit="cover" />
              <Heading fontFamily='heading' fontSize={32} fontWeight='extrabold' >NHLStats</Heading>
            </Box>

            <DrawerBody p={0}>
              {/* player search */}
              <Box d='flex' bg='blackAlpha.600' p={2}>
                <Input placeholder="skater, goalie..." />
                <Button >Search</Button>
              </Box>


              {/* leaders link */}
              <Link as={RouterLink} to='/leaders'>
                <Center h='65px' shadow='md'>
                  <Text fontSize={20} fontWeight='bold'>Leaders</Text>  
                </Center>          
                        
              </Link>
             
              {/* teams accordian */}
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  
                    <AccordionButton h='65px' shadow='md'>
                      <Box flex="1" textAlign="center" fontSize={20} fontWeight='bold'>
                        Teams
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                 
                  <AccordionPanel p={0} m={0} >
                    {/* western conference */}
                    <Accordion defaultIndex={[0]} allowMultiple>
                      <AccordionItem>
                        <AccordionButton shadow='md' >
                          <Box flex="1" textAlign="center">
                            Western Conference
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={0}>
                          
                          {teams.western_conference.map(team => <TeamPageLinks teamID={team.teamID} teamName={team.name} imgURL={team.image_url} />)}
                          {teams.easter_conference.map(team => <TeamPageLinks teamID={team.teamID} teamName={team.name} imgURL={team.image_url} />)}
                          {teams.northern_conference.map(team => <TeamPageLinks teamID={team.teamID} teamName={team.name} imgURL={team.image_url} />)}
                          {teams.central_conference.map(team => <TeamPageLinks teamID={team.teamID} teamName={team.name} imgURL={team.image_url} />)}
                        
                        
                          
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>

                    {/* eastern conference */}
                    {/* nothern conference */}
                    {/* central conference */}







                    
                  </AccordionPanel>
                </AccordionItem>

              
              </Accordion>          
                          
  


            </DrawerBody>

            
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

export default Navbar