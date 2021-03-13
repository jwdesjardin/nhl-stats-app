import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Heading, Image, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { CustomDrawer } from './CustomDrawer'

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      h='50px'
      w='100vw'
      d='flex'
      bg='white'
      justifyContent='space-between'
      alignItems='center'
      fontSize='xl'
      p={2}
      pos='fixed'
    >
      {/* Empty box for spacing */}
      <Box />

      {/* site name and logo */}
      <Box d='flex'>
        <Image htmlWidth='55px' src='/images/nhl.gif' objectFit='contain' />
        <Heading fontFamily='heading' fontSize={32} fontWeight='extrabold'>
          NHLStats
        </Heading>
      </Box>

      {/* menu icon */}
      <HamburgerIcon onClick={onOpen} m={2} />

      {/* Drawer */}
      <CustomDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
