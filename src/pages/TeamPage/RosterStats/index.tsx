import * as React from 'react'

import { Box, Text, Select, HStack } from '@chakra-ui/react'

import { RosterStat } from '../../../types/team'

import {
  getSortedRosterCountry,
  getSortedRosterDraft,
  getSortedRosterHeight,
  getSortedRosterWithNulls,
} from '../../../utils/helper'
import { RosterSalaryTable } from './RosterSalaryTable'
import { RosterBioTable } from './RosterBioTable'
import { RosterDraftTable } from './RosterDraftTable'
interface RosterStatsProps {
  rosterStats: RosterStat[]
}

export const RosterStats: React.FC<RosterStatsProps> = ({ rosterStats }) => {
  const [category, setCategory] = React.useState('bio')
  const [sortedRoster, setSortedRoster] = React.useState<RosterStat[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    if (category === 'bio') {
      setSortedRoster(getSortedRosterWithNulls(rosterStats, 'age'))
      setSortAttribute('age')
    } else if (category === 'draft') {
      setSortedRoster(getSortedRosterDraft(rosterStats, 'overall'))
      setSortAttribute('overall')
    } else if (category === 'salary') {
      setSortedRoster(getSortedRosterWithNulls(rosterStats, 'salary'))
      setSortAttribute('salary')
    }
  }, [category, rosterStats])

  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr === 'height') {
      setSortedRoster(getSortedRosterHeight(rosterStats))
      setSortAttribute(attr)
    } else if (attr === 'country') {
      setSortedRoster(getSortedRosterCountry(rosterStats))
      setSortAttribute(attr)
    } else if (['round', 'year', 'overall'].includes(attr)) {
      setSortedRoster(getSortedRosterDraft(rosterStats, attr))
      setSortAttribute(attr)
    } else {
      setSortedRoster(getSortedRosterWithNulls(rosterStats, attr))
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
          defaultValue='bio'
        >
          <option value='salary'>Salary</option>
          <option value='bio'>Bio</option>
          <option value='draft'>Draft</option>
        </Select>
      </HStack>

      {category === 'draft' && (
        <RosterDraftTable
          sortedRoster={sortedRoster}
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
        />
      )}

      {category === 'bio' && (
        <RosterBioTable
          sortedRoster={sortedRoster}
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
        />
      )}

      {category === 'salary' && (
        <RosterSalaryTable
          sortedRoster={sortedRoster}
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortColumn}
        />
      )}
    </Box>
  )
}
