import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as BrowserLink } from 'react-router-dom'
import { CheckCircleIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { FaTimesCircle } from 'react-icons/fa'

export const SOAttemptRow = () => {
  return (
    <Tr>
      <Td p={2}>1</Td>
      <Td p={2}>
        <Link as={BrowserLink} to='/team'>
          SJS
        </Link>
      </Td>
      <Td p={2}>
        <Link as={BrowserLink} to='/player'>
          Joe Thornton
        </Link>
      </Td>
      <Td p={2}>
        <CheckIcon color='green.500' />
        {/* <CloseIcon color='red.500' /> */}
      </Td>
      <Td p={2}>
        <Link as={BrowserLink} to='/player'>
          Darcy Kuemper
        </Link>
      </Td>
    </Tr>
  )
}
