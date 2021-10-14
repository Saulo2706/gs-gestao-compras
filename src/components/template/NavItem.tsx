import { useRouter } from 'next/router'
interface NavItemProps{
    href: string
    texto: string
}

export default function NavItem(props: NavItemProps){
    function RenderNavItem(){
        const router = useRouter()
        const className = router.pathname === props.href ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        
        return(
            <>
                <a href={props.href} className={className}>{props.texto}</a>
            </>
        )
    }

    return(
        RenderNavItem()
    )
}