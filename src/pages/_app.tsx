import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import {AppProvider} from '../data/context/AppContext'


function MyApp({ Component, pageProps }) {
  return (
      <AppProvider>
        <ReactNotification />
        <Component {...pageProps} />
      </AppProvider>
  )
}

export default MyApp
