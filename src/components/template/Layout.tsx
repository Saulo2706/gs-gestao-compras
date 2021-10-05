import NavBar from "./NavBar";
import Content from "./Content";
import useAppData from "../../data/hook/useAppData";

interface LayoutProps{
    children?: any
}
export default function Layout(props: LayoutProps){
    const {theme} = useAppData()
    return(
        <div className={`${theme} flex h-screen w-screen`}>
            <div className={`
                flex flex-col w-full 
                bg-gray-300 dark:bg-gray-800
            `}>
                <NavBar/>
                <Content>
                    {props.children}
                </Content>
            </div>
        </div>
    )
}