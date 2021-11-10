import Router from "next/router";
import { createContext, useEffect, useState } from "react";
interface AppContextProps{
    theme: string
    alterTheme?: () => void
    mode: string
    alterMode?: () => void
    baseUrl: string
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    alterTheme: null,
    mode: null,
    alterMode: null,
    baseUrl: null
    
})

export function AppProvider(props){
    const [theme, setTheme] = useState('dark')
    const [mode, setMode] = useState('provider')

    const baseUrl = 'https://25.1.175.3:8443';

    function alterTheme(){
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme',newTheme)
        if (Router.pathname == "/app/partners" ) {
            Router.reload()
        }
    }
    
    function alterMode(){
        const newMode = mode === '' ? 'provider' : ''
        setMode(newMode)
        localStorage.setItem('mode',newMode)
        if (Router.pathname == "/app/partners" ) {
            Router.reload()
        }
    }

    useEffect(() =>{
        const savedTheme = localStorage.getItem('theme')
        setTheme(savedTheme)
        const savedMode = localStorage.getItem('mode')
        setMode(savedMode)
    },[])
    
    return(
        <AppContext.Provider value={{
            theme,
            alterTheme,
            mode,
            alterMode,
            baseUrl,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext 