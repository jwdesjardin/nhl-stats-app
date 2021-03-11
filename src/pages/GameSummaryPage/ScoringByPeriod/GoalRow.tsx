import * as React from 'react'
import { Link, Td, Tr } from '@chakra-ui/react'
import { Link as BrowserLink } from 'react-router-dom'

export const GoalRow = () => {
  return (
    <Tr>
      <Td p={2}>06:34</Td>
      <Td p={2}>
        <Link as={BrowserLink} to='/team'>
          OTT
        </Link>
      </Td>
      <Td p={2}>PP</Td>
      <Td p={2}>
        <Link as={BrowserLink} to='/player'>
          Joe Thornton
        </Link>{' '}
        (10)
      </Td>
      <Td p={2}>
        <Link as={BrowserLink} to='/player'>
          Joe Thornton
        </Link>
        ,{' '}
        <Link as={BrowserLink} to='/player'>
          Joe Thornton
        </Link>
      </Td>
    </Tr>
  )
}
