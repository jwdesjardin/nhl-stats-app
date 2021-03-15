import { Button } from '@chakra-ui/react'
import * as React from 'react'

interface SortableButtonProps {
  handleSortColumn: React.MouseEventHandler<HTMLButtonElement>
  attribute: string
  sortAttribute: string
}

export const SortableButton: React.FC<SortableButtonProps> = ({
  handleSortColumn,
  sortAttribute,
  attribute,
  children,
}) => {
  return (
    <Button
      p={0}
      m={1}
      value={attribute}
      onClick={handleSortColumn}
      bg={sortAttribute === attribute ? 'blackAlpha.800' : 'blackAlpha.300'}
      color={sortAttribute === attribute ? 'white' : 'black'}
    >
      {children}
    </Button>
  )
}
