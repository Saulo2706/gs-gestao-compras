import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Content from "./Content";
import useAppData from "../../data/hook/useAppData";

interface LayoutProps {
    children?: any
}
export default function Layout(props: LayoutProps) {
    const { theme } = useAppData()
    return (
        <div className={`${theme} flex h-screen w-screen`}>
            <div className={`
                flex flex-col w-full h-full
                bg-gray-300 dark:bg-gray-600
                `}>
                <NavBar />
                <div className={`flex flex-row h-screen w-screen`}>
                    <SideBar />
                    <div className={`ml-5`}>
                        <Content>
                            {props.children}
                        </Content>
                    </div>
                </div>
            </div>

        </div>
    )
}