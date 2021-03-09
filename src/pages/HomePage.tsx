import { Text, Box, Link, VStack, AspectRatio, Image } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <Box textAlign="center" fontSize="xl">
        <VStack spacing={8}>
          <Text>
            Edit and save to reload.
          </Text>
          <Link
            as={RouterLink}
            color="teal.500"
            to="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        
        <Image src='images/nhl.gif' />
        
        </VStack>
    </Box>
  )
}

export default HomePage
