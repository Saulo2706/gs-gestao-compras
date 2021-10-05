import useAppData from "../../data/hook/useAppData";
import AvatarUser from "./AvatarUser";
import ButtonAlterTheme from "./ButtonAlterTheme";

export default function NavBar(props) {
    const { theme, alterTheme } = useAppData()

    return (
        <div className={`
            flex flex-row 
            h-20
            dark:bg-gray-900 
            bg-gray-200 text-gray-700`
        }>
            <div className={`flex flex-grow justify-end items-center`}>
                <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
                <AvatarUser className="ml-4 mr-4" />
            </div>
        </div>
    )
}