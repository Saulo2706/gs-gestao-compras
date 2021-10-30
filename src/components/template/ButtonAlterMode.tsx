import { IconShopping, IconProvider } from "../icons";

interface ButtonAlterModeProps {
    mode: string
    alterMode: () => void
}

export default function ButtonAlterMode(props: ButtonAlterModeProps) {
    return props.mode === 'provider' ? (
        <div onClick={props.alterMode} className={`
        hidden sm:flex items-center justify-end cursor-pointer mr-4
        `}>
            <div className={`
                flex items-center justify-center
                bg-black text-yellow-300 w-6 h-6 rounded-full
            `}>
                {IconProvider(5)}
            </div>
        </div>
    ) : (
        <div onClick={props.alterMode} className={`
            hidden sm:flex items-center justify-end cursor-pointer mr-4
        `}>
            <div className={`
                flex items-center justify-center
                bg-black text-yellow-300
                w-6 h-6 rounded-full
            `}>
                {IconShopping(5)}
            </div>
        </div>
    )
}