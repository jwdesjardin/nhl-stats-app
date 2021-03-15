import { Box, HStack, Table, Tbody, Td, Th, Thead, Tr, Text, Select } from '@chakra-ui/react'
import { Category } from '@material-ui/icons'
import * as React from 'react'
import { SkaterGame } from '../../../types/gameSummary'
import { SortableButton } from '../../../utils/SortableButton'
import { SortableTh } from '../../../utils/SortableTh'
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
      setSortedSkaters(getSortedSkaters(summary, 'points'))
      setSortAttribute('points')
    } else if (category === 'goals') {
      setSortedSkaters(getSortedSkaters(summary, 'goals'))
      setSortAttribute('goals')
    } else if (category === 'shooting') {
      setSortedSkaters(getSortedSkaters(summary, 'shots_on_goal'))
      setSortAttribute('shots_on_goal')
    }
  }, [category])

  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedSkaters(getSortedSkaters(summary, attr))
      setSortAttribute(attr)
    }
  }

  const getSortedSkaters = (skaters: SkaterGame[], attr: string) => {
    return skaters.sort((a, b) => {
      // either two stats values or two empty strings
      const A = Object.entries(a)
      const stat_A = (A.find((entry) => entry[0] === attr) || ['', ''])[1]
      const B = Object.entries(b)
      const stat_B = (B.find((entry) => entry[0] === attr) || ['', ''])[1]

      if (stat_A !== null && stat_B !== null) {
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
