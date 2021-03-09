import * as React from "react"
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import Navbar from './components/Navbar'
import { Box } from "@chakra-ui/react"

export const App = () => (
    <Router>
      <Box bg='blackAlpha.200' width='100vw' h='100vh'>
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          <Route path='/home' component={HomePage} />
        </Switch>
      </Box>
    </Router>
 
)
