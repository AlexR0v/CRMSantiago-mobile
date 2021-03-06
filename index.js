import 'react-native-gesture-handler'
///
import React                         from 'react'
import { AppRegistry }               from 'react-native'
import { SafeAreaProvider }          from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider }                  from 'react-redux'
import { name as appName }           from './app.json'
import App                           from './src/app/App.tsx'
import { store }                     from './src/app/store/index.ts'

const Main = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  </SafeAreaProvider>
)

AppRegistry.registerComponent(appName, () => Main)
