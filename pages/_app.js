import '@/styles/globals.css'
import '@/styles/home.css'
import '@/styles/admin.css'
import 'leaflet/dist/leaflet.css';

import { context, AuthProvider } from '@/context'

export default function App({ Component, pageProps }) {
  
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
