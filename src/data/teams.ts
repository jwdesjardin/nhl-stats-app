


interface Team {
  teamID: string
  name: string
  image_url: string
}

interface Conference {
  name: string
  teams: Team[]
}


export const teams: Conference[] = [
  { name: "Western Conference",
    teams: [
      {
        name: 'Vegas Golden Knights',
        teamID: 'VEG',
        image_url: 'images/knights.gif'
      },
      {
        name: 'St. Louis Blues',
        teamID: 'STL',
        image_url: 'images/blues.gif'
      },
      {
        name: 'Colorado Avalanche',
        teamID: 'COL',
        image_url: 'images/avalanche.gif'
      },
      {
        name: 'Minnesota Wild',
        teamID: 'MIN',
        image_url: 'images/wild.gif'
      },
      {
        name: 'Los Angeles Kings',
        teamID: 'LAK',
        image_url: 'images/kings.gif'
      },
      {
        name: 'Arizona Coyotes',
        teamID: 'ARI',
        image_url: 'images/coyotes.gif'
      },
      {
        name: 'Anaheim Ducks',
        teamID: 'ANA',
        image_url: 'images/ducks.gif'
      },
      {
        name: 'San Jose Sharks',
        teamID: 'SJS',
        image_url: 'images/sharks.gif'
      }
    ]},
  { name: "Eastern Conference",
    teams: [
      {
        name: 'New York Islanders',
        teamID: 'NYI',
        image_url: 'images/islanders.gif'
      },
      {
        name: 'Washington Capitals',
        teamID: 'WSH',
        image_url: 'images/capitals.gif'
      },
      {
        name: 'Boston Bruins',
        teamID: 'BOS',
        image_url: 'images/bruins.gif'
      },
      {
        name: 'Philadelphia Flyers',
        teamID: 'PHI',
        image_url: 'images/flyers.gif'
      },
      {
        name: 'Pittsburgh Penguins',
        teamID: 'PIT',
        image_url: 'images/penguins.gif'
      },
      {
        name: 'New York Rangers',
        teamID: 'NYR',
        image_url: 'images/rangers.gif'
      },
      {
        name: 'New Jersey Devils',
        teamID: 'NJD',
        image_url: 'images/devils.gif'
      },
      {
        name: 'Buffalo Sabres',
        teamID: 'BUF',
        image_url: 'images/sabres.gif'
      }
    ]},
  { name: "Northern Conference",
    teams: [
      {
        name: 'Toronto Maple Leafs',
        teamID: 'TOR',
        image_url: 'images/mapleleafs.gif'
      },
      {
        name: 'Winnipeg Jets',
        teamID: 'WPG',
        image_url: 'images/jets.gif'
      },
      {
        name: 'Edmonton Oilers',
        teamID: 'EDN',
        image_url: 'images/oilers.gif'
      },
      {
        name: 'Montreal Canadiens',
        teamID: 'MTL',
        image_url: 'images/canadiens.gif'
      },
      {
        name: 'Calgary Flames',
        teamID: 'CGY',
        image_url: 'images/flames.gif'
      },
      {
        name: 'Vancouver Canucks',
        teamID: 'VAN',
        image_url: 'images/canucks.gif'
      },
      {
        name: 'Ottawa Senators',
        teamID: 'OTT',
        image_url: 'images/senators.gif'
      }
    ]},
  { name: "Central Conference",
    teams: [
      {
        name: 'Tampa Bay Lightning',
        teamID: 'TBL',
        image_url: 'images/lightning.gif'
      },
      {
        name: 'Florida Panthers',
        teamID: 'FLA',
        image_url: 'images/panthers.gif'
      },
      {
        name: 'Carolina Hurricanes',
        teamID: 'CAR',
        image_url: 'images/hurricanes.gif'
      },
      {
        name: 'Chicago Blackhawks',
        teamID: 'CHI',
        image_url: 'images/blackhawks.gif'
      },
      {
        name: 'Columbus Blue Jackets',
        teamID: 'CBJ',
        image_url: 'images/bluejackets.gif'
      },
      {
        name: 'Nashville Predators',
        teamID: 'NSH',
        image_url: 'images/predators.gif'
      },
      {
        name: 'Dallas Stars',
        teamID: 'DAL',
        image_url: 'images/stars.gif'
      },
      {
        name: 'Detroit Red Wings',
        teamID: 'DET',
        image_url: 'images/redwings.gif'
      }
    ]},
]