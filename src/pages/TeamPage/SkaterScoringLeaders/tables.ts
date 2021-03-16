export const pointsColumns = [
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
    header_name: 'ATOI',
    isSortable: false,
    attr: 'average_time_on_ice',
  },
  {
    header_name: 'GP',
    isSortable: false,
    attr: 'games_played',
    isNumeric: true,
  },
  {
    header_name: 'P',
    isSortable: true,
    attr: 'points',
    isNumeric: true,
  },
  {
    header_name: 'G',
    isSortable: true,
    attr: 'goals',
    isNumeric: true,
  },
  {
    header_name: 'A',
    isSortable: true,
    attr: 'assists',
    isNumeric: true,
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
    header_name: 'ATOI',
    isSortable: false,
    attr: 'average_time_on_ice',
  },
  {
    header_name: 'GP',
    isSortable: false,
    attr: 'games_played',
    isNumeric: true,
  },
  {
    header_name: 'G',
    isSortable: true,
    attr: 'goals',
    isNumeric: true,
  },
  {
    header_name: 'PP',
    isSortable: true,
    attr: 'pp_goals',
    isNumeric: true,
  },
  {
    header_name: 'EV',
    isSortable: true,
    attr: 'ev_goals',
    isNumeric: true,
  },
  {
    header_name: 'GW',
    isSortable: true,
    attr: 'gw_goals',
    isNumeric: true,
  },
  {
    header_name: 'SH',
    isSortable: true,
    attr: 'sh_goals',
    isNumeric: true,
  },
]

export const shootingColumns = [
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
    header_name: 'ATOI',
    isSortable: false,
    attr: 'average_time_on_ice',
  },
  {
    header_name: 'GP',
    isSortable: false,
    attr: 'games_played',
    isNumeric: true,
  },

  {
    header_name: 'G',
    isSortable: true,
    attr: 'goals',
    isNumeric: true,
  },
  {
    header_name: 'SHOT',
    isSortable: true,
    attr: 'shots_on_goal',
    isNumeric: true,
  },
  {
    header_name: 'SHOT%',
    isSortable: true,
    attr: 'shooting_percentage',
    isNumeric: true,
    isSkaterPercentage: true,
  },
]
export const penaltiesColumns = [
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
    header_name: 'ATOI',
    isSortable: false,
    attr: 'average_time_on_ice',
  },
  {
    header_name: 'GP',
    isSortable: false,
    attr: 'games_played',
    isNumeric: true,
  },
  {
    header_name: '+/-',
    isSortable: true,
    attr: 'plus_minus',
    isNumeric: true,
  },

  {
    header_name: 'HITS',
    isSortable: true,
    attr: 'hits',
    isNumeric: true,
  },
  {
    header_name: 'PIMS',
    isSortable: true,
    attr: 'penalty_minutes',
    isNumeric: true,
  },
]
export const faceoffsColumns = [
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
    header_name: 'GP',
    isSortable: false,
    attr: 'games_played',
    isNumeric: true,
  },
  {
    header_name: 'W',
    isSortable: true,
    attr: 'faceoff_wins',
    isNumeric: true,
  },
  {
    header_name: 'L',
    isSortable: true,
    attr: 'faceoff_losses',
    isNumeric: true,
  },
  {
    header_name: 'TAKEN',
    isSortable: true,
    attr: 'faceoff_taken',
    isNumeric: true,
    isFOTaken: true,
  },
  {
    header_name: 'FO%',
    isSortable: true,
    attr: 'faceoff_percentage',
    isNumeric: true,
    isSkaterPercentage: true,
  },
]
