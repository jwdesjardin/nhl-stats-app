import * as React from 'react'

import { Box, Select, Text, HStack } from '@chakra-ui/react'

import { SkaterScoring } from '../../../types/app'

import { SkaterPointsTable } from '../../../utils/ScoringTables/SkaterPointsTable'
import { SkaterGoalsTable } from '../../../utils/ScoringTables/SkaterGoalsTable'
import { SkaterShootingTable } from '../../../utils/ScoringTables/SkaterShootingTable'
import { SkaterPenaltiesTable } from '../../../utils/ScoringTables/SkaterPenaltiesTable'
import { SkaterFaceoffsTable } from '../../../utils/ScoringTables/SkaterFaceoffsTable'

interface SkaterScoringLeadersProps {
  skaterScoring: SkaterScoring[]
}

export const SkaterScoringLeaders: React.FC<SkaterScoringLeadersProps> = ({ skaterScoring }) => {
  const [category, setCategory] = React.useState('points')
  const [sortedSkaters, setSortedSkaters] = React.useState<SkaterScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
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

  const getSortedSkaters = (skaters: SkaterScoring[], attr: string) => {
    return skaters.sort((a, b) => {
      let stat_A: number
      let stat_B: number

      if (attr === 'faceoff_taken') {
        stat_A = a.faceoff_wins + a.faceoff_losses
        stat_B = b.faceoff_wins + b.faceoff_losses
      } else {
        // either two stats values or two empty strings
        const A = Object.entries(a)
        stat_A = parseFloat((A.find((entry) => entry[0] === attr) || ['', ''])[1])
        const B = Object.entries(b)
        stat_B = parseFloat((B.find((entry) => entry[0] === attr) || ['', ''])[1])
      }

      if (stat_A !== null && stat_B !== null) {
        return stat_B - stat_A
      }
      //move nulls to the bottom
      if (stat_A === null) {
        return 1
      }
      if (stat_B === null) {
        return -1
      }
      return 0
    })
  }

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
      {/* stat select */}
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

      {/* scoring */}
      {category === 'points' && (
        <SkaterPointsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          sortedSkaters={sortedSkaters}
        />
      )}

      {/* goals */}
      {category === 'goals' && (
        <SkaterGoalsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          sortedSkaters={sortedSkaters}
        />
      )}

      {/* shooting */}
      {category === 'shooting' && (
        <SkaterShootingTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          sortedSkaters={sortedSkaters}
        />
      )}

      {/* physical */}
      {category === 'penalties' && (
        <SkaterPenaltiesTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          sortedSkaters={sortedSkaters}
        />
      )}

      {/* faceoffs */}
      {category === 'faceoffs' && (
        <SkaterFaceoffsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
          sortedSkaters={sortedSkaters}
        />
      )}
    </Box>
  )
}
