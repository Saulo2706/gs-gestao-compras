import { createContext, useEffect, useState } from "react";
import companyManagement from "../../pages/app/companyManagement";

//type Theme = 'dark' | ''

interface AppContextProps{
    theme: string
    alterTheme?: () => void
    mode: string
    alterMode?: () => void
    baseUrlAjax: string
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    alterTheme: null,
    mode: null,
    alterMode: null,
    baseUrlAjax: null
    
})

export function AppProvider(props){
    const [theme, setTheme] = useState('dark')
    const [mode, setMode] = useState('provider')

    const baseUrlAjax = 'https://25.1.175.3:8443';

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
            baseUrlAjax,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext 