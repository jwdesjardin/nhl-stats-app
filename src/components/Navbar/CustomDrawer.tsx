import {
	Drawer,
	Text,
	Image,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Center,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Heading,
	Input,
	Link,
} from '@chakra-ui/react'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Components
import { ConferenceAccordian } from './ConferenceAccordian'
// Data
import { teams } from '../../data/teams'
// Types
import { Team } from '../../types/app'

interface CustomDrawerProps {
	isOpen: boolean
	onClose: () => void
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({ isOpen, onClose }) => {
	React.useEffect(() => {
		setWesternConference(teams.filter((team) => team.conference === 'West'))
		setEasternConference(teams.filter((team) => team.conference === 'East'))
		setNorthernConference(teams.filter((team) => team.conference === 'North'))
		setCentralConference(teams.filter((team) => team.conference === 'Central'))
	}, [])

	const [westernConference, setWesternConference] = React.useState<Team[]>([])
	const [easternConference, setEasternConference] = React.useState<Team[]>([])
	const [northernConference, setNorthernConference] = React.useState<Team[]>([])
	const [centralConference, setCentralConference] = React.useState<Team[]>([])

	return (
		<Drawer isOpen={isOpen} placement='right' onClose={onClose}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					{/* drawer header */}
					<Box d='flex' p={2}>
						<Image htmlWidth='55px' src='images/nhl.gif' objectFit='cover' />
						<Heading fontFamily='heading' fontSize={32} fontWeight='extrabold'>
							NHLStats
						</Heading>
					</Box>

					<DrawerBody p={0}>
						{/* player search */}
						<Box d='flex' bg='blackAlpha.600' p={2}>
							<Input placeholder='skater, goalie...' />
							<Button>Search</Button>
						</Box>

						{/* leaders link */}
						<Link as={RouterLink} to='/leaders'>
							<Center h='65px' shadow='md'>
								<Text fontSize={20} fontWeight='bold'>
									Leaders
								</Text>
							</Center>
						</Link>

						{/* teams accordian */}
						<Accordion allowMultiple>
							<AccordionItem>
								<AccordionButton h='65px' shadow='md'>
									<Box flex='1' textAlign='center' fontSize={20} fontWeight='bold'>
										Teams
									</Box>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel p={0} m={0}>
									<ConferenceAccordian
										conference={{ name: 'Western Conference', teams: westernConference }}
									/>
									<ConferenceAccordian
										conference={{ name: 'Eastern Conference', teams: easternConference }}
									/>
									<ConferenceAccordian
										conference={{ name: 'Northern Conference', teams: northernConference }}
									/>
									<ConferenceAccordian
										conference={{ name: 'Central Conference', teams: centralConference }}
									/>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</DrawerBody>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	)
}
