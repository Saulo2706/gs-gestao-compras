import { createContext, useEffect, useState } from "react";

//type Theme = 'dark' | ''

interface AppContextProps{
    theme: string
    alterTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    alterTheme: null
})

export function AppProvider(props){
    const [theme, setTheme] = useState('dark')

    function alterTheme(){
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme',newTheme)
    }

    useEffect(() =>{
        const savedTheme = localStorage.getItem('theme')
        setTheme(savedTheme)
    },[])
    
    return(
        <AppContext.Provider value={{
            theme,
            alterTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext 