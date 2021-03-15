import { Th } from '@chakra-ui/react'
import * as React from 'react'

interface SortableThProps {
  ThAttribute: string
  sortAttribute: string
}

export const SortableTh: React.FC<SortableThProps> = ({ sortAttribute, ThAttribute, children }) => {
  return (
    <Th
      px={1}
      isNumeric
      textDecoration='underline'
      fontWeight={sortAttribute === ThAttribute ? 'bold' : 'normal'}
    >
      {children}
    </Th>
  )
}
