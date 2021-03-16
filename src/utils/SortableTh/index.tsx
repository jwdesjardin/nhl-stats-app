import { Th } from '@chakra-ui/react'
import * as React from 'react'

interface SortableThProps {
  ThAttribute: string
  sortAttribute: string
  isNumeric?: boolean
}

export const SortableTh: React.FC<SortableThProps> = ({
  sortAttribute,
  ThAttribute,
  isNumeric,
  children,
}) => {
  return (
    <Th
      px={1}
      isNumeric={isNumeric ? true : false}
      textDecoration='underline'
      fontWeight={sortAttribute === ThAttribute ? 'bold' : 'normal'}
    >
      {children}
    </Th>
  )
}
