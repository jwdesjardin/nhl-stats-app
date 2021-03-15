import { Box, HStack, Text, Select } from '@chakra-ui/react'

import * as React from 'react'
import { SkaterGame } from '../../../types/gameSummary'
import { getSortedSkatersGame } from '../../../utils/helper'

import { GoalsStatsTable } from './GoalsStatsTable'
import { PointsStatsTable } from './PointsStatsTable'
import { ShootingStatsTable } from './ShootingStatsTable'

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

  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
        <PointsStatsTable
          sortAttribute={sortAttribute}
          sortedSkaters={sortedSkaters}
          handleSortColumn={handleSortColumn}
        />
      )}
      {category === 'goals' && (
        <GoalsStatsTable
          sortAttribute={sortAttribute}
          sortedSkaters={sortedSkaters}
          handleSortColumn={handleSortColumn}
        />
      )}
      {category === 'shooting' && (
        <ShootingStatsTable
          sortAttribute={sortAttribute}
          sortedSkaters={sortedSkaters}
          handleSortColumn={handleSortColumn}
        />
      )}
    </Box>
  )
}
