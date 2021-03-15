import * as React from 'react'

import { Box, Select, HStack, Text } from '@chakra-ui/react'

import { GoalieScoring } from '../../../types/app'

import { GoalieSavesTable } from '../../../utils/ScoringTables/GoalieSavesTable'
import { GoalieGoalsTable } from '../../../utils/ScoringTables/GoalieGoalsTable'

interface GoalieScoringLeadersProps {
  goalieScoring: GoalieScoring[]
}

export const GoalieScoringLeaders: React.FC<GoalieScoringLeadersProps> = ({ goalieScoring }) => {
  const [category, setCategory] = React.useState('saves')
  const [sortedGoalies, setSortedGoalies] = React.useState<GoalieScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    if (category === 'saves') {
      setSortedGoalies(getSortedGoalies(goalieScoring, 'saves'))
      setSortAttribute('saves')
    } else if (category === 'goals') {
      setSortedGoalies(getSortedGoalies(goalieScoring, 'goals_against_average'))
      setSortAttribute('goals_against_average')
    }
  }, [category, goalieScoring])

  const getSortedGoalies = (goalies: GoalieScoring[], attr: string) => {
    return goalies.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

      if (stat_A !== null && stat_B !== null) {
        if (attr === 'goals_against' || attr === 'goals_against_average') {
          return parseFloat(stat_A) - parseFloat(stat_B)
        }
        return parseFloat(stat_B) - parseFloat(stat_A)
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
      setSortedGoalies(getSortedGoalies(goalieScoring, attr))
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
          defaultValue='saves'
        >
          <option value='saves'>Saves</option>
          <option value='goals'>Goals</option>
        </Select>
      </HStack>

      {category === 'saves' && (
        <GoalieSavesTable
          sortAttribute={sortAttribute}
          sortedGoalies={sortedGoalies}
          handleSortColumn={handleSortColumn}
        />
      )}

      {category === 'goals' && (
        <GoalieGoalsTable
          sortAttribute={sortAttribute}
          sortedGoalies={sortedGoalies}
          handleSortColumn={handleSortColumn}
        />
      )}
    </Box>
  )
}
