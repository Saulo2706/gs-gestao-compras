import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import {AppProvider} from '../data/context/AppContext'
import { AuthProvider } from '../data/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <ReactNotification />
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
