export const pointsColumns = [
  {
    header_name: 'Player',
    isSortable: false,
    hasPlayerLink: true,
    attr: 'player',
  },
  {
    header_name: 'TOI',
    isSortable: true,
    attr: 'time_on_ice',
    isNumeric: true,
  },

  {
    header_name: 'PTS',
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
  {
    header_name: '+/-',
    isSortable: true,
    attr: 'plus_minus',
    isNumeric: true,
  },
  {
    header_name: 'Pims',
    isSortable: true,
    attr: 'penalty_minutes',
    isNumeric: true,
  },
]

export const goalsColumns = [
  {
    header_name: 'Player',
    isSortable: false,
    hasPlayerLink: true,
    attr: 'player',
  },
  {
    header_name: 'TOI',
    isSortable: true,
    attr: 'time_on_ice',
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
    header_name: 'Player',
    isSortable: false,
    hasPlayerLink: true,
    attr: 'player',
  },
  {
    header_name: 'TOI',
    isSortable: true,
    attr: 'time_on_ice',
    isNumeric: true,
  },
  {
    header_name: 'SHFT',
    isSortable: true,
    attr: 'shifts',
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
