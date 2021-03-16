export const goalieColumns = [
  {
    header_name: 'Player',
    isSortable: false,
    hasPlayerLink: true,
    attr: 'player',
  },
  {
    header_name: 'DEC',
    isSortable: true,
    attr: 'decision',
    isNumeric: true,
  },

  {
    header_name: 'SA',
    isSortable: true,
    attr: 'shots_against',
    isNumeric: true,
  },
  {
    header_name: 'GA',
    isSortable: true,
    attr: 'goals_against',
    isNumeric: true,
  },
  {
    header_name: 'SV',
    isSortable: true,
    attr: 'saves',
    isNumeric: true,
  },
  {
    header_name: 'SV%',
    isSortable: true,
    attr: 'save_percentage',
    isNumeric: true,
    isGoaliePercentage: true,
  },
]
