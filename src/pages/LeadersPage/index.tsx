import { Container } from '@chakra-ui/layout'
import { Text, Box, Heading, HStack, Select } from '@chakra-ui/react'
import * as React from 'react'
import { usePlayers } from '../../context'
import { GoalieScoring, SkaterScoring } from '../../types/app'

import { getSortedGoalies, getSortedSkaters } from '../../utils/helper'

import { SmallStatTable } from '../../utils/SmallStatTable'
import {
  faceoffsColumns,
  goalsAgainstColumns,
  goalsColumns,
  penaltiesColumns,
  pointsColumns,
  savesColumns,
  shootingColumns,
} from './tables'

export const LeadersPage = () => {
  const { skaters, goalies } = usePlayers()

  const [topSkaters, setTopSkaters] = React.useState<SkaterScoring[]>([])
  const [topGoalies, setTopGoalies] = React.useState<GoalieScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')
  const [category, setCategory] = React.useState('points')

  React.useEffect(() => {
    // set default sort attributes for each category
    if (category === 'points') {
      setTopSkaters(getSortedSkaters(skaters, 'points').slice(0, 100))
      setTopGoalies([])
      setSortAttribute('points')
    } else if (category === 'goals') {
      setTopSkaters(getSortedSkaters(skaters, 'goals').slice(0, 100))
      setTopGoalies([])
      setSortAttribute('goals')
    } else if (category === 'shooting') {
      setTopSkaters(getSortedSkaters(skaters, 'shots_on_goal').slice(0, 100))
      setTopGoalies([])
      setSortAttribute('shots_on_goal')
    } else if (category === 'penalties') {
      setTopSkaters(getSortedSkaters(skaters, 'penalty_minutes').slice(0, 100))
      setTopGoalies([])
      setSortAttribute('penalty_minutes')
    } else if (category === 'faceoffs') {
      setTopSkaters(getSortedSkaters(skaters, 'faceoff_wins').slice(0, 100))
      setTopGoalies([])
      setSortAttribute('faceoff_wins')
    } else if (category === 'saves') {
      setTopGoalies(getSortedGoalies(goalies, 'saves').slice(0, 100))
      setTopSkaters([])
      setSortAttribute('saves')
    } else if (category === 'goals_against') {
      setTopGoalies(getSortedGoalies(goalies, 'goals_against').slice(0, 100))
      setTopSkaters([])
      setSortAttribute('goals_against')
    }
  }, [category, goalies, skaters])

  const handleSortSkatersColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setTopSkaters(getSortedSkaters(skaters, attr).slice(0, 100))
      setTopGoalies([])
      setSortAttribute(attr)
    }
  }

  const handleSortGoaliesColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setTopGoalies(getSortedGoalies(goalies, attr).slice(0, 100))
      setTopSkaters([])
      setSortAttribute(attr)
    }
  }

  return (
    <Container pt={20} pb={7}>
      <Heading textAlign='center'>League Leaders</Heading>
      <Box h='2px' bg='gray.400' width='90%' my={2} mx='auto' />

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
          <option disabled>SKATERS</option>
          <option value='points'>Points</option>
          <option value='goals'>Goals</option>
          <option value='shooting'>Shooting</option>
          <option value='penalties'>Penalties</option>
          <option value='faceoffs'>Faceoffs</option>

          <option disabled>GOALIES</option>
          <option value='goals_against'>Goals Against</option>
          <option value='saves'>Saves</option>
        </Select>
      </HStack>

      {/* scoring */}
      {category === 'points' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          skaterScoring={topSkaters}
          columns={pointsColumns}
        />
      )}
      {/* goals */}
      {category === 'goals' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          skaterScoring={topSkaters}
          columns={goalsColumns}
        />
      )}
      {/* shooting */}
      {category === 'shooting' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          skaterScoring={topSkaters}
          columns={shootingColumns}
        />
      )}
      {/* penalties */}
      {category === 'penalties' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          skaterScoring={topSkaters}
          columns={penaltiesColumns}
        />
      )}
      {/* faceoffs */}
      {category === 'faceoffs' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          skaterScoring={topSkaters}
          columns={faceoffsColumns}
        />
      )}

      {/* penalties */}
      {category === 'goals_against' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortGoaliesColumn}
          goalieScoring={topGoalies}
          columns={goalsAgainstColumns}
        />
      )}
      {/* faceoffs */}
      {category === 'saves' && (
        <SmallStatTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortGoaliesColumn}
          goalieScoring={topGoalies}
          columns={savesColumns}
        />
      )}
    </Container>
  )
}
