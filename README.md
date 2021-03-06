# NHL Stats App

this project was bootstrapped using:

```
npx create-react-app client --template @chakra-ui/typescript
```

## screens

- [x] home page
- [x] team page
- [x] players page
- [x] full schedule page
- [x] leaders page
- [x] game page
- [x] menu page

## features

- [x] home page
  - [x] todays games
  - [x] standings
- [x] team page
  - [x] team data
  - [x] recent games
    - [x] toggle more games
  - [x] scoring leaders
  - [x] injuries
  - [x] goalie stats
  - [x] conference standings
  - [x] upcoming games
    - [x] full schedule link
  - [x] roster stats
- [x] full schedule page
  - [x] previous games
  - [x] upcoming games
- [x] players page
  - [x] player data
  - [x] goals leaderboard
  - [x] assists leaderboard
  - [x] points leaderboard
  - [x] season scoring
  - [x] goalies stats GAA, s%, SO
- [x] leaders page
  - [x] leaderboard
  - [.] toggle by stat (logic tweaks nulls and accending stats)
    - [x] goals, points, assists
    - [x] gw, sh, pp
    - [x] shots, hits, fo %, fo wins
    - [x] gaa, s%, SO, ga, saves
    - [x] pims, +/-, atoi
- [x] game page
  - [x] head to head summary
  - [x] penalties by period
  - [x] scoring by period
  - [x] home and away scoring
- [x] menu page
  - [x] navigation links
  - [x] menu overlay
  - [x] conference dropdowns
  - [x] team link dropdowns

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
