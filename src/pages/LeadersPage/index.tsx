import { Container } from '@chakra-ui/layout'
import { Text, Box, Heading, HStack, Select } from '@chakra-ui/react'
import * as React from 'react'
import { usePlayers } from '../../context'
import { GoalieScoring, SkaterScoring } from '../../types/app'

import { getSortedGoalies, getSortedSkaters } from '../../utils/helper'
import { SkaterPointsTable } from '../../utils/ScoringTables/SkaterPointsTable'
import { SkaterFaceoffsTable } from '../../utils/ScoringTables/SkaterFaceoffsTable'
import { SkaterPenaltiesTable } from '../../utils/ScoringTables/SkaterPenaltiesTable'
import { SkaterShootingTable } from '../../utils/ScoringTables/SkaterShootingTable'
import { SkaterGoalsTable } from '../../utils/ScoringTables/SkaterGoalsTable'
import { GoalieGoalsTable } from '../../utils/ScoringTables/GoalieGoalsTable'
import { GoalieSavesTable } from '../../utils/ScoringTables/GoalieSavesTable'

export const LeadersPage = () => {
  const { skaters, goalies } = usePlayers()

  const [topSkaters, setTopSkaters] = React.useState<SkaterScoring[]>([])
  const [topGoalies, setTopGoalies] = React.useState<GoalieScoring[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')
  const [category, setCategory] = React.useState('points')

  React.useEffect(() => {
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
      <Heading textAlign='center'>Leaders</Heading>
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

      {category === 'points' && (
        <SkaterPointsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          sortedSkaters={topSkaters}
        />
      )}
      {category === 'goals' && (
        <SkaterGoalsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          sortedSkaters={topSkaters}
        />
      )}
      {category === 'shooting' && (
        <SkaterShootingTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          sortedSkaters={topSkaters}
        />
      )}
      {category === 'penalties' && (
        <SkaterPenaltiesTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          sortedSkaters={topSkaters}
        />
      )}
      {category === 'faceoffs' && (
        <SkaterFaceoffsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortSkatersColumn}
          sortedSkaters={topSkaters}
        />
      )}

      {category === 'goals_against' && (
        <GoalieGoalsTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortGoaliesColumn}
          sortedGoalies={topGoalies}
        />
      )}
      {category === 'saves' && (
        <GoalieSavesTable
          sortAttribute={sortAttribute}
          handleSortColumn={handleSortGoaliesColumn}
          sortedGoalies={topGoalies}
        />
      )}
    </Container>
  )
}
