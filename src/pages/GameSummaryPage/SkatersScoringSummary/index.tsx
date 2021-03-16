import { Box, HStack, Text, Select } from '@chakra-ui/react'

import * as React from 'react'
import { SkaterGame } from '../../../types/gameSummary'
import { getSortedSkatersGame } from '../../../utils/helper'
import { SmallStatTable } from '../../../utils/SmallStatTable'
import { goalsColumns, pointsColumns, shootingColumns } from './tables'

interface SkatersScoringSummaryProps {
  summary: SkaterGame[]
}

export const SkatersScoringSummary: React.FC<SkatersScoringSummaryProps> = ({ summary }) => {
  const [category, setCategory] = React.useState('points')
  const [sortedSkaters, setSortedSkaters] = React.useState<SkaterGame[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    if (category === 'points') {
      setSortedSkaters(getSortedSkatersGame(summary, 'points'))
      setSortAttribute('points')
    } else if (category === 'goals') {
      setSortedSkaters(getSortedSkatersGame(summary, 'goals'))
      setSortAttribute('goals')
    } else if (category === 'shooting') {
      setSortedSkaters(getSortedSkatersGame(summary, 'shots_on_goal'))
      setSortAttribute('shots_on_goal')
    }
  }, [category, summary])

  const handleSortSkaterGame: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedSkaters(getSortedSkatersGame(summary, attr))
      setSortAttribute(attr)
    }
  }

  return (
    <Box>
      <HStack mb={2}>
        <Text>Categories:</Text>
        <Select
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          bg='cyan.200'
          defaultValue='points'
        >
          <option value='points'>Points</option>
          <option value='goals'>Goals</option>
          <option value='shooting'>Shooting</option>
        </Select>
      </HStack>

      {category === 'points' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          skaterGames={sortedSkaters}
          handleSortColumn={handleSortSkaterGame}
          columns={pointsColumns}
        />
      )}
      {category === 'goals' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          skaterGames={sortedSkaters}
          handleSortColumn={handleSortSkaterGame}
          columns={goalsColumns}
        />
      )}
      {category === 'shooting' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          skaterGames={sortedSkaters}
          handleSortColumn={handleSortSkaterGame}
          columns={shootingColumns}
        />
      )}
    </Box>
  )
}
