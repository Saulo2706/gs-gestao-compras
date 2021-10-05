import { IconMoon, IconSun } from "../icons";

interface ButtonAlterThemeProps {
    theme: string
    alterTheme: () => void
}

export default function ButtonAlterTheme(props: ButtonAlterThemeProps) {
    return props.theme === 'dark' ? (
        <div onClick={props.alterTheme} className={`
        hidden sm:flex items-center justify-end cursor-pointer
        `}>
            <div className={`
                flex items-center justify-center
                bg-white text-yellow-600 w-6 h-6 rounded-full
            `}>
                {IconSun(5)}
            </div>
        </div>
    ) : (
        <div onClick={props.alterTheme} className={`
            hidden sm:flex items-center justify-end cursor-pointer
        `}>
            <div className={`
                flex items-center justify-center
                bg-black text-yellow-300
                w-6 h-6 rounded-full
            `}>
                {IconMoon(5)}
            </div>
        </div>
    )
}