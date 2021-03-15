import { Text, Box, HStack, Link, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as React from 'react'
import { GoalieGame } from '../../../types/gameSummary'
import { Link as RouterLink } from 'react-router-dom'
import { SortableButton } from '../../../utils/SortableButton'
import { SortableTh } from '../../../utils/SortableTh'
import { getSortedGoaliesGame } from '../../../utils/helper'

interface GoalieScoringSummaryProps {
  summary: GoalieGame[]
}

export const GoalieScoringSummary: React.FC<GoalieScoringSummaryProps> = ({ summary }) => {
  const [sortedGoalies, setSortedGoalies] = React.useState<GoalieGame[]>([])
  const [sortAttribute, setSortAttribute] = React.useState('')

  React.useEffect(() => {
    setSortedGoalies(getSortedGoaliesGame(summary, 'saves'))
    setSortAttribute('saves')
  }, [summary])

  const handleSortColumn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedGoalies(getSortedGoaliesGame(summary, attr))
      setSortAttribute(attr)
    }
  }

  return (
    <>
      <HStack mb={2}>
        <Text>Sort Column:</Text>
        <Box d='flex' alignItems='center' justifyContent='center'>
          <SortableButton
            attribute='shots_against'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SA
          </SortableButton>
          <SortableButton
            attribute='goals_against'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            GA
          </SortableButton>
          <SortableButton
            attribute='saves'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SV
          </SortableButton>
          <SortableButton
            attribute='save_percentage'
            sortAttribute={sortAttribute}
            handleSortColumn={handleSortColumn}
          >
            SV%
          </SortableButton>
        </Box>
      </HStack>
      <Box bg='white' border='2px solid black' p={4} borderRadius='lg'>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th px={1}>Player</Th>
              <Th px={1}>DEC</Th>
              <SortableTh ThAttribute='shots_against' sortAttribute={sortAttribute}>
                SA
              </SortableTh>
              <SortableTh ThAttribute='goals_against' sortAttribute={sortAttribute}>
                GA
              </SortableTh>
              <SortableTh ThAttribute='saves' sortAttribute={sortAttribute}>
                SV
              </SortableTh>
              <SortableTh ThAttribute='save_percentage' sortAttribute={sortAttribute}>
                SV%
              </SortableTh>
            </Tr>
          </Thead>
          <Tbody>
            {sortedGoalies.map((goalie) => (
              <Tr key={goalie.player_id}>
                <Td px={1}>
                  <Link as={RouterLink} to={`/player/${goalie.player_id}`}>
                    {goalie.player}
                  </Link>
                </Td>
                <Td px={1}>{goalie.decision}</Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'shots_against' ? 'bold' : 'normal'}
                >
                  {goalie.shots_against}
                </Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'goals_against' ? 'bold' : 'normal'}
                >
                  {goalie.goals_against}
                </Td>
                <Td px={1} isNumeric fontWeight={sortAttribute === 'saves' ? 'bold' : 'normal'}>
                  {goalie.saves}
                </Td>
                <Td
                  px={1}
                  isNumeric
                  fontWeight={sortAttribute === 'save_percentage' ? 'bold' : 'normal'}
                >
                  {goalie.save_percentage}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
