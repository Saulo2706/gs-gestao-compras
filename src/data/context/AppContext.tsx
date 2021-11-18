import Router from "next/router";
import { createContext, useEffect, useState } from "react";
interface AppContextProps{
    theme: string
    alterTheme?: () => void
    mode: string
    alterMode?: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    alterTheme: null,
    mode: null,
    alterMode: null,
    
})

export function AppProvider(props){
    const [theme, setTheme] = useState('dark')
    const [mode, setMode] = useState('provider')


    function alterTheme(){
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme',newTheme)
    }
    
    function alterMode(){
        const newMode = mode === '' ? 'provider' : ''
        setMode(newMode)
        localStorage.setItem('mode',newMode)
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
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext 