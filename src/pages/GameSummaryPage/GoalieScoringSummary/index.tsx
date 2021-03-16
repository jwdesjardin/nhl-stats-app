import * as React from 'react'
import { GoalieGame } from '../../../types/gameSummary'

import { getSortedGoaliesGame } from '../../../utils/helper'
import { SmallStatTable } from '../../../utils/SmallStatTable'
import { goalieColumns } from './tables'

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

  const handleSortGoalieGame: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const attr = target.value
    console.log(attr)

    if (attr) {
      setSortedGoalies(getSortedGoaliesGame(summary, attr))
      setSortAttribute(attr)
    }
  }

  return (
    <SmallStatTable
      sortAttribute={sortAttribute}
      goalieGames={sortedGoalies}
      handleSortColumn={handleSortGoalieGame}
      columns={goalieColumns}
    />
  )
}
