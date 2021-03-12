export const getStatHeader = (leaderStat: string, setState: (str: string) => void) => {
  switch (leaderStat) {
    case 'goals':
      setState('G')
      break
    case 'assists':
      setState('A')
      break
    case 'points':
      setState('P')
      break
    case 'plus_minus':
      setState('+/-')
      break
    case 'penalty_minutes':
      setState('PIMS')
      break
    case 'ev_goals':
      setState('EV')
      break
    case 'sh_goals':
      setState('SH')
      break
    case 'pp_goals':
      setState('PP')
      break
    case 'gw_goals':
      setState('GW')
      break
    case 'shots_on_goal':
      setState('SHOTS')
      break
    case 'average_time_on_ice':
      setState('ATOI')
      break
    case 'hits':
      setState('HITS')
      break
    case 'faceoff_wins':
      setState('FO WINS')
      break
    case 'faceoff_percentage':
      setState('FO %')
      break
    case 'goals_against':
      setState('GA')
      break
    case 'saves':
      setState('SAVES')
      break
    case 'save_percentage':
      setState('SAVE %')
      break
    case 'goals_against_average':
      setState('GAA')
      break
    case 'shutouts':
      setState('SO')
      break
    default:
      setState('')
      break
  }
}
