import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Content from "./Content";
import useAppData from "../../data/hook/useAppData";
import Footer from "./Footer";

interface LayoutProps {
    children?: any
}
export default function Layout(props: LayoutProps) {
    const { theme } = useAppData()
    return (
        <div className={`${theme} flex flex-col h-screen w-screen`}>
            <header>
                <NavBar />
            </header>
            <div className={`
                flex flex-col w-full h-full
                bg-gray-300 dark:bg-gray-700
                `}>
                <div className={`flex flex-row h-screen`}>
                    <SideBar />
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </div>
    )
}