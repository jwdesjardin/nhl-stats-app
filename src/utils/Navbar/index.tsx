import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Heading, Image, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { CustomDrawer } from './CustomDrawer'

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      h='70px'
      w='100vw'
      d='flex'
      bg='white'
      justifyContent='space-between'
      alignItems='center'
      fontSize='xl'
      p={2}
      pos='fixed'
      zIndex='banner'
    >
      {/* Empty box for spacing */}
      <Box />

      {/* site name and logo */}
      <Box d='flex' alignItems='center'>
        <Image htmlWidth='55px' src='/images/nhl.gif' objectFit='contain' />
        <Heading fontFamily='heading' fontSize={36} fontWeight='extrabold'>
          NHLStats
        </Heading>
      </Box>

      {/* menu icon */}
      <HamburgerIcon fontSize={28} onClick={onOpen} mr={4} />

      {/* Drawer */}
      <CustomDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
