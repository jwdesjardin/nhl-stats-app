import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/Homepage'
import { Navbar } from './utils/Navbar'
import { Box } from '@chakra-ui/react'
import { LeadersPage } from './pages/LeadersPage'
import { GameSummaryPage } from './pages/GameSummaryPage'
import { TeamPage } from './pages/TeamPage'

// import app data

export const App = () => {
  return (
    <Router>
      <Box bg='blackAlpha.200' width='100vw' h='100%'>
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          <Route path='/home' component={HomePage} />
          <Route path='/leaders' component={LeadersPage} />
          <Route path='/team' component={TeamPage} />
          <Route path='/game-summary' component={GameSummaryPage} />
        </Switch>
      </Box>
    </Router>
  )
}
