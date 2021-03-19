import * as React from 'react'

import { Box, Select, Text, HStack } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { getSortedSkaters } from '../../../utils/helper'
import { SmallStatTable } from '../../../utils/SmallStatTable'
import {
  faceoffsColumns,
  goalsColumns,
  penaltiesColumns,
  pointsColumns,
  shootingColumns,
} from './tables'

interface SkaterScoringLeadersProps {
  skaterScoring: SkaterScoring[]
}

export const SkaterScoringLeaders: React.FC<SkaterScoringLeadersProps> = ({ skaterScoring }) => {
  const [category, setCategory] = React.useState('points')
  const [sortedSkaters, setSortedSkaters] = React.useState<SkaterScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    // set default sort attributes for each category
    if (category === 'points') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'points'))
      setSortAttribute('points')
    } else if (category === 'goals') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'goals'))
      setSortAttribute('goals')
    } else if (category === 'shooting') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'shots_on_goal'))
      setSortAttribute('shots_on_goal')
    } else if (category === 'penalties') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'penalty_minutes'))
      setSortAttribute('penalty_minutes')
    } else if (category === 'faceoffs') {
      setSortedSkaters(getSortedSkaters(skaterScoring, 'faceoff_wins'))
      setSortAttribute('faceoff_wins')
    }
  }, [category, skaterScoring])

  // get attribute from button and set state with sort results
  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedSkaters(getSortedSkaters(skaterScoring, attr))
      setSortAttribute(attr)
    }
  }

  return (
    <Box>
      {/* category select */}
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
          <option value='penalties'>Penalties</option>
          <option value='faceoffs'>Faceoffs</option>
        </Select>
      </HStack>

      {/* scoring table */}
      {category === 'points' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          skaterScoring={sortedSkaters}
          columns={pointsColumns}
        />
      )}
      {/* goals table */}
      {category === 'goals' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          skaterScoring={sortedSkaters}
          columns={goalsColumns}
        />
      )}
      {/* shooting table */}
      {category === 'shooting' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          skaterScoring={sortedSkaters}
          columns={shootingColumns}
        />
      )}
      {/* penalties table */}
      {category === 'penalties' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          skaterScoring={sortedSkaters}
          columns={penaltiesColumns}
        />
      )}
      {/* faceoffs table */}
      {category === 'faceoffs' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          skaterScoring={sortedSkaters}
          columns={faceoffsColumns}
        />
      )}
    </Box>
  )
}
