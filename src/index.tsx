import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { GamelogProvider, InjuriesProvider, PlayersProvider, StandingsProvider } from './context'

import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <PlayersProvider>
        <GamelogProvider>
          <InjuriesProvider>
            <StandingsProvider>
              <App />
            </StandingsProvider>
          </InjuriesProvider>
        </GamelogProvider>
      </PlayersProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
