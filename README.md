# NHL Stats App

this project was bootstrapped using: 

```
npx create-react-app client --template @chakra-ui/typescript
```

## screens
- [.] home page
- [.] team page
- [.] players page
- [.] leders page
- [.] game page
- [.] menu page


## features
- [.] home page
  - [.] todays games
  - [.] standings
- [.] team page
  - [.] team data
  - [.] recent games
    - [.] toggle more games
  - [.] scoring leaders
  - [.] injuries
  - [.] goalie stats
  - [.] conference standings
  - [.] upcoming games
    - [.] full schedule
  - [.] roster stats
- [.] players page
  - [.] player data
  - [.] goals leaderboard
  - [.] assists leaderboard
  - [.] points leaderboard
  - [.] season scoring
  - [.] goalies stats GAA, s%, SO
- [.] leders page
  - [.] leaderboard
  - [.] toggle by stat
    - [.] goals, points, assists
    - [.] gw, sh, pp
    - [.] gaa, s%, SO
    - [.] pims, +/-, atoi
- [.] game page
  - [.] head to head summary
  - [.] penalties by period
  - [.] scoring by period
  - [.] home and away scoring
- [.] menu page
  - [.] navigation links
  - [.] menu overlay
  - [.] conference dropdowns
  - [.] team link dropdowns

## state
```js
  injuries: [ {Injury } ]
  skaters: [ { Skater } ]
  goalies: [ { Goalie } ]
  standings: [ { title: '', teams:[ { Team } ] } ]
  games: [ { Game } ]

  
  team: {
    roster_stats: [ { Player } ]
    skater_stats: [ { Skater } ]
    goalie_stats: [ { Goalie } ]
  }
  game: {
    box_score: { { GameDetails }, home_totals: { TeamGame }, away_totals: { TeamGame } }
    home_scoring: [ { SkaterGame } ]
    home_goalie: [ { GoalieGame } ]
    away_scoring: [ { SkaterGame } ]
    away_goalie: [ { GoalieGame } ]
    scoring_summary: [ { title: '', [ { Goal, SO_Goal } ] } ]
    penalty_summary: [ { title: '', [ { Penalty } ] }]
  }
```
  #### how state will be used in the app: 
- get all games
- get all skater data

## computations
compute scoring leaders
compute conference standings 
create recent games 


- when you go to a team page or player page
  - fetch the team roster data and injury data
  
- when you go to a game page 
  - fetch the game data

our client will reach out to web scraping server which will fetch pages containing nhl data. the server will return the data to the client. 

## getting data from api

**on app load**
- get gamelog
- get skaters
- get goalies
- get injuries
- get standings

**on page request**
- get team (teamid)
- get gameSummary (gameid)