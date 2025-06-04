import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ApiProvider } from './providers/api.jsx'


import App from './App.jsx'

import './index.css'
import store from './store/index.js'
import { SettingsProvider } from './providers/settings.jsx'

createRoot(document.getElementById('root')).render(
    <ReduxProvider store={store}>
        <SettingsProvider>
            <ApiProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApiProvider>
        </SettingsProvider>
    </ReduxProvider>
)