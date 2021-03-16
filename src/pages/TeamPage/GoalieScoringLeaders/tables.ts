export const savesColumns = [
  {
    header_name: 'RK',
    isSortable: false,
    attr: 'rank',
    isPrimaryIndex: true,
  },
  {
    header_name: 'POS',
    isSortable: false,
    attr: 'position',
  },
  {
    header_name: 'Player',
    isSortable: false,
    hasPlayerLink: true,
    attr: 'player',
  },
  {
    header_name: 'GS',
    isSortable: false,
    attr: 'games_started',
  },

  {
    header_name: 'SHOTS',
    isSortable: true,
    attr: 'shots_against',
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
export const goalsColumns = [
  {
    header_name: 'RK',
    isSortable: false,
    attr: 'rank',
    isPrimaryIndex: true,
  },
  {
    header_name: 'POS',
    isSortable: false,
    attr: 'position',
  },
  {
    header_name: 'Player',
    isSortable: false,
    hasPlayerLink: true,
    attr: 'player',
  },
  {
    header_name: 'GS',
    isSortable: false,
    attr: 'games_started',
  },

  {
    header_name: 'SHOTS',
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
    header_name: 'GAA',
    isSortable: true,
    attr: 'goals_against_average',
    isNumeric: true,
    isGoaliePercentage: true,
  },
  {
    header_name: 'SO',
    isSortable: true,
    attr: 'shutouts',
    isNumeric: true,
  },
]
