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
        <div className={`${theme} flex flex-col h-screen bg-gray-300 dark:bg-gray-700`}>
            <header className="sticky top-0 z-50">
                <NavBar />
            </header>
            <div className="drawer drawer-mobile">
                <input id="main-menu" type="checkbox" className="drawer-toggle" />
                <main className="flex-grow block bg-gray-300 dark:bg-gray-700 text-base-content drawer-content">
                    <div className={`
                        flex flex-col
                        bg-gray-300 dark:bg-gray-700
                        `}>
                        <div className={`flex flex-row`}>
                            <Content>
                                {props.children}
                            </Content>
                        </div>
                    </div>
                </main>
                <SideBar />
            </div>
        </div>
    )
}